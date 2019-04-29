var http = require('http');
var io = require('socket.io')(http);
var express = require('express');
const app = express();
//var request = require('superagent');
//var Promise = require('promise');
var cors = require('cors');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var path = require('path');
var mysql = require('mysql');
var crypto = require('crypto');
const session = require('express-session')
var MySQLStore = require('express-mysql-session')(session);
const uuid = require('uuid/v4');
var cluster = require('cluster');
var workers = process.env.WORKERS || require('os').cpus().length;


/**
 * Since Node.js runs on a single process we use cluster to fork the master process into child processes based on the number of CPUS. 
 * If the program encounters an error in a worker process it can be recovered from the master.
 */
if (cluster.isMaster) {
  console.log('start cluster with %s workers', workers);
  console.log('\r\n');

  for (var i = 0; i < workers; ++i) {
    var worker = cluster.fork().process;
    console.log('worker %s started.', worker.pid);
    console.log('\r\n');
  }

  cluster.on('exit', function (worker) {
    console.log('worker %s died. restart...', worker.process.pid);
    console.log('\r\n');
    cluster.fork();
  });

} else {
  var connection = null;
  var databaseOptions = {
    host: 'localhost',
    user: 'INSERT_USERNAME_HERE',
    password: 'INSERT_PASSWORD_HERE',
    database: 'INSERT_DATABASE_NAME_HERE'
  }

  /**
   * Connects to the MySQL database
   */
  function createConnection() {
    connection = mysql.createConnection(databaseOptions); // Recreate the connection, since the old one cannot be reused.
    connection.connect(function onConnect(err) { // The server is either down
      if (err) { // or restarting (takes a while sometimes).
        console.log('error when connecting to db:', err);
        console.log('\r\n');
        setTimeout(createConnection, 10000); // We introduce a delay before attempting to reconnect, to avoid a hot loop, and to allow our node script to
      } // process asynchronous requests in the meantime.
    }); // 
    // If you're also serving http, display a 503 error.
    connection.on('error', function onError(err) {
      console.log('db error', err);
      console.log('\r\n');
      if (err.code == 'PROTOCOL_CONNECTION_LOST') { // Connection to the MySQL server is usually
        createConnection(); // lost due to either server restart, or a
      } else { // connnection idle timeout (the wait_timeout
        throw err; // server variable configures this)
      }
    });
  }

  createConnection();


  app.use(cookieParser());
  app.use(bodyParser.json()); // for parsing application/json
  app.use(bodyParser.urlencoded({
    extended: true
  })); // for parsing application/x-www-form-urlencoded

  app.use(cors());
  app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, HEAD, OPTIONS, POST, PUT, PATCH");
    res.header("Access-Control-Allow-Headers", "Authorization, Origin, X-Requested-With, Content-Type, Accept");
    next();
  });

  app.use(express.static('dist/CS360app'))

  var sessionStore = new MySQLStore({} /* session store options */ , connection);
  app.use(session({
    key: 'user_id',
    genid: (req) => {
      console.log(req.sessionID)
      return uuid() // use UUIDs for session IDs
    },
    store: sessionStore,
    secret: 'I do not like green eggs and ham. I do not like them, Sam-I-Am',
    resave: false,
    saveUninitialized: true,
    cookie: {
      maxAge: 24 * 60 * 60 * 1000
    }
  }));

  var sessionChecker = (req, res, next) => {
    if (!req.cookies.user_id) {
      //res.clearCookie('user_id');  
      console.log("Redirecting")
      res.sendFile(__dirname + '/dist/CS360app/index.html');
    }
    next();
  };

  const serverPort = 9090; //<--- for the express server
  const socketPort = 8080; //<--- for the socket.io websocket
  var expressServer = http.createServer(app);
  var ioServer = require('http').createServer(handler);
  var io = require('socket.io')(ioServer);

  expressServer.listen(serverPort, () => {
    console.log(`Server listening on port ${serverPort}`);
    console.log('\r\n');
  });

  ioServer.listen(socketPort, () => {
    console.log(`Server listening on port ${socketPort}`);
    console.log('\r\n');
  });

  function handler(req, res) {
    if (res)
      res.writeHead(200).end({});
  }

  /** On connection, send a message to the user**/
  io.on('connection', function (socket) {
    console.log('Socket connected!\r\n');
    // This event will be emitted from Client when some one signs up.
    socket.on('sign-up', function (data) {
      // Add the comment in database.
      console.log("Sign up event!!!!!");
      console.log(data);
      console.log('\r\n');
      connection.query(`INSERT INTO message (senderID, senderUUID, receiverID, content, senderIcon) VALUES 
            ("JessicaGamer", "7a0d5c19-199c-11e9-94be-8851fb62b98d", "${data.UserID}", "Welcome to GetGames, the number one destination for all your gaming needs! 
            Please take the time to browse our website and enjoy.", "adult-asia-attractive-937453.jpg");`, function (err, result, fields) {
        console.log(`result is: ${result}`);
        console.log('\r\n');
        if (err) {
          console.log(err);
          io.emit('error');
          console.log('\r\n');
        } else {
          connection.query(`SELECT * FROM message as m WHERE m.receiverID='${data.UserID}' ORDER BY m.timeSent DESC`, function (err, result, fields) {
            if (!err) {
              console.log(result);
              console.log('\r\n');
              // On successful addition, emit event for client.
              setTimeout(function () {
                socket.emit("sign-up-notify", {
                  message: result
                });
              }, 3000);
            }
          });
        }
      });
    });
  });

  /**
   * Get all games in the database
   */
  app.get('/api/getAllGames', function (req, res) {
    connection.query("SELECT * FROM games ORDER BY Release_year DESC, Name ASC", function (err, result, fields) {
      if (err) {
        res.send(err)
      } else {
        res.json(result);
      }
    });
  });

  /**
   * Get all XBox games in the database
   */
  app.get('/api/getXboxOneGames', function (req, res) {
    connection.query("SELECT * FROM games WHERE OnXboxOne=1 ORDER BY Release_year DESC, Name ASC", function (err, result, fields) {
      if (err) {
        res.send(err)
      } else {

        res.json(result);
      }
    });
  });

  /**
   * Get all ps4 games in the database
   */
  app.get('/api/getPS4Games', function (req, res) {
    connection.query("SELECT * FROM games WHERE OnPS4=1 ORDER BY Release_year DESC, Name ASC", function (err, result, fields) {
      if (err) {
        res.send(err)
      } else {

        res.json(result);
      }
    });
  });

  /**
   * Get all Nintendo Switch games in the database
   */
  app.get('/api/getNintendoSwitchGames', function (req, res) {
    connection.query("SELECT * FROM games WHERE OnNintendoSw=1 ORDER BY Release_year DESC, Name ASC", function (err, result, fields) {
      if (err) {
        res.send(err)
      } else {

        res.json(result);
      }
    });
  });

  /**
   * Get all PC games in the database
   */
  app.get('/api/getPCGames', function (req, res) {
    connection.query("SELECT * FROM games WHERE OnPC=1 ORDER BY Release_year DESC, Name ASC", function (err, result, fields) {
      if (err) {
        res.send(err)
      } else {

        res.json(result);
      }
    });
  });

  /**
   * Get all games in stock in the market
   */
  app.get('/api/getAllGamesInStock', function (req, res) {
    connection.query(`SELECT * FROM games LEFT JOIN (SELECT MIN(sellingPrice) AS sellingPrice, GameID FROM is_selling GROUP BY 
    is_selling.GameID) AS T1 ON games.GameID=T1.GameID LEFT JOIN (SELECT COUNT(UserID) AS numberOfSellers, GameID FROM is_selling 
    GROUP BY is_selling.GameID) AS T2 ON games.GameID=T2.GameID WHERE games.GameID=T1.GameID`, function (err, result, fields) {
      if (err) {
        res.send(err)
      } else {

        res.json(result);
      }
    });
  });

  /**
   * Get all games in the cart
   */
  app.get('/api/getAllGamesInCart', function (req, res) {

    let loggedInUserID = (req.query && req.query.UserID) ? req.query.UserID : null;
    let cookieUserID = (req.sessionID) ? req.sessionID : null;

    console.log(`logged in user is: ${loggedInUserID}`)
    console.log(`cookie user is: ${cookieUserID}`)
    console.log("foo")
    console.log(req.query);

    // If the user is logged in then use his login ID for the query
    if (loggedInUserID !== "null") {
      console.log("bar1")
      connection.query(`SELECT * FROM is_buying LEFT JOIN (SELECT MIN(sellingPrice) AS sellingPrice, GameID FROM is_selling GROUP BY 
    is_selling.GameID) AS T1 ON is_buying.GameID=T1.GameID LEFT JOIN ( SELECT * FROM games GROUP BY games.GameID) AS T2 ON 
    is_buying.GameID=T2.GameID WHERE is_buying.GameID=T1.GameID AND is_buying.UserID='${loggedInUserID}'`,
        function (err, result, fields) {
          if (err) {
            console.log(err);
            console.log('\r\n');
            res.send(err);
          } else {
            console.log('\r\n');
            res.json(result);
          }
        });
    } else if (cookieUserID) { //else use the ID of the cookie stored in the browser
      console.log("bar2")
      connection.query(`SELECT * FROM temp_is_buying LEFT JOIN (SELECT MIN(sellingPrice) AS sellingPrice, GameID FROM is_selling GROUP BY 
      is_selling.GameID) AS T1 ON temp_is_buying.GameID=T1.GameID LEFT JOIN ( SELECT * FROM games GROUP BY games.GameID) AS T2 ON 
      temp_is_buying.GameID=T2.GameID WHERE temp_is_buying.GameID=T1.GameID AND temp_is_buying.session_id='${cookieUserID}'`,
        function (err, result, fields) {
          if (err) {
            console.log(err);
            console.log('\r\n');
            res.send(err);
          } else {
            console.log('\r\n');
            res.json(result);
          }
        });
    }
  });

  /**
   * Get all messages in the users inbox, by user ID
   */
  app.get('/api/all-messages', function (req, res) {
    if (req.query && req.query.UserID) {
      connection.query(`SELECT * FROM message as m WHERE m.receiverID='${req.query.UserID}' ORDER BY m.timeSent DESC`, function (err, result, fields) {
        if (err) {
          console.log(err);
          console.log('\r\n');
          res.sendStatus(404);
        } else {
          res.json(result);
        }
      });
    }
  });

  /**
   * Get a message from a particular user based on that particular users ID
   */
  app.get('/api/messages', function (req, res) {
    if (req.query && req.query.UserID && req.query.SenderUUID) {
      connection.query(`SELECT * FROM message as m WHERE m.receiverID='${req.query.UserID}' AND m.senderUUID='${req.query.SenderUUID}' ORDER BY m.timeSent DESC`, function (err, result, fields) {
        if (err) {
          console.log(err);
          console.log('\r\n');
          res.sendStatus(404);
        } else {
          res.json(result);
        }
      });
    }
  });

  /**
   * Returns unread messages
   */
  app.get('/api/unread-messages', function (req, res) {
    if (req.query && req.query.UserID) {
      connection.query(`SELECT * FROM message as m WHERE m.receiverID='${req.query.UserID}' AND isRead=FALSE ORDER BY m.timeSent DESC`, function (err, result, fields) {
        if (err) {
          console.log(err);
          console.log('\r\n');
          res.sendStatus(404);
        } else {
          res.json(result);
        }
      });
    }
  });

  /**
   * Returns 4 popular games from the Game table
   */
  app.get('/api/feed/popular-games', function (req, res) {
    connection.query(`SELECT * FROM games as g ORDER BY g.Release_year DESC, RAND() LIMIT 4 `, function (err, result, fields) {
      if (err) {
        console.log(err);
        console.log('\r\n');
        res.send(err);
      } else {
        ;
        res.json(result);
      }
    });
  });

/**
 * Returns 4 reviews from the Review table
 */
  app.get('/api/feed/recent-reviews', function (req, res) {
    connection.query(`SELECT * FROM review as r, games as g WHERE r.GameID=g.GameID ORDER BY r.ReviewTime DESC LIMIT 4`, function (err, result, fields) {
      if (err) {
        console.log(err);
        console.log('\r\n');
        res.send(err);
      } else {
        ;
        res.json(result);
      }
    });
  });

  /**
   * Returns 4 trailers from the Trailer table
   */
  app.get('/api/feed/popular-trailers', function (req, res) {
    connection.query(`SELECT * FROM trailer as t, games as g WHERE t.GameID=g.GameID ORDER BY g.Release_year DESC, g.Release_date DESC LIMIT 4`, function (err, result, fields) {
      if (err) {
        console.log(err);
        console.log('\r\n');
        res.send(err);
      } else {
        ;
        res.json(result);
      }
    });
  });

  /**
   * This is a single page application so all paths should lead to index.html
   */
  app.get('/*', (req, res) => {
    res.sendFile(__dirname + '/dist/CS360app/index.html');
  })


/**
 * Adds a new user and password hash to the user table. Used when a user signs up on the login page. 
 * Successful if user doesn't exist, error otherwise.
 */
  app.post('/api/addUser', function (req, res) {
    if (req.body && req.body.UserID && req.body.Password && req.body.City && req.body.State) {
      // creating a unique salt for a particular user 
      let salt = crypto.randomBytes(16).toString('hex');

      // hashing user's salt and password with 1000 iterations, 64 length and sha512 digest
      let hash = crypto.pbkdf2Sync(req.body.Password, salt,
        1000, 64, `sha512`).toString(`hex`);

      connection.query(`INSERT IGNORE INTO user (UserID, UUID, Password, Salt, City, State) VALUES 
            ("${req.body.UserID}", UUID(), "${hash}", "${salt}", "${req.body.City}", "${req.body.State}");`, function (err, result, fields) {
        if (err) {
          res.json({
            status: 500,
            message: "Something went wrong :("
          });
        } else if (result.affectedRows > 0) {
          res.json({
            status: 200,
            expires_at: new Date().getTime() + (60 * 60 * 1000),
            user_id: req.body.UserID,
            result: result
          });
        } else {
          res.json({
            status: 403,
            message: "The Username you entered already exists!"
          });
        }
      });
    } else {
      res.json({
        status: 500,
        message: "Something went wrong :("
      });
    }
  });

  /**
   * Logs a user in based on user ID and password hash in the User table. Error if unsuccessful.
   */
  app.post('/api/loginUser', function (req, res) {
    if (req.body && req.body.UserID && req.body.Password) {
      connection.query(`SELECT UserID, Password, Salt FROM user WHERE user.UserID="${req.body.UserID}"`, function (err, result, fields) {

        if (err) {
          res.json({
            status: 500,
            message: "Something went wrong :("
          });
        } else if (Array.isArray(result) && result.length == 0) {
          res.json({
            status: 403,
            message: "Incorrect Username or password!"
          });
        } else if (Array.isArray(result)) {
          let hash = crypto.pbkdf2Sync(req.body.Password,
            result[0].Salt, 1000, 64, `sha512`).toString(`hex`);
          console.log(result[0].Password)
          console.log('\r\n')
          console.log(hash)
          console.log('\r\n')
          if (hash === result[0].Password) {
            // Passwords match
            res.json({
              status: 200,
              expires_at: new Date().getTime() + (60 * 60 * 1000),
              user_id: req.body.UserID,
              result: result
            });
          } else {
            // Passwords don't match
            console.log("Passwords don't match\r\n");
            res.json({
              status: 403,
              message: "Incorrect Username or password!"
            });
          }
        } else {
          res.json({
            status: 500,
            message: "Something went wrong :("
          });
        }
      });
    } else {
      res.json({
        status: 500,
        message: "Something went wrong :("
      });
    }
  });

  /**
   * Adds a game to the cart
   */
  app.post('/api/addGameToCart', function (req, res) {
    let loggedInUserID = (req.body && req.body.UserID) ? req.body.UserID : null;
    let cookieUserID = (req.sessionID) ? req.sessionID : null;
    if (req.body && req.body.GameID && req.body.Platform && req.body.Quantity) {
      if (loggedInUserID) { //<---- If user is logged in
        connection.query(`SELECT * FROM is_buying as i WHERE i.GameID='${req.body.GameID}' AND UserID='${loggedInUserID}'
        AND Platform='${req.body.Platform}'`, function (err, result, fields) {
          if (err) {
            res.sendStatus(500);
          } else {
            if (Array.isArray(result) && result.length == 0) {
              connection.query(`INSERT IGNORE INTO is_buying(GameID, UserID, Platform, Quantity) VALUES ('${req.body.GameID}','${loggedInUserID}', '${req.body.Platform}', '${req.body.Quantity}');`, function (err, result, fields) {
                if (err) {
                  res.sendStatus(500);
                } else {
                  connection.query(`SELECT * FROM games as g, is_buying as i WHERE i.GameID=g.GameID AND UserID='${loggedInUserID}'`, function (err, result, fields) {
                    res.json(result);
                  })
                }

              });
            } else if (Array.isArray(result) && result.length > 0) {
              connection.query(`UPDATE is_buying as i SET Quantity = Quantity + ${req.body.Quantity} WHERE i.GameID='${req.body.GameID}' 
                    AND i.UserID='${loggedInUserID}' AND i.Platform='${req.body.Platform}'`, function (err, result, fields) {
                if (err) {
                  res.sendStatus(500);
                } else {
                  connection.query(`SELECT * FROM games as g, is_buying as i WHERE i.GameID=g.GameID AND UserID='${loggedInUserID}'`, function (err, result, fields) {
                    res.json(result);
                  })
                }
              });
            }
          }
        })
      } else if (cookieUserID) { //<-- else keep track of cart by browser cookie
        console.log("bar2")
        connection.query(`SELECT * FROM temp_is_buying as i WHERE i.GameID='${req.body.GameID}' AND session_id='${cookieUserID}'
        AND Platform='${req.body.Platform}'`, function (err, result, fields) {
          if (err) {
            res.sendStatus(500);
          } else {
            if (Array.isArray(result) && result.length == 0) {
              console.log(cookieUserID)
              connection.query(`INSERT INTO temp_is_buying(GameID, session_id, Platform, Quantity) VALUES ('${req.body.GameID}','${cookieUserID}', '${req.body.Platform}', '${req.body.Quantity}');`, function (err, result, fields) {
                if (err) {
                  console.log(err)
                  res.sendStatus(500);
                } else {
                  connection.query(`SELECT * FROM games as g,  temp_is_buying as i WHERE i.GameID=g.GameID AND session_id='${cookieUserID}'`, function (err, result, fields) {
                    res.json(result);
                    console.log(result)
                  })
                }

              });
            } else if (Array.isArray(result) && result.length > 0) {
              connection.query(`UPDATE  temp_is_buying as i SET Quantity = Quantity + ${req.body.Quantity} WHERE i.GameID='${req.body.GameID}' 
                    AND i.session_id='${cookieUserID}' AND i.Platform='${req.body.Platform}'`, function (err, result, fields) {
                if (err) {
                  res.sendStatus(500);
                } else {
                  connection.query(`SELECT * FROM games as g,  temp_is_buying as i WHERE i.GameID=g.GameID AND session_id='${cookieUserID}'`, function (err, result, fields) {
                    res.json(result);
                    console.log(result)
                  })
                }
              });
            }
          }
        })
      }
    }
  });

  /**
   * Mark all messages as read
   */
  app.put('/api/mark-messages-as-read', function (req, res) {
    if (req.body && req.body.UserID && req.body.SenderUUID) {
      connection.query(`UPDATE message SET isRead=TRUE WHERE receiverID='${req.body.UserID}' AND senderUUID='${req.body.SenderUUID}'`, function (err, result, fields) {
        connection.query(`SELECT * FROM message as m WHERE m.receiverID='${req.body.UserID}' AND isRead=FALSE ORDER BY m.timeSent DESC`, function (err, result, fields) {
          if (!err) {
            console.log("mark-as read!!\r\n")
            console.log(result);
            console.log('\r\n')
            res.json(result);
          } else res.send(err);
        });
      })
    }
  });

  /**
   * Delete a game from the cart
   */
  app.delete('/api/deleteGameFromCart', function (req, res) {
    let loggedInUserID = (req.query) ? req.query.UserID : null;
    let cookieUserID = (req.cookies) ? req.cookies.user_id : null;
    if (req.query && (loggedInUserID || cookieUserID) && req.query.GameID && req.query.Platform) {
      connection.query(`DELETE FROM is_buying WHERE is_buying.UserID='${(loggedInUserID || cookieUserID)}' AND is_buying.GameID='${req.query.GameID}' AND is_buying.Platform='${req.query.Platform}'`, function (err, result, fields) {
        if (err) {
          console.log(err)
          console.log('\r\n')
          res.send(err);
        } else {
          connection.query(`SELECT * FROM is_buying LEFT JOIN (SELECT MIN(sellingPrice) AS sellingPrice, GameID FROM is_selling GROUP BY 
        is_selling.GameID) AS T1 ON is_buying.GameID=T1.GameID LEFT JOIN ( SELECT * FROM games GROUP BY games.GameID) AS T2 ON 
        is_buying.GameID=T2.GameID WHERE is_buying.GameID=T1.GameID AND is_buying.UserID='${(loggedInUserID || cookieUserID)}'`, function (err, result, fields) {
            if (err) {
              console.log(err);
              console.log('\r\n');
              res.send(err);
            } else {

              res.json(result);
            }
          });
        }

      });
    }
  });
}


// catch the uncaught errors that weren't wrapped in a domain or try catch statement
// do not use this in modules, but only in applications, as otherwise we could have multiple of these bound
process.on('uncaughtException', function (err) {
  // handle the error safely
  console.log(err);
  console.log('\r\n');
})

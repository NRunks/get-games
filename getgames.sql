-- phpMyAdmin SQL Dump
-- version 4.8.3
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1:3306
-- Generation Time: Mar 30, 2019 at 01:49 PM
-- Server version: 5.7.23
-- PHP Version: 7.2.10

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `cs360app`
--

-- --------------------------------------------------------

--
-- Table structure for table `games`
--

DROP TABLE IF EXISTS `games`;
CREATE TABLE IF NOT EXISTS `games` (
  `GameID` varchar(255) NOT NULL,
  `Name` varchar(160) NOT NULL,
  `Publisher` varchar(160) NOT NULL,
  `Release_year` year(4) NOT NULL,
  `Rating` decimal(10,1) NOT NULL,
  `PictureUrl` varchar(275) DEFAULT NULL,
  `OnXboxOne` tinyint(1) NOT NULL DEFAULT '0',
  `OnPS4` tinyint(1) NOT NULL DEFAULT '0',
  `OnPC` tinyint(1) NOT NULL DEFAULT '0',
  `OnNintendoSw` tinyint(1) NOT NULL DEFAULT '0',
  `Release_date` date DEFAULT NULL,
  PRIMARY KEY (`GameID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `games`
--

INSERT INTO `games` (`GameID`, `Name`, `Publisher`, `Release_year`, `Rating`, `PictureUrl`, `OnXboxOne`, `OnPS4`, `OnPC`, `OnNintendoSw`, `Release_date`) VALUES
('0495481a-f435-11e8-927e-8851fb62b98d', 'DOOM', 'id Software', 2016, '4.8', 'DOOM_cropped', 1, 1, 1, 0, NULL),
('0495602e-f435-11e8-927e-8851fb62b98d', 'NBA 2K17', '2K Games, 2K Sports', 2016, '3.2', 'nba2k17_cropped', 1, 1, 1, 0, NULL),
('074489d0-f433-11e8-927e-8851fb62b98d', 'Fallout 76', 'Bethesda Game Studios', 2018, '2.4', 'fallout-76-cropped', 1, 1, 1, 0, '2018-11-14'),
('0fc338b1-f433-11e8-927e-8851fb62b98d', 'Red Dead Redemption 2', 'Rockstar Games', 2018, '4.9', 'red_dead_2_cropped', 1, 1, 0, 0, '2018-10-26'),
('19cb8fae-f433-11e8-927e-8851fb62b98d', 'Spider-man', 'Insomniac Games', 2018, '4.6', 'spiderman_cropped', 0, 1, 0, 0, NULL),
('2328798b-f433-11e8-927e-8851fb62b98d', 'Call of Duty: Black Ops 4', 'Activision', 2018, '4.7', 'call-of-duty-black-ops-4_cropped', 1, 1, 1, 0, '2018-10-12'),
('2c0dcc29-f433-11e8-927e-8851fb62b98d', 'The Legend Of Zelda: Breath Of the Wild', 'Nintendo', 2017, '4.9', 'Legend-Of-Zelda_cropped', 0, 0, 0, 1, NULL),
('34fb465e-f433-11e8-927e-8851fb62b98d', 'Resident Evil 7: Biohazard', 'Capcom', 2017, '4.3', 'resident_evil_cropped', 1, 1, 1, 1, NULL),
('3effebb8-f433-11e8-927e-8851fb62b98d', 'Fortnite', 'Epic Games', 2017, '4.1', 'fortnite_cropped', 1, 1, 1, 1, NULL),
('4b99ccea-f433-11e8-927e-8851fb62b98d', 'Destiny 2', 'Bungie', 2017, '3.8', 'destiny_cropped', 1, 1, 1, 0, NULL),
('54ae5981-f433-11e8-927e-8851fb62b98d', 'Cuphead', 'Studio MDHR', 2017, '4.9', 'cuphead_cropped', 1, 0, 1, 0, NULL),
('633b8257-f433-11e8-927e-8851fb62b98d', 'PlayerUnknown\'s Battlegrounds', 'Bluehole, PUBG Corporation', 2017, '3.4', 'pubG_cropped', 1, 1, 1, 0, NULL),
('77552862-f434-11e8-927e-8851fb62b98d', 'Overwatch', 'Blizzard Entertainment', 2016, '4.1', 'overwatch_cropped', 1, 1, 1, 0, NULL),
('77554027-f434-11e8-927e-8851fb62b98d', 'Dark Souls 3', 'FromSoftware', 2016, '4.0', 'dark_souls_cropped', 1, 1, 1, 0, NULL),
('7d191d00-f435-11e8-927e-8851fb62b98d', 'The Witcher 3: Wild Hunt', 'CD Projekt', 2015, '4.4', 'witcher3_cropped', 1, 1, 1, 0, NULL),
('7d1936fd-f435-11e8-927e-8851fb62b98d', 'Rocket League', 'Psyonix', 2015, '4.7', 'rocket_league_cropped', 1, 1, 1, 1, NULL),
('99f3d8f5-f433-11e8-927e-8851fb62b98d', 'FIFA 19', 'Electronic Arts', 2018, '4.6', 'Fifa_cropped', 1, 1, 1, 1, NULL),
('9a9551fb-f434-11e8-927e-8851fb62b98d', 'Forza Horizon 3', 'Playground Games, Turn 10 Studios', 2016, '3.9', 'Forza_cropped', 1, 0, 1, 0, NULL),
('d76cbd1f-f435-11e8-927e-8851fb62b98d', 'Batman: Arkham Knight', 'Rocksteady Studios', 2015, '3.8', 'arkham_knight_cropped', 1, 1, 1, 0, NULL),
('d76cd64f-f435-11e8-927e-8851fb62b98d', 'Star Wars Battlefront', 'EA DICE, Criterion Software', 2015, '3.7', 'star_wars_cropped', 1, 1, 1, 0, NULL),
('f1b84349-ff48-11e8-aafc-8851fb62b98d', 'Battlefield V', 'Electronic Arts', 2018, '4.1', 'battlefield_V_cropped', 1, 1, 1, 0, '2018-11-09');

-- --------------------------------------------------------

--
-- Table structure for table `is_buying`
--

DROP TABLE IF EXISTS `is_buying`;
CREATE TABLE IF NOT EXISTS `is_buying` (
  `GameID` varchar(75) NOT NULL,
  `UserID` varchar(75) NOT NULL,
  `Quantity` int(11) NOT NULL,
  `Platform` varchar(16) NOT NULL,
  UNIQUE KEY `GameID_2` (`GameID`,`UserID`,`Platform`) USING BTREE,
  KEY `GameID` (`GameID`),
  KEY `UserID` (`UserID`),
  KEY `Platform` (`Platform`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `is_buying`
--

INSERT INTO `is_buying` (`GameID`, `UserID`, `Quantity`, `Platform`) VALUES
('0fc338b1-f433-11e8-927e-8851fb62b98d', 'ray', 1, 'Playstation 4'),
('0fc338b1-f433-11e8-927e-8851fb62b98d', 'ray', 1, 'Xbox One'),
('19cb8fae-f433-11e8-927e-8851fb62b98d', 'ray', 3, 'Playstation 4');

-- --------------------------------------------------------

--
-- Table structure for table `is_selling`
--

DROP TABLE IF EXISTS `is_selling`;
CREATE TABLE IF NOT EXISTS `is_selling` (
  `GameID` varchar(75) NOT NULL,
  `UserID` varchar(75) NOT NULL,
  `sellingPrice` decimal(4,2) NOT NULL,
  UNIQUE KEY `GameID_2` (`GameID`,`UserID`),
  KEY `GameID` (`GameID`),
  KEY `UserID` (`UserID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `is_selling`
--

INSERT INTO `is_selling` (`GameID`, `UserID`, `sellingPrice`) VALUES
('0495602e-f435-11e8-927e-8851fb62b98d', 'NormalUser1', '10.00'),
('074489d0-f433-11e8-927e-8851fb62b98d', 'GamerGuy', '27.32'),
('074489d0-f433-11e8-927e-8851fb62b98d', 'NormalUser1', '15.22'),
('0fc338b1-f433-11e8-927e-8851fb62b98d', 'GamerGuy', '9.99'),
('19cb8fae-f433-11e8-927e-8851fb62b98d', 'NormalUser1', '15.00'),
('2328798b-f433-11e8-927e-8851fb62b98d', 'GamerGuy', '11.11'),
('2328798b-f433-11e8-927e-8851fb62b98d', 'NormalUser1', '12.44'),
('3effebb8-f433-11e8-927e-8851fb62b98d', 'NormalUser1', '0.99'),
('4b99ccea-f433-11e8-927e-8851fb62b98d', 'NormalUser1', '20.00'),
('633b8257-f433-11e8-927e-8851fb62b98d', 'GamerGuy', '17.32'),
('633b8257-f433-11e8-927e-8851fb62b98d', 'NormalUser1', '5.99'),
('77552862-f434-11e8-927e-8851fb62b98d', 'GamerGuy', '20.00'),
('77552862-f434-11e8-927e-8851fb62b98d', 'NormalUser1', '11.99'),
('77554027-f434-11e8-927e-8851fb62b98d', 'NormalUser1', '12.99'),
('9a9551fb-f434-11e8-927e-8851fb62b98d', 'NormalUser1', '9.99'),
('d76cd64f-f435-11e8-927e-8851fb62b98d', 'GamerGuy', '17.81');

-- --------------------------------------------------------

--
-- Table structure for table `message`
--

DROP TABLE IF EXISTS `message`;
CREATE TABLE IF NOT EXISTS `message` (
  `senderID` varchar(32) NOT NULL,
  `receiverID` varchar(32) NOT NULL,
  `content` varchar(3000) NOT NULL,
  `senderIcon` varchar(255) DEFAULT NULL,
  `timeSent` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `isRead` tinyint(1) NOT NULL DEFAULT '0',
  `senderUUID` varchar(255) NOT NULL,
  KEY `messageIndex` (`senderID`,`receiverID`),
  KEY `messageReceiverIDConstraint` (`receiverID`),
  KEY `senderUUID` (`senderUUID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `message`
--

INSERT INTO `message` (`senderID`, `receiverID`, `content`, `senderIcon`, `timeSent`, `isRead`, `senderUUID`) VALUES
('JessicaGamer', 'ray', 'Hey', 'adult-asia-attractive-937453.jpg', '2019-03-29 06:33:01', 1, '7a0d5c19-199c-11e9-94be-8851fb62b98d');

-- --------------------------------------------------------

--
-- Table structure for table `review`
--

DROP TABLE IF EXISTS `review`;
CREATE TABLE IF NOT EXISTS `review` (
  `GameID` varchar(255) NOT NULL,
  `UserID` varchar(32) NOT NULL,
  `Rating` decimal(10,1) NOT NULL,
  `Description` varchar(9000) NOT NULL,
  `ReviewID` varchar(32) NOT NULL,
  `ReviewTime` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `ContentLink` varchar(1000) DEFAULT NULL,
  PRIMARY KEY (`ReviewID`),
  UNIQUE KEY `GameID_2` (`GameID`,`UserID`),
  KEY `GameID` (`GameID`),
  KEY `UserID` (`UserID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `review`
--

INSERT INTO `review` (`GameID`, `UserID`, `Rating`, `Description`, `ReviewID`, `ReviewTime`, `ContentLink`) VALUES
('f1b84349-ff48-11e8-aafc-8851fb62b98d', 'JayIsAwesome', '4.2', 'Battlefield V is complicated, sweeping, and enjoyable to play. Its narrative highlights World War II’s lesser known fronts, and its competitive multiplayer is fast-paced and action-focused. It’s romantic, it’s exhilarating, and I can’t shake the feeling that something is off about it. For every grand feat of daring, there is a tension that I can’t ignore.\r\n\r\nThis piece originally appeared 11/15/18. We’ve bumped it today for the game’s release.\r\n\r\nThe Battlefield series started with 2002’s Battlefield 1942, a multiplayer first person-shooter that featured vehicles and large scale battles unlike players had seen. Since then, the series has expanded and explored numerous settings: Vietnam, modern conflicts, and World War One. Its battles have grown more destructive as the series added environmental destruction that levels buildings and transforms maps. It is a boastful series focused on scale. More player, more vehicles, more fronts. 2016’s Battlefield 1 changed the tone with a serious look at World War One. Now, Battlefield returns to World War Two with a similar self-seriousness.\r\n\r\nBattlefield V is divided between two modes with two different moods. The single player “War Stories” focus on bite-sized tales from around the globe. They’re seriously-told stories, more docu-drama than Call of Duty’s HBO approach. Each War Story is meant to educate players on one of the war’s fronts, focusing not on familiar battles like Normandy, Stalingrad, or Iwo Jima, but on lesser-known aspects of the great global conflict. There’s a stealth-heavy mission as a Norwegian sniper, a cautionary tale starring Senegalese soldiers fighting in France, and a rough and tumble special ops campaign about British commandos. Developer DICE says it plans to add a final post-release mission focusing on a German panzer unit. Combined, the War Stories provide a fresh perspective on a war that video games have milked and enthusiastically recreated for years, and DICE’s narrative team clearly cared about treating each story with respect. Compared with the shorter, more numerous single-player missions in 2016’s Battlefield 1, Battlefield V takes its time. As a result, each story feels more complete and narratively coherent.', '97961048170037248', '2018-11-28 18:18:19', 'https://kotaku.com/battlefield-v-the-kotaku-review-1830469347'),
('2328798b-f433-11e8-927e-8851fb62b98d', 'JayIsAwesome', '4.5', 'The fourth installment of Treyarch’s Black Ops series might be the first Call of Duty to forgo a single-player campaign. But after a spate of less-than-fully-satisfying entries in the once-reliable series, putting the full force of its efforts behind the multiplayer has paid off: Call of Duty: Black Ops 4 finds the perfect middle ground between classic COD and the “jetpack” era, reviving the franchise’s fun in many ways.\r\n\r\nI’d honestly be more upset about Black Ops 4\'s lack of a campaign if it had had the same rocky online launch as last year’s Call of Duty: WWII. But the online content has released feeling both polished and plentiful from the first minute. No freezing, long load times, or server issues—assuming you’re playing on console, that is. The PC side has experienced some launch-day struggles, but this is still Call of Duty’s smoothest launch in years.\r\n\r\nBlack Ops 4 has made a much-ballyhooed return to what Activision calls “boots-on-the-ground” combat, but that doesn’t mean it’s entirely reality-based. There are still grappling guns and a soldier more robot than man. It’s not Infinite Warfare fast, but neither is it WWII slow. Black Ops 4 feels exactly where the franchise needs to be in terms of the gameplay pace and the degree of Specialist abilities.', '97961048170037249', '2018-12-01 18:18:19', 'https://kotaku.com/call-of-duty-black-ops-4-the-kotaku-review-1829761577'),
('074489d0-f433-11e8-927e-8851fb62b98d', 'Charlotte9191', '3.4', 'Traditionally Fallout has been a single-player, narrative-focused RPG that puts an emphasis on the player’s actions and choices having an impact on the game’s plot and the world you’re inhabiting. With other human players around, this element has been for the large part lost. There is a vague narrative, in the sense that you have story quests, but the dialogue choices and wealth of NPCs that littered past Fallout games are entirely gone.\r\n\r\nThis can make playing the game solo a little lonely for a couple of reasons. First, because the map is giant. Set in West Virginia, the game is sprawling and chocker block full of interesting locations to explore. Walking in a straight line you’d probably have to hold the forward button down for the best part of an hour to get from one side to the other.\r\n\r\nSecond, there’s a limited number of human players populating the game world. This is in part because Bethesda’s set a cap on the number that can enter the world to avoid overpopulation. But it means you can go hours without seeing another human controlled player when playing solo, and when you do, they’ll wave at you and take their clothes off before running off into the distance.\r\n\r\n\r\nLatest\r\nHuawei Mate 20 Pro\r\nBest Phone 2018: The 13 best smartphones available right now\r\n\r\nAsus ROG Phone\r\n\r\nChoose a Room with a View of Whatever you Like\r\nADVERTISEMENT BY HILTON\r\niPhone XR vs iPhone XS Max\r\nNext year’s iPhones will be very similar to this year’s iPhones, analyst predicts\r\nEven exiting Vault 76, a safe haven where all the clever people were sent before the bombs fell, is a lonesome experience – apparently, your character slept in after partying too hard the night before. I walked out of the vault alone and the only human interaction I had was a holotape message from the Vault’s Overseer telling me to follow their path through the wasteland.\r\n\r\nEarly on this isn’t a huge problem as there’s a wealth of nifty systems and locations to visit. Most of these are the same, or slightly tweaked gameplay mechanics that debuted in Fallout 4. Crafting, for example, works in exactly the same way. As you collect items from the map, you can scrap them at workbenches and use the parts to craft upgrades for weapons and armour you picked up along the way. Or you can use them to craft new equipment entirely. Scrapping weapons that you collect also lets you learn new mods for that weapon, which gives an added incentive to pick up duplicates and lug them to a crafting table.\r\n\r\nThe arsenal at hand is as diverse as ever. Starting off you’ll be able to kill the roaming ghouls and mutated creatures with basic clubs, machetes and DIY Pipe guns. Later on, you’ll get advanced lasers, Space Marine-esque power weapons and even mini-nukes.\r\n\r\nAfter the first few hours, the limitations begin to become apparent, however. For starters, while the side quests are initially fun, they very quickly become formulaic when being played single player. Within my first six hours, the same “escort the robot” quest had appeared half a dozen times. Even the new ones I found generally followed a standard format: wander into an area, pick up a rogue radio signal, get a quest alert, go to the location, kill some stuff or pull some switches then go back. This meant the quests rapidly felt like the dire infinite loop Minutemen quests of Fallout 4.\r\n\r\nTo make matters worse, the smidgen of quests I found that broke the format were clearly built with multiplayer in mind. During one that tasked me to restart a nuclear power plant, the game challenged me to repair broken equipment within a time limit that I felt was quite frankly impossible flying solo.\r\n\r\nThankfully things pick up when you start playing with other humans. Recruiting a friend to my team the wasteland took on new life. First, because the number of monsters increases to make for an even more epic challenge. Second because when you’re playing with someone else the game suddenly feels strategic.\r\n\r\nRunning through the wasteland with a partner in crime made it possible for me to venture further into the wasteland than ever before. Within minutes of starting, we’d already entered new territory that was prohibitively difficult when flying solo and found all manner of great buildings to explore. Quests that were previously impossible suddenly became logistical exercises where we had to pre-plan who was doing what and communicate throughout to ensure success. (Ed- we also got mauled by a giant wolf, but together)\r\n\r\nThe strategic element also made me finally take advantage of Fallout 76’s reworked SPECIAL levelling-up system. As before the game lets you add a point to one of your SPECIAL (Strength, Perception, Endurance, Charisma, Intelligence, Agility, Luck) stats. Off that bat these do the same thing as Fallout 4, putting points into strength increases how much you can carry, for example. What makes it interesting is the new card system.\r\n\r\nEvery time you level up you get to pick one card to invest in. Each card has a specific skill or benefit to it. In intelligence, you can invest to improve your hacking, or boost the effectiveness of Stimpacks (the game’s equivalent of first aid kits). At incremental levels, you also get a booster pack which contains a random selection of cards. You can then use any duplicates you have to improve the power of each card. Get two of the same and you can combine them to make a more powerful level 2 ability.\r\n\r\nTo make matters more interesting, cards can be stacked. How many you can stack depends on the number of points you have invested in each attribute. If you have six points in strength you can stack six level one cards, three-level twos, or two level threes, for example. This makes it easy to design a specialist character that fits a specific role in a party.\r\n\r\nPlaying with my friend, we split up the roles so he was the lock-picking melee specialist who could craft second level weapons at workbenches. I became the long-range supporting hacker with a focus on crafting meds and food supplies when back at base. To make things even more interesting the cards aren’t locked, so if you find yourself struggling in one situation you can stack different cards onto each attribute to create a better build for the task at hand.\r\n\r\nSound awesome? It is. However, even with these additions the game still has a few imperfections. It’s buggy as an anthill to start. Numerous missions have game-ending bugs that make completing them impossible – unreactive core items you need to interact with are a common problem.\r\n\r\nThe low volume of human players is also an issue. The game markets itself as having a PVE element, and there are numerous quests that try and push this. But to date, I’m yet to find a player willing to go full on raider. On the odd occasion, I’ve run into a random human player they’ve been nothing but courteous and gone out of their way to be helpful. This is fine when wandering the wasteland, but annoying when you’re trying to play a quest that has clearly been designed for competitive play. Every time I’ve found one there haven’t been enough humans to fill the pre-game lobby and I’ve and ended up competing against generic computer-controlled enemies.\r\n\r\nEven with a human teammate running alongside you these annoyances begin to add up and ruin the already fragile sense of immersion the game needs to remain fun long-term.\r\n\r\nFallout 76 is one of the most interesting entries to the series since Fallout 3. The addition of multiplayer elements to the apocalyptic wasteland should on paper make for a wonderfully immersive, tense experience, and for a good while it does. Playing with buddies looting collapsed shopping centres and derelict towns is a blast and the robust crafting and character development mechanics are excellent.\r\n\r\nHowever, quests’ repetitive nature and a lack of human players filling the vast world can make Fallout 76 feel a little sterile and hampers its long-term appeal, especially if you don’t have friends to accompany you on your journey through the wasteland. This makes Fallout 76 a good, not great, entry into the iconic franchise.', '97961048170037260', '2018-11-15 18:18:19', 'https://www.trustedreviews.com/reviews/fallout-76'),
('0fc338b1-f433-11e8-927e-8851fb62b98d', 'Charlotte9191', '4.9', 'Over 100 hours, countless emergent moments, and dozens of sunrises later, Red Dead Redemption 2 still continues to impress. While Rockstar Games’ latest is a prequel, it builds heavily on the concepts of the first game and in most cases blows them out of the water. Narratively, mechanically, and even stylistically, this is a version of Rockstar that is mature, ambitious, and exceedingly creative. Red Dead Redemption 2 is a once in a generation type of game and it left me transfixed.\r\n\r\nTo go into any one facet of Red Dead Redemption 2 with proper detail could fill up its own review. From the design of the open world to the story to the gameplay, Rockstar has packed this game full. Every time it feels like the game has shown all it has to offer, a new scene appears to prove those assumptions wrong. Few can say that the game is lacking in any facet, even if it has some areas that aren’t entirely perfect.\r\n\r\nAt its core, Red Dead Redemption 2 is a story about Arthur Morgan, a high ranking member of Dutch Van der Linde’s gang. His tale is subtler and more nuanced than John Marston’s, and the game gives Arthur plenty of time to develop as a character. More importantly, players are given ample opportunity to learn about and bond with almost all of the members of the Van der Linde gang, as well as a handful of quest givers, which helps players decide the morality of their Arthur and gives Rockstar a chance to flex its narrative muscle.\r\n\r\nThe scope of the story is expansive, as Arthur and the Van der Linde gang try to find their place and survive in a world that reviles the outlaw. It’s at times exciting, as the gang pulls off incredible heists and survives intense gunfights, and then somber, as hope gives way to futility. There is plenty of Rockstar Games’ signature DNA at work in terms of how the missions are structured and the side characters are written. Everyone has a story to tell and each character (from top to bottom) is well written and acted. It’s rare that a side quest feels like it was given as much attention as an essential story mission but Red Dead 2 gives every story its own purpose. Some of it is, admittedly, pure entertainment but other times players will find a compelling narrative off the beaten path.\r\n\r\nNo doubt it will take players time to acclimate to everything that’s going on, and the game doesn’t explain everything that well, but eventually it becomes part of being Arthur. This is still a game, of course, but Rockstar tries to hide as much of the game-yness as it can, to the point that players can turn off the HUD and get directions the old-fashioned way. Even shopping becomes its own experience, as players flip through a catalog to select items from a table of contents.\r\n\r\nIf there is a deficiency for Red Dead Redemption 2 mechanically, it’s the gunplay. Once again Rockstar has relied on its lock-on-based cover shooting with an option to go into first person outside of cutscenes. The lock on makes the gunplay serviceable but is hardly an ideal situation. Turning the lock-on off, however, feels even more clunky. By now Rockstar fans have come to accept that this is the gunplay in these games and it’s serviceable even if you hoped for something better.\r\n\r\nLuckily, Dead Eye is back to give the gunplay a much-needed punch. Things start out fairly basic, but as Arthur’s Dead Eye ability evolves it becomes supremely satisfying to use. Rockstar has even borrowed the slow-motion glory kill camera effect to let players know when they’ve hit a nice shot. Where the core gunplay gives off a very, “This again?” feeling, Dead Eye feels like reconnecting with an old friend.\r\n\r\nBut even with some mechanical elements that are less than perfect, Rockstar packages everything in an open world that is such a joy to explore. Visually, Red Dead Redemption 2 is stunning, to the point you have to stop and stare at regular intervals. What’s more impressive, though, is that the game allows the various biomes to breathe, giving them enough space for players to explore and to give the impression that these areas are vast but still connected. Rockstar smartly uses the map to make sure that players see as much as possible and understand just how much detail went into making this feel like a living breathing world. Small towns like Valentine have character, sure, and an Old West feel, but so do the snowy mountains to the North.\r\n\r\nIt’s simply incredible how much Rockstar has accounted for. But even beyond the jaw-dropping visuals, the diverse score, and the gameplay, the story is something special and memorable. Red Dead Redemption 2 is a must-play for its entertainment value, its boundary-pushing, and its place as a landmark moment in video games.', '97961048170037261', '2018-10-30 18:18:19', 'https://gamerant.com/red-dead-redemption-2-review/');

-- --------------------------------------------------------

--
-- Table structure for table `sessions`
--

DROP TABLE IF EXISTS `sessions`;
CREATE TABLE IF NOT EXISTS `sessions` (
  `session_id` varchar(128) NOT NULL,
  `expires` int(11) UNSIGNED NOT NULL,
  `data` text CHARACTER SET utf8mb4 COLLATE utf8mb4_bin,
  PRIMARY KEY (`session_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `sessions`
--

INSERT INTO `sessions` (`session_id`, `expires`, `data`) VALUES
('17073080-1a0d-4978-a953-05ef7ed69c0f', 1553989884, '{\"cookie\":{\"originalMaxAge\":86400000,\"expires\":\"2019-03-30T06:01:34.739Z\",\"httpOnly\":true,\"path\":\"/\"}}'),
('b83cc03f-9723-4ded-8505-ea977ae321db', 1553968349, '{\"cookie\":{\"originalMaxAge\":86400000,\"expires\":\"2019-03-30T17:52:24.815Z\",\"httpOnly\":true,\"path\":\"/\"}}');

-- --------------------------------------------------------

--
-- Table structure for table `temp_is_buying`
--

DROP TABLE IF EXISTS `temp_is_buying`;
CREATE TABLE IF NOT EXISTS `temp_is_buying` (
  `GameID` varchar(75) NOT NULL,
  `session_id` varchar(128) NOT NULL,
  `Quantity` int(11) NOT NULL,
  `Platform` varchar(16) NOT NULL,
  UNIQUE KEY `GameID_2` (`GameID`,`session_id`,`Platform`),
  KEY `SessionID` (`session_id`),
  KEY `Platform` (`Platform`),
  KEY `GameID` (`GameID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `temp_is_buying`
--

INSERT INTO `temp_is_buying` (`GameID`, `session_id`, `Quantity`, `Platform`) VALUES
('3effebb8-f433-11e8-927e-8851fb62b98d', '17073080-1a0d-4978-a953-05ef7ed69c0f', 4, 'Playstation 4'),
('77554027-f434-11e8-927e-8851fb62b98d', '17073080-1a0d-4978-a953-05ef7ed69c0f', 5, 'Xbox One');

-- --------------------------------------------------------

--
-- Table structure for table `trailer`
--

DROP TABLE IF EXISTS `trailer`;
CREATE TABLE IF NOT EXISTS `trailer` (
  `GameID` varchar(255) NOT NULL,
  `VideoLink` varchar(2000) DEFAULT NULL,
  `Name` varchar(255) NOT NULL,
  `TrailerID` varchar(255) NOT NULL,
  `VideoEmbedUrl` varchar(2000) DEFAULT NULL,
  PRIMARY KEY (`TrailerID`),
  KEY `trailerGameConstraint` (`GameID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `trailer`
--

INSERT INTO `trailer` (`GameID`, `VideoLink`, `Name`, `TrailerID`, `VideoEmbedUrl`) VALUES
('2328798b-f433-11e8-927e-8851fb62b98d', 'https://www.ign.com/videos/2018/09/24/call-of-duty-black-ops-4-launch-gameplay-trailer', 'Call Of Duty Black Ops 4 Launch Gameplay Trailer', '59d67447-0476-11e9-a339-8851fb62b98d', 'http://widgets.ign.com/video/embed/content.html?url=https://www.ign.com/videos/2018/09/24/call-of-duty-black-ops-4-launch-gameplay-trailer'),
('3effebb8-f433-11e8-927e-8851fb62b98d', 'https://www.ign.com/videos/2018/05/02/red-dead-redemption-2-trailer-3', 'Red Dead Redemption 2 Trailer 3', '59d68957-0476-11e9-a339-8851fb62b98d', 'http://widgets.ign.com/video/embed/content.html?url=https://www.ign.com/videos/2018/05/02/red-dead-redemption-2-trailer-3'),
('074489d0-f433-11e8-927e-8851fb62b98d', 'https://www.ign.com/videos/2018/06/10/fallout-76-trailer-e3-2018', 'Fallout 76 Trailer - E3 2018', 'ef8d83cd-0476-11e9-a339-8851fb62b98d', 'http://widgets.ign.com/video/embed/content.html?url=https://www.ign.com/videos/2018/06/10/fallout-76-trailer-e3-2018'),
('f1b84349-ff48-11e8-aafc-8851fb62b98d', 'https://www.ign.com/videos/2018/11/09/battlefield-v-official-launch-trailer', 'Battlefield V - Official Launch Trailer', 'ef8d9303-0476-11e9-a339-8851fb62b98d', 'http://widgets.ign.com/video/embed/content.html?url=https://www.ign.com/videos/2018/11/09/battlefield-v-official-launch-trailer');

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
CREATE TABLE IF NOT EXISTS `user` (
  `UserID` varchar(32) NOT NULL,
  `Password` varchar(256) NOT NULL,
  `City` varchar(75) NOT NULL,
  `State` varchar(75) NOT NULL,
  `Role` varchar(32) NOT NULL DEFAULT 'Community Member',
  `Icon` varchar(255) DEFAULT NULL,
  `UUID` varchar(255) NOT NULL DEFAULT '',
  `Salt` varchar(32) NOT NULL,
  PRIMARY KEY (`UserID`),
  UNIQUE KEY `UUID` (`UUID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`UserID`, `Password`, `City`, `State`, `Role`, `Icon`, `UUID`, `Salt`) VALUES
('agvagaeg', '5ae2a8014804ae8dcc609b4393d711da46968dd0a0d32dd281af71a698e1792fdd6d6a2fb9dbee416070d2ae578c96ecd26a19a989bb43d9d2121ca92d4a2313', 'aegaeg', 'Florida', 'Community Member', NULL, 'a10a5932-50f7-11e9-93c6-8851fb62b98d', '537beb518bca92321ed524262dc845c2'),
('Charlotte9191', '$2b$10$U3KObiGPzvbnKvD5EhWoBuQIsSgbOVt5JeXPMNn9dlCBPTHCXtkQe', 'San Francisco', 'California', 'Community Member', NULL, '69402f49-199c-11e9-94be-8851fb62b98d', ''),
('e', 'b9b04e48dd8749612818b0c7b28f4ff142a19562d2d1358fbec81d2f7c467b7a397368b94cf107d2e370c6ce44662661f4123ab10fc1a935652142ca2a8da48a', 'ds', 'Florida', 'Community Member', NULL, '2daa6bc0-51e8-11e9-93c6-8851fb62b98d', '8fc92feb5b453b050bc97d8ef7a80839'),
('GamerGuy', 'Password', 'Miami', 'FL', 'community member', NULL, '6f3b6457-199c-11e9-94be-8851fb62b98d', ''),
('JayIsAwesome', '$2b$10$D7tOADMVxi.XdrXtt2.tWuVJqYsHgOjN9cKjN6722noWQTtb56U6e', 'Louisville', 'Kentucky', 'Contributor', NULL, '75f22c4d-199c-11e9-94be-8851fb62b98d', ''),
('JessicaGamer', 'password', 'Louisville', 'Kentucky', 'Admin', 'adult-asia-attractive-937453.jpg', '7a0d5c19-199c-11e9-94be-8851fb62b98d', ''),
('kkk', '15d5e75fc2614683405de359cd80de9abea4d3d1eb5cc833f3d067be0efa42af3c0e8e3a2bae080fadcf6b6ce1d9e82b91712a671c488848ef8ae06efcd01ec3', 'ds', 'aegaeg', 'Community Member', NULL, '3ee2b994-50f6-11e9-93c6-8851fb62b98d', '43dffef0393c2e5b43d3c6d6a857218e'),
('NormalUser1', 'Password', 'Jacksonville', 'Florida', 'community member', NULL, '7f051912-199c-11e9-94be-8851fb62b98d', ''),
('ray', '993c0558d41daeebc51bda3e6b6d5b69764b958c523101ccfd41f9088868bc00fea66ec1b183aa4806cf675ce31f7ba4fab28d0e656432d63646d37644e2c97e', 'ds', 'Florida', 'Community Member', NULL, '6d5dc0e8-51ec-11e9-93c6-8851fb62b98d', '471c3fd2bdf08f3602cf2e38ed7164ac'),
('rgrg', '97020d12003a83e8d4f295b0a5e2d9907b18bc1d7eff509216e6cd7ec2a8667f42571ec280e15c1dae494e01a5e0dd1153481efe62c5dbee92fd33aca49f7c85', 'gg', 'Florida', 'Community Member', NULL, '3424471e-516b-11e9-93c6-8851fb62b98d', '1838d8a38af51e41b16a08a1db2f11b6'),
('rr', '6c2b57089b8e73eb611a8be89751ea0092890f327ae1d1761637092236a194cc3c522a65746a80350c6904a08c0e269bd6258de4114d2b684406bfb9156bd51d', 'ds', 'aegaeg', 'Community Member', NULL, '440e7d70-50f7-11e9-93c6-8851fb62b98d', '4ea28f2fe532de76b727863ab580016d'),
('vbszdfbsd', '42ada6de158ebe3008c37ba5e26247919df74805f71d19d675784f7661056d853150a5cc3d7a7947bb0f663019bee1634cbe339d6eaf231aa1da75fb1698d5b3', 'ds', 'Florida', 'Community Member', NULL, '6e14f0a2-50f6-11e9-93c6-8851fb62b98d', 'b011e32bd23fcab8e7888224bf7a710c');

--
-- Constraints for dumped tables
--

--
-- Constraints for table `is_buying`
--
ALTER TABLE `is_buying`
  ADD CONSTRAINT `buyingGameConstraint` FOREIGN KEY (`GameID`) REFERENCES `games` (`GameID`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `buyingUserConstraint` FOREIGN KEY (`UserID`) REFERENCES `user` (`UserID`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `is_selling`
--
ALTER TABLE `is_selling`
  ADD CONSTRAINT `sellingGameConstraint` FOREIGN KEY (`GameID`) REFERENCES `games` (`GameID`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `sellingUserConstraint` FOREIGN KEY (`UserID`) REFERENCES `user` (`UserID`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `message`
--
ALTER TABLE `message`
  ADD CONSTRAINT `messageReceiverIDConstraint` FOREIGN KEY (`receiverID`) REFERENCES `user` (`UserID`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `messageSenderIDConstraint` FOREIGN KEY (`senderID`) REFERENCES `user` (`UserID`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `messageUUIDConstraint` FOREIGN KEY (`senderUUID`) REFERENCES `user` (`UUID`);

--
-- Constraints for table `review`
--
ALTER TABLE `review`
  ADD CONSTRAINT `reviewGameConstraint` FOREIGN KEY (`GameID`) REFERENCES `games` (`GameID`) ON DELETE NO ACTION,
  ADD CONSTRAINT `reviewUserConstraint` FOREIGN KEY (`UserID`) REFERENCES `user` (`UserID`) ON DELETE NO ACTION;

--
-- Constraints for table `temp_is_buying`
--
ALTER TABLE `temp_is_buying`
  ADD CONSTRAINT `tempBuyingGameConstraint` FOREIGN KEY (`GameID`) REFERENCES `games` (`GameID`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `tempBuyingSessionConstraint` FOREIGN KEY (`session_id`) REFERENCES `sessions` (`session_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `trailer`
--
ALTER TABLE `trailer`
  ADD CONSTRAINT `trailerGameConstraint` FOREIGN KEY (`GameID`) REFERENCES `games` (`GameID`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

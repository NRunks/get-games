import { Component, OnInit } from '@angular/core';
import { SocketService } from './socket.service';
import { AuthService } from './auth.service';
import { NotificationService } from './notification.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'GetGames';
  socketService: SocketService;
  authService: AuthService;
  notificationService : NotificationService ;

  constructor(_socketService: SocketService, _authService: AuthService, _notificationService: NotificationService ) {
    this.socketService = _socketService;
    this.authService = _authService;
    this.notificationService = _notificationService;
  }

  ngOnInit() {
    this.socketService.notifySignUp().subscribe((result: any) => {
     if (this.authService.isAuthenticated()) {
       console.log("Sending message!")
        if ( Array.isArray(result.message) && result.message.length > 0) {
          this.notificationService.sendMessageNotification(result.message[0].senderID, null, `../../assets/${result.message[0].senderIcon}`, null);
        }
      }
    });
  }
}

import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { NotificationService } from '../notification.service';
import { ApiService } from '../api.service';
import { SocketService } from '../socket.service';
import { interval } from 'rxjs';
import { switchMap, map } from 'rxjs/operators';
import { Observable, forkJoin } from 'rxjs';
import { routerNgProbeToken } from '@angular/router/src/router_module';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.css']
})
export class MessageComponent implements OnInit {
  notificationService: NotificationService;
  apiService: ApiService;
  socketService: SocketService;
  urlParam$: Observable<string>;
  messages$: Observable<any[]>;
  messages = [];
  constructor(private route: ActivatedRoute, private router: Router,
    _notificationService: NotificationService, _apiService: ApiService, _socketService: SocketService) {
    this.notificationService = _notificationService;
    this.apiService = _apiService;
    this.socketService = _socketService;
  }

  ngOnInit() {
    
    this.urlParam$ = this.route.paramMap.pipe(
      map((params: ParamMap) => {
        return params.get('id');
      })
    );

    this.urlParam$.subscribe((param: any) => {
      if (param) {
        this.messages$ = this.apiService.getMessageFromUser(localStorage.getItem("user_id"), param);
        this.messages$.subscribe((messages: any[]) => {
          this.messages = messages;
          this.apiService.markMessagesFromUserAsRead(localStorage.getItem("user_id"), param).subscribe((unreadMessages) => {
            
              if (unreadMessages && Array.isArray(unreadMessages)) {
                this.notificationService.setUnreadMessageCount(unreadMessages.length);
                this.notificationService.cacheUnreadMessages(unreadMessages);
              }
          })
        })
      }
    })
  }

}

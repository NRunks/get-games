import {
  Component,
  OnInit,
  ChangeDetectorRef,
  OnDestroy,
  ViewChild, 
  ElementRef
} from "@angular/core";
import { MediaMatcher } from "@angular/cdk/layout";
import { Router, ActivatedRoute, ParamMap } from "@angular/router";
import { NotificationService } from "../notification.service";
import { ApiService } from "../api.service";
import { SocketService } from "../socket.service";
import { interval, BehaviorSubject } from "rxjs";
import { switchMap, map } from "rxjs/operators";
import { Observable, forkJoin } from "rxjs";
import { MatSidenav } from '@angular/material';

@Component({
  selector: "app-chat",
  templateUrl: "./chat.component.html",
  styleUrls: ["./chat.component.css"]
})
export class ChatComponent implements OnInit, OnDestroy {
  @ViewChild("snav") public sidenav: MatSidenav;
  mobileQuery: MediaQueryList;
  private _mobileQueryListener: () => void;
  notificationService: NotificationService;
  apiService: ApiService;
  socketService: SocketService;
  messages = [];
  showNav = false;
  showNavsSubj: BehaviorSubject<boolean>;
  showNav$: Observable<boolean>;
  notification$: Observable<{}>;
  //allMessages$: Observable<any[]>;
  unreadMessage$: Observable<any[]>;
  urlParam$: Observable<string>;
  fillerContent = Array.from(
    { length: 50 },
    () =>
      `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
   labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
   laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in
   voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat
   cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.`
  );
  constructor(
    changeDetectorRef: ChangeDetectorRef,
    media: MediaMatcher,
    private route: ActivatedRoute,
    private router: Router,
    _notificationService: NotificationService,
    _apiService: ApiService,
    _socketService: SocketService,
    //private _showNavsSubj: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false),
    //public showNav$: Observable<boolean> = _showNavsSubj.asObservable()
  ) {
    this.mobileQuery = media.matchMedia("(max-width: 600px)");
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
    this.notificationService = _notificationService;
    this.apiService = _apiService;
    this.socketService = _socketService;
  }

  ngOnInit() {
    this.showNavsSubj = new BehaviorSubject<boolean>(false);
    this.showNav$ = this.showNavsSubj.asObservable();
    this.messages = this.notificationService.getCachedMessages();

    this.notification$ = forkJoin([
      this.apiService.getAllMessages(localStorage.getItem("user_id")),
      this.apiService.getUnreadMessages(localStorage.getItem("user_id"))
    ]).pipe(
      map(([allMessages, unreadMessages]) => {
        // forkJoin returns an array of values, here we map those values to an object
        return { allMessages, unreadMessages };
      })
    );

   this.showNav$.subscribe(showNav => {
     this.showNav = showNav;
   });

    this.notification$.subscribe((messageNotifications: any) => {
      messageNotifications;
      if (Array.isArray(messageNotifications.unreadMessages)) {
        this.notificationService.setUnreadMessageCount(
          messageNotifications.unreadMessages.length
        );
        this.notificationService.cacheUnreadMessages(
          messageNotifications.unreadMessages
        );
        this.unreadMessage$ = messageNotifications.unreadMessages;
      }
      if (
        Array.isArray(messageNotifications.allMessages) &&
        messageNotifications.allMessages.length > 0
      ) {
        this.messages = messageNotifications.allMessages;
        this.notificationService.cacheMessages(
          messageNotifications.allMessages
        );
        console.log(this.messages);
        this.showNavsSubj.next(true);
        var timer = interval(2000).subscribe(n => {
          this.sidenav.mode = "push";
          this.sidenav.open();
          timer.unsubscribe();
        });
        /*this.router.navigate([
          "/home",
          "messages",
          this.allMessages$[0].senderUUID
        ]);*/
      } else {
        this.router.navigate([
          "/home",
          "messages"
        ]);
      }
    });
  }

  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }

  isLast(index) {
    return index == this.messages.length - 1;
  }

  toggleSidenav() {
    this.sidenav.toggle();
  }
}

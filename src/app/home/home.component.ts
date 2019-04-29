import { Component, OnInit, AfterViewInit, OnDestroy, ChangeDetectorRef, ViewChild } from '@angular/core';
import { MediaMatcher } from '@angular/cdk/layout';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { ApiService } from '../api.service';
import { NotificationService } from '../notification.service';
import { SocketService } from '../socket.service';
import { MatIconRegistry } from "@angular/material/icon";
import { DomSanitizer } from "@angular/platform-browser";
import { Observable, forkJoin } from 'rxjs';
import { map } from 'rxjs/operators';
import { interval } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers: [MatIconRegistry]
})
export class HomeComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('snav') sidenav: any;
  navLinks: any;
  activeLinkIndex: any;
  router: Router;
  authService: AuthService;
  apiService: ApiService;
  socketService: SocketService;
  notificationService: NotificationService;
  notification$;
  allNotifications;
  mobileQuery: MediaQueryList;
  cookieValue = null;
  private _mobileQueryListener: () => void;
  constructor(_router: Router, _authService: AuthService, _apiService: ApiService, _notificationService: NotificationService,
    _socketService: SocketService, private matIconRegistry: MatIconRegistry, private domSanitizer: DomSanitizer,
    changeDetectorRef: ChangeDetectorRef, media: MediaMatcher, private cookieService: CookieService) {
    this.router = _router;
    this.authService = _authService;
    this.apiService = _apiService;
    this.notificationService = _notificationService;
    this.socketService = _socketService;
    this.matIconRegistry.addSvgIcon(
      `home`,
      this.domSanitizer.bypassSecurityTrustResourceUrl(`http://35.190.160.173:9090/assets/home-button.svg`)
    );
    this.matIconRegistry.addSvgIcon(
      `shoppingCart`,
      this.domSanitizer.bypassSecurityTrustResourceUrl(`http://35.190.160.173:9090/assets/shopping-cart.svg`)
    );
    this.matIconRegistry.addSvgIcon(
      `login`,
      this.domSanitizer.bypassSecurityTrustResourceUrl(`http://35.190.160.173:9090/assets/login.svg`)
    );
    this.matIconRegistry.addSvgIcon(
      `logout`,
      this.domSanitizer.bypassSecurityTrustResourceUrl(`http://35.190.160.173:9090/assets/logout.svg`)
    );
    this.matIconRegistry.addSvgIcon(
      `market`,
      this.domSanitizer.bypassSecurityTrustResourceUrl(`http://35.190.160.173:9090/assets/label.svg`)
    );
    this.matIconRegistry.addSvgIcon(
      `notifications`,
      this.domSanitizer.bypassSecurityTrustResourceUrl(`http://35.190.160.173:9090/assets/notification.svg`)
    );
    this.matIconRegistry.addSvgIcon(
      `messages`,
      this.domSanitizer.bypassSecurityTrustResourceUrl(`http://35.190.160.173:9090/assets/chat-bubbles.svg`)
    );
    this.matIconRegistry.addSvgIcon(
      `account`,
      this.domSanitizer.bypassSecurityTrustResourceUrl(`http://35.190.160.173:9090/assets/man-user.svg`)
    );
    this.matIconRegistry.addSvgIcon(
      `homeBlue`,
      this.domSanitizer.bypassSecurityTrustResourceUrl(`http://35.190.160.173:9090/assets/home-button_blue.svg`)
    );
    this.matIconRegistry.addSvgIcon(
      `shoppingCartBlue`,
      this.domSanitizer.bypassSecurityTrustResourceUrl(`http://35.190.160.173:9090/assets/shopping-cart_blue.svg`)
    );
    this.matIconRegistry.addSvgIcon(
      `loginBlue`,
      this.domSanitizer.bypassSecurityTrustResourceUrl(`http://35.190.160.173:9090/assets/login_blue.svg`)
    );
    this.matIconRegistry.addSvgIcon(
      `logoutBlue`,
      this.domSanitizer.bypassSecurityTrustResourceUrl(`http://35.190.160.173:9090/assets/logout_blue.svg`)
    );
    this.matIconRegistry.addSvgIcon(
      `marketBlue`,
      this.domSanitizer.bypassSecurityTrustResourceUrl(`http://35.190.160.173:9090/assets/label_blue.svg`)
    );
    this.matIconRegistry.addSvgIcon(
      `notificationsBlue`,
      this.domSanitizer.bypassSecurityTrustResourceUrl(`http://35.190.160.173:9090/assets/notification_blue.svg`)
    );
    this.matIconRegistry.addSvgIcon(
      `messagesBlue`,
      this.domSanitizer.bypassSecurityTrustResourceUrl(`http://35.190.160.173:9090/assets/chat-bubbles_blue.svg`)
    );
    this.matIconRegistry.addSvgIcon(
      `accountBlue`,
      this.domSanitizer.bypassSecurityTrustResourceUrl(`http://35.190.160.173:9090/assets/man-user_blue.svg`)
    );
    this.matIconRegistry.addSvgIcon(
      `bosslady`,
      this.domSanitizer.bypassSecurityTrustResourceUrl(`http://35.190.160.173:9090/assets/adult-blur-christmas-246731.jpg`)
    );
    this.mobileQuery = media.matchMedia('(max-width: 650px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
  }

  ngOnInit() {
      this.notification$ = forkJoin([
        this.apiService.getAllGamesInCart(localStorage.getItem("user_id")),
        this.apiService.getAllMessages(localStorage.getItem("user_id")),
        this.apiService.getUnreadMessages(localStorage.getItem("user_id"))
      ]).pipe(
        map(([gamesInCart, allMessages, unreadMessages]) => {
          // forkJoin returns an array of values, here we map those values to an object
          return { gamesInCart, allMessages, unreadMessages };
        })
      );

      this.notification$.subscribe((allNotifications: any) => {
        this.allNotifications = allNotifications;
        console.log(this.allNotifications)
        if (Array.isArray(this.allNotifications.gamesInCart)) {
          this.notificationService.setShoppingCartCount(this.allNotifications.gamesInCart.length);
          this.notificationService.cacheGamesInCart(this.allNotifications.gamesInCart);
        }
        if (Array.isArray(this.allNotifications.allMessages)) {
          this.notificationService.cacheMessages(this.allNotifications.allMessages);
        }
        if (Array.isArray(this.allNotifications.unreadMessages)) {
          this.notificationService.setUnreadMessageCount(this.allNotifications.unreadMessages.length);
          this.notificationService.cacheUnreadMessages(this.allNotifications.unreadMessages);
        }
      })
      var timer = interval(2000).subscribe(n => {
        if (window.innerWidth <= 650) {this.sidenav.open();}
        timer.unsubscribe();
      })
      this.notificationService.requestPermission();
  }

  ngAfterViewInit(): void {

  }

  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }

  public isAuthenticated() {
    return this.authService.isAuthenticated();
  }

  public logout() {
    localStorage.removeItem("session_expires_at");
    localStorage.removeItem("user_id");
    this.router.navigate(["/"]);
    location.reload();
  }

  public login() {
    localStorage.removeItem("session_expires_at");
    localStorage.removeItem("user_id");
    this.router.navigate(["/sign-up"]);
  }

  public getCartCount() {
    return this.notificationService.getShoppingCartCount();
  }

  public getNotificationCount() {
    return this.notificationService.getNotificationCount();
  }

  public getUnreadMessageCount() {
    return this.notificationService.getUnreadMessageCount();
  }

  public routeToMessages() {
    if (Array.isArray(this.allNotifications.allMessages) && this.allNotifications.allMessages.length > 0) {
      this.router.navigate(["/home", "messages", this.allNotifications.allMessages[0].senderUUID])
    // this.router.navigate(["/home", "messages"])
    } else {
      this.router.navigate(["/home", "messages"]);
    }
  }

}

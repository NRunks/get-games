import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  public permission: Permission;
  shoppingCartCount = 0;
  notificationCount = 0;
  unreadMessageCount = 0;
  gamesInCart = [];
  notifications = [];
  messagesInInbox = [];
  unreadMessagesInInbox = [];

  constructor() {
    this.permission = this.isSupported() ? 'default' : 'denied';
  }

  public setShoppingCartCount(count: number) {
    this.shoppingCartCount = count;
  }

  public getShoppingCartCount() {
    return (this.shoppingCartCount == 0) ? '' : this.shoppingCartCount;
  }

  public setNotificationCount(count: number) {
    this.notificationCount = count;
  }

  public getNotificationCount() {
    return (this.notificationCount == 0) ? '' : this.notificationCount;
  }
  public setUnreadMessageCount(count: number) {
    this.unreadMessageCount = count;
  }

  public getUnreadMessageCount() {
    return (this.unreadMessageCount == 0) ? '' : this.unreadMessageCount;
  }

  public cacheGamesInCart(cart: any[]) {
    this.gamesInCart = cart;
  }

  public cacheNotification(notifications: any[]) {
    this.notifications = notifications;
  }

  public cacheUnreadMessages(messages: any[]) {
    this.unreadMessagesInInbox = messages;
  }

  public cacheMessages(messages: any[]) {
    this.messagesInInbox = messages;
  }

  public getCachedGamesInCart() {
    return this.gamesInCart;
  }

  public getCachedNotifications() {
    return this.notifications;
  }

  public getCachedMessages() {
    return this.messagesInInbox;
  }

  public getCachedUnreadMessages() {
    return this.unreadMessagesInInbox;
  }


  public isSupported(): boolean {
    return 'Notification' in window;
  }

  requestPermission(): void {
    let self = this;
    if ('Notification' in window) {
      Notification.requestPermission(function (status) {
        return self.permission = status;
      });
    }
  }

  createBrowserNotification(title: string, options?: PushNotification): any {
    let self = this;
    return new Observable(function (obs) {
      if (!('Notification' in window)) {
        console.log('Notifications are not available in this environment');
        obs.complete();
      }
      if (self.permission !== 'granted') {
        console.log("The user hasn't granted you permission to send push notifications");
        obs.complete();
      }
      let _notify = new Notification(title, options);
      _notify.onshow = function (e) {
        return obs.next({
          notification: _notify,
          event: e
        });
      };
      _notify.onclick = function (e) {
        return obs.next({
          notification: _notify,
          event: e
        });
      };
      _notify.onerror = function (e) {
        return obs.error({
          notification: _notify,
          event: e
        });
      };
      _notify.onclose = function () {
        return obs.complete();
      };
    });
  }

  /*generateNotification(source: Array<any>): void {
    let self = this;
    source.forEach((item) => {
      let options = {
        body: item.alertContent,
        icon: "../resource/images/bell-icon.png"
      };
      let notify = self.createBrowserNotification(item.title, options).subscribe();
    })
  }*/

  sendMessageNotification(senderName: string, messageTitle?: string, senderIcon?: any, messageContent?: string) {
    let data = {
      'body': messageContent ? `${senderName} has sent you a message.` : `You have received a message.`,
      'icon': `../../assets/${senderIcon}`
    }

    this.createBrowserNotification(messageTitle ? messageTitle : `Message Received!`, data).subscribe();
  }
}


export declare type Permission = 'denied' | 'granted' | 'default';
export interface PushNotification {
  body?: string;
  icon?: string;
  tag?: string;
  data?: any;
  renotify?: boolean;
  silent?: boolean;
  sound?: string;
  noscreen?: boolean;
  sticky?: boolean;
  dir?: 'auto' | 'ltr' | 'rtl';
  lang?: string;
  vibrate?: number[];
}

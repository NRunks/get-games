import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map, catchError } from "rxjs/operators";
import { Socket } from 'ngx-socket-io';



@Injectable({
  providedIn: 'root'
})
export class SocketService {
  private signUp = this.socket.fromEvent<string[]>('sign-up');
  private observer;

  constructor(private socket: Socket) { }

  /*observer
  getSignupData(): Observable<any> {
    this.socket.on('socket-data', (res) => {
      this.observer.next(res);
    });
    return this.getSocketDataObservable();
  }
  getSocketDataObservable(): Observable<any> {
    return new Observable(observer => {
      this.observer = observer;
    });
  }*/

  private getSocketDataObservable(): Observable<any> {
    return new Observable(observer => {
      this.observer = observer;
    });
  }

  signUpUser(userID: string) {
    console.log(userID)
    this.socket.emit('sign-up', { UserID: userID });
  }

  notifySignUp(): Observable<any> {
    return this.socket
      .fromEvent('sign-up-notify')
      .pipe(
        map((message: any) => {
          return message;
        }),
        catchError(<T>(error: any, result?: T) => {
          console.log(error);
          return (result as T);
        })
      );
  }

  notifyMessagesUpdated(): Observable<any> {
    return this.socket
      .fromEvent('messages-updated')
      .pipe(
        map((messages: any) => {
          return messages;
        }),
        catchError(<T>(error: any, result?: T) => {
          console.log(error);
          return (result as T);
        })
      );
  }
}

import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { BehaviorSubject, Observable, forkJoin } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }

  public getAllGames(): Observable<any> {
    return this.http.get<any>('api/getAllGames');
  }
  public getXboxOneGames(): Observable<any> {
    return this.http.get<any>('api/getXboxOneGames');
  }
  public getPS4Games(): Observable<any> {
    return this.http.get<any>('api/getPS4Games');
  }
  public getNintendoSwitchGames(): Observable<any> {
    return this.http.get<any>('api/getNintendoSwitchGames');
  }
  public getPCGames(): Observable<any> {
    return this.http.get<any>('api/getPCGames');
  }
  public getALLGamesInStock(): Observable<any> {
    return this.http.get<any>('api/getAllGamesInStock');
  }
  public getAllGamesInCart(userID: any): Observable<any> {
    return this.http.get<any>('api/getAllGamesInCart', { params: new HttpParams().set('UserID', userID) });
  }
  public addGameToCart(gameID: any, userID: any, platform: string, quantity: number): Observable<any> {
    return this.http.post<any>('api/addGameToCart', { UserID: userID, GameID: gameID, Platform: platform, Quantity: quantity });
  }
  public deleteGameFromCart(gameID: any, userID: any, platform: any): Observable<any> {
    return this.http.delete<any>('api/deleteGameFromCart', { params: new HttpParams().set('UserID', userID).set('GameID', gameID).set('Platform', platform) });
  }

  public getFeed() {
    return forkJoin([
      this.http.get<any>('api/feed/popular-games'),
      this.http.get<any>('api/feed/recent-reviews'),
      this.http.get<any>('api/feed/popular-trailers')
    ]).pipe(
      map(([popularGames, recentReviews, popularTrailers]) => {
        // forkJoin returns an array of values, here we map those values to an object
        return { popularGames, recentReviews, popularTrailers };
      })
    );
  }
  public getAllMessages(userID: any) {
    return this.http.get<any>('api/all-messages', { params: new HttpParams().set('UserID', userID) });
  }

  public getUnreadMessages(userID: any) {
    return this.http.get<any>('api/unread-messages', { params: new HttpParams().set('UserID', userID) });
  }

  public getMessageFromUser(userID: any, senderUUID) {
    return this.http.get<any>('api/messages', { params: new HttpParams().set('UserID', userID).set('SenderUUID', senderUUID) });
  }

  public markMessagesFromUserAsRead(userID: string, otherUserUUID: string) {
    return this.http.put<any>('api/mark-messages-as-read', { UserID: userID, SenderUUID: otherUserUUID });
  }
}

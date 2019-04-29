import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  public addUser(userID, password, city, state) {
    return this.http.post<any>('api/addUser', {UserID: userID, Password: password, City: city, State: state});
  }

  public loginUser(userID, password) {
    return this.http.post<any>('api/loginUser', {UserID: userID, Password: password});
  }

  public setSession(expiry_time, user_id) {
    localStorage.setItem("session_expires_at", expiry_time);
    localStorage.setItem("user_id", user_id);
  }

  public isAuthenticated() {
    const expiryTime = JSON.parse(localStorage.getItem("session_expires_at"));
    if (expiryTime &&  localStorage.getItem("user_id") &&(new Date().getTime() < expiryTime)) {
      return true;
    } else return false;
  }
}

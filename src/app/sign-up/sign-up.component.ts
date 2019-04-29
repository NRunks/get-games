import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { MatSnackBar } from '@angular/material';
import { MatIconRegistry } from "@angular/material/icon";
import { DomSanitizer } from "@angular/platform-browser";
import { SocketService } from '../socket.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {
  userID1 = new FormControl('');
  city1 = new FormControl('');
  state1 = new FormControl('');
  password1 = new FormControl('');
  reTypePassword1 = new FormControl('');
  userID2 = new FormControl('');
  password2 = new FormControl('');
  authService: AuthService;
  router: Router;
  socketService: SocketService

  constructor(_authService: AuthService, _router: Router, public snackbar: MatSnackBar, _socketService: SocketService,
    private matIconRegistry: MatIconRegistry, private domSanitizer: DomSanitizer) { 
    this.authService = _authService, this.router = _router, this.socketService = _socketService;
    this.matIconRegistry.addSvgIcon(
      `home`,
      this.domSanitizer.bypassSecurityTrustResourceUrl(`http://35.190.160.173:9090/assets/home-button.svg`)
    ); }

  ngOnInit() {
    if (this.authService.isAuthenticated()) {
      this.router.navigate(['/home']);
    }
  }

  public handleSignUpButtonClick(event) {
    this.authService.addUser(this.userID1.value, this.password1.value, this.city1.value, this.state1.value).subscribe((results: any) => {
      console.log(results);
      if (results.status == 200) {
        this.authService.setSession(results.expires_at, results.user_id);
        this.socketService.signUpUser(results.user_id);
        this.router.navigate(['/home']);
      } else {
        this.snackbar.open(`${results.message}`, `OK`, {
          duration: 2000,
        });
      }
    })
  }

  public handleLogInButtonClick(event) {
    this.authService.loginUser(this.userID2.value, this.password2.value).subscribe((results: any) => {
      if (results.status == 200) {
        this.authService.setSession(results.expires_at, results.user_id);
        this.router.navigate(['/home']);
      } else {
        this.snackbar.open(`${results.message}`, `OK`, {
          duration: 2000,
        });
      }
    });
  }

}

import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { AuthService } from '../auth.service';
import { NotificationService } from '../notification.service';
import { trigger, style, transition, animate, keyframes } from '@angular/animations';
import { Observable, forkJoin } from 'rxjs';
import { map } from 'rxjs/operators';
import { MatIconRegistry } from "@angular/material/icon";
import { DomSanitizer } from "@angular/platform-browser";
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
  animations: [
    trigger('routerTransition', [
      transition('void => *', [
        style({ opacity: 0, transform: 'translateX(0)' }),
        animate(800, keyframes([
          style({ opacity: 0, transform: 'translateX(-100%)', offset: 0 }),
          style({ opacity: 1, transform: 'translateX(15px)', offset: 0.3 }),
          style({ opacity: 1, transform: 'translateX(0)', offset: 1.0 })
        ]))
      ]),
      transition('* => void', [
        animate(800, keyframes([
          style({ opacity: 1, transform: 'translateX(0)', offset: 0 }),
          style({ opacity: 1, transform: 'translateX(-15px)', offset: 0.7 }),
          style({ opacity: 0, transform: 'translateX(100%)', offset: 1.0 })
        ]))
      ])
    ]),
    trigger('loadGameContacts', [
      transition('* => void', [
        style({ opacity: 1 }),
        animate(200, style({ opacity: 0 }))
      ]),
      transition('void => *', [
        style({ opacity: 0 }),
        animate(300, style({ opacity: 1 }))
      ])
    ])
  ],
  providers: [MatIconRegistry]
})
export class CartComponent implements OnInit {

  apiService: ApiService;
  authService: AuthService;
  notificationService: NotificationService;
  gameInventory$;
  gamesInCart: any[];
  isLoading;
  displayedColumns: string[] = ['title', 'platform', 'price', 'quantity', 'total'];
  footerColumns: string[] = ['title', 'total'];

  constructor(_apiService: ApiService, _authService: AuthService, _notificationService: NotificationService, private matIconRegistry: MatIconRegistry,
    private domSanitizer: DomSanitizer, public snackbar: MatSnackBar) {
    this.apiService = _apiService;
    this.authService = _authService;
    this.notificationService = _notificationService;
    this.gamesInCart = [];

    this.matIconRegistry.addSvgIcon(
      `xboxOne`,
      this.domSanitizer.bypassSecurityTrustResourceUrl(`http://35.190.160.173:9090/assets/xbox.svg`)
    );
    this.matIconRegistry.addSvgIcon(
      `ps4`,
      this.domSanitizer.bypassSecurityTrustResourceUrl(`http://35.190.160.173:9090/assets/playstation_logo.svg`)
    );
    this.matIconRegistry.addSvgIcon(
      `nintendoSwitch`,
      this.domSanitizer.bypassSecurityTrustResourceUrl(`http://35.190.160.173:9090/assets/nintendo-switch.svg`)
    );
    this.matIconRegistry.addSvgIcon(
      `windows`,
      this.domSanitizer.bypassSecurityTrustResourceUrl(`http://35.190.160.173:9090/assets/microsoft-windows-22.svg`)
    );
  }

  ngOnInit() {
    this.gamesInCart = this.notificationService.getCachedGamesInCart();
    this.gameInventory$ = this.apiService.getAllGamesInCart(localStorage.getItem("user_id"));
    this.gameInventory$.subscribe(allGamesInCart => {
      if (Array.isArray(allGamesInCart)) {
        this.notificationService.setShoppingCartCount(allGamesInCart.length);
        this.gamesInCart = allGamesInCart;
      }
    })
  }

  public isInCart(gameID): boolean {
    if (this.gamesInCart && this.gamesInCart.length > 0) {
      for (var i = 0; i < this.gamesInCart.length; i++) {
        if (this.gamesInCart[i].GameID == gameID) {
          return true;
        }
      }
    }
    return false;
  }

  public deleteFromCart(index, gameID, gameName, platform) {
    this.apiService.deleteGameFromCart(gameID, localStorage.getItem('user_id'), platform).subscribe((result) => {
      if (Array.isArray(result)) {
        this.gamesInCart = result;
        this.notificationService.setShoppingCartCount(result.length);
      }
      //this.gamesInCart.splice(index, 1);
      this.snackbar.open(`${gameName} deleted from the cart!`, `OK`, {
        duration: 2000,
      });
    })
  }

  public getPrice(gameID) {
    if (this.gamesInCart && this.gamesInCart.length > 0) {
      for (var i = 0; i < this.gamesInCart.length; i++) {
        if (this.gamesInCart[i].GameID == gameID) return this.gamesInCart[i].sellingPrice;
      }
    }
    return 0.0;
  }

  public getQuantity(gameID, platform) {
    if (this.gamesInCart && this.gamesInCart.length > 0) {
      for (var i = 0; i < this.gamesInCart.length; i++) {
        if (this.gamesInCart[i].GameID == gameID && this.gamesInCart[i].Platform == platform) return this.gamesInCart[i].Quantity;
      }
    }
    return 1;
  }

  public handleProceedToCheckoutButtonClick(event) {
    this.snackbar.open(`This is only a showcase.`, `OK`, {
      duration: 2000,
    });
  }

  itemPluralMapping = {
    '=1': '1 game at',
    'other': '# games each at'
  }

  public getTotal(price, quantity) {
    return price * quantity;
  }
  public getTotalCartCost() {
    var tempTotal = 0.0;
    this.gamesInCart.forEach((value) => {
      tempTotal += value.sellingPrice * value.Quantity;
    });
    return tempTotal;
  }
}

import { Component, OnInit } from "@angular/core";
import { ApiService } from "../api.service";
import { AuthService } from "../auth.service";
import { NotificationService } from "../notification.service";
import {
  trigger,
  style,
  transition,
  animate,
  keyframes
} from "@angular/animations";
import { Observable, forkJoin } from "rxjs";
import { map } from "rxjs/operators";
import { MatIconRegistry } from "@angular/material/icon";
import { DomSanitizer } from "@angular/platform-browser";
import {
  FormControl,
  Validators,
  FormGroup,
  FormBuilder,
  FormArray
} from "@angular/forms";
import { interval } from "rxjs";

@Component({
  selector: "app-all",
  templateUrl: "./all.component.html",
  styleUrls: ["./all.component.css"],
  animations: [
    trigger("routerTransition", [
      transition("void => *", [
        style({ opacity: 0, transform: "translateX(0)" }),
        animate(
          800,
          keyframes([
            style({ opacity: 0, transform: "translateX(-100%)", offset: 0 }),
            style({ opacity: 1, transform: "translateX(15px)", offset: 0.3 }),
            style({ opacity: 1, transform: "translateX(0)", offset: 1.0 })
          ])
        )
      ]),
      transition("* => void", [
        animate(
          800,
          keyframes([
            style({ opacity: 1, transform: "translateX(0)", offset: 0 }),
            style({ opacity: 1, transform: "translateX(-15px)", offset: 0.7 }),
            style({ opacity: 0, transform: "translateX(100%)", offset: 1.0 })
          ])
        )
      ])
    ]),
    trigger("loadGameContacts", [
      transition("* => void", [
        style({ opacity: 1 }),
        animate(200, style({ opacity: 0 }))
      ]),
      transition("void => *", [
        style({ opacity: 0 }),
        animate(300, style({ opacity: 1 }))
      ])
    ])
  ],
  providers: [MatIconRegistry]
})
export class AllComponent implements OnInit {
  apiService: ApiService;
  authService: AuthService;
  notificationService: NotificationService;
  allGames$: Observable<any[]>;
  inStock$: Observable<any[]>;
  gameInventory$;
  games;
  gamesInCart: any[]; //<-- Separate because it can change dynamically
  gamesDisplayed: any[];
  allGames: any[] = [];
  xboxOneGames: any[] = [];
  ps4Games: any[] = [];
  nintendoSwitchGames: any[] = [];
  pcGames: any[] = [];
  public selectedToggleButtonVal: string;
  isLoading;
  buttonAnimating: boolean = false;
  animatedButtonIndex = 0;
  form: FormGroup;
  platformControl = new FormControl("", [Validators.required]);
  quantityControl = new FormControl("", [Validators.required]);

  constructor(
    _apiService: ApiService,
    _authService: AuthService,
    _notificationService: NotificationService,
    private matIconRegistry: MatIconRegistry,
    private domSanitizer: DomSanitizer,
    private formBuilder: FormBuilder
  ) {
    this.apiService = _apiService;
    this.authService = _authService;
    this.notificationService = _notificationService;
    /*this.matIconRegistry.addSvgIconInNamespace('assets', 'xbox', 
          this.domSanitizer.bypassSecurityTrustResourceUrl('../../assets/Xbox_one_logo.svg'));*/
    this.matIconRegistry.addSvgIcon(
      `xboxOne`,
      this.domSanitizer.bypassSecurityTrustResourceUrl(
        `http://35.190.160.173:9090/assets/xbox.svg`
      )
    );
    this.matIconRegistry.addSvgIcon(
      `ps4`,
      this.domSanitizer.bypassSecurityTrustResourceUrl(
        `http://35.190.160.173:9090/assets/playstation_logo.svg`
      )
    );
    this.matIconRegistry.addSvgIcon(
      `nintendoSwitch`,
      this.domSanitizer.bypassSecurityTrustResourceUrl(
        `http://35.190.160.173:9090/assets/nintendo-switch.svg`
      )
    );
    this.matIconRegistry.addSvgIcon(
      `windows`,
      this.domSanitizer.bypassSecurityTrustResourceUrl(
        `http://35.190.160.173:9090/assets/microsoft-windows-22.svg`
      )
    );
    /*this.form = this.formBuilder.group({
      platformArray: [],
      quantityArray: []
    });*/
    this.form = this.formBuilder.group({
      orders: this.formBuilder.array([this.initGames()])
    });
  }

  ngOnInit() {
    if (!this.games) {
      this.isLoading = true;
    }

    this.selectedToggleButtonVal = "All";
    this.gameInventory$ = forkJoin([
      this.apiService.getAllGames(),
      this.apiService.getALLGamesInStock(),
      this.apiService.getAllGamesInCart(localStorage.getItem("user_id"))
    ]).pipe(
      map(([allGames, allGamesInStock, allGamesInCart]) => {
        // forkJoin returns an array of values, here we map those values to an object
        this.isLoading = false;
        this.gamesInCart = allGamesInCart;
        this.allGames = allGames;
        this.gamesDisplayed = this.allGames;

        if (Array.isArray(this.gamesInCart)) {
          this.notificationService.setShoppingCartCount(
            this.gamesInCart.length
          );
        }
        return { allGames, allGamesInStock, allGamesInCart };
      })
    );

    this.gameInventory$.subscribe((games: any) => {
      this.games = games;
      (<FormArray>this.form.controls["orders"]).removeAt(0);
      this.gamesDisplayed.forEach(value => {
        const control = <FormArray>this.form.controls["orders"];
        control.push(
          this.formBuilder.group({
            platform: [{ value: "", disabled: false }, Validators.required],
            quantity: [{ value: "", disabled: false }, Validators.required]
          })
        );
      });
    });
  }

  initGames() {
    return this.formBuilder.group({
      platform: [{ value: "", disabled: false }, Validators.required],
      quantity: [{ value: "", disabled: false }, Validators.required]
    });
  }

  addGames(Game) {
    // initialize our address
    const control = <FormArray>this.form.controls["orders"];
    control.push(
      this.formBuilder.group({
        platform: [{ value: "", disabled: false }, Validators.required],
        quantity: [{ value: "", disabled: false }, Validators.required]
      })
    );
  }

  public isInStock(gameID): boolean {
    if (
      this.games &&
      this.games.allGamesInStock.length > 0 &&
      this.games.allGames.length > 0
    ) {
      for (var i = 0; i < this.games.allGamesInStock.length; i++) {
        if (this.games.allGamesInStock[i].GameID == gameID) return true;
      }
    }
    return false;
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

  public getPrice(gameID) {
    if (
      this.games &&
      this.games.allGamesInStock.length > 0 &&
      this.games.allGames.length > 0
    ) {
      for (var i = 0; i < this.games.allGamesInStock.length; i++) {
        if (this.games.allGamesInStock[i].GameID == gameID)
          return this.games.allGamesInStock[i].sellingPrice;
      }
    }
    return 0.0;
  }

  public getNumberOfSellers(gameID) {
    if (
      this.games &&
      this.games.allGamesInStock.length > 0 &&
      this.games.allGames.length > 0
    ) {
      for (var i = 0; i < this.games.allGamesInStock.length; i++) {
        if (this.games.allGamesInStock[i].GameID == gameID)
          return this.games.allGamesInStock[i].numberOfSellers;
      }
    }
    return 1;
  }

  public getAllGamesButtonClick(event) {
    this.form.reset();
    if (this.allGames.length > 0) {
      this.gamesDisplayed = this.allGames;
    } else {
      this.gamesDisplayed = [];
      this.isLoading = true;
      this.apiService.getXboxOneGames().subscribe((games: any) => {
        this.gamesDisplayed = games;
        this.isLoading = false;
      });
    }
  }

  public getXboxOneGamesButtonClick(event) {
    this.form.reset();
    if (this.xboxOneGames.length > 0) {
      this.gamesDisplayed = this.xboxOneGames;
    } else {
      this.gamesDisplayed = [];
      this.isLoading = true;
      this.apiService.getXboxOneGames().subscribe((games: any) => {
        this.gamesDisplayed = games;
        this.isLoading = false;
      });
    }
  }

  public getPS4GamesButtonClick(event) {
    this.form.reset();
    if (this.ps4Games.length > 0) {
      this.gamesDisplayed = this.ps4Games;
    } else {
      this.gamesDisplayed = [];
      this.isLoading = true;
      this.apiService.getPS4Games().subscribe((games: any) => {
        this.gamesDisplayed = games;
        this.isLoading = false;
      });
    }
  }

  public getNintendoSwitchGamesButtonClick(event) {
    this.form.reset();
    if (this.nintendoSwitchGames.length > 0) {
      this.gamesDisplayed = this.nintendoSwitchGames;
    } else {
      this.gamesDisplayed = [];
      this.isLoading = true;
      this.apiService.getNintendoSwitchGames().subscribe((games: any) => {
        this.gamesDisplayed = games;
        this.isLoading = false;
      });
    }
  }

  public getPCGamesButtonClick(event) {
    this.form.reset();
    if (this.pcGames.length > 0) {
      this.gamesDisplayed = this.pcGames;
    } else {
      this.gamesDisplayed = [];
      this.isLoading = true;
      this.apiService.getPCGames().subscribe((games: any) => {
        this.gamesDisplayed = games;
        this.isLoading = false;
      });
    }
  }

  itemPluralMapping = {
    "=0": "0 sellers",
    "=1": "1 Seller",
    other: "# Sellers"
  };

  public handleAddToCartButtonClick(event, i): void {
    const control = <FormArray>this.form.controls["orders"];
    if (control.at(i).valid) {
      var platform = control.at(i).value.platform;
      var quantity = control.at(i).value.quantity;
      this.apiService
        .addGameToCart(
          this.gamesDisplayed[i].GameID,
          localStorage.getItem("user_id"),
          platform,
          quantity
        )
        .subscribe((result: any) => {
          this.gamesInCart = result;
          if (Array.isArray(this.gamesInCart)) {
            this.buttonAnimating = true;
            this.animatedButtonIndex = i;
            this.notificationService.setShoppingCartCount(
              this.gamesInCart.length
            );
            var timer = interval(3000).subscribe(n => {
              this.buttonAnimating = false;
              this.animatedButtonIndex = 0;
              const control = <FormArray>this.form.controls["orders"];
              control[i] = this.formBuilder.group({
                platform: [{ value: "", disabled: false }, Validators.required],
                quantity: [{ value: "", disabled: false }, Validators.required]
              });
              timer.unsubscribe();
            });
          }
        });
    }
  }
}

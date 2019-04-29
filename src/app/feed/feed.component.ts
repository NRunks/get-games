import {  AfterContentInit, Component, ViewChild, OnInit, ChangeDetectorRef, AfterViewInit } from '@angular/core';
import { MediaChange, ObservableMedia } from '@angular/flex-layout';
import { trigger, style, transition, animate, keyframes } from '@angular/animations';
import { DomSanitizer } from "@angular/platform-browser";
import { MatGridList } from '@angular/material';
import { ApiService } from '../api.service';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.css'],
  animations: [ trigger('routerTransition', [
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
})
export class FeedComponent implements OnInit, AfterContentInit  {
  apiService: ApiService;
  authService: AuthService;
  observableMedia: ObservableMedia;
  sanitizer: DomSanitizer;
  feed$;
  popularGames;
  recentReviews;
  popularTrailers;
  isLoading;

  @ViewChild('grid1') grid1: MatGridList;
  @ViewChild('grid2') grid2: MatGridList;
  @ViewChild('grid3') grid3: MatGridList;
  //@ViewChild('grid3') grid3: MatGridList;

  gridByBreakpoint = {
    xl: 4,
    lg: 4,
    md: 2,
    sm: 2,
    xs: 1
  }
  constructor(_apiService: ApiService, _authService: AuthService, private _observableMedia: ObservableMedia, 
    private _sanitizer: DomSanitizer, private cdr: ChangeDetectorRef) {
    this.apiService = _apiService;
    this.authService = _authService;
    this.observableMedia = _observableMedia;
    this.sanitizer = _sanitizer;
    this.sanitizer.bypassSecurityTrustResourceUrl("http://widgets.ign.com/video/embed/content.html?url=https://www.ign.com/videos/2018/09/24/call-of-duty-black-ops-4-launch-gameplay-trailer")
   }

  ngOnInit() {
    this.isLoading = true;
    this.feed$ = this.apiService.getFeed();
    this.feed$.subscribe((feed: any)=> {
      this.popularGames = feed.popularGames;
      this.recentReviews = feed.recentReviews;
      this.popularTrailers = feed.popularTrailers;
      this.isLoading = false;
    });
  }

  ngAfterContentInit() {
    this.observableMedia.asObservable().subscribe((change: MediaChange) => {
      this.grid1.cols = this.gridByBreakpoint[change.mqAlias];
      this.grid2.cols = this.gridByBreakpoint[change.mqAlias];
      this.grid3.cols = this.gridByBreakpoint[change.mqAlias];
    });
  }

  ngAfterViewInit() {
    this.cdr.detectChanges();
  }
}

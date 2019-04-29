import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { FlexLayoutModule } from '@angular/flex-layout';
import { SocketIoModule, SocketIoConfig } from 'ngx-socket-io';
import {MatToolbarModule, MatButtonModule, MatTabsModule, MatCardModule, MatProgressSpinnerModule, MatButtonToggleModule, MatIconModule, 
  MatFormFieldModule, MatInputModule, MatSnackBarModule, MatGridListModule, MatTooltipModule, MatBadgeModule,
  MatSidenavModule, MatListModule, MatDividerModule, MatMenuModule, MatSelectModule, MatTableModule} from '@angular/material';
import {HomeComponent} from './home/home.component';
import { AllComponent } from './all/all.component';
import {ApiService} from './api.service'
import {AuthService} from './auth.service';
import { CookieService } from 'ngx-cookie-service';
import { SignUpComponent } from './sign-up/sign-up.component';
import { HttpClientModule } from '@angular/common/http';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { CartComponent } from './cart/cart.component';
import { FeedComponent } from './feed/feed.component';
import { TruncateTextPipe } from './truncate-text.pipe';
import { SafeUrlPipe } from './safe-url.pipe';
import { ChatComponent } from './chat/chat.component';
import { MessageComponent } from './message/message.component';
import { EmptyMessageComponent } from './empty-message/empty-message.component';

const config: SocketIoConfig = { url: 'http://35.190.160.173:8080', options: {} };

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AllComponent,
    SignUpComponent,
    CartComponent,
    FeedComponent,
    TruncateTextPipe,
    SafeUrlPipe,
    ChatComponent,
    MessageComponent,
    EmptyMessageComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FlexLayoutModule,
    MatToolbarModule,
    MatButtonModule, 
    MatTabsModule,
    MatCardModule,
    MatProgressSpinnerModule,
    MatButtonToggleModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatSnackBarModule,
    MatGridListModule,
    HttpClientModule,
    MatTooltipModule,
    MatBadgeModule,
    MatSidenavModule,
    MatListModule,
    MatDividerModule,
    MatMenuModule,
    MatSelectModule,
    MatTableModule,
    FormsModule, 
    ReactiveFormsModule,
    SocketIoModule.forRoot(config)
  ],
  providers: [ApiService, AuthService, CookieService],
  bootstrap: [AppComponent]
})
export class AppModule { }

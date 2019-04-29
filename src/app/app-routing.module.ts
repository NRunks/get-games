import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AllComponent } from './all/all.component';
import { FeedComponent } from './feed/feed.component';
import { CartComponent } from './cart/cart.component';
import { ChatComponent } from './chat/chat.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { MessageComponent } from './message/message.component';
import { EmptyMessageComponent } from './empty-message/empty-message.component';
import { AuthGuard } from './auth.guard';

const routes: Routes = [
  {
    path: 'home',
    component: HomeComponent,
    children: [{
      path: '',
      redirectTo: 'feed',
      pathMatch: 'full'
    },
    {
      path: 'feed',
      component: FeedComponent
    },
    {
      path: 'market',
      component: AllComponent
    },
    {
      path: 'cart',
      component: CartComponent
    },
    {
      path: 'messages',
      component: ChatComponent,
      canActivate: [
        AuthGuard
      ],
      children: [      
        { path: '', component: EmptyMessageComponent },
        { path: ':id', component: MessageComponent }
      ]
    }
    ]
  },
  { path: 'sign-up', component: SignUpComponent },
  { path: '**', redirectTo: 'home', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

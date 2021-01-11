
import { NgModule } from '@angular/core';
import { AppRoutingModule, routingComponents } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule} from '@angular/forms'; 
import { HttpClientModule } from '@angular/common/http';
import { IndexComponent } from './index/index.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PasswordValidatorDirective } from './signup/password-validator.directive';
import { HomeComponent } from './home/home.component';
import { SearchComponent } from './search/search.component';
import { RoomsComponent } from './home/rooms/rooms.component';
import { NgxSpinnerModule, NgxSpinnerService } from 'ngx-spinner';
import {InfiniteScrollModule} from 'ngx-infinite-scroll';
import { SideNavComponent } from './side-nav/side-nav.component';
import { AuthGuard } from './auth.guard';
import { RouterModule } from '@angular/router';
import { NgxWebstorageModule} from 'ngx-webstorage';
import { NO_ERRORS_SCHEMA,CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ChatsComponent } from './home/chats/chats.component';
import { ProfileComponent } from './home/profile/profile.component';
import { LikesComponent } from './home/likes/likes.component';
import { VisitsComponent } from './home/visits/visits.component';
import { SettingsComponent } from './home/settings/settings.component';
// import { AuthService, AuthServiceConfig, FacebookLoginProvider, GoogleLoginProvider, SocialLoginModule } from 'ng4-social-login';

// const config = new AuthServiceConfig([
//   {
//     id:GoogleLoginProvider.PROVIDER_ID,
//     provider:new GoogleLoginProvider('22119547152-2g9s7qfblgkj240qbst19ursf8brvk92.apps.googleusercontent.com')
//   },
//   {
//     id:FacebookLoginProvider.PROVIDER_ID,
//     provider:new FacebookLoginProvider('528720724577726')
//   }
// ],false);

// export function  provideConfig(){
//   return config;
// }



@NgModule({
  declarations: [
    AppComponent,   
    routingComponents, IndexComponent, PasswordValidatorDirective,ProfileComponent, HomeComponent, SearchComponent, RoomsComponent, SideNavComponent, ChatsComponent, ProfileComponent, LikesComponent, VisitsComponent, SettingsComponent,

  ],
  imports: [
    AppRoutingModule,
    FormsModule,
    InfiniteScrollModule,
    HttpClientModule,
    NgxWebstorageModule.forRoot(),
    NgxSpinnerModule,
    // SocialLoginModule,
    BrowserAnimationsModule,
    // RouterModule.forRoot(
    //   [
    //     {
    //     path : 'home',
    //     component:HomeComponent,
    //     canActivate:[AuthGuard]
    //   },
    //   ]
    // )
  ],
  providers: [
  //  {
  //     provide:AuthServiceConfig,
  //     useFactory:provideConfig,
    
  //  },
      NgxSpinnerService,
      // AuthService
      
     
  ], schemas: [
    CUSTOM_ELEMENTS_SCHEMA,
    NO_ERRORS_SCHEMA
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

import { NgModule } from '@angular/core';
import { AppRoutingModule, routingComponents } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { IndexComponent } from './index/index.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PasswordValidatorDirective } from './signup/password-validator.directive';
import { HomeComponent } from './home/home.component';
import { SearchComponent } from './search/search.component';
import { RoomsComponent } from './home/rooms/rooms.component';
import { NgxSpinnerModule, NgxSpinnerService } from 'ngx-spinner';
import { SideNavComponent } from './side-nav/side-nav.component';
import { NgxFileUploadCoreModule } from '@ngx-file-upload/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { NgxWebstorageModule} from 'ngx-webstorage';
import { NO_ERRORS_SCHEMA,CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ChatsComponent } from './home/chats/chats.component';
import { ProfileComponent } from './home/profile/profile.component';
import { LikesComponent } from './home/likes/likes.component';
import { VisitsComponent } from './home/visits/visits.component';
import { SettingsComponent } from './home/settings/settings.component';
import { AppService } from './app.service';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { SecurityComponent } from './security/security.component';
import { JwtClientComponent } from './jwt-client/jwt-client.component';
import { AllroomComponent } from './home/rooms/allroom/allroom.component';
import { MyroomComponent } from './home/rooms/myroom/myroom.component';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { OnlineUsersComponent } from './home/online-users/online-users.component';
import { BroadcastComponent } from './home/broadcast/broadcast.component';
import { ProfilesComponent } from './home/profiles/profiles.component';
import { XhrInterceptor } from './user.service';
import { UserVisitComponent } from './user-visit/user-visit.component';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { PeopleLikeComponent } from './home/likes/people-like/people-like.component';
import { YouLikeComponent } from './home/likes/you-like/you-like.component';
import { ToastrModule,ToastContainerModule } from 'ngx-toastr';
import { CommonModule } from '@angular/common';
import { EventEmmitterService } from './home/profile/event-emmitter.service';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { NgWizardModule, NgWizardConfig, THEME } from 'ng-wizard';
import { ImagesComponent } from './home/profile/images/images.component';
import { ImageCropperModule } from 'ngx-image-cropper';
import { PhotosComponent } from './user-visit/photos/photos.component';
import {CrystalLightboxModule} from '@crystalui/angular-lightbox';
import { UpgradeComponent } from './upgrade/upgrade.component';
import { UpgradeBasicComponent } from './upgrade/upgrade-basic/upgrade-basic.component';
import { UpgradePremiumComponent } from './upgrade/upgrade-premium/upgrade-premium.component';
import { MessageComponent } from './message/message.component';
import { BoostComponent } from './boost/boost.component';
import { NgxDropzoneModule } from 'ngx-dropzone';


const ngWizardConfig: NgWizardConfig = {
  theme: THEME.dots
};

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
    // tslint:disable-next-line: max-line-length
    AppComponent ,routingComponents, ImagesComponent,IndexComponent, PasswordValidatorDirective,ProfileComponent, HomeComponent, SearchComponent, RoomsComponent, SideNavComponent, ChatsComponent, ProfileComponent, LikesComponent, VisitsComponent, SettingsComponent, SecurityComponent, JwtClientComponent, MyroomComponent, AllroomComponent, OnlineUsersComponent, BroadcastComponent, ProfilesComponent, UserVisitComponent, PeopleLikeComponent, YouLikeComponent,
    RoomsComponent,
    ImagesComponent,

    PhotosComponent,

     UpgradeComponent,
      UpgradeBasicComponent,
      UpgradePremiumComponent,
      MessageComponent,
      BoostComponent,
  ],


  imports: [
    CrystalLightboxModule,
    NgWizardModule.forRoot(ngWizardConfig),
    Ng2SearchPipeModule,
    CarouselModule ,
    AppRoutingModule,
    FormsModule,ReactiveFormsModule,
    CommonModule,
    NgxDropzoneModule,
    InfiniteScrollModule,
    RouterModule,
    NgxFileUploadCoreModule,
    HttpClientModule,
    ImageCropperModule,

    NgxWebstorageModule.forRoot(),
    ToastrModule.forRoot({
      timeOut: 1500,
      positionClass: 'toast-bottom-left',
      preventDuplicates: true,
      progressBar:true,
      progressAnimation:'increasing'
    }),

    NgxSpinnerModule,
    BrowserAnimationsModule, // required animations module
    ToastContainerModule,
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
  EventEmmitterService,

  AppService, { provide: HTTP_INTERCEPTORS, useClass: XhrInterceptor, multi: true },
  { provide: ActivatedRoute, useValue: { snapshot: {} } },
      NgxSpinnerService,
      AppService,  { provide: HTTP_INTERCEPTORS, useClass: XhrInterceptor, multi: true }
      // AuthService


  ], schemas: [
    CUSTOM_ELEMENTS_SCHEMA,
    NO_ERRORS_SCHEMA
  ],

  bootstrap: [AppComponent]
})
export class AppModule { }

platformBrowserDynamic().bootstrapModule(AppModule);

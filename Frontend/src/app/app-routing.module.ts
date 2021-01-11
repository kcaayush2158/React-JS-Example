import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TeamComponent } from './team/team.component';
import { AppComponent } from './app.component';
import { Error404Component } from './error404/error404.component';
import { LoginComponent } from './login/login.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { SignupComponent } from './signup/signup.component';
import { IndexComponent } from './index/index.component';
import { HomeComponent } from './home/home.component';
import { SearchComponent } from './search/search.component';
import { AuthGuard } from './auth.guard';
import { RoomsComponent } from './home/rooms/rooms.component';
import { ProfileComponent } from './home/profile/profile.component';
import { LikesComponent } from './home/likes/likes.component';
import { VisitsComponent } from './home/visits/visits.component';
import { SettingsComponent } from './home/settings/settings.component';

const routes: Routes = [
  {path:"",component:IndexComponent},
  {path:"login",component:LoginComponent},
  {path:"profile",component:ProfileComponent},
  {path:"likes",component:LikesComponent},
  {path:"visits",component:VisitsComponent},
  {path:"settings",component:SettingsComponent},
  {path:"teams",component:TeamComponent},
  {path:"home",component:HomeComponent},
  {path:"signup",component:SignupComponent},
  {path:"rooms",component:RoomsComponent},
  {path:"search",component:SearchComponent},
  {path:"**",component:Error404Component},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
export const routingComponents=[SearchComponent,LikesComponent,VisitsComponent,SettingsComponent,ProfileComponent,AppComponent,RoomsComponent,TeamComponent,Error404Component,LoginComponent,HeaderComponent,FooterComponent,SignupComponent,IndexComponent,HomeComponent];

import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { User } from '../user';
import { HttpClient } from '@angular/common/http';
import { HttpClientService } from '../http-client.service';
import { Router } from '@angular/router';
import {  FormGroup } from '@angular/forms';
import { LocalStorageService } from 'ngx-webstorage';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  // public user : any = SocialUser;
  private loggedIn :boolean;
  users =new User();
  messageResponse = '';

loginForm :  FormGroup;

  constructor(private _userService: UserService,private _httpClient : HttpClient,private service:HttpClientService,private _router:Router,private localStorage:LocalStorageService) { }

  loginUser(){

    this.service.loginUser(this.users).subscribe(
      (data)=>{
        console.log(data);
        if(data != null){
          this._router.navigate(['/home']);
          this.localStorage.store('user',data);
          console.log(this.localStorage.retrieve('user'));
          this.service.setLoggedIn(true);
          console.log('logged in');
        }else{
          this.messageResponse="Bad Credentials";
        }
      },(error)=>{
        this.messageResponse="Bad Credentials";
     }
    )};


  username:string;
  password:string;
  message:any;
  ngOnInit() {

  }
    // // for social-login 
    // facebookLogin(){
    //   this.socialAuthService.signIn(FacebookLoginProvider.PROVIDER_ID).then((userData)=> {
    //     this.user = userData;
    //   });
    // }
    // googleLogin(){
    //   this.socialAuthService.signIn(GoogleLoginProvider.PROVIDER_ID).then((userData)=> {
    //     this.user = userData;
    //   });
    // }

    // signOut(): void {
    //   this.socialAuthService.signOut();
    //   this.localStorage.clear('user');
    // }




}

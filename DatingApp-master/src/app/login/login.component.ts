import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { User } from '../user';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { HttpClientService } from '../http-client.service';
import { ActivatedRoute, Router } from '@angular/router';
import {  FormGroup } from '@angular/forms';
import { LocalStorageService } from 'ngx-webstorage';
import { NgxSpinnerService } from 'ngx-spinner';
import { AppService } from '../app.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  // public user : any = SocialUser;
  private loggedIn :boolean;
  users = User;
  messageResponse = '';
  credentials = {email: '', password: ''};
  loginForm :  FormGroup;
  authenciate =false;
  onlineUsers=  [];




constructor(private app: AppService,private spinner:NgxSpinnerService,private toastr :ToastrService ,private activatedRoute :ActivatedRoute ,private _router :Router,private _userService: UserService,private _httpClient : HttpClient,private service:HttpClientService,private localStorage:LocalStorageService) { }


ngOnInit(): void {
  this.spinner.show();
  if(this.localStorage.retrieve('isLoggedIn') == true){
    
    this.activatedRoute.params.subscribe((data)=>{
      this.spinner.hide();
      this.toastr.success('success', 'Login Successful');
      this._router.navigateByUrl['/home'];
    });
    
  }else{
   
  }
  }


  authenticated() {

    return this.authenciate;
  }

  login() {
   
    const url="http://localhost:8080/api/user/login?email="+this.credentials.email+"&password="+this.credentials.password;
    this._httpClient.get(url).subscribe((response) => {
    
        if (response) {
          this.localStorage.store('user',response);
          this.localStorage.store("isLoggedIn", "true");
            this.authenciate = true;
            this.messageResponse ='success';
            this._router.navigateByUrl('/home');
            this.toastr.success('success','Login successful');
            this.onlineUsers.push(response);
           
          
        } else {
          this._router.navigateByUrl('/login');
          this.messageResponse = 'Bad credentials';
          this.authenciate=false;

        }
    
  },(error)=>   this.toastr.error('error', 'invalid credentials')


  

  
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







    )
}
} 

function authenticated(): (error: any) => void {
  throw new Error('Function not implemented.');
}

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { LocalStorageService } from 'ngx-webstorage';
import { PasswordChange } from './settings';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {

  users:any=[];
  formChangePassword :  FormGroup;
  passwordChange= new PasswordChange();
  paymentHandler:any = null;
  baseUrl ='http://localhost:8080';

  constructor(private localStorage :LocalStorageService,private formBuilder :FormBuilder,private tostr:ToastrService,private spinner :NgxSpinnerService,private router:Router,private http:HttpClient ) {

   }

  ngOnInit(): void {
    this.users = this.localStorage.retrieve('user');
    this.invokeStripe();



   this.formChangePassword = this.formBuilder.group({
     oldPassword : ['', [Validators.required, Validators.minLength(5), Validators.required, Validators.maxLength(20)]],
     newPassword:  ['', [Validators.required, Validators.minLength(5), Validators.required, Validators.maxLength(20)]]
   });

  }

  makePayment(amount) {
    const paymentHandler = (window as any).StripeCheckout.configure({
      key: 'pk_test_51IxFIzD2HnE7dte2WY0lsHbxJYwi3PsA3IDkVW4qwl3XioDljKuOtqZHUNYW9pIQBgSTN0UMK4oKoHdlI9gRNJu500Ln0IJNyk',
      locale: 'auto',
      token (stripeToken: any) {
        console.log(stripeToken)
        alert('Stripe token generated!');
      }
    });

    paymentHandler.open({
      name: 'Positronx',
      description: '3 widgets',
      amount: amount * 100
    });
  }

  invokeStripe() {
    if(!window.document.getElementById('stripe-script')) {
      const script = window.document.createElement('script');
      script.id = 'stripe-script';
      script.type = 'text/javascript';
      script.src = 'https://checkout.stripe.com/checkout.js';
      script.onload = () => {
        this.paymentHandler = (window as any).StripeCheckout.configure({
          key: 'pk_test_51IxFIzD2HnE7dte2WY0lsHbxJYwi3PsA3IDkVW4qwl3XioDljKuOtqZHUNYW9pIQBgSTN0UMK4oKoHdlI9gRNJu500Ln0IJNyk',
          locale: 'auto',
          token (stripeToken: any) {
            console.log(stripeToken)
            alert('Payment has been successfull!');
          }
        });
      }

      window.document.body.appendChild(script);
    }
  }

  get registerFormControl() {
    return this.formChangePassword.controls;
  }

  get oldPassword() {
    return this.formChangePassword.get('oldPassword');
  }

  get newPassword() {
    return this.formChangePassword.get('newPassword');
  }


  changePassword(){
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json');

    const user= this.localStorage.retrieve('user');
    const url= this.baseUrl+'/api/settings/password/save?oldPassword='+this.oldPassword.value+'&password='+this.newPassword.value+'&email='+user.email;
    console.log(url);
    this.spinner.show();

    this.http.post(url, {headers:headers}).subscribe((data)=>{
      if(data == 1){
        this.spinner.hide();
        this.tostr.success('Success','Password has been changed successfully');
      }else{
        this.tostr.error('Error','BAD CREDENTIALS');
      }
      console.log(data);

     },(error)=> this.tostr.error('error','Failed to changed password'));

  }

  deleteProfile(){
    const user= this.localStorage.retrieve('user');
    const url= this.baseUrl+'/api/profile/delete?email='+user.email;
    this.spinner.show();
    this.http.post(url,{}).subscribe((data)=>{
      if(data !=null){
        this.spinner.hide();
        this.router.navigate['/logout'];
        this.tostr.success('Success','Profile has been changed successfully');
      }else{
        this.tostr.error('Error','Unable to delete the profile');
      }

     },(error)=> this.tostr.error('error','Failed to delete  Profile'));

  }

  uploadPhoto(){


  }

}

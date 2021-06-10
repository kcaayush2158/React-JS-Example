import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { LocalStorageService } from 'ngx-webstorage';
import { User } from 'src/app/user';

@Component({
  selector: 'app-chats',
  templateUrl: './chats.component.html',
  styleUrls: ['./chats.component.css']
})
export class ChatsComponent implements OnInit {
  users:any=[];
  message= '';
  baseurl='http://localhost:8080';
  authenticatedUser:any;
  roomId:any;


  constructor(private localStorage: LocalStorageService,private toastr:ToastrService, private activatedRoute :ActivatedRoute,private spinner: NgxSpinnerService,private router :Router,private httpClient :HttpClient) { }

  ngOnInit(): void {
   
    this.authenticatedUser= this.localStorage.retrieve('user');
    this.activatedRoute.params.subscribe((data)=>{

      this.roomId = this.activatedRoute.snapshot.paramMap.get('roomId');
      console.log(this.roomId);
      this.loadMessage();

    })
  this.loadMessage();
  }

  sendMessage(){
    this.spinner.show();
    console.log(this.message);
    this.httpClient.post(this.baseurl+'/api/chatroom/public/'+this.roomId+'/save?message='+this.message+'&email='+this.authenticatedUser.email,{})
    .subscribe((data)=>{
      this.toastr.success('success','Message Send');

      this.spinner.hide();
      this.loadMessage();
    },(error)=>{
      this.toastr.error('failed','Unable to send message');
      this.spinner.hide();
    })
  }



  loadMessage(){
    this.spinner.show();
    this.httpClient.get(this.baseurl+'/api/chatroom/public/'+this.roomId+'/all?email='+this.authenticatedUser.email)
    .subscribe((data)=>{
      this.users = data;
      this.toastr.success('success','Message loaded')
      this.spinner.hide();
    },(error)=>{
      this.toastr.error('failed','Unable to send message');
      this.spinner.hide();
    })



  }
}

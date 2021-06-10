import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { LocalStorageService } from 'ngx-webstorage';

@Component({
  selector: 'app-people-like',
  templateUrl: './people-like.component.html',
  styleUrls: ['./people-like.component.css']
})
export class PeopleLikeComponent implements OnInit {


  likes:any=[];
  user :any =[]

  constructor(private http:HttpClient,private localStorage:LocalStorageService,private spinner :NgxSpinnerService) { }

  ngOnInit(): void {
    this.loadVisits();

  }

  loadVisits(){
this.spinner.show();
this.user= this.localStorage.retrieve("user");
    var url ="http://localhost:8080/api/v1/likes/all?email="+this.user.email;
    this.http.get(url,{responseType: 'json'}).subscribe((data)=>{
      this.likes=data;
      this.spinner.hide();
      console.log(data);
    });
  

  }


}
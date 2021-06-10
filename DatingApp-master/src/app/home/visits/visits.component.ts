import { Component, OnInit } from '@angular/core';
import { from } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { VisitedUsers } from './visited-user';
import { LocalStorageService } from 'ngx-webstorage';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-visits',
  templateUrl: './visits.component.html',
  styleUrls: ['./visits.component.css']
})
export class VisitsComponent implements OnInit {
 visits:any=[];
 user:any=[];
 visitsCount :string ;
  constructor(private http:HttpClient,private spinner :NgxSpinnerService ,private localStorage:LocalStorageService) { }

  ngOnInit(): void {
    this.loadVisits();
    this.countVisits();
    this.user = this.localStorage.retrieve('user');
  }

  loadVisits(){
    this.user = this.localStorage.retrieve('user');
    this.spinner.show();
    var url = "http://localhost:8080/api/v1/visits?email="+this.user.email;
    console.log(url);
    this.http.get(url,{responseType: 'json'}).subscribe((data)=>{
      this.visits=data;
      this.spinner.hide();
      
    });
  
  }

  countVisits(){
    
    var url ="http://localhost:8080/api/v1/visits/users/count?email="+this.user.email;
    this.http.get(url,{responseType: 'text'}).subscribe((data)=>{
      this.visitsCount=data;
    });
  }

}

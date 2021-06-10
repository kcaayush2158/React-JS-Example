import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { LocalStorageService } from 'ngx-webstorage';

@Component({
  selector: 'app-online-users',
  templateUrl: './online-users.component.html',
  styleUrls: ['./online-users.component.css']
})
export class OnlineUsersComponent implements OnInit {

  users = [];
photoes:any =[];
  constructor(private http: HttpClient, private spinner: NgxSpinnerService,private localStorage:LocalStorageService) { }



  ngOnInit(): void {


    this.loadOnlineProfiles();


  }

  loadOnlineProfiles() {
    this.spinner.show();

    const url = 'http://localhost:8080/api/u/online';
    this.http.get(url, { responseType: 'json' }).subscribe((data) => {
      let responseData = JSON.stringify(data);

      for (var i = 0; i <= responseData.length; i++) {
        this.http.get('http://localhost:8080/api/u/' + data[i].username + '/online/get', { responseType: 'json' }).subscribe((response) => {
     
           this.users.push(response) ;
           this.spinner.hide();
      

        } );
    
      }

    });

  }



}

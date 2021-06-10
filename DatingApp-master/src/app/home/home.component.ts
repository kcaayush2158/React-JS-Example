import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgxSpinnerModule, NgxSpinnerService } from 'ngx-spinner';

import { concatMap, map, switchMap, filter, take} from 'rxjs/operators';
import { timer, BehaviorSubject, Observable} from 'rxjs';
import { Router } from '@angular/router';
import { LocalStorageService } from 'ngx-webstorage';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})


export class HomeComponent implements OnInit {
  notEmptyPost=true;
  notScrolly=true;
  onlineUsers:any;
  countNotifications:number;
  // users:any ;
  notification:any;
  loading$ = new BehaviorSubject('');


  constructor(private http:HttpClient,private spinner:NgxSpinnerService,private router :Router,private localStorage:LocalStorageService) { }

  ngOnInit() {
    this.countNotification();
    this.router.navigate(['/home/profiles']);

  }
  


  // loadAllProfiles(){
  //   let limit = 1000;
  //   let start = 0;
  //   this.spinner.show();
  //
  //   const url = 'http://localhost:8080/api/users/profile?limit='+limit+'&start='+start;
  //   this.http.get(url,{responseType: 'text'}).subscribe((data)=>{
  //     this.users=data;
  //     this.spinner.hide();
  //   });
  //
  //
  // }

  countNotification(){

    const url$ = this.http.get('http://localhost:8080/api/count/users/online',{responseType:'text'});

    this.loading$.pipe(
        switchMap(_ => timer(0, 1000).pipe(
          concatMap(_ => url$),
          map((response: any) => {
              this.countNotifications =response;

                return response;
          })
         ).pipe(filter(data => data.generated===true))
        .pipe(take(1))
         )
       )
       .subscribe((data:any)=>{  console.log(data);this.countNotification=data});

  }



  loadOnlineUsers(){

    const url$ = this.http.get('http://localhost:8080/api/count/users/online');
    // Observable.interval(1500)
    //     .switchMap(() => url$
    //     .map((data) => data.json().Data)
    //     .takeWhile((data) => data.InProgress)
    //     .subscribe(
    //     (data) => {
    //       this.onlineUsers = data;
    //     },
    //     error => {console.log(error)});
      

    this.loading$.pipe(
        switchMap(_ => timer(0, 2000).pipe(
          concatMap(_ => url$),
          map((response: any) => {
            console.log(response);
            this.onlineUsers=response;
            console.log(this.onlineUsers);
                return response;
          })
         ).pipe(filter(data => data.generated===true))
        .pipe(take(1))
         )
       )
       .subscribe((data:any)=>{ this.onlineUsers=data});



    // const onlineUsersUrl="http://localhost:8080/api/count/users/online";
    // this.http.get(onlineUsersUrl,{responseType:'text'}).subscribe((data)=>{
    //   this.onlineUsers = data;
    //   console.log(data);
    // });
  }



}

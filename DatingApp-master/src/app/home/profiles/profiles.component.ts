
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgxSpinnerModule, NgxSpinnerService } from 'ngx-spinner';
import { BehaviorSubject, timer } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap, concatMap, map, filter, take } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Subscription } from 'rxjs';
import { fromEvent } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-profiles',
  templateUrl: './profiles.component.html',
  styleUrls: ['./profiles.component.css']
})
export class ProfilesComponent implements OnInit {
  notEmptyPost=true;
  notScrolly=true;
  onlineUsers:any;
  users;
  notification:any;
  loading$ = new BehaviorSubject('');
  onlineEvent: Observable<Event>;
  offlineEvent: Observable<Event>;
  subscriptions: Subscription[] = [];
  
  constructor(private http:HttpClient,private spinner:NgxSpinnerService,private toaster:ToastrService) { }

  ngOnInit() {
    // this.loadAllProfiles();
    this.loadOnlineUsers();
    this.loadAllProfiles();
    this.checkOnlineStatus();

  }


  loadAllProfiles(){
    this.spinner.show();
    const url = 'http://localhost:8080/api/user/all';
    this.http.get(url,{responseType: 'json'}).subscribe((data)=>{
      this.users=data;
      this.spinner.hide();
    });


  }


  loadOnlineUsers(){

    const url$ = this.http.get('http://localhost:8080/api/count/users/online');

    this.loading$.pipe(
        switchMap(_ => timer(0, 2000).pipe(
          concatMap(_ => url$),
          map((response: any) => {

            this.onlineUsers=response;
                return response;
          })
         ).pipe(filter(data => data.generated===true))
        .pipe(take(1))
         )
       )
       .subscribe((data:any)=>{ this.onlineUsers=data});



    const onlineUsersUrl='http://localhost:8080/api/count/users/online';
    this.http.get(onlineUsersUrl,{responseType:'text'}).subscribe((data)=>{
      this.onlineUsers = data;
      console.log(data);
    });
  }



  onScroll(){
    if(this.notScrolly && this.notEmptyPost){
      this.spinner.show();
      this.notScrolly=false;
      this.loadAllProfiles();
    }

}

checkOnlineStatus = () => {
  this.onlineEvent = fromEvent(window, 'online');
  this.offlineEvent = fromEvent(window, 'offline');

  this.subscriptions.push(this.onlineEvent.subscribe(() =>{ this.toaster.success('Connected!'); console.log('connected')}));
  this.subscriptions.push(this.offlineEvent.subscribe(() => this.toaster.error('Check Connectivity!')));
}



}
export interface ServerResponse{
  generated: boolean
}

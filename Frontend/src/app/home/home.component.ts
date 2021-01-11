import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgxSpinnerModule, NgxSpinnerService } from 'ngx-spinner';

import { concatMap, map, switchMap, filter, take} from 'rxjs/operators';
import { timer, BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})




export class HomeComponent implements OnInit {
  notEmptyPost=true;
  notScrolly=true;
  notEmptyRooms=true;
  notScrollRooms=true;
  allpost:any=[];
  onlineUsers:any;
  rooms:any=[];
  users:any ;

  loading$ = new BehaviorSubject('');

  constructor(private http:HttpClient,private spinner:NgxSpinnerService) { }

  ngOnInit() {
    this.loadAllProfiles();
    this.loadOnlineUsers();

    
  }


  loadAllProfiles(){
    var limit = 1000;
    var start = 0;

    
    const url = "http://localhost:8080/api/users/profile?limit="+limit+"&start="+start;
    this.http.get(url,{responseType: 'text'}).subscribe((data)=>{
      this.users=data;
    });
  
   
  }
  

  loadOnlineUsers(){
    
    const url$ = this.http.get('http://localhost:8080/api/count/users/online'); 

    
    this.loading$.pipe(         
        switchMap(_ => timer(0, 3000).pipe( 
          concatMap(_ => url$),           
          map((response: ServerResponse) => {            
                return response;
          })
         ).pipe(filter(data => data.generated===true))                  
        .pipe(take(1))
         )
       )
       .subscribe((data)=>{ this.onlineUsers=data});

    // const onlineUsersUrl="http://localhost:8080/api/count/users/online";
    // this.http.get(onlineUsersUrl,{responseType:'text'}).subscribe((data)=>{
    //   this.onlineUsers = data;
    //   console.log(data);
    // });
  }


  onScroll(){
    if(this.notScrolly && this.notEmptyPost){
      this.spinner.show();
      this.notScrolly=false;
      this.loadAllProfiles();
    }


    
  }



  








}
export interface ServerResponse{
  generated: boolean
}
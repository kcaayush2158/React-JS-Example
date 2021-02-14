import { HttpClient } from '@angular/common/http';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Component, OnInit } from '@angular/core';
import { NgxSpinnerModule, NgxSpinnerService } from 'ngx-spinner';


@Component({
  selector: 'app-rooms',
  templateUrl: './rooms.component.html',
  styleUrls: ['./rooms.component.css']
})
export class RoomsComponent implements OnInit {
  notEmptyPost=true;
  notScrolly=true;
  notEmptyRooms=true;
  notScrollRooms=true;

  allRooms:any=[];
  myRooms:any=[];
  constructor(private http:HttpClient,private spinner:NgxSpinnerService) { }

  ngOnInit() {
    this.loadChatRooms();

  }


  // onScrollChatRooms(){
  //   if(this.notScrolly && this.notEmptyPost){
  //     this.spinner.show();
  //     this.notScrolly=false;
  //   }





  loadChatRooms(){
    const url = 'http://localhost:8080/api/chatrooms/all';
    //return the last post from the array
    this.http.get(url)
      .subscribe((data:any) =>{

        this.allRooms=data;
      //   const newPost = data[0];
      //   this.spinner.hide();
      //   if(newPost.length === 0){
      //     this.notEmptyPost=false;
      //   }
      // this.rooms = this.rooms.concat(newPost);
      // this.notScrollRooms=true;
      });
      
  };
}

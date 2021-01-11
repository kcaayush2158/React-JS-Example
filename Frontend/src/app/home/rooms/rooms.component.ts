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
  allpost:any=[];
  rooms:any=[];
  constructor(private http:HttpClient,private spinner:NgxSpinnerService) { }

  ngOnInit() {
    this.loadAllProfiles();

  }

  loadAllProfiles(){
    const url = 'http://localhost:8080/api/chatrooms/shoutout/all';
    this.http.get(url).subscribe(data=>this.allpost=data);
  }

  onScroll(){
    if(this.notScrolly && this.notEmptyPost){
      this.spinner.show();
      this.notScrolly=false;
      this.loadNextPost();
    }

  }
  onScrollChatRooms(){
    if(this.notScrolly && this.notEmptyPost){
      this.spinner.show();
      this.notScrolly=false;

    }

  }
  loadNextPost(){
    const url = 'http://localhost:8080/api/chatrooms/shoutout/all';
    //return the last post from the array
    const lastPost = this.allpost[this.allpost.length - 1 ];
    const lastPostId= lastPost.id;

    const dataToSend = new FormData();

    dataToSend.append('id',lastPostId);
    //call the htpp request
    this.http.get(url)
      .subscribe((data:any) =>{
        const newPost = data[0];
        this.spinner.hide();
        if(newPost.length === 0){
          this.notEmptyPost=false;
        }
      this.allpost = this.allpost.concat(newPost);
      this.notScrolly=true;
      });
  };


  // loadChatRooms(){
  //   const url = 'http://localhost:8082/api/chatrooms/all';
  //   //return the last post from the array
  //   const lastPost = this.rooms[this.rooms.length - 1 ];
  //   const lastPostId= lastPost.id;

  //   const dataToSend = new FormData();

  //   dataToSend.append('id',lastPostId);
  //   //call the htpp request
  //   this.http.get(url)
  //     .subscribe((data:any) =>{
  //       const newPost = data[0];
  //       this.spinner.hide();
  //       if(newPost.length === 0){
  //         this.notEmptyPost=false;
  //       }
  //     this.rooms = this.rooms.concat(newPost);
  //     this.notScrollRooms=true;
  //     });
  // };
}

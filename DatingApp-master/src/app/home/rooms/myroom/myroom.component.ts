
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgxSpinnerModule, NgxSpinnerService } from 'ngx-spinner';
import { BehaviorSubject, Observable, timer } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap, concatMap, map, filter, take } from 'rxjs/operators';
import { LocalStorageService } from 'ngx-webstorage';
import { ToastrService } from 'ngx-toastr';
import { Chatroom } from 'src/app/user';
@Component({
  selector: 'app-myroom',
  templateUrl: './myroom.component.html',
  styleUrls: ['./myroom.component.css']
})
export class MyroomComponent implements OnInit {
  chatRoomId: string;
  chatroom = new Chatroom();
  myRooms: any = [];
  user: any = [];
  myRoomsCount: string;
  $loading = new BehaviorSubject('');
  text:any;
  
  constructor(private http: HttpClient, private activatedRouter: ActivatedRoute, private toastr: ToastrService, private spinner: NgxSpinnerService, private route: Router, private localStorage: LocalStorageService) { }

  ngOnInit(): void {
    this.loadMyChatRooms();
    this.user = this.localStorage.retrieve("user");
    this.countMyRoom();
    this.chatRoomId = this.activatedRouter.snapshot["chatRoomId"];
  }

  loadMyChatRooms() {
    this.spinner.show();
    this.user = this.localStorage.retrieve("user");
    const url = 'http://localhost:8080/api/my/chatroom?email=' + this.user.email;
    this.http.get(url, { responseType: 'json' })
      .subscribe((data) => {
        this.myRooms = data;
        this.spinner.hide();
      }, (err) => {
        console.log("Error")
        this.toastr.error('error', 'Unable to load room');
      });
  }

  deleteChatRoom(id: number)  {
    var url = "http://localhost:8080/api/chatroom/" + id + "/delete";
    this.spinner.show();
    this.http.post(url, {}).subscribe((data) => {
      if (data == 1) {
        this.toastr.success('success', 'Chat room is deleted successfully');
        this.loadMyChatRooms();
      }else{
        this.toastr.error('error', 'Unable to delete the Chat Room');
        this.loadMyChatRooms();
      }
      this.spinner.hide();

    });


  }


  countMyRoom() {
    const user = this.localStorage.retrieve('user');
    const url = this.http.get('http://localhost:8080/api/chatroom/my/count?email=' + user.email, { responseType: 'text' });
    console.log(url);
    this.$loading.pipe(
      switchMap(_ => timer(0, 100000).pipe(
        concatMap(_ => url),
        map((response: any) => {
          this.myRoomsCount = response;
          console.log(response);
          return response;
        })
      ).pipe(filter(data => data.generated == true))
        .pipe(take(1))
      )).subscribe((data) => {

        this.myRoomsCount = data;
      });

  }

  


}


import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import {Component, Input, OnInit} from '@angular/core';
import { NgxSpinnerModule, NgxSpinnerService } from 'ngx-spinner';
import { BehaviorSubject, Observable, timer } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap, concatMap, map, filter, take } from 'rxjs/operators';
// search module
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { Chatroom } from 'src/app/user';
import { LocalStorageService } from 'ngx-webstorage';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { ToastrService } from 'ngx-toastr';
import { ToastrModule } from 'ngx-toastr';
import { interval } from 'rxjs/internal/observable/interval';
import { startWith } from 'rxjs/operators';
import { FormBuilder, FormControl, FormGroup, FormsModule, Validators } from '@angular/forms';


@Component({
  selector: 'app-rooms',
  templateUrl: './rooms.component.html',
  styleUrls: ['./rooms.component.css']
})



export class RoomsComponent implements OnInit {
  chatRoomId:number;
  currentItem ;
  loadShoutOut: any = [];
  myRoomsCount: string;
  currentMsgToChild1 = '' ;
  allRoomsCount: any;
  createRoomForm: FormGroup;

  room = new Chatroom();
  $loading = new BehaviorSubject('');
  createChatrom: any = [];
  user: any = [];

  notEmptyPost = true;
  notscrolly = true;
  term = '';
  @Input()
  maxNumberOfCharacters = 255;
  counter = true;

  numberOfCharacters1 = 0;
  numberOfCharacters2 = 0;
  message = {
    textValue: ''
  };


  constructor(private http: HttpClient, private formBuilder: FormBuilder, private forms: FormsModule, private toaster: ToastrService, private spinner: NgxSpinnerService, private toastr: ToastrService, private route: Router, private activatedRouter: ActivatedRoute, private localStorage: LocalStorageService) {

  }

  ngOnInit() {
    this.route.navigate(['/rooms/all-rooms']);
    this.user = this.localStorage.retrieve('user');
    this.loadShoutOuts();

  


  }


  onModelChange(textValue: string): void {
    this.numberOfCharacters2 = textValue.length;
  }

  onActivate(componentReference) {
    console.log(componentReference)
    componentReference.anyFunction();
 }



  onScroll() {
    if (this.notscrolly && this.notEmptyPost) {
      this.spinner.show();
      this.notscrolly = false;
      this.loadShoutOuts();
      console.log('scrolled');
    }
  }


  loadShoutOuts() {


    const url = 'http://localhost:8080/api/chatrooms/shoutout/all';
    interval(1000)
      .pipe(
        startWith(0),
        switchMap(() =>
          this.http.get(url, { responseType: 'json' })
        )
      )
      .subscribe(res => {
        this.loadShoutOut = res;
        this.loadNextPost();
        console.log('scrolled');
       })  ;
  }
  loadNextPost() {
    const url = 'http://localhost:8080/api/chatrooms/shoutout/all';
    // return last post from the array
    const lastPost = this.loadShoutOut[this.loadShoutOut.length - 1];
    // get id of last post
    const lastPostId = lastPost.id;
    // sent this id as key value pare using formdata()
    const dataToSend = new FormData();
    dataToSend.append('id', lastPostId);
    // call http request

    this.http.post(url, dataToSend)
      .subscribe( (data: any) => {
        console.log("Data"+ data);
        const newPost = data[0];
        this.spinner.hide();
        if (newPost.length === 0 ) {
          this.notEmptyPost =  false;
        }

        // add newly fetched posts to the existing post
        this.loadShoutOut = this.loadShoutOut.concat(newPost);
        this.notscrolly = true;
      });
  }
  createShoutOuts() {

    const user = this.localStorage.retrieve('user');
    const url = 'http://localhost:8080/api/chatrooms/shoutout/save?email='+user.email+'&message='+this.message.textValue;
 
    this.http.post(url,{}).subscribe((data) => {
      this.toaster.success('success', 'Shout Out done');
      this.loadShoutOut();

    });
  }


  deleteShoutout(id : number){
    const users = this.localStorage.retrieve('user');
    this.spinner.show();
    const url = 'http://localhost:8080/api/chatrooms/shoutout/delete?id='+id;
    this.http.post(url,{}).subscribe((data) => {
      this.spinner.hide();
      this.toastr.success('successs','Message deleted');
    }
    )
  }



}

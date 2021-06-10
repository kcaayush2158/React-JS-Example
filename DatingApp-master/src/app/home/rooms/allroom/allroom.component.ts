import {Component, Input, OnInit} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NgxSpinnerService } from 'ngx-spinner';
import { BehaviorSubject, interval, timer } from 'rxjs';
import { concatMap, filter, map, switchMap, take } from 'rxjs/operators';
import { startWith } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LocalStorageService } from 'ngx-webstorage';

@Component({
  selector: 'app-allroom',
  templateUrl: './allroom.component.html',
  styleUrls: ['./allroom.component.css']
})
export class AllroomComponent implements OnInit {
  @Input() searchText = '';
    allRooms: any=[];
    allRoomsCount;
    myRoomsCount: string;
    $loading = new BehaviorSubject('');
    text:any;
    createRoomForm:FormGroup;
  constructor(private http:HttpClient,private localStorage: LocalStorageService,private spinner:NgxSpinnerService ,private toastr :ToastrService,private formBuilder :FormBuilder) {

    
    this.createRoomForm = this.formBuilder.group({
      chatRoomName: ['', [Validators.required, Validators.minLength(5), Validators.required, Validators.maxLength(20)]],
      roomDescription: ['', [Validators.required, Validators.minLength(20), Validators.required, Validators.maxLength(100)]],
      roomType: ['', [Validators.required]],
      password: ['', [Validators.required, Validators.minLength(5), Validators.required, Validators.maxLength(20)]],
    });


  }

  get registerFormControl() {
    return this.createRoomForm.controls;
  }


  get chatRoomName() {
    return this.createRoomForm.get('chatRoomName');
  }

  get roomDescription() {
    return this.createRoomForm.get('roomDescription');
  }

  get roomType() {
    return this.createRoomForm.get('roomType');
  }

  get password() {
    return this.createRoomForm.get('password');
  }



  onActivate(componentReference) {
    console.log(componentReference)
    componentReference.anyFunction();
 }

  ngOnInit(): void {
    this.loadChatRooms();
    this.countMyRoom();
    this.text = this.searchText;
    console.log(this.searchText);

  }
  createChatroom() {
    // const params = new HttpParams()
    //   .set('chatRoomName', this.chatroom.chatRoomName)
    //   .set('password', this.chatroom.password)
    //   .set('chatRoomDescription', this.chatroom.chatRoomDescription)
    //   .set('roomType', this.chatroom.roomType);


    const users = this.localStorage.retrieve('user');
    const url = 'http://localhost:8080/api/chatroom/create?chatRoomName='+this.chatRoomName.value +'&roomDescription='+this.roomDescription.value+'&roomType='+this.roomType.value+'&password='+this.password.value+'&email='+users.email;

    const headers = { 'content-type': 'application/json' }

    this.http.post(url,{headers}).subscribe((data) => {
      console.log(data);
      this.spinner.show();
   
    }
    )
  }
  
  loadChatRooms() {
    this.spinner.show();
    const url = 'http://localhost:8080/api/chatrooms/all';

    interval(20000)
    .pipe(
      startWith(0),
      switchMap(() =>    this.http.get(url,{responseType:'json'}))
     ).subscribe((data) =>{

      this.allRoomsCount = data;
       this.allRooms =data;
       this.spinner.hide();
       this.toastr.success('success','Room refreshed');
    },(err)=>{
        console.log('Error')
        this.toastr.error('error','Unable to load room');
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


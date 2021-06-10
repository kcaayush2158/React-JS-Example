import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { LocalStorageService } from 'ngx-webstorage';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';




@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.css']
})
export class MessageComponent implements OnInit {

  user:any;
  users: any =[];
  userId;
  roomId;
  username='';
  privateMessages:any =[];
  authenticatedUser ;
  public show = false;
  public buttonName:any = 'Show';

  search :any;
  message='';

id:any;

public baseurl = 'http://localhost:8080';
  public enableChatBox = false;

  // tslint:disable-next-line: max-line-length
  constructor(private http: HttpClient, private activatedRouter: ActivatedRoute, private toastr: ToastrService, private spinner: NgxSpinnerService, private route: Router, private localStorage: LocalStorageService) { }

  ngOnInit(): void {

    this.user = this.localStorage.retrieve('user');
    this.authenticatedUser = this.user.username;
    this.loadMessage();
    this.showChatBox();
  }

  loadMessage() {
    this.spinner.show();
    this.user = this.localStorage.retrieve('user');
    const url = this.baseurl+'/api/direct/inbox?email=' + this.user.email;
    this.http.get(url, { responseType: 'json' })
      .subscribe((data) => {
        this.users = data;
        this.spinner.hide();
        this.loadPrivateMessages(this.id, this.users.conversation.roomId)

      }, (err) => {

        this.toastr.error('error', 'Unable to load room');
      });
  }


  showChatBox(){
    // this.id$ = this.activatedRouter.paramMap.pipe(map(paramMap => paramMap.get('id')));
    this.show = !this.show;
    this.activatedRouter.params.subscribe((data)=>{
      this.id= this.activatedRouter.snapshot.paramMap.get('id');
      this.roomId= this.activatedRouter.snapshot.paramMap.get('roomId');
      this.loadPrivateMessages(this.id,this.roomId);

    });
  }

  loadPrivateMessages(userid :number ,uuid:any){

      const url = this.baseurl+'/api/direct/all?userId='+this.id+'&email='+this.user.email+'&uuid='+uuid;
      this.spinner.show();
      console.log(url);
      this.http.get(url).subscribe((data)=>{
        this.toastr.success('success','conversation ')
        this.privateMessages = data;
        this.spinner.hide();
        this.username= this.privateMessages.conversation.receiver.username;
    },(err)=>this.toastr.error('error','unable to fetch message'));
  }

  sendPrivateMessage(){
    const url = this.baseurl+'/api/direct/u/'+this.id+'/send?message='+this.message+'&email='+this.user.email+'&roomId='+this.roomId;
    this.spinner.show();
    console.log(url);
    this.http.post(url,{}).subscribe((data)=>{
      this.toastr.success('success','Message send ')
     this.loadPrivateMessages(this.id,this.roomId)
     this.loadMessage();
      // this.privateMessages = data;
   this.spinner.hide();
  },(err)=>this.toastr.error('error','Unable to send message'));


  }

  deleteUser(id : number ){
    const url = this.baseurl+'/api/private/user/delete?id='+id;
    this.spinner.show();
    this.http.post(url,{}).subscribe(()=>{
        this.spinner.hide();

        this.loadMessage();
    },(err)=>{this.toastr.error('error','Unable to delete message'); this.spinner.hide()});
  }

  deleteUserMessage(id : number ){
    const user = this.localStorage.retrieve('user');
    const url = this.baseurl+'/api/private/message/delete?id='+id+'&email='+user.email;
    this.spinner.show();
    this.http.post(url,{}).subscribe(()=>{
        this.spinner.hide();

        this.showChatBox();

    },(err)=>{this.toastr.error('error','Unable to delete message'); this.spinner.hide()});
  }
}

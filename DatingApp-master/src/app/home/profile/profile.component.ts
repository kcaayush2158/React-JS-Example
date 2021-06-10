import { HttpClient } from '@angular/common/http';
import { Component, Inject, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgxFileUploadStorage, NgxFileUploadFactory, NgxFileUploadOptions, NgxFileUploadRequest } from '@ngx-file-upload/core';
import { EventEmitter } from 'events';

import { OwlOptions } from 'ngx-owl-carousel-o';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { LocalStorageService } from 'ngx-webstorage';
import { LikesComponent } from '../likes/likes.component';
import { Topics } from './topics';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  photoes:any =[];
  user;
  totalLikes;
  topicQuestion='';
  topicAnswer='';
  totalLike;
  userForm :FormGroup;

  public uploads: NgxFileUploadRequest[] = [];
  private storage: NgxFileUploadStorage;
  private uploadOptions: NgxFileUploadOptions;


  @Input() formTopic:FormGroup;
  @Output() formChange: EventEmitter = new EventEmitter()

  topicName='';
  topics:any=[];
  baseUrl = 'http://localhost:8080/api';

  get registerFormControl() {
    return this.userForm.controls;
  }

 

  get firstname() {
    return this.userForm.get('firstname');
  }
  get lastname() {
    return this.userForm.get('lastname');
  }
  get bio() {
    return this.userForm.get('bio');
  }
  get username() {
    return this.userForm.get('username');
  }

  get password() {
    return this.userForm.get('password');
  }

  get email() {
    return this.userForm.get('email');
  }

  get relationship() {
    return this.userForm.get('relationship');
  }
  get known() {
    return this.userForm.get('known');
  }
  get workAs() {
    return this.userForm.get('workAs');
  }
  get lookingFor() {
    return this.userForm.get('lookingFor');
  }
  get haveKids() {
    return this.userForm.get('haveKids');
  }
  get height() {
    return this.userForm.get('height');
  }
  get smoke() {
    return this.userForm.get('smoke');
  }
  get drink() {
    return this.userForm.get('drink');
  }
  get languages() {
    return this.userForm.get('languages');
  }
  get hair() {
    return this.userForm.get('hair');
  }
  get repassword() {
    return this.userForm.get('repassword');
  }
  get eyes() {
    return this.userForm.get('eyes');
  }


  // tslint:disable-next-line: max-line-length
  constructor(@Inject(NgxFileUploadFactory) private uploadFactory: NgxFileUploadFactory,private formBuilder :FormBuilder,private http: HttpClient,private toastr :ToastrService, private spinner: NgxSpinnerService,private localStorage:LocalStorageService) {

    this.storage = new NgxFileUploadStorage({
      concurrentUploads: 2,
      autoStart: true,
      removeCompleted: 5000 // remove completed after 5 seconds
    });

    this.userForm = this.formBuilder.group({
      username: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(20)]],
      gender: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(20)]],
      education: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(20)]],
      country: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(20)]],
      bio:['', [Validators.required, Validators.minLength(6),  Validators.maxLength(20)]],
      password: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(20)]],
      email:['', [Validators.required, Validators.minLength(5),Validators.maxLength(20)]],
      firstname:['', [Validators.required,Validators.minLength(5),  Validators.maxLength(20)]],
      lastname:['', [Validators.required, Validators.minLength(5),  Validators.maxLength(20)]],
      bodyType:['', [Validators.required]],
      height:['', [Validators.required]],
      eyes:['', [Validators.required]],
      hair:['', [Validators.required]],
      interests:['', [Validators.required]],
      age:['', [Validators.required]],
      languages:['', [Validators.required]],
      relationship:['', [Validators.required]],
      known:['', [Validators.required]],
      workAs:['', [Validators.required]],
      lookingFor:['', [Validators.required,Validators.minLength(40),  Validators.maxLength(300)]],
      haveKids:['', [Validators.required]],
      smoke:['', [Validators.required]],
      drink:['', [Validators.required, Validators.minLength(5),  Validators.maxLength(20)]],
    });
    this.uploadOptions = {url: 'http://localhost:8080/user/p/upload'};
  }

  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: false,
    touchDrag: false,
    pullDrag: false,
    dots: false,
    navSpeed: 700,
    navText: ['', ''],
    responsive: {
      0: {
        items: 1
      },
      400: {
        items: 2
      },
      740: {
        items: 3
      },
      940: {
        items: 4
      }
    },
    nav: true
  }



  ngOnInit() {

    this.storage.change()
        .subscribe(uploads => this.uploads = uploads);

    // this.formChange.emit(this.formTopic)


    // this.formTopic = this.formBuilder.group({
    //   topicName: ['', [Validators.required] ],
    //   topicQuestion : ['', [Validators.required,]],
    //   topicAnswer: ['', [Validators.required, Validators.minLength(100), Validators.maxLength(250)]],
    // });


    this.user= this.localStorage.retrieve('user');
    this.loadTopic();

    this.loadAuthenticatedUserPhotoes();


    // if(this.eventEmmitter.subsVar == undefined){
    //   this.eventEmmitter.subsVar == this.eventEmmitter.countLikesFunction.subscribe((likes:any)=>{
    //     console.log(likes);
    //     this.countLikes(likes);

    //   })
    // }


  }


  public onSelect(event) {
    const addedFiles: File[] = event.addedFiles;

    if (addedFiles.length) {
      const uploads = this.uploadFactory.createUploadRequest(addedFiles, this.uploadOptions);
      this.storage.add(uploads);
    }
  }

  public onRemove(upload: NgxFileUploadRequest) {
    this.storage.remove(upload);
  }


  // onChanges(): void {
  //   console.log('MyForm > onChanges', this.formTopic.value)
  //   this.formTopic.valueChanges.subscribe(value=>{
  //     this.formChange.emit(this.formTopic)
  //   })
  // }

countLikes(likes:any){
  this.totalLikes= likes;
  console.log(this.totalLikes);

}
  loadAuthenticatedUserPhotoes(){
//  this.spinner.show();
//   const user= this.localStorage.retrieve('user');

//      var url = "http://localhost:8080/api/principal/user/photo?email="+user.email;
//      this.http.get(url).subscribe((data)=>{
//        this.spinner.hide();

//        this.photoes = data;
//        console.log(data);
//      });
   }


deletePhoto(id:number){

  const url = this.baseUrl+'/photos/'+id +'/delete?email='+this.user.email;
  this.http.get(url).subscribe((data)=>{
    this.spinner.hide();
    this.photoes = data;
  });
}
saveUser(){

  const url = this.baseUrl +'/aboutme/save?';
  
}
loadTopic(){

  this.http.get('/topic/all?id='+this.user.id,{responseType:'json'}).subscribe((data)=>{
    this.topics =data;
  })
}


saveTopic(){
  this.http.post('/topic/save?id='+this.user.id+'&topicName='+this.topicName+'&topicQuestion='+this.topicQuestion+'&topicAnswer='+this.topicAnswer,{})
  .subscribe((data)=>{
  console.log(data);
  this.toastr.success('success','Topic added');
  this.loadTopic();
  },(err)=>{  this.toastr.error('error','Topic Already existed')});
}

deleteTopic(id:number){

  this.http.post(this.baseUrl+'topic/delete?id='+id,{})
    .subscribe((data)=>{
      this.toastr.success('success','Topic deleted successfully');
      this.loadTopic();
  });

}


sendMessage(id:number){

  const  url=this.baseUrl+'/v1/likes/save?id='+id;

  this.http.post(url,{}).subscribe((data)=>{
    this.toastr.success('success','Intro has been sent successfully');
    const countlikeUrl = this.baseUrl+'/v1/likes/users/count';
    this.http.get(countlikeUrl).subscribe((response)=>{
      this.toastr.success('sucess','');
    })
  } ,(error) =>this.toastr.error('unbale to send message'));
}

sendLike(id:number){
 const  url='/api/direct/inbox/user/'+ id+'/send';
  this.http.post(url,{}).subscribe((data)=>{
    this.toastr.success('success','Intro has been sent successfully');


  } );
}
}


import { HttpClient, HttpEvent, HttpRequest } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ImageCroppedEvent } from 'ngx-image-cropper';
import { NgxSpinnerService } from 'ngx-spinner';
import { NgxSpinner } from 'ngx-spinner/lib/ngx-spinner.enum';
import { ToastrService } from 'ngx-toastr';
import { LocalStorageService } from 'ngx-webstorage';
import { Observable } from 'rxjs';
import { FileuploadService } from './fileupload.service';

@Component({
  selector: 'app-images',
  templateUrl: './images.component.html',
  styleUrls: ['./images.component.css']
})
export class ImagesComponent implements OnInit {
  user;
  imageChangedEvent: any = '';
  croppedImage: any = '';
    photos:any=[];
   
selectedFiles: FileList;
  currentFileUpload: File;
  progress: { percentage: number } = { percentage: 0 };
  selectedFile = null;
  changeImage = false;
  file:string;



  constructor(private httpClient :HttpClient,private toastr:ToastrService,private fileUploadService : FileuploadService ,private localStorage:LocalStorageService,private spinner :NgxSpinnerService) { }

  ngOnInit(): void {
    this.user= this.localStorage.retrieve('user');
    this.loadPhotos();
  }


  loadPhotos(){
    this.spinner.show();
   
    var url = "http://localhost:8080/api/principal/user/photo?email="+this.user.email;
    this.httpClient.get(url).subscribe((data)=>{
      this.photos=data;
      console.log(data);
      this.spinner.hide();
    })


  }

  // onFileSelected(event){
  //   this.selectedFile = <File> event.target.files[0];
  // }



  upload() {
    this.progress.percentage = 0;
    this.currentFileUpload = this.selectedFiles.item(0);

    this.fileUploadService.pushFileToStorage(this.currentFileUpload).subscribe(event => {
      this.selectedFiles = undefined;
      this.toastr.success('File upload Succesfully');
    });
  }


  selectFile(event) {
    this.selectedFiles = event.target.files;
  }
  change(event) {
    this.changeImage = true;
  }
  changedImage(event) {
    this.selectedFile = event.target.files[0];
  }


  // onUpload(){
  //   console.log(this.user.email);
  //   const url = "http://localhost:8080/user/p/upload?email="+this.user.email;

  //   // const request = new HttpRequest('POST',url,FormData: {
  //   //   reportProgress:true,
  //   //   responseType:'text'
  //   // })


  // }


    // fileChangeEvent(event: any): void {
    //     this.imageChangedEvent =  event;
    // }

    // imageCropped(event: ImageCroppedEvent) {
    //     this.croppedImage = event.base64;
    // }

    // imageLoaded(image: HTMLImageElement) {
    //     // show cropper
    // }
    // cropperReady() {
    //     // cropper ready
    
    // }
    // loadImageFailed() {
    //     // show message
    // }


}

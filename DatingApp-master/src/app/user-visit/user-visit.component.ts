import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { LocalStorageService } from 'ngx-webstorage';

@Component({
  selector: 'app-user-visit',
  templateUrl: './user-visit.component.html',
  styleUrls: ['./user-visit.component.css']
})
export class UserVisitComponent implements OnInit {

  user: any;
  topics: any = [];
  photos: any = []
  baseUrl = 'http://localhost:8080/api';
  message = '';

  @Input()
  maxNumberOfCharacters = 1000;
  counter = true;

  numberOfCharacters1 = 0;
  numberOfCharacters2 = 0;
  interaction = {
    textValue: ''
  };
  authenticatedUser;

  // tslint:disable-next-line: max-line-length
  constructor(private activatedRoute: ActivatedRoute, private localStorage: LocalStorageService, private spinner: NgxSpinnerService, private http: HttpClient, private toastr: ToastrService) { }


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

  onModelChange(textValue: string): void {
    this.numberOfCharacters2 = textValue.length;
  }

  ngOnInit(): void {
    this.authenticatedUser = this.localStorage.retrieve('user');
    this.activatedRoute.params.subscribe(() => {
      this.user = this.activatedRoute.snapshot.paramMap.get('string');
      this.http.get(this.baseUrl + '/user/' + this.user, { responseType: 'json' }).subscribe((data) => {
        this.user = data;
        this.loadTopic(this.user.id);

      });
    });
  }

  loadPhotos() {
    this.spinner.show();
    const url = this.baseUrl + '/principal/user/photo?email=' + this.user.email;
    this.http.get(url).subscribe((data) => {
      this.photos = data;
      console.log(data);
      this.spinner.hide();
    })
  }

  loadTopic(id: number) {
    this.http.get(this.baseUrl + '/topic/all?id=' + this.user.id, { responseType: 'json' }).subscribe((data) => {
      this.topics = data;
      console.log('success' + this.topics);
    })
  }

  sendMessage(id: number) {
    const url = this.baseUrl+'/direct/u/'+this.user.id+'/send?message='+this.message+'&email='+this.authenticatedUser.email+'&roomId=';
    this.spinner.show();
    this.http.post(url, {}).subscribe(() => {
      this.toastr.success('message is send successfully');
      this.spinner.hide();
    }, (err) => { this.toastr.error('failed to send message'); });
  }


}

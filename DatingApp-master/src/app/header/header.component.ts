import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, timer } from 'rxjs';
import { switchMap, concatMap, map, filter, take } from 'rxjs/operators';
import { AppService } from '../app.service';
import { LocalStorageService } from 'ngx-webstorage';
import { NgxSpinner } from 'ngx-spinner/lib/ngx-spinner.enum';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  countNotification: string;
  _loadNotification = [];
  userNotification: any = [];
  loading$ = new BehaviorSubject('');
  user: any = [];

  constructor(private http: HttpClient, private toastr:ToastrService, private app: AppService, private localStorage: LocalStorageService, private spinner: NgxSpinnerService) {
  }


  ngOnInit(): void {

    this.user = this.localStorage.retrieve('user');
    this.loadCountNotification();

  }


  authenticated() {
    if (this.localStorage.retrieve('user') != null) {
      return true;
    } else {
      return false;
    }

  }

  loadNotification() {
    this.spinner.hide();
    const  user = this.localStorage.retrieve('user');
    this.http.get(`http://localhost:8080/api/notification/all?email=` + user.email, { responseType: 'json' })
      .subscribe((data) => {
        this.spinner.show();
        this.userNotification = data;


        for(let i = 0; i <=this.userNotification.length; i++){
          console.log(this.userNotification[i].id);
          const $url= 'http://localhost:8080/api/notification/read/'+this.userNotification[i].id+'?email='+user.email;
          this.http.post($url,{}).subscribe(()=>{
            this.toastr.success('success','notification read');
              this.loadCountNotification();
              this.spinner.hide();
          });

        }



      });



  }
  loadCountNotification() {

    const $url = this.http.get(`http://localhost:8080/api/count/notification?email=` + this.user.email, { responseType: 'text' });
    $url.subscribe((data) => {
      this.countNotification = data;

    });
  }


}


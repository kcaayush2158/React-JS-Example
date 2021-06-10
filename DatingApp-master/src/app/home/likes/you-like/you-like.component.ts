import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LocalStorageService } from 'ngx-webstorage';

@Component({
  selector: 'app-you-like',
  templateUrl: './you-like.component.html',
  styleUrls: ['./you-like.component.css']
})
export class YouLikeComponent implements OnInit {
  users: any = [];
  constructor(private router: Router, private localStorage: LocalStorageService, private httpClient: HttpClient) { }

  ngOnInit(): void {
    this.loadYouLikeProfiles();
  }

  loadYouLikeProfiles() {
    const principal = this.localStorage.retrieve('user');
    const url = 'http://localhost:8080/api/v1/likes/u/all?email=' + principal.email;
    this.httpClient.get(url, { responseType: 'json' }).subscribe((data) => {
      this.users = data;
      console.log(data);
    });

  }
}

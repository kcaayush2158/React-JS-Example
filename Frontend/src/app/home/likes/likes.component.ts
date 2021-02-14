import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-likes',
  templateUrl: './likes.component.html',
  styleUrls: ['./likes.component.css']
})
export class LikesComponent implements OnInit {


  likes:any=[];
  constructor(private http:HttpClient) { }

  ngOnInit(): void {
    this.loadVisits();
  }

  loadVisits(){
    var url ="http://localhost:8080/api/v1/likes/all";
    this.http.get(url,{responseType: 'json'}).subscribe((data)=>{
      this.likes=data;
      console.log(data);
    });
  
  }

}

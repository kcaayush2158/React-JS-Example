import { Component, OnInit } from '@angular/core';
import { from } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { VisitedUsers } from './visited-user';

@Component({
  selector: 'app-visits',
  templateUrl: './visits.component.html',
  styleUrls: ['./visits.component.css']
})
export class VisitsComponent implements OnInit {
 users:any=[];
  constructor(private http:HttpClient) { }

  ngOnInit(): void {
    this.loadVisits();
  }

  loadVisits(){
    var url ="http://localhost:8080/api/v1/visits";
    this.http.get<VisitedUsers>(url,{responseType:'json'}).subscribe((data)=>{
    this.users=data;
    console.log(data);
    })
  }

}

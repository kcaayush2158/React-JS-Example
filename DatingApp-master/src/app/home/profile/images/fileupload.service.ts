import { HttpClient, HttpEvent, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LocalStorageService } from 'ngx-webstorage';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FileuploadService {


  constructor(private httpClient: HttpClient,private localstorage:LocalStorageService) { }


  pushFileToStorage(file: File): Observable<HttpEvent<{}>> {
    const user = this.localstorage.retrieve('user');
    const url = "http://localhost:8080/user/p/upload?email="+user.email;
    const data: FormData = new FormData();
    data.append('file', file);
    const newRequest = new HttpRequest('POST', url, data, {
      reportProgress: true,
      responseType: 'text'
    });
    return this.httpClient.request(newRequest);
  }

}

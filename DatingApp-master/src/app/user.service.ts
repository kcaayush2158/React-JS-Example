import { Injectable } from '@angular/core';
import {HttpClient, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {User, Usersearch, UserLogin} from './user';
import { HttpHeaders } from '@angular/common/http';
import { HttpClientService } from './http-client.service';
@Injectable({
  providedIn: 'root'
})
export class UserService {



  constructor(private _http: HttpClient) { }
  

  
}

@Injectable()
export class XhrInterceptor implements HttpInterceptor {

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    const xhr = req.clone({
      headers: req.headers.set('X-Requested-With', 'XMLHttpRequest')
    });
    return next.handle(xhr);
  }
}
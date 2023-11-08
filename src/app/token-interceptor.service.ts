import { Injectable } from '@angular/core';
import {HttpEvent, HttpHandler, HttpHeaders, HttpInterceptor, HttpRequest} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class TokenInterceptorService implements HttpInterceptor {

  constructor() { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    let authToken = localStorage.getItem('token')

    authToken = authToken == null ? '' : `Bearer ${authToken}`

    let tokenizedRequest = req.clone({
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Authorization': authToken
      })
    });

    return next.handle(tokenizedRequest)
  }
}

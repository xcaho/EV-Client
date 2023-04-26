import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {EventDto} from "./common/mainpage/EventDto";
import {Observable, throwError } from "rxjs";
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class EventService {

  constructor(private http:HttpClient) { }

  createEvent(event: EventDto): Observable<any> {
    const headers = { "Content-Type": "application/json" };
    const options = { "headers": headers };

    return this.http.post<any>('http://localhost:8080/events', event, options)
      .pipe(
        catchError((error: any) => {
          return throwError(error);
        })
      )
  }

  getEvents(): Observable<any> {
    const headers = { "Content-Type": "application/json" };
    const options = { "headers": headers };

    return this.http.get<any>('http://localhost:8080/events', options)
      .pipe(
        catchError((error: any) => {
          return throwError(error);
        })
      )
  }
}

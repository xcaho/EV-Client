import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {EventDto} from "./common/mainpage/EventDto";
import {Observable, throwError } from "rxjs";
import { catchError } from 'rxjs/operators';
import {Availability, AvailabilityDto} from "./common/mainpage/Availability";

@Injectable({
  providedIn: 'root',
})
export class EventService {

  constructor(private http:HttpClient) { }

  saveAvailabilityList(availability: AvailabilityDto[], eventId: number) {
    const headers = { "Content-Type": "application/json" };
    const options = { "headers": headers };

    return this.http.post<EventDto>('http://localhost:8080/events/'+ eventId +'/availabilities', availability, options)
      .pipe(
        catchError((error: any) => {
          return throwError(error);
        })
      )
  }

  createEvent(event: EventDto): Observable<EventDto> {
    const headers = { "Content-Type": "application/json" };
    const options = { "headers": headers };

    return this.http.post<EventDto>('http://localhost:8080/events', event, options)
      .pipe(
        catchError((error: any) => {
          return throwError(error);
        })
      )
  }

  getEvents(): Observable<EventDto[]> {
    const headers = { "Content-Type": "application/json" };
    const options = { "headers": headers };

    return this.http.get<EventDto[]>('http://localhost:8080/events', options)
      .pipe(
        catchError((error: any) => {
          return throwError(error);
        })
      )
  }
}

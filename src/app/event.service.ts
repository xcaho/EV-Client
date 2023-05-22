import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {EventDto} from "./common/mainpage/EventDto";
import {map, Observable, throwError} from "rxjs";
import {catchError} from 'rxjs/operators';
import {AvailabilityDto} from "./common/mainpage/Availability";

@Injectable({
  providedIn: 'root',
})
export class EventService {

  constructor(private http: HttpClient) {
  }

  saveAvailabilityList(availability: AvailabilityDto[], eventId: number) {
    const headers = {"Content-Type": "application/json"};
    const options = {"headers": headers};

    return this.http.post<EventDto>('http://localhost:8080/events/' + eventId + '/availabilities', availability, options)
      .pipe(
        catchError((error: any) => {
          return throwError(error);
        })
      )
  }

  getAvailabilityList(eventId: number): Observable<AvailabilityDto[]> {
    const headers = {"Content-Type": "application/json"};
    const options = {"headers": headers};

    return this.http.get<AvailabilityDto[]>('http://localhost:8080/events/' + eventId + '/availabilities', options)
      .pipe(
        map(res => res.map(tmp => new AvailabilityDto(tmp.startDate, tmp.endDate))),
        catchError((error: any) => {
          return throwError(error);
        })
      )
  }

  createEvent(event: EventDto): Observable<EventDto> {
    const headers = {"Content-Type": "application/json"};
    const options = {"headers": headers};

    return this.http.post<EventDto>('http://localhost:8080/events', event, options)
      .pipe(
        catchError((error: any) => {
          return throwError(error);
        })
      )
  }

  getEvents(): Observable<EventDto[]> {
    const headers = {"Content-Type": "application/json"};
    const options = {"headers": headers};

    return this.http.get<EventDto[]>('http://localhost:8080/events', options)
      .pipe(
        catchError((error: any) => {
          return throwError(error);
        })
      )
  }

  getEvent(id: number): Observable<EventDto> {
    const headers = {"Content-Type": "application/json"};
    const options = {"headers": headers};

    return this.http.get<EventDto>('http://localhost:8080/events/' + id, options)
      .pipe(
        catchError((error: any) => {
          return throwError(error);
        })
      )
  }
}

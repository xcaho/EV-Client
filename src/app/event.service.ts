import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {EventDto} from "./common/mainpage/EventDto";
import {map, Observable, throwError} from "rxjs";
import {catchError} from 'rxjs/operators';
import {environment} from "../environments/environment";

@Injectable({
  providedIn: 'root',
})
export class EventService {

  temporaryEvent?: EventDto

  apiUrl: string = environment.apiUrl

  constructor(private http: HttpClient) {
  }

  createEvent(event: EventDto): Observable<EventDto> {
    const headers = {"Content-Type": "application/json"};
    const options = {"headers": headers};

    return this.http.post<EventDto>(this.apiUrl + '/events', event, options)
      .pipe(
        catchError((error: any) => {
          return throwError(error);
        })
      )
  }

  modifyEvent(event: EventDto): Observable<EventDto> {
    const headers = {"Content-Type": "application/json"};
    const options = {"headers": headers};

    return this.http.patch<EventDto>(this.apiUrl + '/events/' + event.id, event, options)
      .pipe(
        catchError((error: any) => {
          return throwError(error);
        })
      )
  }

  getEvents(): Observable<EventDto[]> {
    const headers = {"Content-Type": "application/json"};
    const options = {"headers": headers};

    return this.http.get<EventDto[]>(this.apiUrl + '/events', options)
      .pipe(
        map(events => events.map(event => new EventDto(
          event.name,
          event.description,
          event.researchStartDate,
          event.researchEndDate,
          event.endDate,
          event.maxUsers,
          event.surveyDuration,
          event.surveyBreakTime,
          event.slotsTaken,
          event.id,
          event.active
        ))),
        catchError((error: any) => {
          return throwError(error);
        })
      )
  }

  getEvent(id: number): Observable<EventDto> {
    const headers = {"Content-Type": "application/json"};
    const options = {"headers": headers};

    return this.http.get<EventDto>(this.apiUrl + '/events/' + id, options)
      .pipe(
        catchError((error: any) => {
          return throwError(error);
        })
      )
  }

  getTemporaryEvent(): EventDto {
    return <EventDto>this.temporaryEvent;
  }

  setTemporaryEvent(event: EventDto) {
    this.temporaryEvent = event
  }

  clearTemporaryEvent() {
    this.temporaryEvent = undefined
  }
}

import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {EventDto} from "./shared/dtos/EventDto";
import {map, Observable, throwError} from "rxjs";
import {catchError} from 'rxjs/operators';
import {environment} from "../environments/environment";
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root',
})
export class EventService {

  isEdit: boolean = false

  temporaryEvent?: EventDto

  apiUrl: string = environment.apiUrl

  constructor(private http: HttpClient) {
  }

  createEvent(event: EventDto): Observable<EventDto> {

    return this.http.post<EventDto>(this.apiUrl + '/events', event)
      .pipe(
        catchError((error: any) => {
          return throwError(error);
        })
      )
  }

  modifyEvent(event: EventDto): Observable<EventDto> {

    return this.http.patch<EventDto>(this.apiUrl + '/events/' + event.id, event)
      .pipe(
        catchError((error: any) => {
          return throwError(error);
        })
      )
  }

  getEvents(): Observable<EventDto[]> {

    return this.http.get<EventDto[]>(this.apiUrl + '/events')
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

    return this.http.get<EventDto>(this.apiUrl + '/events/' + id)
      .pipe(
        catchError((error: any) => {
          return throwError(error);
        })
      )
  }

  getIsEditConsideringRouter(router: Router): boolean {
    if (router.url.includes('edit')) {
      this.setIsEdit(true)
    }

    return this.isEdit;
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

  getIsEdit(): boolean {
    return this.isEdit;
  }

  setIsEdit(isEdit: boolean) {
    this.isEdit = isEdit;
  }
}

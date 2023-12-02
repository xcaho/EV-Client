import {Injectable} from "@angular/core";
import {environment} from "../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {catchError} from "rxjs/operators";
import {throwError} from "rxjs";
import {ConsentDto} from "../dtos/ConsentDto";

@Injectable({
  providedIn: 'root',
})
export class ConsentService {

  private _temporaryConsents?: ConsentDto[]

  private apiUrl: string = environment.apiUrl

  constructor(private http: HttpClient) {
  }

  saveConsentsForEvent(consents: ConsentDto[], eventId: number) {

    return this.http.post<ConsentDto[]>(this.apiUrl + '/consents/events/' + eventId, consents)
      .pipe(
        catchError((error: any) => {
          return throwError(error);
        })
      )
  }

  getConsentsForEvent(eventId: number) {

    return this.http.get<ConsentDto[]>(this.apiUrl + '/consents/events/' + eventId)
      .pipe(
        catchError((error: any) => {
          return throwError(error);
        })
      )
  }

  saveConsentsForSurvey(consentIds: number[], eventId: number) {

    return this.http.post<ConsentDto[]>(this.apiUrl + '/consents/surveys/' + eventId, consentIds)
      .pipe(
        catchError((error: any) => {
          return throwError(error);
        })
      )
  }

  getConsentsForSurvey(surveyId: number) {

    return this.http.get<ConsentDto[]>(this.apiUrl + '/consents/surveys/' + surveyId)
      .pipe(
        catchError((error: any) => {
          return throwError(error);
        })
      )
  }

  getTemporaryConsents(): ConsentDto[] {
    if (this._temporaryConsents) {
      return <ConsentDto[]>this._temporaryConsents;
    }
    return []
  }

  setTemporaryConsents(consents: ConsentDto[]) {
    this._temporaryConsents = consents;
  }

  clearTemporaryConsents() {
    this._temporaryConsents = undefined;
  }
}

import {Injectable} from "@angular/core";
import {map, Observable, throwError} from "rxjs";
import {catchError} from "rxjs/operators";
import {SurveyDto} from "./common/mainpage/SurveyDto";
import {HttpClient} from "@angular/common/http";
import {ConfirmationDto} from "./common/mainpage/ConfirmationDto";

@Injectable({
  providedIn: 'root',
})
export class SurveyService {

  temporaryConfirmation?: ConfirmationDto

  constructor(private http: HttpClient) {
  }

  getSurvey(code: string): Observable<SurveyDto> {
    const headers = {"Content-Type": "application/json"};
    const options = {"headers": headers};

    return this.http.get<SurveyDto>('https://easy-visit-edea476c86ab.herokuapp.com/surveys/' + code, options)
      .pipe(
        catchError((error: any) => {
          return throwError(error);
        })
      )
  }

  getSurveys(eventId: number): Observable<SurveyDto[]> {
    const headers = {"Content-Type": "application/json"};
    const options = {"headers": headers};

    return this.http.get<SurveyDto[]>('https://easy-visit-edea476c86ab.herokuapp.com/events/' + eventId + '/surveys', options)
      .pipe(
        map(res => res.map(tmp => new SurveyDto(
          tmp.id, tmp.code, tmp.date, tmp.surveyState, tmp.eventId))),
        catchError((error: any) => {
          return throwError(error);
        })
      )
  }

  modifySurvey(survey: SurveyDto): Observable<SurveyDto> {
    const headers = {"Content-Type": "application/json"};
    const options = {"headers": headers};

    return this.http.patch<SurveyDto>('https://easy-visit-edea476c86ab.herokuapp.com/surveys/' + survey.id, survey, options)
      .pipe(
        catchError((error: any) => {
          return throwError(error);
        })
      )
  }
  saveSurvey(eventId: number): Observable<SurveyDto> {
    const headers = {"Content-Type": "application/json"};
    const options = {"headers": headers};

    return this.http.post<SurveyDto>('https://easy-visit-edea476c86ab.herokuapp.com/events/' + eventId + '/surveys', options)
      .pipe(
        catchError((error: any) => {
          return throwError(error);
        })
      )
  }

  getTemporaryConfirmation(): ConfirmationDto {
    return <ConfirmationDto>this.temporaryConfirmation;
  }

  setTemporaryConfirmation(confirmation: ConfirmationDto) {
    this.temporaryConfirmation = confirmation
  }

  clearTemporaryConfirmation() {
    this.temporaryConfirmation = undefined
  }
}

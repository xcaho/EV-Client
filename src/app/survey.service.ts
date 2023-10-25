import {Injectable} from "@angular/core";
import {map, Observable, throwError} from "rxjs";
import {catchError} from "rxjs/operators";
import {SurveyDto} from "./shared/dtos/SurveyDto";
import {HttpClient} from "@angular/common/http";
import {ConfirmationDto} from "./shared/dtos/ConfirmationDto";
import {environment} from "../environments/environment";

@Injectable({
  providedIn: 'root',
})
export class SurveyService {

  temporaryConfirmation?: ConfirmationDto

  apiUrl: string = environment.apiUrl

  constructor(private http: HttpClient) {
  }

  getSurvey(code: string): Observable<SurveyDto> {
    const headers = {"Content-Type": "application/json"};
    const options = {"headers": headers};

    return this.http.get<SurveyDto>(this.apiUrl + '/surveys/' + code, options)
      .pipe(
        catchError((error: any) => {
          return throwError(error);
        })
      )
  }

  getSurveys(eventId: number): Observable<SurveyDto[]> {
    const headers = {"Content-Type": "application/json"};
    const options = {"headers": headers};

    return this.http.get<SurveyDto[]>(this.apiUrl + '/events/' + eventId + '/surveys', options)
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

    return this.http.patch<SurveyDto>(this.apiUrl + '/surveys/' + survey.id, survey, options)
      .pipe(
        catchError((error: any) => {
          return throwError(error);
        })
      )
  }
  saveSurvey(eventId: number): Observable<SurveyDto> {
    const headers = {"Content-Type": "application/json"};
    const options = {"headers": headers};

    return this.http.post<SurveyDto>(this.apiUrl + '/events/' + eventId + '/surveys', options)
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

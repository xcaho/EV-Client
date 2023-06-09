import {Injectable} from "@angular/core";
import {Observable, throwError} from "rxjs";
import {EventDto} from "./common/mainpage/EventDto";
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

    return this.http.get<SurveyDto>('http://localhost:8080/surveys/' + code, options)
      .pipe(
        catchError((error: any) => {
          return throwError(error);
        })
      )
  }

  getSurveys(eventId: number): Observable<SurveyDto[]> {
    const headers = {"Content-Type": "application/json"};
    const options = {"headers": headers};

    return this.http.get<SurveyDto[]>('http://localhost:8080/events/' + eventId + '/surveys', options)
      .pipe(
        catchError((error: any) => {
          return throwError(error);
        })
      )
  }

  save(survey: SurveyDto): Observable<SurveyDto> {
    const headers = {"Content-Type": "application/json"};
    const options = {"headers": headers};

    return this.http.patch<SurveyDto>('http://localhost:8080/surveys/' + survey.id, survey, options)
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

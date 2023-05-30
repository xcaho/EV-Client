import {Injectable} from "@angular/core";
import {Observable, throwError} from "rxjs";
import {EventDto} from "./common/mainpage/EventDto";
import {catchError} from "rxjs/operators";
import {SurveyDto} from "./common/mainpage/SurveyDto";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root',
})
export class SurveyService {

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
}

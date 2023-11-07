import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable, throwError} from "rxjs";
import {catchError} from "rxjs/operators";
import {AlertService} from "../../common/alerts/service/alert.service";
import {User} from "../dtos/User";
import {AuthDto} from "../dtos/AuthDto";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private http: HttpClient,
    private alertService: AlertService,
  ) {
  }

  create(user: User): Observable<AuthDto> {
    console.log(user)
    return this.http.post<AuthDto>('http://localhost:8080/auth/register', user)
        .pipe(
            catchError((error: any) => {

                this.alertService.showError('Wystąpił błąd, spróbuj ponownie.');
                return throwError(error);
            })
        )
  }

  login(user: User): Observable<AuthDto> {
    console.log(user)
    return this.http.post<AuthDto>('http://localhost:8080/auth/login', user)
      .pipe(
          catchError((error: any) => {

              this.alertService.showError('Wystąpił błąd, spróbuj ponownie.');
              return throwError(error);
          })
      )
  }
}

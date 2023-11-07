import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {catchError} from "rxjs/operators";
import {AlertService} from "../../common/alerts/service/alert.service";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private http: HttpClient,
    private alertService: AlertService,
  ) {
  }

  create(data: any): Observable<any> {
    return this.http.post('http://localhost:8080/api/admin/register', data)
      .pipe(
        catchError(error => {
          // if (error.status === 404)
          this.alertService.showError('Wystąpił błąd, spróbuj ponownie.');
          return error;
        })
      );
  }

  login(data: any): Observable<any> {
    return this.http.post('http://localhost:8080/api/admin/login', data)
      .pipe(
        catchError(error => {
          // if (error.status === 404)
          this.alertService.showError('Wystąpił błąd, spróbuj ponownie.');
          return error;
        })
      );
  }
}

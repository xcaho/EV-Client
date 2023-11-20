import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable, throwError} from "rxjs";
import {catchError} from "rxjs/operators";
import {AlertService} from "../../common/alerts/service/alert.service";
import {User} from "../dtos/User";
import {AuthDto} from "../dtos/AuthDto";
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public token: string | null;
  public userLogin: string | null;
  public url: string | null;

  constructor(
    private http: HttpClient,
    private alertService: AlertService,
  ) {
    this.token = localStorage.getItem('token');
    this.userLogin = localStorage.getItem('token_login');
    this.url = localStorage.getItem('token_url');
  }

  create(user: User): Observable<AuthDto> {
    return this.http.post<AuthDto>('http://localhost:8080/auth/register', user)
      .pipe(
        catchError((error: any) => {
          this.alertService.showError('Wystąpił błąd, spróbuj ponownie.');
          return throwError(error);
        })
      )
  }

  login(user: User): Observable<AuthDto> {
    return this.http.post<AuthDto>('http://localhost:8080/auth/login', user)
      .pipe(
        catchError((error: any) => {
          if (error.status === 403) {
            this.alertService.showError('Błędne dane logowania.');
            return throwError(error);
          }
          this.alertService.showError('Wystąpił błąd, spróbuj ponownie.');
          return throwError(error);
        })
      )
  }

  resetPassword(user: User): Observable<AuthDto> {
    return this.http.post<AuthDto>('http://localhost:8080/auth/reset', user)
      .pipe(
        catchError((error: any) => {
          if (error.status === 403) {
            this.alertService.showError('Podany login nie istnieje.');
            return throwError(error);
          }
          this.alertService.showError('Wystąpił błąd, spróbuj ponownie.');
          return throwError(error);
        })
      )
  }

  isLoggedIn(): boolean {
    return !!this.token;
  }

  saveToken(token: string, userLogin: string, router: Router) {
    this.token = token;
    this.userLogin = userLogin;
    localStorage.setItem('token', token);
    localStorage.setItem('token_login', userLogin);
  }

  saveURL(router: Router) {
    if (!this.isLoggedIn()) {
      this.url = router.url;
      localStorage.setItem('token_url', router.url);
      router.navigate(['/login']);
    }
  }

  removeURL() {
    this.url = null;
    localStorage.removeItem('token_url');
  }

  removeToken() {
    this.token = null;
    this.userLogin = null;
    localStorage.removeItem('token');
    localStorage.removeItem('token_login');
  }
}

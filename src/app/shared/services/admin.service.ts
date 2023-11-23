import {Injectable} from "@angular/core";
import {User} from "../dtos/User";
import {map, Observable, throwError} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import {catchError} from "rxjs/operators";
import {PasswordDto} from "../dtos/PasswordDto";

@Injectable({
  providedIn: 'root',
})
export class AdminService {

  apiUrl: string = environment.apiUrl

  constructor(private http: HttpClient) {
  }

  public getAllUsers(): Observable<User[]> {

    return this.http.get<User[]>(this.apiUrl + '/admin/users')
      .pipe(
        map(users => users.map(user => new User(
          user.email,
          user.name,
          user.role,
          user.blocked,
          user.id
        ))),
        catchError((error: any) => {
          return throwError(error);
        })
      )
  }

  public getUser(id: number): Observable<User> {

    return this.http.get<User>(this.apiUrl + '/admin/users/' + id)
      .pipe(
        map(user => new User(
          user.email,
          user.name,
          user.role,
          user.blocked,
          user.id
        )),
        catchError((error: any) => {
          return throwError(error);
        })
      )
  }

  public blockUser(id: number): Observable<User> {

    return this.http.post<User>(this.apiUrl + '/admin/users/' + id + '/block', null)
      .pipe(
        catchError((error: any) => {
          return throwError(error);
        })
      )
  }

  public unlockUser(id: number): Observable<User> {

    return this.http.post<User>(this.apiUrl + '/admin/users/' + id + '/unblock', null)
      .pipe(
        catchError((error: any) => {
          return throwError(error);
        })
      )
  }

  public resetPassword(id: number) {

    return this.http.patch<PasswordDto>(this.apiUrl + '/admin/users/'+ id +'/resetPassword', null)
      .pipe(
        catchError((error: any) => {
          return throwError(error);
        })
      )
  }
}

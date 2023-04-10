import { Component } from '@angular/core';
import {NgForm} from "@angular/forms";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {EventDto} from "./EventDto";

@Component({
  selector: 'app-mainpage',
  templateUrl: './mainpage.component.html',
  styleUrls: ['./mainpage.component.scss']
})
export class MainpageComponent {

  constructor(private http: HttpClient) {
  }

  onSubmit(f: NgForm) {

    let formContent = f.value
    let newEvent = new EventDto(
      formContent.nazwaSpotkania,
      formContent.opisSpotkania,
      formContent.odData,
      formContent.doData,
      formContent.maxUsers,
      formContent.duration,
      formContent.breakTime)

    let headers = new HttpHeaders().set('Access-Control-Allow-Origin', "http://localhost:8080/");
    this.http.post<any>('http://localhost:8080/events',
      { newEvent }, { headers })
      .subscribe(
        response => {
          console.log("Successfully added: " + JSON.stringify(response));
        }, exception => {
          let errorsMap = exception.error.errorsMap
          console.log(errorsMap)
        });
  }

}


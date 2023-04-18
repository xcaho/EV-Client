import { Component } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {NgForm} from "@angular/forms";
import {EventDto} from "../../common/mainpage/EventDto";

@Component({
  selector: 'app-create-event',
  templateUrl: './create-event.component.html',
  styleUrls: ['./create-event.component.scss']
})
export class CreateEventComponent {
  
  constructor(private http: HttpClient) {
  }

  onSubmit(f: NgForm) {

    let formContent = f.value
    let newEvent = new EventDto(
      formContent.nazwaSpotkania,
      formContent.opisSpotkania,
      formContent.odData,
      formContent.doData,
      15,
      60,
      15)

    const headers = { "Content-Type": "application/json" }
    const options = { "headers": headers }
    this.http.post<any>('http://localhost:8080/events',
      newEvent, options)
      .subscribe(
        response => {
          console.log("Successfully added: " + JSON.stringify(response));
        }, exception => {
          let errorsMap = exception.error.errorsMap
          console.log(errorsMap)
        });
  }
}

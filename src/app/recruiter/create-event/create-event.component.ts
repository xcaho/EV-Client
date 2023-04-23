import { Component } from '@angular/core';
import {NgForm} from "@angular/forms";
import {EventDto} from "../../common/mainpage/EventDto";
import { EventService } from '../../event.service';

@Component({
  selector: 'app-create-event',
  templateUrl: './create-event.component.html',
  styleUrls: ['./create-event.component.scss'],
  providers: [EventService]
})
export class CreateEventComponent {

  public errorsMapVar = {
    name: '',
    description: '',
    startDate: '',
    endDate: '',
    maxUsers: '',
    duration: '',
    breakTime: ''
  };
  constructor(private eventService: EventService) { }

  onSubmit(f: NgForm) {
    this.errorsMapVar = {
      name: '',
      description: '',
      startDate: '',
      endDate: '',
      maxUsers: '',
      duration: '',
      breakTime: ''
    };

    let formContent = f.value
    let newEvent = new EventDto(
      formContent.name,
      formContent.description,
      formContent.startDate,
      formContent.endDate,
      15,
      60,
      15)

    this.eventService.createEvent(newEvent).subscribe(
      response => {
        console.log("Successfully added: " + JSON.stringify(response));
      }, exception => {
        let errorsMap = exception.error.errorsMap;
        this.errorsMapVar = errorsMap;
        console.log(errorsMap);
      }
    )
  }
}

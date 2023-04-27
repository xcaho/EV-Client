import { Component } from '@angular/core';
import { EventService } from '../../event.service';
import { EventDto } from "../../common/mainpage/EventDto";

@Component({
  selector: 'app-your-appointments',
  templateUrl: './your-appointments.component.html',
  styleUrls: ['./your-appointments.component.scss'],
  providers: [EventService]
})
export class YourAppointmentsComponent {

  events: EventDto[] = [];
  isFetching: boolean = false;

  constructor(private eventService: EventService) {}

  ngOnInit() {
    this.isFetching = true;
    this.eventService.getEvents().subscribe((events) => {
      this.events = events;
      this.isFetching = false;
    });
  }

}

import { Component } from '@angular/core';
import { EventService } from '../../event.service';
import { EventDto } from "../../common/mainpage/EventDto";
import {Router} from "@angular/router";

@Component({
  selector: 'app-your-appointments',
  templateUrl: './your-appointments.component.html',
  styleUrls: ['./your-appointments.component.scss'],
  providers: [EventService]
})
export class YourAppointmentsComponent {

  events: EventDto[] = [];
  isFetching: boolean = false;

  constructor(private eventService: EventService, private router: Router) {}

  goToCreate() {
    localStorage.removeItem("event")
  }

  goToRead(event: EventDto) {
    localStorage.setItem("event", JSON.stringify(event))
    this.router.navigate(['/event/', event.id])
  }

  ngOnInit() {
    this.isFetching = true;
    this.eventService.getEvents().subscribe((events) => {
      this.events = events;
      this.isFetching = false;
    });
  }

}

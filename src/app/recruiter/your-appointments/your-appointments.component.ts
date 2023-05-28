import {Component} from '@angular/core';
import {EventService} from '../../event.service';
import {EventDto} from "../../common/mainpage/EventDto";
import {Router} from "@angular/router";
import {AvailabilityService} from "../../availability.service";

@Component({
  selector: 'app-your-appointments',
  templateUrl: './your-appointments.component.html',
  styleUrls: ['./your-appointments.component.scss']
})
export class YourAppointmentsComponent {

  events: EventDto[] = [];
  isFetching: boolean = false;

  constructor(private eventService: EventService, private availabilityService: AvailabilityService, private router: Router) {}

  goToCreate() {
    this.eventService.clearTemporaryEvent()
    this.availabilityService.clearTemporaryAvailabilities()
    this.router.navigate(['/create'])
  }

  goToRead(event: EventDto) {
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

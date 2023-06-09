import {Component} from '@angular/core';
import {EventService} from '../../event.service';
import {EventDto} from "../../common/mainpage/EventDto";
import {AvailabilityService} from "../../availability.service";

@Component({
  selector: 'app-your-appointments',
  templateUrl: './your-appointments.component.html',
  styleUrls: ['./your-appointments.component.scss']
})
export class YourAppointmentsComponent {

  events: EventDto[] = [];
  isFetching: boolean = false;

  constructor(private eventService: EventService, private availabilityService: AvailabilityService) {}

  goToCreate() {
    this.eventService.clearTemporaryEvent()
    this.availabilityService.clearTemporaryAvailabilities()
    // this.router.navigate(['/create'])
  }

  ngOnInit() {
    this.isFetching = true;
    this.eventService.getEvents().subscribe((events) => {
      this.events = events;
      this.isFetching = false;
    });
  }

}

import {Component} from '@angular/core';
import {EventDto} from "../../../common/mainpage/EventDto";
import {EventService} from "../../../event.service";
import {ActivatedRoute} from '@angular/router';
import {AvailabilityDto} from "../../../common/mainpage/Availability";

@Component({
  selector: 'app-event',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.scss']
})
export class EventComponent {
  availabilityList: AvailabilityDto[] = [];
  events: EventDto[] = [];
  eventId: number = 0;

  constructor(private eventService: EventService, public route: ActivatedRoute) {
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.eventId = params['id'];
    });
    this.eventService.getEvents().subscribe((events) => {
      this.events = events;
    });
  }

}

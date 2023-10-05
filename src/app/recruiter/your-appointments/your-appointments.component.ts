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

  constructor(private eventService: EventService,
              private availabilityService: AvailabilityService,) {
  }

  goToCreate() {
    this.eventService.clearTemporaryEvent()
    this.availabilityService.clearTemporaryAvailabilities()
  }

  ngOnInit() {
    document.getElementById('focusReset')?.focus();
    this.isFetching = true;
    this.eventService.getEvents().subscribe((events) => {
      this.events = this.eventSort(events);
      this.isFetching = false;
    });
  }

  eventSort(events: EventDto[]): EventDto[] {
    let activeEvents: EventDto[] = [];
    let disabledEvents: EventDto[] = [];

    events.forEach(event => {
      if (event.active)
        activeEvents.push(event)
      if (!event.active)
        disabledEvents.push(event)
    })

    activeEvents.sort((a: EventDto, b: EventDto) => {
      let x = new Date(a.researchStartDate).getTime()
      let y = new Date(b.researchStartDate).getTime()

      return y - x
    })

    disabledEvents.sort((a: EventDto, b: EventDto) => {
      let x = new Date(a.researchStartDate).getTime()
      let y = new Date(b.researchStartDate).getTime()

      return y - x
    })

    return activeEvents.concat(disabledEvents)
  }
}

import {Component} from '@angular/core';
import {EventService} from '../../event.service';
import {EventDto} from "../../shared/dtos/EventDto";
import {AvailabilityService} from "../../availability.service";
import {TitleService} from "../../shared/services/title.service";
import {FormatDate} from "../../shared/utils/format-date";
import {AuthService} from "../../shared/services/auth.service";

@Component({
  selector: 'app-your-appointments',
  templateUrl: './your-appointments.component.html',
  styleUrls: ['./your-appointments.component.scss']
})
export class YourAppointmentsComponent {
  public events: EventDto[] = [];
  public isFetching: boolean = false;
  public hasErrors: boolean = false;
  public formatDate = FormatDate;

  constructor(private eventService: EventService,
              private availabilityService: AvailabilityService,
              private titleService: TitleService,
              private authService: AuthService
  ) {
  }

  goToCreate() {
    this.eventService.clearTemporaryEvent()
    this.eventService.setIsEdit(false)
    this.availabilityService.clearTemporaryAvailabilities()
  }

  ngOnInit() {
    console.log(this.authService.isLoggedIn())
    document.getElementById('focusReset')?.focus();
    this.titleService.setTitle('Lista wydarzeń');
    this.isFetching = true;
    this.eventService.getEvents().subscribe((events) => {
        this.events = this.eventSort(events);
        this.isFetching = false;
      },
      () => {
        this.hasErrors = true;
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

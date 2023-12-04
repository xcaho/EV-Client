import {Component} from '@angular/core';
import {EventService} from '../../event.service';
import {EventDto} from "../../shared/dtos/EventDto";
import {AvailabilityService} from "../../availability.service";
import {TitleService} from "../../shared/services/title.service";
import {FormatDate} from "../../shared/utils/format-date";
import {AuthService} from "../../shared/services/auth.service";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-your-appointments',
  templateUrl: './your-appointments.component.html',
  styleUrls: ['./your-appointments.component.scss']
})
export class YourAppointmentsComponent {
  public allEvents: EventDto[] = [];
  public events: EventDto[] = [];
  public isFetching: boolean = false;
  public formatDate = FormatDate;
  public userId: number = 0;
  private token: string | null = null;
  public filterAll: boolean = false;
  public filterDisabled: boolean = false;

  constructor(private eventService: EventService,
              private availabilityService: AvailabilityService,
              private titleService: TitleService,
              public authService: AuthService,
              private router: Router,
              private route: ActivatedRoute
  ) {
    this.token = this.authService.token;
  }

  ngOnInit() {
    if (this.authService.isTokenExpired(this.token)) {
      this.authService.removeToken();
      this.authService.saveURL(this.router);
      this.router.navigate(['/login']);

    } else {
      document.getElementById('focusReset')?.focus();
      this.titleService.setTitle('Lista wydarzeń');

      this.route.params.subscribe(params => {
        this.userId = params['user-id'];
      });

      this.eventService.getEvents(this.userId).subscribe((events) => {
        this.events = this.eventSort(events);
      }, (err) => {
        if (err.status === 403) {
          this.router.navigate(['/403'], {skipLocationChange: true})
        }
      });
    }
  }

    filterEvents(): EventDto[] {
        if (this.filterAll && this.filterDisabled) {
            return this.allEvents.filter((event) => !event.active);
        } else if (this.filterAll) {
            return this.allEvents;
        } else if (this.filterDisabled) {
            return this.events.filter((event) => !event.active);
        } else {
            return this.events.filter((event) => event.active);
        }
    }


    goToCreate() {
    this.eventService.clearTemporaryEvent()
    this.eventService.setIsEdit(false)
    this.availabilityService.clearTemporaryAvailabilities()
  }

  eventSort(events: EventDto[]): EventDto[] {
    let activeEvents: EventDto[] = [];
    let disabledEvents: EventDto[] = [];

    events.forEach(event => {
      if (event.active)
        activeEvents.push(event);
      if (!event.active)
        disabledEvents.push(event);
    })

    activeEvents.sort((a: EventDto, b: EventDto) => {
      let x = new Date(a.researchStartDate).getTime();
      let y = new Date(b.researchStartDate).getTime();

      return y - x;
    })

    disabledEvents.sort((a: EventDto, b: EventDto) => {
      let x = new Date(a.researchStartDate).getTime();
      let y = new Date(b.researchStartDate).getTime();

      return y - x;
    })

    return activeEvents.concat(disabledEvents);
  }
}

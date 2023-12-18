import {Component} from '@angular/core';
import {EventService} from '../../event.service';
import {EventDto} from "../../shared/dtos/EventDto";
import {AvailabilityService} from "../../availability.service";
import {TitleService} from "../../shared/services/title.service";
import {FormatDate} from "../../shared/utils/format-date";
import {AuthService} from "../../shared/services/auth.service";
import {ActivatedRoute, Router} from "@angular/router";
import {PreloaderService} from "../../shared/services/preloader.service";

@Component({
  selector: 'app-your-appointments',
  templateUrl: './your-appointments.component.html',
  styleUrls: ['./your-appointments.component.scss']
})
export class YourAppointmentsComponent {
  public allEvents: EventDto[] = [];
  public events: EventDto[] = [];
  public formatDate = FormatDate;
  public userId: number = 0;
  private token: string | null = null;
  public filterAll: boolean = false;
  public filterDisabled: boolean = false;
  public eventsToShow: number = 8;
  public additionalEventsToShow: number = 5;
  public allEventsToShow: number = 0;
  public role: string | null = null;

  constructor(private eventService: EventService,
              private availabilityService: AvailabilityService,
              private titleService: TitleService,
              public authService: AuthService,
              private router: Router,
              private route: ActivatedRoute,
              private preloader: PreloaderService
  ) {
    this.token = this.authService.token;
  }

  ngOnInit() {
    if (this.authService.isTokenExpired(this.token)) {
      this.authService.removeToken();
      this.authService.saveURL(this.router);
      this.router.navigate(['/login']);

    } else {
      this.preloader.show();
      document.getElementById('focusReset')?.focus();
      this.titleService.setTitle('Lista wydarzeń');

      this.route.params.subscribe(params => {
        this.userId = params['user-id'];
      });

      this.role = this.authService.getRole();

      this.eventService.getAllEvents().subscribe((allEvents) => {
        this.allEvents = this.eventSort(allEvents)
      });

      this.eventService.getEvents(this.userId).subscribe((events) => {
        this.events = this.eventSort(events);
        this.preloader.hide();
      }, (err) => {
        if (err.status === 403) {
          this.preloader.hide();
          this.router.navigate(['/403'], {skipLocationChange: true})
        } else {
          this.preloader.hide();
          this.router.navigate(['/404'], {skipLocationChange: true})
        }
      });
    }
  }

  showMoreEvents() {
    this.eventsToShow += this.additionalEventsToShow;
  }

  filterEvents(): EventDto[] {
    if (this.filterAll && this.filterDisabled) {
      this.allEventsToShow = this.allEvents.length;
      return this.allEvents.filter((event) => !event.active).slice(0, Math.min(this.eventsToShow, this.allEvents.length));
    } else if (this.filterDisabled && this.filterAll) {
      this.allEventsToShow = this.allEvents.length;
      return this.allEvents.filter((event) => !event.active).slice(0, Math.min(this.eventsToShow, this.allEvents.length));
    } else if (this.filterAll) {
      this.allEventsToShow = this.allEvents.length;
      return this.allEvents.filter((event) => event.active).slice(0, Math.min(this.eventsToShow, this.allEvents.length));
    } else if (this.filterDisabled) {
      this.allEventsToShow = this.events.length;
      return this.events.filter((event) => !event.active).slice(0, Math.min(this.eventsToShow, this.events.length));
    } else {
      this.allEventsToShow = this.events.length;
      return this.events.filter((event) => event.active).slice(0, Math.min(this.eventsToShow, this.events.length));
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

import {Component, HostListener, Input, ViewChild} from '@angular/core';
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {EventService} from "../../../event.service";
import {ActivatedRoute, Router} from "@angular/router";
import {Availability, AvailabilityDto, AvailabilityHours} from "../../../shared/dtos/Availability";
import {HoursAddComponent} from "./hours-add/hours-add.component";
import {faPlus, faTrash} from '@fortawesome/free-solid-svg-icons';
import {EventDto} from "../../../shared/dtos/EventDto";
import {AvailabilityService} from "../../../availability.service";
import {firstValueFrom} from "rxjs";
import {AlertService} from "../../../common/alerts/service/alert.service";
import {EventUtils} from "../../../shared/utils/EventUtils";
import {AuthService} from "../../../shared/services/auth.service";

@Component({
  selector: 'app-availability',
  templateUrl: './availability.component.html',
  styleUrls: ['./availability.component.scss']
})
export class AvailabilityComponent {
  @ViewChild(HoursAddComponent) hoursAddComponent!: HoursAddComponent;
  public isEdit: boolean = false;
  public availabilityList: Availability[] = [];
  public event!: EventDto;
  public plus = faPlus;
  public trash = faTrash;
  private eventId: number = 0;
  private userId: string | null | undefined;
  private token: string | null = null;

  constructor(private eventService: EventService,
              private availabilityService: AvailabilityService,
              private modalService: NgbModal,
              private router: Router,
              private route: ActivatedRoute,
              private alertService: AlertService,
              private authService: AuthService,) {
    this.token = this.authService.token;
  }

  @HostListener('window:beforeunload', ['$event'])
  notification($event: any): void {
      $event.returnValue = 'Masz niezapisane zmiany. Czy na pewno chcesz opuścić tę stronę?';
  }

  async ngOnInit() {
    if (this.authService.isTokenExpired(this.token)) {
      this.authService.removeToken();
      this.authService.saveURL(this.router);
      this.router.navigate(['/login']);
    }

    document.getElementById('focusReset')?.focus();
    this.event = this.eventService.getTemporaryEvent();
    this.isEdit = this.eventService.getIsEditConsideringRouter(this.router);
    this.eventId = EventUtils.getIdFromRoute(this.route);
    this.userId = this.authService.getUserId()

    if (this.event == undefined && this.isEdit) {
      this.event = await firstValueFrom(this.eventService.getEvent(this.eventId));
    }

    let temporaryAvailabilities = this.availabilityService.getTemporaryAvailabilities();
    this.generateDates(new Date(this.event.researchStartDate), new Date(this.event.researchEndDate));

    if (!temporaryAvailabilities || temporaryAvailabilities.length == 0) {
      if (this.isEdit) {
        this.availabilityService.getAvailabilityList(this.eventId).subscribe((availabilityDtoList) => {
          this.includeAvailabilities(this.availabilityService.mapFromDto(availabilityDtoList))
        })
      }
    } else {
      this.includeAvailabilities(temporaryAvailabilities)
    }
  }

  private includeAvailabilities(oldAvailabilities: Availability[]) {
    oldAvailabilities.forEach(oldAvailability => {
      let index = this.availabilityList.findIndex(newAvailability => newAvailability.date.toDateString() == oldAvailability.date.toDateString())
      if (index != -1) {
        Object.assign(this.availabilityList[index], oldAvailability)
      }
    })
  }

  public goBack() {
    this.availabilityService.setTemporaryAvailabilities(this.availabilityList);
  }

  private generateDates(startDate: Date, endDate: Date) {
    let currentDate: Date = startDate;
    while (currentDate <= endDate) {
      let hoursList: AvailabilityHours[] = []
      this.availabilityList.push(
        new Availability(currentDate, hoursList))

      currentDate = this.addOneDay(currentDate)
    }
  }

  goToConsent() {
    this.router.navigate(['/consent/'])
    this.availabilityService.setTemporaryAvailabilities(this.availabilityList);
  }

  private addOneDay(currentDate: Date) {
    let date = new Date(currentDate)
    date.setDate(date.getDate() + 1)
    return date
  }

  public removeHour(availability: Availability, hours: any): void {
    availability.hoursList.forEach((itemList, index) => {
      if (itemList === hours) {
        availability.hoursList.splice(index, 1)
      }
    })
  }
}

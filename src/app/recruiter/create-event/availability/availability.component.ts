import {Component, ViewChild} from '@angular/core';
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {EventService} from "../../../event.service";
import {ActivatedRoute, Router} from "@angular/router";
import {Availability, AvailabilityDto, AvailabilityHours} from "../../../common/mainpage/Availability";
import {HoursAddComponent} from "./hours-add/hours-add.component";
import {faPlus, faTrash} from '@fortawesome/free-solid-svg-icons';
import {EventDto} from "../../../common/mainpage/EventDto";
import {AvailabilityService} from "../../../availability.service";
import {EventUtils} from "../../../common/mainpage/EventUtils";
import {firstValueFrom} from "rxjs";

@Component({
  selector: 'app-availability',
  templateUrl: './availability.component.html',
  styleUrls: ['./availability.component.scss']
})
export class AvailabilityComponent {
  @ViewChild(HoursAddComponent) hoursAddComponent!: HoursAddComponent;

  isEdit: boolean = false;
  availabilityList: Availability[] = [];
  event!: EventDto;
  plus = faPlus;
  trash = faTrash;
  eventId: number = 0;

  constructor(private eventService: EventService, private availabilityService: AvailabilityService,
              private modalService: NgbModal, private router: Router, private route: ActivatedRoute) {
  }

  async ngOnInit() {
    document.getElementById('focusReset')?.focus();

    this.event = this.eventService.getTemporaryEvent()
    this.isEdit = this.eventService.getIsEditConsideringRouter(this.router)
    this.eventId = EventUtils.getIdFromRoute(this.route)

    if (this.event == undefined && this.isEdit) {
      this.event = await firstValueFrom(this.eventService.getEvent(this.eventId))
    }

    let temporaryAvailabilities = this.availabilityService.getTemporaryAvailabilities()
    this.generateDates(new Date(this.event.researchStartDate), new Date(this.event.researchEndDate))

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

  includeAvailabilities(oldAvailabilities: Availability[]) {

    oldAvailabilities.forEach(oldAvailability => {
      let index = this.availabilityList.findIndex(newAvailability => newAvailability.date.toDateString() == oldAvailability.date.toDateString())
      if (index != -1) {
        Object.assign(this.availabilityList[index], oldAvailability)
      }
    })
  }
  goBack() {
    this.availabilityService.setTemporaryAvailabilities(this.availabilityList)
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

  submit() {
    if (this.isEdit) {

      this.eventService.modifyEvent(this.event).subscribe(
        response => {

          console.log("Succesfully modified: " + JSON.stringify(response));
          this.saveAvailability(response.id)

        }, exception => {
          console.log(exception.error.errorsMap)
        }
      )

    } else {

      this.eventService.createEvent(this.event).subscribe(
        response => {

          console.log("Succesfully added: " + JSON.stringify(response));
          this.saveAvailability(response.id)

        }, exception => {
          console.log(exception.error.errorsMap)
        }
      )
    }
  }

  private saveAvailability(eventId: number) {

    let availabilityDtoList: AvailabilityDto[] = this.availabilityService.convertAvailabilityToDto(this.availabilityList)

    if (this.isEdit) {

      this.availabilityService.patchAvailabilityList(availabilityDtoList, eventId).subscribe(
      response => {

        console.log("Successfully modified: " + JSON.stringify(response))
        this.eventService.clearTemporaryEvent()
        this.availabilityService.clearTemporaryAvailabilities()
        this.router.navigate(['/appointments'])

      }, exception => {
        console.log(exception.error.errorsMap)
      }
    )

    } else {

      this.availabilityService.saveAvailabilityList(availabilityDtoList, eventId).subscribe(
        response => {

          console.log("Successfully added: " + JSON.stringify(response))
          this.eventService.clearTemporaryEvent()
          this.availabilityService.clearTemporaryAvailabilities()
          this.router.navigate(['/appointments'])

        }, exception => {
          console.log(exception.error.errorsMap)
        }
      )
    }
  }

  private addOneDay(currentDate: Date) {
    let date = new Date(currentDate)
    date.setDate(date.getDate() + 1)
    return date
  }

  removeHour (availability: Availability, hours: any): void {
    availability.hoursList.forEach((itemList, index) => {
      if (itemList === hours) {
        availability.hoursList.splice(index, 1)
      }
    })
  }

}

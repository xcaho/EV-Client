import {Component, ViewChild} from '@angular/core';
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {EventService} from "../../../event.service";
import {Router} from "@angular/router";
import {Availability, AvailabilityDto, AvailabilityHours} from "../../../common/mainpage/Availability";
import {HoursAddComponent} from "./hours-add/hours-add.component";
import {faPlus, faTrash} from '@fortawesome/free-solid-svg-icons';
import {EventDto} from "../../../common/mainpage/EventDto";
import {AvailabilityService} from "../../../availability.service";

@Component({
  selector: 'app-availability',
  templateUrl: './availability.component.html',
  styleUrls: ['./availability.component.scss']
})
export class AvailabilityComponent {
  @ViewChild(HoursAddComponent) hoursAddComponent!: HoursAddComponent;

  availabilityList: Availability[] = [];
  event!: EventDto;
  plus = faPlus;
  trash = faTrash;

  constructor(private eventService: EventService, private availabilityService: AvailabilityService,
              private modalService: NgbModal, private router: Router) {
  }

  ngOnInit() {
    document.getElementById('focusReset')?.focus();
    this.event = this.eventService.getTemporaryEvent()
    if(!this.event) {
      this.goBack()
    }

    let list = this.availabilityService.getTemporaryAvailabilities()
    if (!list || list.length == 0) {
      this.generateDates(new Date(this.event.researchStartDate), new Date(this.event.researchEndDate))
    } else {
      this.availabilityList = list
    }
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
    this.eventService.createEvent(this.event).subscribe(
      response => {

        console.log("Succesfully added: " + JSON.stringify(response));
        this.saveAvailability(response.id)

      }, exception => {
        console.log(exception.error.errorsMap)
      }
    )
  }

  private saveAvailability(eventId: number) {

    let availabilityDtoList: AvailabilityDto[] = this.availabilityService.convertAvailabilityToDto(this.availabilityList)
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

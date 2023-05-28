import {Component, ViewChild} from '@angular/core';
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {EventService} from "../../../event.service";
import {Router} from "@angular/router";
import {Availability, AvailabilityDto, AvailabilityHours} from "../../../common/mainpage/Availability";
import {HoursAddComponent} from "./hours-add/hours-add.component";
import {faPlus, faTrash} from '@fortawesome/free-solid-svg-icons';
import {EventDto} from "../../../common/mainpage/EventDto";

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

  constructor(private eventService: EventService, private modalService: NgbModal, private router: Router) {
  }

  ngOnInit() {
    this.event = this.eventService.getTemporaryEvent()
    this.getDates(new Date(this.event.researchStartDate), new Date(this.event.researchEndDate))
  }

  private getDates(startDate: Date, endDate: Date) {
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

        let availabilityDtoList: AvailabilityDto[] = []
        this.availabilityList.forEach((availability) => {
          const day: Date = new Date(availability.date)
          availability.hoursList.forEach((hours) => {
            const startTimeFullDate: Date = this.prepareFullDate(hours.startHour, day);
            const endTimeFullDate: Date = this.prepareFullDate(hours.endHour, day);

            availabilityDtoList.push(new AvailabilityDto(startTimeFullDate, endTimeFullDate))
          })
        })

        this.eventService.saveAvailabilityList(availabilityDtoList, response.id).subscribe(
          response => {
            console.log("Successfully added: " + JSON.stringify(response))
            this.eventService.clearTemporaryEvent()
            this.router.navigate(['/appointments'])
          }, exception => {
            console.log(exception.error.errorsMap)
          }
        )

      }, exception => {
        let errorsMap = exception.error.errorsMap;
        console.log(errorsMap)
      }
    )
  }

  private prepareFullDate(hour: string, day: Date) {
    let temp = new Date(day)
    const [hours, minutes] = hour.split(':').map(Number);
    temp.setHours(hours)
    temp.setMinutes(minutes)
    return temp
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

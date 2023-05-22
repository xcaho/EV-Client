import {Component, ViewChild} from '@angular/core';
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {EventService} from "../../../event.service";
import {Router} from "@angular/router";
import {Availability, AvailabilityDto, AvailabilityHours} from "../../../common/mainpage/Availability";
import {HoursAddComponent} from "./hours-add/hours-add.component";
import {faPlus, faTrash} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-availability',
  templateUrl: './availability.component.html',
  styleUrls: ['./availability.component.scss'],
  providers: [EventService]
})
export class AvailabilityComponent {
  @ViewChild(HoursAddComponent) hoursAddComponent!: HoursAddComponent;
  isEdit: boolean = false;
  availabilityList: Availability[] = [];
  plus = faPlus;
  trash = faTrash;
  id: number;

  constructor(private eventService: EventService, private modalService: NgbModal, private router: Router) {
    const navigation = this.router.getCurrentNavigation();
    const state = navigation?.extras.state as {
      startDate: string,
      endDate: string,
      id: number
    }
    this.getDates(new Date(state.startDate), new Date(state.endDate))
    this.id = state.id
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

  private convertTimeToMinutes(time: string): number {
    const [hours, minutes] = time.split(':').map(Number);
    return hours * 60 + minutes;
  }

  private saveEvent() {
    let newEvent;
    if(localStorage.getItem("event")) {
      // @ts-ignore
      newEvent = JSON.parse(localStorage.getItem("event"))
      newEvent.surveyDuration = this.convertTimeToMinutes(newEvent.surveyDuration)
    }
    if(this.isEdit){
      this.eventService.updateEvent(newEvent, this.id).subscribe(
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

          this.eventService.updateAvailabilityList(availabilityDtoList, response.id).subscribe(
            response => {
              console.log("Successfully added: " + JSON.stringify(response))
              localStorage.removeItem("event")
              this.router.navigate(['/appointments'])
            }, exception => {
              console.log(exception.error.errorsMap)
            }
          )
        }
      )
    }
    else {
      this.eventService.createEvent(newEvent).subscribe(
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
              localStorage.removeItem("event")
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
  }

  private prepareFullDate(hour: string, day: Date) {
    let temp = new Date(day)
    const [hours, minutes] = hour.split(':').map(Number);
    temp.setHours(hours)
    temp.setMinutes(minutes)
    return temp
  }

  submitForm() {
    this.saveEvent();
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

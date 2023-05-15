import {Component, ViewChild} from '@angular/core';
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {EventService} from "../../../event.service";
import {Router} from "@angular/router";
import {Availability, AvailabilityHours} from "../../../common/mainpage/Availability";
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

  availabilityList: Availability[] = [];
  plus = faPlus;
  trash = faTrash;

  constructor(private modalService: NgbModal, private router: Router) {
    const navigation = this.router.getCurrentNavigation();
    const state = navigation?.extras.state as {
      startDate: string,
      endDate: string
    }
    this.getDates(new Date(state.startDate), new Date(state.endDate))
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

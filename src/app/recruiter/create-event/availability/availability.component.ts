import { Component } from '@angular/core';
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {FormGroup} from "@angular/forms";
import {EventService} from "../../../event.service";
import {Router} from "@angular/router";
import {Availability, AvailabilityHours} from "../../../common/mainpage/Availability";


@Component({
  selector: 'app-availability',
  templateUrl: './availability.component.html',
  styleUrls: ['./availability.component.scss'],
  providers: [EventService]
})
export class AvailabilityComponent {
  reactiveForm!: FormGroup;
  availabilityList: Availability[] = [];

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
    while(currentDate <= endDate) {
      let hoursList : AvailabilityHours[] = []
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

  open(content: any) {
    this.modalService.open(content);
  }

  // ngOnInit(): void {
  //   this.reactiveForm = new FormGroup({
  //     name: new FormControl(this.event.name, [
  //       Validators.required
  //     ]),
  //   });
  // }

}

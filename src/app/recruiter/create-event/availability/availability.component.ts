import { Component } from '@angular/core';
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {FormGroup} from "@angular/forms";
import {EventService} from "../../../event.service";
import {Router} from "@angular/router";
import {AvailabilityDto, AvailabilityHours} from "../../../common/mainpage/AvailabilityDto";

//export interface Availability {
//  name: string;
//  hour: string[] | null;
//}

@Component({
  selector: 'app-availability',
  templateUrl: './availability.component.html',
  styleUrls: ['./availability.component.scss'],
  providers: [EventService]
})
export class AvailabilityComponent {
  reactiveForm!: FormGroup;
  event: AvailabilityDto;

  constructor(private modalService: NgbModal, private router: Router) {
    const navigation = this.router.getCurrentNavigation();
    const state = navigation?.extras.state as {
      startDate: string,
      endDate: string
    }
    this.event = {} as AvailabilityDto;
    this.getDates(state.startDate, state.endDate)
  }

  private getDates(startDateString: string, endDateString: string) {
    const startDate = new Date(startDateString);
    const endDate = new Date(endDateString);
    let currentDate = startDate;
    while(currentDate <= endDate) {
      let hoursList : AvailabilityHours[] = [new AvailabilityHours("11:00", "12:00")]
      this.items.push(new AvailabilityDto("", currentDate.toString(), hoursList))
      currentDate =  new Date(currentDate.getDate() + 1)
    }
  }

  items: AvailabilityDto[] = [
    //{ name: 'Poniedziałek', hour: ["11:00 - 13:00", "13:30 - 15:00"] },
    //{ name: 'Wtorek', hour: ["14:00 - 16:00"] },
    //{ name: 'Środa', hour: ["17:00 - 19:00"] },
    //{ name: 'Czwartek', hour: null }
  ];

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

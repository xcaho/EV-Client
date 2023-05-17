import { Component } from '@angular/core';
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {FormGroup} from "@angular/forms";
import {EventService} from "../../../event.service";

export interface Item {
  name: string;
  hour: string[] | null;
}

@Component({
  selector: 'app-availability',
  templateUrl: './availability.component.html',
  styleUrls: ['./availability.component.scss'],
  providers: [EventService]
})
export class AvailabilityComponent {
  reactiveForm!: FormGroup;

  constructor(private modalService: NgbModal) {
    // this.event = {} as EventDto;
  }

  items: Item[] = [
    { name: 'Poniedziałek', hour: ["11:00 - 13:00", "13:30 - 15:00"] },
    { name: 'Wtorek', hour: ["14:00 - 16:00"] },
    { name: 'Środa', hour: ["17:00 - 19:00"] },
    { name: 'Czwartek', hour: null }
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

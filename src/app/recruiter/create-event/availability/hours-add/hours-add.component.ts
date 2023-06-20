import {Component, ViewChild, ElementRef} from '@angular/core';
import {Availability, AvailabilityHours} from "../../../../common/mainpage/Availability";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {NgbModal, NgbModalRef} from "@ng-bootstrap/ng-bootstrap";


@Component({
  selector: 'app-hours-add',
  templateUrl: './hours-add.component.html',
  styleUrls: ['./hours-add.component.scss']
})

export class HoursAddComponent {
  @ViewChild('content') content: ElementRef | undefined;

  availability: any;
  hoursAddForm: FormGroup;
  hours: AvailabilityHours;
  modalRef: NgbModalRef = null!;

  constructor(private modalService: NgbModal, private fb: FormBuilder) {
    this.hoursAddForm = fb.group({
      startHour: fb.control('brak danych', Validators.required),
      endHour: fb.control('brak danych', Validators.required)
    })
    this.hours = {} as AvailabilityHours;
  }

  ngOnInit(): void {
    this.hoursAddForm = new FormGroup({
      startHour: new FormControl(this.hours.startHour),
      endHour: new FormControl(this.hours.endHour),
    });
  }

  open(content: any, availability: Availability): void {
    this.modalRef = this.modalService.open(content);
    this.availability = availability;
  }

  closeModal(): void {
    this.modalRef.dismiss();
    this.hoursAddForm.reset();
  }

  saveAvailability(): void {
    const startTime = this.startHour.value;
    const endTime = this.endHour.value;
    if (this.hoursAddForm.valid) {
      this.availability.hoursList.push(new AvailabilityHours(startTime, endTime));
      this.modalService.dismissAll();
      this.hoursAddForm.reset();
    } else {
      this.hoursAddForm.markAllAsTouched();
    }
  }

  get startHour() {
    return this.hoursAddForm.get('startHour')!;
  }

  get endHour() {
    return this.hoursAddForm.get('endHour')!;
  }

}

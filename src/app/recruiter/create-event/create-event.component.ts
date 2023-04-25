import {Component, ViewChild} from '@angular/core';
import {AbstractControl, FormControl, FormGroup, FormGroupDirective, Validators} from "@angular/forms";
import {EventDto} from "../../common/mainpage/EventDto";
import { EventService } from '../../event.service';
import { Router } from '@angular/router';

interface Event {
  name: string;
  description: string;
  duration: string;
  breakTime: string;
  endDate: string;
  maxUsers: boolean;
}

@Component({
  selector: 'app-create-event',
  templateUrl: './create-event.component.html',
  styleUrls: ['./create-event.component.scss'],
  providers: [EventService]
})

export class CreateEventComponent {

  reactiveForm!: FormGroup;
  event: Event;


  private validateTime(control: AbstractControl): { [key: string]: any } | null {
    const time = control.value;
    if (!time) {
      return null;
    }
    const [hours, minutes] = time.split(':').map(Number);
    const timeInMinutes = hours * 60 + minutes;
    if (timeInMinutes < 15) {
      return {invalidTime: true};
    }
    return null;
  }

  private validateTime2(control: AbstractControl): { [key: string]: any } | any {
    const time = control.value;
    const [hours, minutes] = time.split(':').map(Number);
    const timeInMinutes = hours * 60 + minutes;
    return timeInMinutes
  }

  constructor(private eventService: EventService,
              private router: Router) {
    this.event = {} as Event;
  }

  ngOnInit(): void {
    this.reactiveForm = new FormGroup({
      name: new FormControl(this.event.name, [
        Validators.required
      ]),
      description: new FormControl(this.event.description, [
      ]),
      duration: new FormControl(this.event.duration, [
        Validators.required,
        this.validateTime
      ]),
      breakTime: new FormControl(this.event.breakTime, [
        Validators.required
      ]),
      endDate: new FormControl(this.event.endDate, [
        Validators.required
      ]),
      maxUsers: new FormControl(this.event.maxUsers, [
        Validators.required,
        Validators.min(1),
        Validators.max(20),
      ]),
    });
  }

  get name() {
    return this.reactiveForm.get('name')!;
  }

  get description() {
    return this.reactiveForm.get('description')!;
  }

  get duration() {
    return this.reactiveForm.get('duration')!;
  }

  get breakTime() {
    return this.reactiveForm.get('breakTime')!;
  }

  get endDate() {
    return this.reactiveForm.get('endDate')!;
  }

  get maxUsers() {
    return this.reactiveForm.get('maxUsers')!;
  }


  public validate(form: FormGroupDirective): void {
    this.serverValidation(form);
    if (this.reactiveForm.invalid) {
      for (const control of Object.keys(this.reactiveForm.controls)) {
        this.reactiveForm.controls[control].markAsTouched();
      }
      return;
    }
    this.event = this.reactiveForm.value;
    setTimeout(() => {
      this.router.navigate(['/appointments'])
    }, 300);
  }

  serverValidation(f: FormGroupDirective) {
    let formContent = f.value
    let newEvent = new EventDto(
      formContent.name,
      formContent.description,
      "6666-06-06",
      "6666-06-06",
      formContent.endDate,
      formContent.maxUsers,
      60,
      formContent.breakTime,
    )

    this.eventService.createEvent(newEvent).subscribe(
      response => {
        console.log("Successfully added: " + JSON.stringify(response));
      }, exception => {
        let errorsMap = exception.error.errorsMap;
        console.log(errorsMap);
      }
    )
  }
}

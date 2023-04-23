import {Component} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {AbstractControl, FormControl, FormGroup, FormGroupDirective, Validators} from "@angular/forms";
import {EventDto} from "../../common/mainpage/EventDto";

interface Event {
  name: string;
  duration: string;
  breakTime: string;
  endDate: string;
  maxUsers: boolean;
  nickname: string;
  email: string;
  password: string;
  showPassword: boolean;
}

@Component({
  selector: 'app-create-event',
  templateUrl: './create-event.component.html',
  styleUrls: ['./create-event.component.scss']
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

  constructor(private http: HttpClient) {
    this.event = {} as Event;
  }

  ngOnInit(): void {
    this.reactiveForm = new FormGroup({
      name: new FormControl(this.event.name, [
        Validators.required
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
  }

  serverValidation(f: FormGroupDirective) {
    let formContent = f.value
    let newEvent = new EventDto(
      formContent.name,
      formContent.description,
      formContent.startDate,
      formContent.endDate,
      formContent.maxUsers,
      formContent.duration,
      formContent.breakTime)

    const headers = {"Content-Type": "application/json"}
    const options = {"headers": headers}
    this.http.post<any>('http://localhost:8080/events',
      newEvent, options)
      .subscribe(
        response => {
          console.log("Successfully added: " + JSON.stringify(response));
        }, exception => {
          let errorsMap = exception.error.errorsMap;
          console.log(errorsMap);
        });
  }
}

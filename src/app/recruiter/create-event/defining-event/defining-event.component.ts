import {Component, Input} from '@angular/core';
import {FormControl, FormGroup, FormGroupDirective, Validators} from "@angular/forms";
import {EventDto} from "../../../common/mainpage/EventDto";
import {EventService} from "../../../event.service";
import {Router} from "@angular/router";
import {EventUtils} from "../../../common/mainpage/EventUtils";
import {DateValidator} from "../../../shared/validators/date-validator";

@Component({
  selector: 'app-defining-event',
  templateUrl: './defining-event.component.html',
  styleUrls: ['./defining-event.component.scss']
})
export class DefiningEventComponent {
  @Input() isEdit: boolean = false;
  reactiveForm!: FormGroup;
  event: EventDto;
  textAreaValue: string = '';
  minDate: Date = new Date();
  todayDate: Date = new Date();
  hours: string[] = [];
  minutes: string[] = [];

  constructor(private eventService: EventService,
              private router: Router) {
    this.event = {} as EventDto
    this.generateHours();
  }

  ngOnInit(): void {
    document.getElementById('focusReset')?.focus();
    this.initFormGroup();
    this.event = this.eventService.getTemporaryEvent();

    if (this.event) {
      this.patchForm()
    }
  }

  public generateHours() {
    let time: string[] = [];
    for (let hour = 0; hour <= 2; hour++) {
      this.hours.push(hour.toString().padStart(2, '0'));
      for (let minute = 0; minute <= 45; minute += 15) {
        this.minutes.push(minute.toString().padStart(2, '0'));
        time.push(hour.toString().padStart(2, '0') + ':' + minute.toString().padStart(2, '0'))
      }
    }
    time.shift();
    return time;
  }

  public validate(form: FormGroupDirective): void {
    if (this.reactiveForm.invalid) {
      for (const control of Object.keys(this.reactiveForm.controls)) {
        this.reactiveForm.controls[control].markAsTouched();
      }
      return;
    }
    this.saveEvent(form);
  }

  private saveEvent(f: FormGroupDirective) {
    let formContent = f.value

    this.event = new EventDto(
      formContent.name,
      formContent.description,
      formContent.researchStartDate,
      formContent.researchEndDate,
      formContent.endDate,
      formContent.maxUsers,
      EventUtils.convertTimeToMinutes(formContent.surveyDuration),
      formContent.surveyBreakTime,
      formContent.slotsTaken)

    this.eventService.setTemporaryEvent(this.event)
    this.router.navigate(['/availability'])
  }

  goBack() {
    if (this.isEdit) {
      this.router.navigate(['/event/', this.event.id])
    } else {
      this.router.navigate(['/appointments'])
    }
  }

  private patchForm() {
    this.reactiveForm.patchValue({
      name: this.event.name,
      description: this.event.description,
      surveyDuration: EventUtils.convertMinutesToHHMM(this.event.surveyDuration),
      surveyBreakTime: this.event.surveyBreakTime,
      endDate: this.event.endDate,
      maxUsers: this.event.maxUsers,
      researchStartDate: this.event.researchStartDate,
      researchEndDate: this.event.researchEndDate
    })
  }

  private initFormGroup() {
    this.reactiveForm = new FormGroup({
      name: new FormControl(this.event.name, [
        Validators.required
      ]),
      description: new FormControl(this.event.description, [
        Validators.maxLength(150)
      ]),
      surveyDuration: new FormControl(this.event.surveyDuration, [
        Validators.required,
        EventUtils.validateTime
      ]),
      surveyBreakTime: new FormControl(this.event.surveyBreakTime, [
        Validators.required
      ]),
      endDate: new FormControl(this.event.endDate, [
        Validators.required,
        DateValidator
      ]),
      maxUsers: new FormControl(this.event.maxUsers, [
        Validators.required,
        Validators.min(1),
        Validators.max(100),
      ]),
      researchStartDate: new FormControl(this.event.researchStartDate, [
        Validators.required,
        DateValidator]),
      researchEndDate: new FormControl(this.event.researchEndDate, [
        Validators.required,
        DateValidator]),
    });
  }

  public dateToFormat(date: Date, readonly: boolean) {
    const dateFormatted = new Date(date);
    const year = dateFormatted?.getFullYear();
    const month = (dateFormatted.getMonth() + 1).toString().padStart(2, '0');
    const day = dateFormatted?.getDate().toString().padStart(2, '0');

    if (readonly) {
      return (Number(day)-1 + '.' + month + '.' + year)
    }

    return (year + '-' + month + '-' + day)
  }

  public onDateChange(event: any) {
    if (this.researchStartDate.value > this.dateToFormat(this.todayDate, false)) {
      this.minDate = event.target.value;
      this.researchEndDate.updateValueAndValidity();
    }

    if (this.researchEndDate.value < this.researchStartDate.value) {
      this.researchEndDate.setErrors({minDate: true})

    } else {
      this.researchEndDate.setErrors(null)
    }
  }

  public minDateValidate() {
    if (this.researchEndDate.value < this.minDate) {
      this.researchEndDate.setErrors({minDate: true})
    }
    else {
      this.researchEndDate.setErrors(null)
    }
  }

  get name() {
    return this.reactiveForm.get('name')!;
  }

  get description() {
    return this.reactiveForm.get('description')!;
  }

  get surveyDuration() {
    return this.reactiveForm.get('surveyDuration')!;
  }

  get surveyBreakTime() {
    return this.reactiveForm.get('surveyBreakTime')!;
  }

  get endDate() {
    return this.reactiveForm.get('endDate')!;
  }

  get maxUsers() {
    return this.reactiveForm.get('maxUsers')!;
  }

  get researchStartDate() {
    return this.reactiveForm.get('researchStartDate')!;
  }

  get researchEndDate() {
    return this.reactiveForm.get('researchEndDate')!;
  }
}

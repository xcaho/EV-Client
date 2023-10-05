import {Component, ElementRef, Input} from '@angular/core';
import {FormControl, FormGroup, FormGroupDirective, Validators} from "@angular/forms";
import {EventDto} from "../../../common/mainpage/EventDto";
import {EventService} from "../../../event.service";
import {Router} from "@angular/router";
import {EventUtils} from "../../../common/mainpage/EventUtils";

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
  public minDate: string = '';
  public todayDate: Date = new Date();
  hours: string[] = [];
  minutes: string[] = [];

  constructor(private eventService: EventService,
              private router: Router,
              private elementRef: ElementRef) {
    this.event = {} as EventDto
    this.generateHours();
  }

  ngOnInit(): void {
    document.getElementById('focusReset')?.focus();
    this.initFormGroup()
    this.event = this.eventService.getTemporaryEvent()
    if (this.event) {
      this.patchForm()
    }
  }

  generateHours() {
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

  saveEvent(f: FormGroupDirective) {
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
    const element = this.elementRef.nativeElement.querySelector("#maincontent");
    if (element) {
      element.scrollIntoView({block: 'start'});
    }
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
        Validators.required
      ]),
      maxUsers: new FormControl(this.event.maxUsers, [
        Validators.required,
        Validators.min(1),
        Validators.max(100),
      ]),
      researchStartDate: new FormControl(this.event.researchStartDate, [
        Validators.required,]),
      researchEndDate: new FormControl(this.event.researchEndDate, [
        Validators.required,]),
    });
  }

  public onDateChange(event: any) {
    console.log(event.target.value)
    this.minDate = event.target.value;
  }

  public dateToFormat(date: Date) {
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    return (year + '-' + month + '-' + day)
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

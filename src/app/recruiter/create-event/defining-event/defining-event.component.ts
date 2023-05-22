import {Component, Input} from '@angular/core';
import {AbstractControl, FormControl, FormGroup, FormGroupDirective, Validators} from "@angular/forms";
import {EventDto} from "../../../common/mainpage/EventDto";
import {EventService} from "../../../event.service";
import {Router, NavigationExtras} from "@angular/router";
import {EventUtils} from "../../../common/mainpage/EventUtils";

@Component({
  selector: 'app-defining-event',
  templateUrl: './defining-event.component.html',
  styleUrls: ['./defining-event.component.scss'],
  providers: [EventService]
})
export class DefiningEventComponent {
  @Input() isEdit: boolean = false;
  reactiveForm!: FormGroup;
  event: EventDto;
  textareaValue: string = '';


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

  constructor(private eventService: EventService,
              private router: Router) {

    this.event = {} as EventDto
  }

  ngOnInit(): void {
    this.reactiveForm = new FormGroup({
      name: new FormControl(this.event.name, [
        Validators.required
      ]),
      description: new FormControl(this.event.description, [
        Validators.maxLength(150)
      ]),
      surveyDuration: new FormControl(this.event.surveyDuration, [
        Validators.required,
        this.validateTime
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
        Validators.max(20),
      ]),
      researchStartDate: new FormControl(this.event.researchStartDate, [
        Validators.required,]),
      researchEndDate: new FormControl(this.event.researchEndDate, [
        Validators.required,]),
    });

    if (localStorage.getItem("event")) {
      // @ts-ignore
      this.event = JSON.parse(localStorage.getItem("event"))
      this.reactiveForm.patchValue({
        name: this.event.name,
        description: this.event.description,
        surveyDuration: EventUtils.convertMinutesToHHMM(this.event.surveyDuration),
        surveyBreakTime: this.event.surveyBreakTime,
        endDate: this.event.endDate,
        maxUsers: this.event.maxUsers,
        researchStartDate: this.event.researchStartDate,
        researchEndDate: this.event.researchEndDate
      });
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

    const navigationExtras: NavigationExtras = {
      state: {
        startDate: formContent.researchStartDate,
        endDate: formContent.researchEndDate
      }
    };

    localStorage.removeItem("event")
    localStorage.setItem("event", JSON.stringify(this.reactiveForm.value))
    this.router.navigate(['/availability'], navigationExtras)
  }

  goBack() {
    if (this.isEdit) {
      this.router.navigate(['/event/', this.event.id])
    } else {
      localStorage.removeItem("event")
      this.router.navigate(['/appointments'])
    }
  }

}

import {Component} from '@angular/core';
import {AbstractControl, FormControl, FormGroup, FormGroupDirective, Validators} from "@angular/forms";
import {EventDto} from "../../common/mainpage/EventDto";
import {EventService} from '../../event.service';
import {Router} from '@angular/router';
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";

export interface Item {
  name: string;
  hour: string[] | null;
}

@Component({
  selector: 'app-create-event',
  templateUrl: './create-event.component.html',
  styleUrls: ['./create-event.component.scss'],
  providers: [EventService]
})

export class CreateEventComponent {
  reactiveForm!: FormGroup;
  event: EventDto;


  //ITEMS + FUNKCJA OPEN + private modalService: NgbModal W KONSTRUKTORZE DO KOMPONENTU DOSTEPNOSC
  //NA GORZE JEST JESZCZE INTERFACE ITEM ^^^^^^^^^^^^^^^^^^^^^^
  items: Item[] = [
    { name: 'Poniedziałek', hour: ["11:00 - 13:00", "13:30 - 15:00"] },
    { name: 'Wtorek', hour: ["14:00 - 16:00"] },
    { name: 'Środa', hour: ["17:00 - 19:00"] },
    { name: 'Czwartek', hour: null }
  ];

  open(content: any) {
    this.modalService.open(content);
  }


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

  private convertTimeToMinutes(time: string): number {
    const [hours, minutes] = time.split(':').map(Number);
    return hours * 60 + minutes;
  }

  constructor(private eventService: EventService,
              private router: Router,
              private modalService: NgbModal) {
    this.event = {} as EventDto;
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
    let newEvent = new EventDto(
      formContent.name,
      formContent.description,
      formContent.researchStartDate,
      formContent.researchEndDate,
      formContent.endDate,
      formContent.maxUsers,
      this.convertTimeToMinutes(formContent.surveyDuration),
      formContent.surveyBreakTime,
    )

    this.eventService.createEvent(newEvent).subscribe(
      response => {
        console.log("Successfully added: " + JSON.stringify(response));
        this.event = this.reactiveForm.value;
        this.router.navigate(['/appointments'])
      }, exception => {
        let errorsMap = exception.error.errorsMap;
        console.log(errorsMap);
      }
    )
  }

}

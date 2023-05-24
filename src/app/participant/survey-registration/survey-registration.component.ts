import { Component } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";

export interface Event {
  dayChoice: FormControl<string | null>;
  hourChoice: FormControl<string | null>;
}

@Component({
  selector: 'app-survey-registration',
  templateUrl: './survey-registration.component.html',
  styleUrls: ['./survey-registration.component.scss']
})

export class SurveyRegistrationComponent {
  surveyRegistrationForm: FormGroup;
  event: Event = {
    dayChoice: new FormControl(''),
    hourChoice: new FormControl('')
  };

  constructor() {
    this.surveyRegistrationForm = new FormGroup({
      dayChoice: this.event.dayChoice,
      hourChoice: this.event.hourChoice
    })
  }

  get dayChoice() {
    return this.surveyRegistrationForm.get('dayChoice');
  }

  get hourChoice() {
    return this.surveyRegistrationForm.get('hourChoice');
  }

  ngOnInit(): void {
    this.surveyRegistrationForm.get('dayChoice')?.setValidators([Validators.required]);
    this.surveyRegistrationForm.get('hourChoice')?.setValidators([Validators.required]);
  }

}

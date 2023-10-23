import {Component} from '@angular/core';
import {ConfirmationDto} from "../../common/mainpage/ConfirmationDto";
import {SurveyService} from "../../survey.service";

@Component({
  selector: 'app-confirmation',
  templateUrl: './confirmation.component.html',
  styleUrls: ['./confirmation.component.scss']
})
export class ConfirmationComponent {
  confirmation!: ConfirmationDto;
  formEventName: string = "";
  formEventDate: string = "";

  constructor(private surveyService: SurveyService) {
  }

  ngOnInit() {
    document.getElementById('focusReset')?.focus();
    this.confirmation = this.surveyService.getTemporaryConfirmation()
    this.formEventName = this.confirmation.eventName
    this.formEventDate = this.confirmation.dateFormatted
  }
}

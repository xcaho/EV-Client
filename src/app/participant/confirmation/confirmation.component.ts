import {Component} from '@angular/core';
import {ConfirmationDto} from "../../shared/dtos/ConfirmationDto";
import {SurveyService} from "../../survey.service";
import {AlertService} from "../../common/alerts/service/alert.service";

@Component({
  selector: 'app-confirmation',
  templateUrl: './confirmation.component.html',
  styleUrls: ['./confirmation.component.scss']
})
export class ConfirmationComponent {
  private confirmation!: ConfirmationDto;
  public formEventName: string = "";
  public formEventDate: string = "";

  constructor(private surveyService: SurveyService,
              private alertService: AlertService) {
  }

  ngOnInit() {
    document.getElementById('focusReset')?.focus();
    this.alertService.clear();
    this.confirmation = this.surveyService.getTemporaryConfirmation()
    this.formEventName = this.confirmation.eventName
    this.formEventDate = this.confirmation.dateFormatted
  }
}

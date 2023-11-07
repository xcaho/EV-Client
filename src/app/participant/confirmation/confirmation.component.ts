import {Component} from '@angular/core';
import {ConfirmationDto} from "../../shared/dtos/ConfirmationDto";
import {SurveyService} from "../../survey.service";
import {AlertService} from "../../common/alerts/service/alert.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-confirmation',
  templateUrl: './confirmation.component.html',
  styleUrls: ['./confirmation.component.scss']
})
export class ConfirmationComponent {
  private confirmation!: ConfirmationDto;
  public formEventName: string = "";
  public formEventDate: string = "";

  constructor(
    private surveyService: SurveyService,
    private alertService: AlertService,
    private router: Router,
  ) {
  }

  ngOnInit() {
    document.getElementById('focusReset')?.focus();
    this.alertService.clear();
    this.confirmation = this.surveyService.getTemporaryConfirmation();
    if (this.confirmation) {
      this.formEventName = this.confirmation.eventName;
      this.formEventDate = this.confirmation.dateFormatted;
    } else {
      this.router.navigate(['/404'], {skipLocationChange: true});
    }
  }
}

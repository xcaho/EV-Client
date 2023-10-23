import {Component, ElementRef, ViewChild} from '@angular/core';
import {NgbModal, NgbModalRef} from "@ng-bootstrap/ng-bootstrap";
import {SurveyService} from "../../../../survey.service";
import {SurveyDto} from "../../../../shared/dtos/SurveyDto";
import {AlertService} from "../../../../common/alerts/service/alert.service";
import {SurveyState} from "../../../../shared/enums/survey-state";

@Component({
  selector: 'app-delete-code',
  templateUrl: './delete-code.component.html',
  styleUrls: ['./delete-code.component.scss']
})
export class DeleteCodeComponent {
  @ViewChild('content') content: ElementRef | undefined;
  modalRef: NgbModalRef = null!;
  survey: SurveyDto;
  surveyList: SurveyDto[] = [];

  constructor(private modalService: NgbModal,
              private surveyService: SurveyService,
              private alertService: AlertService) {
    this.survey = {} as SurveyDto
  }

  open(content: any, survey: SurveyDto, surveyList: SurveyDto[]): void {
    this.modalRef = this.modalService.open(content);
    this.survey = survey;
    this.surveyList = surveyList;
  }

  deactivateCode() {
    this.survey.surveyState = SurveyState.INACTIVE

    this.surveyService.modifySurvey(this.survey).subscribe((survey) => {
      this.survey.date = new Date(0)

      this.generateNewCode()
      this.closeModal()

      this.alertService.showSuccess('Dezktywowano kod: ' + this.survey.code + '. Nowy kod został wygenerowany.');
    })

  }

  generateNewCode() {
    this.surveyService.saveSurvey(this.survey.eventId).subscribe((survey) => {
      survey.date = new Date(0)
      this.surveyList.push(survey)
    })
  }

  closeModal(): void {
    this.modalRef.dismiss();
  }
}

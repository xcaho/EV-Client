import {Component, ElementRef, ViewChild} from '@angular/core';
import {NgbModal, NgbModalRef} from "@ng-bootstrap/ng-bootstrap";
import {SurveyDto} from "../../../shared/dtos/SurveyDto";
import {SurveyService} from "../../../survey.service";
import {AlertService} from "../../../common/alerts/service/alert.service";

@Component({
  selector: 'app-assign-modal',
  templateUrl: './assign-modal.component.html',
  styleUrls: ['./assign-modal.component.scss']
})
export class AssignModalComponent {
  @ViewChild('content') content: ElementRef | undefined;
  modalRef: NgbModalRef = null!;
  survey: SurveyDto;
  surveyList: SurveyDto[] = [];

  constructor(private modalService: NgbModal,
              private surveyService: SurveyService,
              private alertService: AlertService) {
    this.survey = {} as SurveyDto
  }

  open(content: any,): void {
    this.modalRef = this.modalService.open(content, {ariaLabelledBy: 'modalTitle'});
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

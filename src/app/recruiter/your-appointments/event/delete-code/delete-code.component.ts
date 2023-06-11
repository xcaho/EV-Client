import {Component, ElementRef, ViewChild} from '@angular/core';
import {NgbModal, NgbModalRef} from "@ng-bootstrap/ng-bootstrap";
import {SurveyService} from "../../../../survey.service";
import {SurveyDto, SurveyState} from "../../../../common/mainpage/SurveyDto";
import {Router} from "@angular/router";

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

  constructor(private modalService: NgbModal, private surveyService: SurveyService, private router: Router) {
    this.survey = {} as SurveyDto
  }

  ngOnInit(): void {
  }

  open(content: any, survey: SurveyDto, surveyList: SurveyDto[]): void {
    this.modalRef = this.modalService.open(content);
    this.survey = survey;
    this.surveyList = surveyList;
  }

  deactivateCode() {
    this.survey.surveyState = SurveyState.INACTIVE
    this.surveyService.modifySurvey(this.survey).subscribe((survey) => {
      console.log(survey)

      this.generateNewCode()
      this.closeModal()
    })
  }

  generateNewCode() {
    this.surveyService.saveSurvey(this.survey.eventId).subscribe((survey) => {
      console.log(survey)
      this.surveyList.push(survey)
    })
  }

  closeModal(): void {
    this.modalRef.dismiss();
  }

}

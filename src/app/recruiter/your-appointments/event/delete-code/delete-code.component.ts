import {Component, ElementRef, ViewChild} from '@angular/core';
import {NgbModal, NgbModalRef} from "@ng-bootstrap/ng-bootstrap";
import {SurveyService} from "../../../../survey.service";
import {SurveyDto, SurveyState} from "../../../../common/mainpage/SurveyDto";
import {EventDto} from "../../../../common/mainpage/EventDto";
import {EventService} from "../../../../event.service";

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
  event: EventDto;

  constructor(private modalService: NgbModal, private surveyService: SurveyService, private eventService: EventService) {
    this.survey = {} as SurveyDto
    this.event = {} as EventDto
  }

  ngOnInit(): void {
  }

  open(content: any, survey: SurveyDto, surveyList: SurveyDto[], event: EventDto): void {
    this.modalRef = this.modalService.open(content);
    this.survey = survey;
    this.surveyList = surveyList;
    this.event = event;
  }

  deactivateCode() {
    this.survey.surveyState = SurveyState.INACTIVE

    this.surveyService.modifySurvey(this.survey).subscribe((survey) => {
      console.log(survey)
      this.survey.date = new Date(0)

      this.generateNewCode()
      this.closeModal()
      this.eventService.modifyEvent(this.event).subscribe((event) => {
        console.log(event.slotsTaken);
      })
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

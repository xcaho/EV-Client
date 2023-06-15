import {Component, ElementRef, ViewChild} from '@angular/core';
import {NgbModal, NgbModalRef} from "@ng-bootstrap/ng-bootstrap";
import {EventDto} from "../../../../common/mainpage/EventDto";
import {EventService} from "../../../../event.service";
import {SurveyDto, SurveyState} from "../../../../common/mainpage/SurveyDto";
import {SurveyService} from "../../../../survey.service";

@Component({
  selector: 'app-delete-event',
  templateUrl: './delete-event.component.html',
  styleUrls: ['./delete-event.component.scss']
})
export class DeleteEventComponent {
  @ViewChild('content') content: ElementRef | undefined;
  modalRef: NgbModalRef = null!;
  event: EventDto;
  surveyList: SurveyDto[] = [];

  constructor(private modalService: NgbModal, private eventService: EventService,
              private surveyService: SurveyService) {

    this.event = {} as EventDto
  }

  ngOnInit(): void {
  }

  open(content: any, event: EventDto, surveyList: SurveyDto[]): void {
    this.modalRef = this.modalService.open(content);
    this.event = event;
    this.surveyList = surveyList;
  }

  closeEvent() {
    this.event.active = false
    this.eventService.modifyEvent(this.event).subscribe((event) => {
      console.log(event)

      this.deactivateCodes()
      this.closeModal()
    })
  }

  deactivateCodes() {
    this.surveyList.forEach(survey => {
      survey.surveyState = SurveyState.INACTIVE
      this.surveyService.modifySurvey(survey).subscribe((surveyRes) => {
        console.log(surveyRes)
      })
    })
  }

  closeModal(): void {
    this.modalRef.dismiss();
  }
}

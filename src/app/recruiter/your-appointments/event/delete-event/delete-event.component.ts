import {Component, ElementRef, ViewChild} from '@angular/core';
import {NgbModal, NgbModalRef} from "@ng-bootstrap/ng-bootstrap";
import {EventDto} from "../../../../common/mainpage/EventDto";
import {EventService} from "../../../../event.service";
import {SurveyDto} from "../../../../common/mainpage/SurveyDto";

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

  constructor(private modalService: NgbModal,
              private eventService: EventService) {

    this.event = {} as EventDto
  }

  ngOnInit(): void {
    document.getElementById('focusReset')?.focus();
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

      this.closeModal()
    })
  }

  closeModal(): void {
    this.modalRef.dismiss();
  }
}

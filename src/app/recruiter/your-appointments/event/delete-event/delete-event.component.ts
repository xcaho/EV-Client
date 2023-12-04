import {Component, ElementRef, ViewChild} from '@angular/core';
import {NgbModal, NgbModalRef} from "@ng-bootstrap/ng-bootstrap";
import {EventDto} from "../../../../shared/dtos/EventDto";
import {EventService} from "../../../../event.service";
import {SurveyDto} from "../../../../shared/dtos/SurveyDto";
import {AlertService} from "../../../../common/alerts/service/alert.service";

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
              private eventService: EventService,
              private alertService: AlertService) {

    this.event = {} as EventDto
  }

  open(content: any, event: EventDto, surveyList: SurveyDto[]): void {
    this.modalRef = this.modalService.open(content, {ariaLabelledBy: 'modalTitle'});
    this.event = event;
    this.surveyList = surveyList;
  }

  closeEvent() {
    this.event.active = false;
    this.eventService.modifyEvent(this.event).subscribe((event) => {
      this.closeModal()
    });
    this.alertService.showInfo('Wydarzenie zostało zamknięte, wszystkie spotkania zostały anulowane.')
  }

  closeModal(): void {
    this.modalRef.dismiss();
  }
}

import {Component, ElementRef, ViewChild} from '@angular/core';
import {NgbModal, NgbModalRef} from "@ng-bootstrap/ng-bootstrap";
import {EventDto} from "../../../../shared/dtos/EventDto";
import {SurveyDto} from "../../../../shared/dtos/SurveyDto";

@Component({
  selector: 'app-view-consent-modal',
  templateUrl: './view-consent-modal.component.html',
  styleUrls: ['./view-consent-modal.component.scss']
})
export class ViewConsentModalComponent {
  @ViewChild('content') content: ElementRef | undefined;
  modalRef: NgbModalRef = null!;
  event: EventDto;
  surveyList: SurveyDto[] = [];

  constructor(private modalService: NgbModal,) {

    this.event = {} as EventDto
  }

  open(content: any): void {
    this.modalRef = this.modalService.open(content, {ariaLabelledBy: 'modalTitle'});
  }

  closeModal(): void {
    this.modalRef.dismiss();
  }
}

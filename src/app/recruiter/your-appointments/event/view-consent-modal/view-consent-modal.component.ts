import {Component, ElementRef, ViewChild} from '@angular/core';
import {NgbModal, NgbModalRef} from "@ng-bootstrap/ng-bootstrap";
import {EventDto} from "../../../../shared/dtos/EventDto";
import {SurveyDto} from "../../../../shared/dtos/SurveyDto";
import {ConsentService} from "../../../../shared/services/consent.service";
import {ConsentDto} from "../../../../shared/dtos/ConsentDto";

@Component({
  selector: 'app-view-consent-modal',
  templateUrl: './view-consent-modal.component.html',
  styleUrls: ['./view-consent-modal.component.scss']
})
export class ViewConsentModalComponent {
  @ViewChild('content') content: ElementRef | undefined;
  modalRef: NgbModalRef = null!;
  survey: SurveyDto;
  consentList: ConsentDto[] = []

  constructor(private modalService: NgbModal, private consentService: ConsentService) {

    this.survey = {} as SurveyDto
  }

  open(content: any, survey: SurveyDto): void {

    this.survey = survey;

    this.consentService.getConsentsForSurvey(this.survey.id).subscribe( consents => {
      this.consentList = consents;
      this.modalRef = this.modalService.open(content, {ariaLabelledBy: 'modalTitle'});
    })
  }

  closeModal(): void {
    this.modalRef.dismiss();
  }
}

import {Component, ElementRef, ViewChild} from '@angular/core';
import {NgbModal, NgbModalRef} from "@ng-bootstrap/ng-bootstrap";
import {SurveyDto} from "../../../../shared/dtos/SurveyDto";
import {ConsentService} from "../../../../shared/services/consent.service";
import {ConsentDto} from "../../../../shared/dtos/ConsentDto";
import { HttpResponse } from '@angular/common/http';

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

  open(content: any, survey: SurveyDto, eventId: number): void {

    this.survey = survey;

    this.consentService.getConsentsForSurvey(this.survey.id).subscribe( consents => {

      this.consentList = consents;

      this.consentService.getSurveysCsv(eventId).subscribe(response => {

        this.downloadCsv(response);
      })

      this.consentService.getConsentsCsv(eventId).subscribe(response => {

        this.downloadCsv(response)
      })

      this.modalRef = this.modalService.open(content, {ariaLabelledBy: 'modalTitle'});
    })
  }

  private downloadCsv(response: HttpResponse<string>) {
    if (response.body) {
      const blob = new Blob([response.body], {type: 'text/csv'});
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = <string>response.headers.get('Content-Disposition')?.substring(21);
      a.click();
      window.URL.revokeObjectURL(url);
    }
  }

  closeModal(): void {
    this.modalRef.dismiss();
  }
}

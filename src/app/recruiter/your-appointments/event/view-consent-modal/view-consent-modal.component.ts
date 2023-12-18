import {Component, ElementRef, ViewChild} from '@angular/core';
import {NgbModal, NgbModalRef} from "@ng-bootstrap/ng-bootstrap";
import {SurveyDto} from "../../../../shared/dtos/SurveyDto";
import {ConsentService} from "../../../../shared/services/consent.service";
import {ConsentDto} from "../../../../shared/dtos/ConsentDto";
import { HttpResponse } from '@angular/common/http';
import {AlertService} from "../../../../common/alerts/service/alert.service";
import {PreloaderService} from "../../../../shared/services/preloader.service";

@Component({
  selector: 'app-view-consent-modal',
  templateUrl: './view-consent-modal.component.html',
  styleUrls: ['./view-consent-modal.component.scss']
})
export class ViewConsentModalComponent {
  @ViewChild('content') content: ElementRef | undefined;
  modalRef: NgbModalRef = null!;
  survey: SurveyDto;
  consentList: ConsentDto[] = [];
  allConsents: ConsentDto[] = [];
  public eventId: number | null = null;

  constructor(private modalService: NgbModal,
              private consentService: ConsentService,
              private alertService: AlertService,
              private preloader: PreloaderService) {

    this.survey = {} as SurveyDto
  }

  open(content: any, survey: SurveyDto, eventId: number): void {
    this.survey = survey;
    this.eventId = eventId;
    this.modalRef = this.modalService.open(content, {ariaLabelledBy: 'modalTitle'});
    this.preloader.show();

    this.consentService.getConsentsForSurvey(this.survey.id).subscribe( consents => {
      this.consentList = consents;
      this.preloader.hide();

    });

    this.consentService.getConsentsForEvent(this.eventId).subscribe( consents => {
      this.allConsents = consents;
      this.isConsentInList('asd')
    });
  }

  isConsentInList(content: string): boolean {
    return this.consentList.some(userConsent => userConsent.content === content);
  }

  public downloadConsents(id: number | null) {
    if (id !== null) {
      this.consentService.getSurveysCsv(id).subscribe(response => {
        this.downloadCsv(response);
      });

      this.consentService.getConsentsCsv(id).subscribe(response => {
        this.downloadCsv(response)
      });
    } else {
      this.alertService.showError('Błąd pobierania zgód.')
    }
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

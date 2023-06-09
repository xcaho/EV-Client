import {Component, ElementRef, ViewChild} from '@angular/core';
import {NgbModal, NgbModalRef} from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: 'app-delete-code',
  templateUrl: './delete-code.component.html',
  styleUrls: ['./delete-code.component.scss']
})
export class DeleteCodeComponent {
  @ViewChild('content') content: ElementRef | undefined;
  modalRef: NgbModalRef = null!;
  public survey:any;

  constructor(private modalService: NgbModal) {
  }

  ngOnInit(): void {
  }

  open(content: any, survey: any): void {
    this.modalRef = this.modalService.open(content);
    this.survey = survey;
  }

  closeModal(): void {
    this.modalRef.dismiss();
  }

}

import {Component, ElementRef, ViewChild} from '@angular/core';
import {NgbModal, NgbModalRef} from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: 'app-delete-event',
  templateUrl: './delete-event.component.html',
  styleUrls: ['./delete-event.component.scss']
})
export class DeleteEventComponent {
  @ViewChild('content') content: ElementRef | undefined;
  modalRef: NgbModalRef = null!;

  constructor(private modalService: NgbModal) {
  }

  ngOnInit(): void {
  }

  open(content: any): void {
    this.modalRef = this.modalService.open(content);
  }

  closeModal(): void {
    this.modalRef.dismiss();
  }
}

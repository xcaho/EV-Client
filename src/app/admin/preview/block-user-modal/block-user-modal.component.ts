import {Component, ElementRef, ViewChild} from '@angular/core';
import {NgbModal, NgbModalRef} from "@ng-bootstrap/ng-bootstrap";
import {AlertService} from "../../../common/alerts/service/alert.service";

@Component({
  selector: 'app-block-user-modal',
  templateUrl: './block-user-modal.component.html',
  styleUrls: ['./block-user-modal.component.scss']
})
export class BlockUserModalComponent {
  @ViewChild('content') content: ElementRef | undefined;
  private modalRef: NgbModalRef = null!;

  constructor(private modalService: NgbModal,
              private alertService: AlertService,) {
  }

  public open(content: any): void {
    this.modalRef = this.modalService.open(content, {ariaLabelledBy: 'modalTitle'});
  }

  public closeModal(): void {
    this.modalRef?.dismiss();
  }

  public blockUser() {

  }
}

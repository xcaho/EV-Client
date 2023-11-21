import {Component, ElementRef, ViewChild} from '@angular/core';
import {NgbModal, NgbModalRef} from "@ng-bootstrap/ng-bootstrap";
import {AlertService} from "../../../common/alerts/service/alert.service";
import {AdminService} from "../../../shared/services/admin.service";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-block-user-modal',
  templateUrl: './block-user-modal.component.html',
  styleUrls: ['./block-user-modal.component.scss']
})
export class BlockUserModalComponent {
  @ViewChild('content') content: ElementRef | undefined;
  private modalRef: NgbModalRef = null!;
  private userId: number = 0;

  constructor(private modalService: NgbModal,
              private alertService: AlertService,
              private adminService: AdminService,
              private route: ActivatedRoute) {

    this.route.params.subscribe(params => {
      this.userId = params['id'];
    });
  }

  public open(content: any): void {
    this.modalRef = this.modalService.open(content, {ariaLabelledBy: 'modalTitle'});
  }

  public closeModal(): void {
    this.modalRef?.dismiss();
  }

  public blockUser() {
    this.adminService.blockUser(this.userId).subscribe(user => {
      console.log('Blocked user:')
      console.log(user)
    })
    this.closeModal()
  }
}

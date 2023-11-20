import {Component, ElementRef, ViewChild} from '@angular/core';
import {NgbModal, NgbModalRef} from "@ng-bootstrap/ng-bootstrap";
import {AlertService} from "../../../common/alerts/service/alert.service";

@Component({
  selector: 'app-assign-modal',
  templateUrl: './assign-modal.component.html',
  styleUrls: ['./assign-modal.component.scss']
})
export class AssignModalComponent {
  @ViewChild('content') content: ElementRef | undefined;
  private modalRef: NgbModalRef = null!;
  public users: string[] = [
    'Paweł Gaweł',
    'Szymon Mazi',
    'Fabian Fabianowski',
    'Mazi Szymon',
    'Mateusz Mati',
    'Gaweł Paweł'
  ];
  public appointmentHolder: string = 'Szymon Mazi';
  public displayedUsers: string[] = [];
  public numberOfShowedUsers: number = 4;

  constructor(private modalService: NgbModal,
              private alertService: AlertService) {
  }

  public open(content: any): void {
    this.modalRef = this.modalService.open(content, {ariaLabelledBy: 'modalTitle'});
    this.displayedUsers = [];
    this.sortUsers();
    this.loadMoreResults();
  }

  public closeModal(): void {
    this.modalRef?.dismiss();
  }

  private sortUsers(): void {
    this.users.sort((a, b) => {
      if (a === this.appointmentHolder) {
        return -1;
      } else if (b === this.appointmentHolder) {
        return 1;
      } else {
        return 0;
      }
    });
  }

  public loadMoreResults(): void {
    const startIndex = this.displayedUsers.length;
    const endIndex = startIndex + this.numberOfShowedUsers;
    this.displayedUsers = [...this.displayedUsers, ...this.users.slice(startIndex, endIndex)];
  }

  public save(): void {
  }
}

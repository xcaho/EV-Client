import {Component, ElementRef, ViewChild} from '@angular/core';
import {NgbModal, NgbModalRef} from "@ng-bootstrap/ng-bootstrap";
import { User } from 'src/app/shared/dtos/User';
import {AlertService} from "../../../common/alerts/service/alert.service";
import {AdminService} from "../../../shared/services/admin.service";
import {EventDto} from "../../../shared/dtos/EventDto";

@Component({
  selector: 'app-assign-modal',
  templateUrl: './assign-modal.component.html',
  styleUrls: ['./assign-modal.component.scss']
})
export class AssignModalComponent {
  @ViewChild('content') content: ElementRef | undefined;
  private modalRef: NgbModalRef = null!;
  public users: User[] = [];
  public appointmentHolder: string = 'Szymon Mazi';
  public displayedUsers: User[] = [];
  public numberOfShowedUsers: number = 4;
  private event!: EventDto;
  public checkedUser! :any;

  constructor(private modalService: NgbModal,
              private alertService: AlertService,
              private adminService: AdminService) {
  }

  ngOnInit() {
    this.adminService.getAllUsers().subscribe(users => {
      this.users = users;
    })
  }

  public open(content: any, event: EventDto): void {
    this.modalRef = this.modalService.open(content, {ariaLabelledBy: 'modalTitle'});
    this.event = event;
    this.sortUsers();
    this.loadMoreResults();
  }

  public closeModal(): void {
    this.modalRef?.dismiss();
  }

  private sortUsers(): void {
    this.users.sort((a, b) => {
      if (a.name === this.appointmentHolder) {
        return -1;
      } else {
        if (b.name === this.appointmentHolder) {
                return 1;
              } else {
                return 0;
              }
      }
    });
  }

  public loadMoreResults(): void {
    const startIndex = this.displayedUsers.length;
    const endIndex = startIndex + this.numberOfShowedUsers;
    this.displayedUsers = [...this.displayedUsers, ...this.users.slice(startIndex, endIndex)];
  }

  public save(): void {
    console.log(this.checkedUser)
  }
}

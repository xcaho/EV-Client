import {Component, ElementRef, EventEmitter, Output, ViewChild} from '@angular/core';
import {NgbModal, NgbModalRef} from "@ng-bootstrap/ng-bootstrap";
import {User} from 'src/app/shared/dtos/User';
import {AlertService} from "../../../common/alerts/service/alert.service";
import {AdminService} from "../../../shared/services/admin.service";
import {EventDto} from "../../../shared/dtos/EventDto";
import {FormControl, FormGroup} from "@angular/forms";
import {EventService} from "../../../event.service";
import {PreloaderService} from "../../../shared/services/preloader.service";

@Component({
  selector: 'app-assign-modal',
  templateUrl: './assign-modal.component.html',
  styleUrls: ['./assign-modal.component.scss']
})
export class AssignModalComponent {
  @ViewChild('content') content: ElementRef | undefined;
  private modalRef: NgbModalRef = null!;
  public users: User[] = [];
  public eventOwner: number = 0;
  public displayedUsers: User[] = [];
  private event!: EventDto;
  public formGroup!: FormGroup;
  @Output() modalClosed: EventEmitter<void> = new EventEmitter<void>();

  constructor(private modalService: NgbModal,
              private alertService: AlertService,
              private adminService: AdminService,
              private eventService: EventService,
              private preloader: PreloaderService,) {
  }

  ngOnInit() {
    this.adminService.getAllUsers().subscribe(users => {
      this.users = users;
    });
  }

  public open(content: any, event: EventDto, eventOwner: number): void {
    this.modalRef = this.modalService.open(content, {ariaLabelledBy: 'modalTitle'});
    this.event = event;
    this.eventOwner = Number(eventOwner);

    this.initFormGroup();
  }

  public closeModal(): void {
    this.modalRef?.dismiss();
    this.modalClosed.emit();
  }

  private initFormGroup() {
    this.formGroup = new FormGroup({
      users: new FormControl(this.eventOwner),
    });
  }

  public save(): void {
    this.preloader.show();
    if (this.formGroup.get('users')?.value !== this.eventOwner) {
      this.adminService.getUser(this.formGroup.get('users')?.value).subscribe(selectedUser => {

        this.adminService.reassignUser(selectedUser.id, this.event.id).subscribe(eventDto => {
          this.closeModal();
          this.alertService.showSuccess('Przypisano wydarzenie ' + this.event.name + ' do użytkownika ' + selectedUser.name + '.');
          this.preloader.hide();
        })
      })
    } else {
      this.closeModal();
      this.preloader.hide();
    }
  }
}

import {Component, HostListener, ViewChild} from '@angular/core';
import {User} from "../../shared/dtos/User";
import {faArrowUpRightFromSquare, faEdit} from "@fortawesome/free-solid-svg-icons";
import {AssignModalComponent} from "./assign-modal/assign-modal.component";
import {AlertService} from "../../common/alerts/service/alert.service";
import {ResetPasswordModalComponent} from "./reset-password-modal/reset-password-modal.component";
import {BlockUserModalComponent} from "./block-user-modal/block-user-modal.component";

@Component({
  selector: 'app-preview',
  templateUrl: './preview.component.html',
  styleUrls: ['./preview.component.scss']
})
export class PreviewComponent {
  public user: User;
  public edit = faEdit;
  public open = faArrowUpRightFromSquare;
  public showMore: boolean = false;
  @ViewChild(AssignModalComponent) assignModalComponent!: AssignModalComponent;
  @ViewChild(ResetPasswordModalComponent) resetPasswordModalComponent!: ResetPasswordModalComponent;
  @ViewChild(BlockUserModalComponent) blockUserModalComponent!: BlockUserModalComponent;
  @HostListener('document:click', ['$event'])
  private handleClickOutside(event: Event) {
    const target = event.target as HTMLElement;
    if (!target.closest('.btn-outline-primary') && !target.closest('#showMore')) {
      this.showMore = false;
    }
  }

  constructor(
    private alertService: AlertService
  ) {
    this.user = {
      email: '123',
      password: '123'
    } as User;
  }

  ngOnInit() {

  }

  public toggleShowMore(event: any) {
    this.showMore = !this.showMore;
    event.target.setAttribute('aria-expanded', this.showMore.toString());
  }
}

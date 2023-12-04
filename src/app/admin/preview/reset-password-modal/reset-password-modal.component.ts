import {Component, ElementRef, ViewChild} from '@angular/core';
import {NgbModal, NgbModalRef} from "@ng-bootstrap/ng-bootstrap";
import {AlertService} from "../../../common/alerts/service/alert.service";
import {AuthService} from "../../../shared/services/auth.service";
import {ShowNewPasswordModalComponent} from "./show-new-password-modal/show-new-password-modal.component";
import {PreloaderService} from "../../../shared/services/preloader.service";

@Component({
  selector: 'app-reset-password-modal',
  templateUrl: './reset-password-modal.component.html',
  styleUrls: ['./reset-password-modal.component.scss']
})
export class ResetPasswordModalComponent {
  @ViewChild('content') content: ElementRef | undefined;
  @ViewChild(ShowNewPasswordModalComponent) showNewPasswordModalComponent!: ShowNewPasswordModalComponent;
  private modalRef: NgbModalRef = null!;
  public userId: number = 0;

  constructor(private modalService: NgbModal,
              private alertService: AlertService,
              private authService: AuthService,
              private preloader: PreloaderService,
  ) {
  }

  public open(content: any, id: number): void {
    this.modalRef = this.modalService.open(content, {ariaLabelledBy: 'modalTitle'});
    this.userId = id;
  }

  public closeModal(): void {
    this.modalRef?.dismiss();
  }

  public submit(): void {
    this.preloader.show()
    this.generateNewPassword();
  }

  public generateNewPassword() {
    this.authService.resetPassword(this.userId).subscribe(passwordDto => {
      this.closeModal();
      this.showNewPasswordModalComponent.open(this.showNewPasswordModalComponent.content, passwordDto.password);
      this.preloader.hide();
      this.alertService.showSuccess('Wygenerowano nowe tymczasowe hasło dla użytkownika.');
    });
  }
}

import {Component, ElementRef, ViewChild} from '@angular/core';
import {NgbModal, NgbModalRef} from "@ng-bootstrap/ng-bootstrap";
import {AlertService} from "../../../common/alerts/service/alert.service";
import {faCopy, faEye, faEyeSlash} from "@fortawesome/free-solid-svg-icons";
import {ClipboardService} from "ngx-clipboard";
import {AuthService} from "../../../shared/services/auth.service";

@Component({
  selector: 'app-reset-password-modal',
  templateUrl: './reset-password-modal.component.html',
  styleUrls: ['./reset-password-modal.component.scss']
})
export class ResetPasswordModalComponent {
  @ViewChild('content') content: ElementRef | undefined;
  private modalRef: NgbModalRef = null!;
  public isPasswordShown: boolean = false;
  public buttonTitle: string = "Pokaż hasło";
  public temporaryPassword: string = "HasloJestTajne";
  public eye = faEye;
  public eyeSlash = faEyeSlash;
  public copy = faCopy;
  public userId: number = 0;

  constructor(private modalService: NgbModal,
              private alertService: AlertService,
              private clipboardService: ClipboardService,
              private authServce: AuthService,) {
  }

  public open(content: any, id: number): void {
    this.modalRef = this.modalService.open(content, {ariaLabelledBy: 'modalTitle'});
    this.userId = id;
  }

  public closeModal(): void {
    this.modalRef?.dismiss();
  }

  public passwordShowToggler() {
    this.isPasswordShown = !this.isPasswordShown;
    if (!this.isPasswordShown) {
      this.buttonTitle = 'Pokaż hasło';
    } else {
      this.buttonTitle = 'Ukryj hasło';
    }
  }

  public copyToClipboard(password: string) {
    this.clipboardService.copyFromContent(password);
    this.alertService.showInfo('Skopiowano hasło tymczasowe.')
  }

  public generateNewPassword() {
    this.authServce.resetPassword(this.userId);
    // this.alertService.showSuccess('Wygenerowano nowe tymczasowe hasło dla użytkownika.');
  }
}

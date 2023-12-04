import {Component, ElementRef, ViewChild} from '@angular/core';
import {NgbModal, NgbModalRef} from "@ng-bootstrap/ng-bootstrap";
import {AlertService} from "../../../../common/alerts/service/alert.service";
import {ClipboardService} from "ngx-clipboard";
import {faCopy, faEye, faEyeSlash} from "@fortawesome/free-solid-svg-icons";

@Component({
  selector: 'app-show-new-password-modal',
  templateUrl: './show-new-password-modal.component.html',
  styleUrls: ['./show-new-password-modal.component.scss']
})
export class ShowNewPasswordModalComponent {

  @ViewChild('content') content: ElementRef | undefined;
  private modalRef: NgbModalRef = null!;
  public isPasswordShown: boolean = false;
  public buttonTitle: string = "Pokaż hasło";
  public newPassword: string = "HasloJestTajne";
  public eye = faEye;
  public eyeSlash = faEyeSlash;
  public copy = faCopy;

  constructor(private modalService: NgbModal,
              private alertService: AlertService,
              private clipboardService: ClipboardService,
  ) {
  }

  public open(content: any, password: string): void {
    this.modalRef = this.modalService.open(content, {ariaLabelledBy: 'modalTitle'});
    this.newPassword = password;
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
}

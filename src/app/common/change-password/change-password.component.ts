import { Component } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {faEye, faEyeSlash} from "@fortawesome/free-solid-svg-icons";
import {AuthService} from "../../shared/services/auth.service";
import {TitleService} from "../../shared/services/title.service";
import {AlertService} from "../alerts/service/alert.service";
import {PasswordValidator} from "../../shared/validators/password-validator";
import { passwordMatchValidator } from 'src/app/shared/validators/password-match-validator';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent {
  public formGroup!: FormGroup;
  public eye = faEye;
  public eyeSlash = faEyeSlash;
  public oldPasswdShown: boolean = false;
  public newPasswdShown: boolean = false;
  public repeatNewPasswdShown: boolean = false;
  public buttonTitle1: string = "Pokaż hasło";
  public buttonTitle2: string = "Pokaż hasło";
  public buttonTitle3: string = "Pokaż hasło";

  constructor(
    private authService: AuthService,
    private titleService: TitleService,
    private alertService: AlertService,
  ) {
  }

  ngOnInit() {
    document.getElementById('focusReset')?.focus();
    this.titleService.setTitle('Formularz zmiany hasła');
    this.initFormGroup();
  }

  private initFormGroup() {
    this.formGroup = new FormGroup({
      oldPassword: new FormControl('', [Validators.required]),
      newPassword: new FormControl('', [Validators.required, PasswordValidator]),
      repeatNewPassword: new FormControl('', [Validators.required, PasswordValidator]),
    }, { validators: passwordMatchValidator })
  }

  public validateForm() {
    let noErrors: boolean = true;

    Object.keys(this.formGroup.controls).forEach(key => {
      if (this.formGroup.get(key)?.invalid) {
        this.formGroup.get(key)?.markAsTouched();
        noErrors = false;
      }
    })

    return noErrors;
  }

  public save() {
    // TODO: ZROBIC
    if (this.validateForm()) {
      let formGroupValue = this.formGroup.value;

    } else {
      this.alertService.showError('Uzupełnij wymagane pola.')
    }
  }

  public passwordShowToggler() {
    this.oldPasswdShown = !this.oldPasswdShown;
    if (!this.oldPasswdShown) {
      this.buttonTitle1 = 'Pokaż hasło';
    } else {
      this.buttonTitle1 = 'Ukryj hasło';
    }
  }

  public passwordShowToggler2() {
    this.newPasswdShown = !this.newPasswdShown;
    if (!this.newPasswdShown) {
      this.buttonTitle2 = 'Pokaż hasło';
    } else {
      this.buttonTitle2 = 'Ukryj hasło';
    }
  }

  public passwordShowToggler3() {
    this.repeatNewPasswdShown = !this.repeatNewPasswdShown;
    if (!this.repeatNewPasswdShown) {
      this.buttonTitle3 = 'Pokaż hasło';
    } else {
      this.buttonTitle3 = 'Ukryj hasło';
    }
  }

  get oldPassword() {
    return this.formGroup.get('oldPassword')!;
  }

  get newPassword() {
    return this.formGroup.get('newPassword')!;
  }

  get repeatNewPassword() {
    return this.formGroup.get('repeatNewPassword')!;
  }
}

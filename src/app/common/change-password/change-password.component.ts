import {Component} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {faEye, faEyeSlash} from "@fortawesome/free-solid-svg-icons";
import {AuthService} from "../../shared/services/auth.service";
import {TitleService} from "../../shared/services/title.service";
import {AlertService} from "../alerts/service/alert.service";
import {PasswordValidator} from "../../shared/validators/password-validator";
import {passwordMatchValidator} from 'src/app/shared/validators/password-match-validator';
import {AdminService} from "../../shared/services/admin.service";
import {Router} from "@angular/router";
import {PasswordDto} from "../../shared/dtos/PasswordDto";

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
  private token: string | null = null;

  constructor(
    public authService: AuthService,
    private titleService: TitleService,
    private alertService: AlertService,
    private adminService: AdminService,
    private router: Router,
  ) {
    this.token = this.authService.token;
  }

  ngOnInit() {
    if (this.authService.isTokenExpired(this.token)) {
      this.authService.removeToken();
      this.authService.saveURL(this.router);
      this.router.navigate(['/login']);

    } else {
      document.getElementById('focusReset')?.focus();
      this.titleService.setTitle('Formularz zmiany hasła');
      this.initFormGroup();
    }
  }

  private initFormGroup() {
    this.formGroup = new FormGroup({
      oldPassword: new FormControl('', [Validators.required]),
      newPassword: new FormControl('', [Validators.required, PasswordValidator]),
      repeatNewPassword: new FormControl('', [Validators.required, PasswordValidator]),
    }, {validators: passwordMatchValidator})
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
    if (this.validateForm()) {
      this.adminService.changePassword(Number(this.authService.getUserId()), new PasswordDto(this.newPassword.value, this.oldPassword.value))
        .subscribe(passwordDto => {
          console.log(passwordDto.password)
          this.alertService.showSuccess('Zmieniono hasło.');
        })
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

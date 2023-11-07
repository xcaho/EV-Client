import {Component} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../../shared/services/auth.service";
import {EmailValidator} from "../../shared/validators/email-validator";
import {PasswordValidator} from "../../shared/validators/password-validator";
import {TitleService} from "../../shared/services/title.service";
import {faEye, faEyeSlash} from "@fortawesome/free-solid-svg-icons";
import {AlertService} from "../alerts/service/alert.service";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  public formGroup!: FormGroup;
  public eye = faEye;
  public eyeSlash = faEyeSlash;
  public passwdShown: boolean = false;
  public isEmailEmpty: string = '';
  public buttonTitle: string = "Pokaż hasło";

  constructor(
    private authService: AuthService,
    private titleService: TitleService,
    private alertService: AlertService,
  ) {
  }

  ngOnInit() {
    document.getElementById('focusReset')?.focus();
    this.titleService.setTitle('Rejestracja');
    this.initFormGroup();
  }

  private initFormGroup() {
    this.formGroup = new FormGroup({
      email: new FormControl('', [Validators.required, EmailValidator]),
      password: new FormControl('', [Validators.required, PasswordValidator]),
    })
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
      this.authService.create(this.formGroup.value).subscribe(result => {
        if (result.success) {
          this.alertService.showSuccess('Zarejestrowano pomyślnie.')
          console.log('success')
          console.log(result.message)
        } else {
          this.alertService.showError('Wystąpił błąd, spróbuj ponownie.')
          console.log('fail')
          console.log(result.message)
        }
      })
    } else {
      this.alertService.showError('Uzupełnij wymagane pola.')
    }
  }

  public passwordShowToggler() {
    this.passwdShown = !this.passwdShown;
    if (!this.passwdShown) {
      this.buttonTitle = 'Pokaż hasło';
    } else {
      this.buttonTitle = 'Ukryj hasło';
    }
  }

  get email() {
    return this.formGroup.get('email')!;
  }

  get password() {
    return this.formGroup.get('password')!;
  }
}

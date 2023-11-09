import {Component} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../../shared/services/auth.service";
import {EmailValidator} from "../../shared/validators/email-validator";
import {PasswordValidator} from "../../shared/validators/password-validator";
import {TitleService} from "../../shared/services/title.service";
import {faEye, faEyeSlash} from "@fortawesome/free-solid-svg-icons";
import {AlertService} from "../alerts/service/alert.service";
import {User} from "../../shared/dtos/User";
import {Router} from "@angular/router";

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
    private router: Router,
  ) {
  }

  ngOnInit() {
    if (this.authService.token) {
      this.router.navigate(['/appointments']);
    }
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

      let formGroupValue = this.formGroup.value
      let user = new User(formGroupValue.email, formGroupValue.password)

      this.authService.create(user).subscribe(result => {

        if (result.token) {
          let token = result.token;
          localStorage.setItem('token', token);
          this.alertService.showSuccess('Pomyślnie utworzono konto.')
          this.router.navigate(['login']);

        } else {
          this.alertService.showError('Wystąpił błąd, spróbuj ponownie.')
          console.log('fail')
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

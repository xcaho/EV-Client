import {Component} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../../shared/services/auth.service";
import {TitleService} from "../../shared/services/title.service";
import {faEye, faEyeSlash} from "@fortawesome/free-solid-svg-icons";
import {AlertService} from "../alerts/service/alert.service";
import {User} from "../../shared/dtos/User";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  public formGroup!: FormGroup;
  public eye = faEye;
  public eyeSlash = faEyeSlash;
  public passwdShown: boolean = false;
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
    this.titleService.setTitle('Panel logowania');
    this.initFormGroup();
  }

  private initFormGroup() {
    this.formGroup = new FormGroup({
      login: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required]),
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
      let user = new User(formGroupValue.login, formGroupValue.password)

      this.authService.login(user).subscribe(result => {
        if (result.token) {
          this.alertService.showSuccess('Zalogowano pomyślnie.');
          this.authService.saveToken(result.token, formGroupValue.login);
          this.router.navigate(['/appointments']);
        } else {
          this.alertService.showError('Wystąpił błąd, spróbuj ponownie.');
        }
      })
    } else {
      this.alertService.showError('Uzupełnij wymagane pola.');
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

  get login() {
    return this.formGroup.get('login')!;
  }

  get password() {
    return this.formGroup.get('password')!;
  }
}

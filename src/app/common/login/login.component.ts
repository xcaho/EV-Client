import {Component} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../../shared/services/auth.service";
import {TitleService} from "../../shared/services/title.service";
import {faEye, faEyeSlash} from "@fortawesome/free-solid-svg-icons";
import {AlertService} from "../alerts/service/alert.service";
import {Router} from "@angular/router";
import {LoginDto} from "../../shared/dtos/LoginDto";

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
  private token: string | null = '';
  private isExp = true;

  constructor(
    private authService: AuthService,
    private titleService: TitleService,
    private alertService: AlertService,
    private router: Router,
  ) {
  }

  ngOnInit() {
    this.token = this.authService.token;
    this.isExp = this.authService.isTokenExpired(this.token!);
    if (this.isExp) {
      this.authService.removeToken();
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

  public loginSubmit() {
    if (this.validateForm()) {
      let formGroupValue = this.formGroup.value
      let user = new LoginDto(formGroupValue.login, formGroupValue.password)

      this.authService.login(user).subscribe(result => {
        if (result.token) {
          this.authService.saveAuthData(result.token, result.userId);
          if (this.authService.url) {
            this.router.navigate([this.authService.url]);
          } else {
            this.router.navigate(['/users/'+ result.userId +'/appointments']);
          }
          this.authService.removeURL();
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

import {Component} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../../../shared/services/auth.service";
import {TitleService} from "../../../shared/services/title.service";
import {AlertService} from "../../alerts/service/alert.service";
import {Router} from "@angular/router";
import {User} from "../../../shared/dtos/User";

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent {
  public formGroup!: FormGroup;
  public userId: string | null;

  constructor(
    public authService: AuthService,
    private titleService: TitleService,
    private alertService: AlertService,
    private router: Router,
  ) {
    this.userId = this.authService.getUserId();
  }

  ngOnInit() {

    if (this.authService.token) {
      this.router.navigate(['/users/'+ this.userId +'/appointments']);
    }
    document.getElementById('focusReset')?.focus();
    this.titleService.setTitle('Przypomnij hasło');
    this.initFormGroup();
  }

  private initFormGroup() {
    this.formGroup = new FormGroup({
      login: new FormControl('', [Validators.required]),
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

      this.authService.resetPassword(Number(this.userId)).subscribe(result => {
        if (result.token) {
          this.alertService.showSuccess('Pomyślnie zresetowano hasło. Wysłano powiadomienie do administratora.');
          this.router.navigate(['/login']);
          this.authService.removeURL();
        } else {
          this.alertService.showError('Wystąpił błąd, spróbuj ponownie.');
        }
      })
    } else {
      this.alertService.showError('Uzupełnij wymagane pola.');
    }
  }

  get login() {
    return this.formGroup.get('login')!;
  }
}

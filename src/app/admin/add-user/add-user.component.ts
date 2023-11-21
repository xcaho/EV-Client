import {Component} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../../shared/services/auth.service";
import {TitleService} from "../../shared/services/title.service";
import {AlertService} from "../../common/alerts/service/alert.service";
import {Router} from "@angular/router";
import {EmailValidator} from "../../shared/validators/email-validator";
import {User} from "../../shared/dtos/User";
import {UserUtils} from "../../shared/utils/UserUtils";

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.scss']
})
export class AddUserComponent {
  public formGroup!: FormGroup;
  public isEmailEmpty: string = '';

  constructor(
    private authService: AuthService,
    private titleService: TitleService,
    private alertService: AlertService,
    private router: Router,
  ) {
  }

  ngOnInit() {
    document.getElementById('focusReset')?.focus();
    this.titleService.setTitle('Definiowanie nowego użytkownika');
    this.initFormGroup();
  }

  private initFormGroup() {
    this.formGroup = new FormGroup({
      name: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, EmailValidator]),
      role: new FormControl('', [Validators.required]),
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

  public goBack() {
  }

  public save() {
    if (this.validateForm()) {
      let formGroupValue = this.formGroup.value
      let user = new User(formGroupValue.email, formGroupValue.name, UserUtils.getRoleFromString(formGroupValue.role))

      this.authService.register(user).subscribe(result => {
        if (result.token) {
          this.alertService.showSuccess('Pomyślnie utworzono użytkownika.');
          console.log(result)
          this.router.navigate(['admin']);
        } else {
          this.alertService.showError('Wystąpił błąd, spróbuj ponownie.')
        }
      })
    } else {
      this.alertService.showError('Uzupełnij wymagane pola.')
    }
  }

  get name() {
    return this.formGroup.get('name')!;
  }

  get email() {
    return this.formGroup.get('email')!;
  }

  get role() {
    return this.formGroup.get('role')!;
  }

}

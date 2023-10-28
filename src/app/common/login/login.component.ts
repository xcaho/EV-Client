import {Component} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../../shared/services/auth.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  formGroup!: FormGroup;

  constructor(
    private authService: AuthService,
  ) {
  }

  ngOnInit() {
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

  public loginProcess() {
    if (this.validateForm()) {
      this.authService.login(this.formGroup.value).subscribe(result => {
        if (result.success) {
          console.log('success')
          console.log(result.message)
        } else {
          console.log('fail')
          console.log(result.message)
        }
      })
    }
  }

  get login() {
    return this.formGroup.get('login')!;
  }

  get password() {
    return this.formGroup.get('password')!;
  }
}

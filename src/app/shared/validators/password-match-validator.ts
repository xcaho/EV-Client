import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export const passwordMatchValidator: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
  const password = control.get('newPassword')?.value;
  const repeatPassword = control.get('repeatNewPassword')?.value;

  return password === repeatPassword ? null : { 'passwordMismatch': true };
};

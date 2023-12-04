import {AbstractControl} from "@angular/forms";

interface PasswordErrors {
  invalidPasswordMin8: boolean;
  invalidPasswordDigit: boolean;
  invalidPasswordLetter: boolean;
}

export function PasswordValidator(control: AbstractControl): { [key: string]: any } | null {
  const passwordFullRegex = /^(?=.*[0-9])(?=.*[a-zA-Z]).{8,}$/;
  const passwordMin8Regex = /.{8,}/;
  const passwordMinDigitRegex = /^.*\d.*$/;
  const passwordMinLetterRegex = /^.*[a-zA-Z].*$/;
  const errors: PasswordErrors = {
    invalidPasswordMin8: false,
    invalidPasswordDigit: false,
    invalidPasswordLetter: false,
  };

  if (control.value === null || control.value === "") {
    return null;
  }

  if (passwordFullRegex.test(control.value)) {
    return null;
  }

  if (!passwordMin8Regex.test(control.value)) {
    errors['invalidPasswordMin8'] = true;
  }

  if (!passwordMinDigitRegex.test(control.value)) {
    errors['invalidPasswordDigit'] = true;
  }

  if (!passwordMinLetterRegex.test(control.value)) {
    errors['invalidPasswordLetter'] = true;
  }

  return errors;
}

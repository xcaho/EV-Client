import {AbstractControl} from "@angular/forms";

export function EmailValidator(control: AbstractControl): { [key: string]: any } | null {
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
  const valid = emailRegex.test(control.value);

  if (control.value === null || control.value === "") {
    return null;
  }

  return valid ? null : {'invalidEmail': true};
}

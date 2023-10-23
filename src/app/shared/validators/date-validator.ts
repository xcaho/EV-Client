import {AbstractControl} from '@angular/forms';

export function DateValidator(control: AbstractControl): { [key: string]: boolean } | null {
  const inputDate = new Date(control.value);
  const today = new Date();

  today.setHours(0, 0, 0, 0);

  if (control.value !== null && inputDate <= today) {
    return {'invalidDate': true};
  }

  return null;
}

import {AbstractControl} from "@angular/forms";

export function TimeValidator(control: AbstractControl): { [key: string]: any } | null {
  const time = control.value;
  if (!time) {
    return null;
  }
  const [hours, minutes] = time.split(':').map(Number);
  const timeInMinutes = hours * 60 + minutes;
  if (timeInMinutes < 15) {
    return {invalidTime: true};
  }
  return null;
}

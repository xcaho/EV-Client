import {AbstractControl} from "@angular/forms";
import {EventService} from "../../event.service";
import {ActivatedRoute, Router} from "@angular/router";

export class EventUtils {

  static convertMinutesToHHMM(minutes: number) {
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;

    const hoursString = hours.toString().padStart(2, '0');
    const minutesString = remainingMinutes.toString().padStart(2, '0');

    return `${hoursString}:${minutesString}`;
  }

  static convertTimeToMinutes(time: string): number {
    const [hours, minutes] = time.split(':').map(Number);
    return hours * 60 + minutes;
  }

  static validateTime(control: AbstractControl): { [key: string]: any } | null {
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

  static getIdFromRoute(route: ActivatedRoute): number {
    return Number(route.snapshot.paramMap.get('id'))
  }
}

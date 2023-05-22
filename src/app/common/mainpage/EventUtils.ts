export class EventUtils {

  static convertMinutesToHHMM(minutes: number) {
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;

    const hoursString = hours.toString().padStart(2, '0');
    const minutesString = remainingMinutes.toString().padStart(2, '0');

    return `${hoursString}:${minutesString}`;
  }
}

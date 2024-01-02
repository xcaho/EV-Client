import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {EventDto} from "./shared/dtos/EventDto";
import {map, Observable, throwError} from "rxjs";
import {catchError} from 'rxjs/operators';
import {Availability, AvailabilityDto, AvailabilityHours} from "./shared/dtos/Availability";
import * as _ from "lodash";
import {environment} from "../environments/environment";

@Injectable({
  providedIn: 'root',
})
export class AvailabilityService {

  temporaryAvailabilities?: Availability[];

  apiUrl: string = environment.apiUrl;

  constructor(private http: HttpClient) {
  }

  saveAvailabilityList(availability: AvailabilityDto[], eventId: number) {

    return this.http.post<EventDto>(this.apiUrl + '/events/' + eventId + '/availabilities', availability)
      .pipe(
        catchError((error: any) => {
          return throwError(error);
        })
      )
  }

  patchAvailabilityList(availability: AvailabilityDto[], eventId: number) {

    return this.http.patch<EventDto>(this.apiUrl + '/events/' + eventId + '/availabilities', availability)
      .pipe(
        catchError((error: any) => {
          return throwError(error);
        })
      )
  }

  getAvailabilityList(eventId: number): Observable<AvailabilityDto[]> {

    return this.http.get<AvailabilityDto[]>(this.apiUrl + '/events/' + eventId + '/availabilities')
      .pipe(
        map(res => res.map(tmp => new AvailabilityDto(tmp.startDate, tmp.endDate))),
        catchError((error: any) => {
          return throwError(error);
        })
      )
  }

  getTemporaryAvailabilities(): Availability[] {
    return <Availability[]>this.temporaryAvailabilities;
  }

  setTemporaryAvailabilities(availabilities: Availability[]) {
    this.temporaryAvailabilities = availabilities;
  }

  clearTemporaryAvailabilities() {
    this.temporaryAvailabilities = undefined
  }

  convertAvailabilityToDto(availabilityList: Availability[]): AvailabilityDto[] {

    let availabilityDtoList: AvailabilityDto[] = []
    availabilityList.forEach((availability) => {
      const day: Date = new Date(availability.date)
      availability.hoursList.forEach((hours) => {
        const startTimeFullDate: Date = this.prepareFullDate(hours.startHour, day);
        const endTimeFullDate: Date = this.prepareFullDate(hours.endHour, day);

        availabilityDtoList.push(new AvailabilityDto(startTimeFullDate, endTimeFullDate))
      })
    })
    return availabilityDtoList
  }

  private prepareFullDate(hour: string, day: Date) {
    let temp = new Date(day)
    const [hours, minutes] = hour.split(':').map(Number);
    temp.setHours(hours)
    temp.setMinutes(minutes)
    return temp
  }

  updateAvailableHours(hoursList: string[], selectedHour: string, selectedDay: string, availabilities: Availability[],
                       event: EventDto, endHours: string[]): Availability[] {

    const totalLength = event.surveyDuration + event.surveyBreakTime;
    const totalLengthDate = new Date();
    totalLengthDate.setHours(Math.floor(totalLength / 60), totalLength % 60);

    const [choiceHourValue, choiceMinuteValue] = selectedHour.split(':').map(part => parseInt(part, 10));

    const lowerBound = new Date();
    const totalChoiceMinutes = choiceMinuteValue + choiceHourValue * 60;
    const minutesDif = totalChoiceMinutes - totalLength;
    lowerBound.setHours(Math.floor(minutesDif / 60), minutesDif % 60)

    const upperBound = new Date();
    const totalSumMinutes = choiceMinuteValue + totalLengthDate.getMinutes()
    upperBound.setHours(choiceHourValue + totalLengthDate.getHours() + Math.floor(totalSumMinutes/60) ,
      totalSumMinutes % 60)

    const updatedHoursList = hoursList.filter(hour => {
      const [hourValue, minuteValue] = hour.split(':').map(part => parseInt(part, 10));
      const currentTime = new Date();
      currentTime.setHours(hourValue, minuteValue);
      return currentTime <= lowerBound || currentTime >= upperBound;
    });

    const ranges: string[] = [];

    let startHour = updatedHoursList[0];
    let endHour = updatedHoursList[0];

    endHours.pop()

    for (let i = 1; i<updatedHoursList.length; i++){
      const currentHour = updatedHoursList[i];
      let diff = this.getHourDiff(endHour, currentHour);

      if(diff == 30) {
        if(endHours.includes(endHour)){
          if (startHour !== endHour) {
            ranges.push(`${startHour}-${endHour}`);
          } else {
            ranges.push(startHour);
          }
          startHour = currentHour
          endHour = currentHour
        } else {
          endHour = currentHour;
        }
      } else {
        if (startHour !== endHour) {
          ranges.push(`${startHour}-${endHour}`);
        } else {
          ranges.push(startHour);
        }
        startHour = currentHour;
        endHour = currentHour;
      }
    }

    if (startHour !== endHour) {
      ranges.push(`${startHour}-${endHour}`);
    } else {
      ranges.push(startHour);
    }

    let indexToSwap = 0;
    let newAvailabilityHours: AvailabilityHours[] = []
    let dayToExclude: Date = new Date(selectedDay)
    availabilities.forEach(availability => {
      if (availability.date.toDateString() == dayToExclude.toDateString()) {
        ranges.forEach(range => {
          if (range.indexOf("-") > -1){
            const [startHour, endHour] = range.split('-');
            if (this.getHourDiff(startHour, endHour) >= event.surveyDuration){
              newAvailabilityHours.push(new AvailabilityHours(startHour, endHour))
            }
          }
        })
        indexToSwap = availabilities.indexOf(availability)
      }
    })
    availabilities[indexToSwap] = new Availability(dayToExclude, newAvailabilityHours)

    return availabilities;
  }

  getHourDiff(hour1: string, hour2: string): number {
    const time1 = new Date(`2000-01-01T${hour1}`);
    const time2 = new Date(`2000-01-01T${hour2}`);

    return Math.abs(time2.getTime() - time1.getTime()) / (1000 * 60);
  }

  public mapFromDto(availabilityDtoList: AvailabilityDto[]): Availability[] {
    let availabilityList: Availability[] = [];
    let grouped = _.groupBy(availabilityDtoList, x => x.startDate.toDateString())
    Object.keys(grouped).map((key) => {

      let groupItems: AvailabilityDto[] = grouped[key]
      let availabilityHoursList: AvailabilityHours[] = []
      groupItems.forEach(x => {

        availabilityHoursList.push(x.getHours())
      })

      let availability: Availability = new Availability(new Date(key), availabilityHoursList)
      availabilityList.push(availability)
    })
    return availabilityList
  }
}

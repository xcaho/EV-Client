import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {EventDto} from "./common/mainpage/EventDto";
import {map, Observable, throwError} from "rxjs";
import {catchError} from 'rxjs/operators';
import {Availability, AvailabilityDto, AvailabilityHours} from "./common/mainpage/Availability";
import * as _ from "lodash";

@Injectable({
  providedIn: 'root',
})
export class AvailabilityService {

  temporaryAvailabilities?: Availability[]

  constructor(private http: HttpClient) {
  }

  saveAvailabilityList(availability: AvailabilityDto[], eventId: number) {
    const headers = {"Content-Type": "application/json"};
    const options = {"headers": headers};

    return this.http.post<EventDto>('http://localhost:8080/events/' + eventId + '/availabilities', availability, options)
      .pipe(
        catchError((error: any) => {
          return throwError(error);
        })
      )
  }

  getAvailabilityList(eventId: number): Observable<AvailabilityDto[]> {
    const headers = {"Content-Type": "application/json"};
    const options = {"headers": headers};

    return this.http.get<AvailabilityDto[]>('http://localhost:8080/events/' + eventId + '/availabilities', options)
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
    this.temporaryAvailabilities = availabilities
    console.log(this.temporaryAvailabilities)
  }

  clearTemporaryAvailabilities() {
    this.temporaryAvailabilities = undefined
  }

  updateAvailableHours(hoursList: string[], hoursChoice: String, events: EventDto[], eventId: number ) {
    const totalLength = events[eventId].surveyDuration + events[eventId].surveyBreakTime;
    const totalLengthDate = new Date();
    totalLengthDate.setHours(Math.floor(totalLength / 60), totalLength % 60);

    const [choiceHourValue, choiceMinuteValue] = hoursChoice.split(':').map(part => parseInt(part, 10));

    const lowerBound = new Date();
    const totalChoiceMinutes = choiceMinuteValue + choiceHourValue * 60;
    const minutesDif = totalChoiceMinutes - totalLength;
    lowerBound.setHours(Math.floor(minutesDif / 60), minutesDif % 60)

    const upperBound = new Date();
    const totalSumMinutes = choiceMinuteValue + totalLengthDate.getMinutes()
    upperBound.setHours(choiceHourValue + totalLengthDate.getHours() + Math.floor(totalSumMinutes/60) , totalSumMinutes % 60)

    const updatedHoursList = hoursList.filter(hour => {
      const [hourValue, minuteValue] = hour.split(':').map(part => parseInt(part, 10));
      const currentTime = new Date();
      currentTime.setHours(hourValue, minuteValue);
      return currentTime <= lowerBound || currentTime >= upperBound;
    });

    const ranges: string[] = [];

    let startHour = updatedHoursList[0];
    let endHour = updatedHoursList[0];

    for (let i = 1; i<updatedHoursList.length; i++){
      const currentHour = updatedHoursList[i];
      const diff = this.getHourDiff(endHour, currentHour);

      if(diff == 30) {
        endHour = currentHour;
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

    return ranges;
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

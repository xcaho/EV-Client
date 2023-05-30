import {Component} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {EventDto} from "../../common/mainpage/EventDto";
import {EventService} from "../../event.service";
import {ActivatedRoute} from "@angular/router";
import {Availability, AvailabilityDto, AvailabilityHours} from "../../common/mainpage/Availability";
import * as _ from "lodash";
import {AvailabilityService} from "../../availability.service";

export interface Registration {
  dayChoice: FormControl<string | null>;
  hourChoice: FormControl<string | null>;
  consents: FormControl<number | null>
}

@Component({
  selector: 'app-survey-registration',
  templateUrl: './survey-registration.component.html',
  styleUrls: ['./survey-registration.component.scss']
})

export class SurveyRegistrationComponent {
  events: EventDto[] = [];
  availabilityList: Availability[] = [];
  isFetching: boolean = false;
  eventId: number = 0;
  registrationForm: FormGroup;
  selectedDay: string | null = null;
  selectedHour: string | null = null;
  filteredHoursList: any[] = [];

  constructor(private eventService: EventService, private availabilityService: AvailabilityService,
              private route: ActivatedRoute) {

    this.registrationForm = new FormGroup({
      dayChoice: new FormControl(''),
      hourChoice: new FormControl(''),
      consents: new FormControl()
    })

    this.route.params.subscribe(params => {
      this.eventId = params['id'] - 1;
    });
  }

  ngOnInit(): void {
    this.fetchEvents();
    this.setFormValidators();
    this.fetchAvailabilityList();
  }

  private fetchEvents(): void {
    this.isFetching = true;
    this.eventService.getEvents().subscribe((events) => {
      this.events = events;
      this.isFetching = false;
    });
  }

  private setFormValidators(): void {
    const dayChoiceControl = this.registrationForm.get('dayChoice');
    const hourChoiceControl = this.registrationForm.get('hourChoice');
    const consentsControl = this.registrationForm.get('consents');

    dayChoiceControl?.setValidators([Validators.required]);
    hourChoiceControl?.setValidators([Validators.required, Validators.min(1)]);
    consentsControl?.setValidators([Validators.required]);
  }

  private fetchAvailabilityList(): void {
    this.availabilityService.getAvailabilityList(this.eventId + 1).subscribe((availabilityDtoList) => {
      this.availabilityList = [];
      let grouped = _.groupBy(availabilityDtoList, x => x.startDate.toDateString())
      Object.keys(grouped).map((key) => {

        let groupItems: AvailabilityDto[] = grouped[key]
        let availabilityHoursList: AvailabilityHours[] = []
        groupItems.forEach(x => {

          availabilityHoursList.push(x.getHours())
        })

        let availability: Availability = new Availability(new Date(key), availabilityHoursList)
        this.availabilityList.push(availability)
      })
    });
  }

  filterHoursList(): void {
    const selectedDayIndex = this.availabilityList.findIndex(availability =>
      availability.date.toDateString() === this.selectedDay
    );

    this.filteredHoursList = [];

    if (selectedDayIndex !== -1) {
      this.availabilityList[selectedDayIndex].hoursList.forEach((hourItem) => {
        const {startHour, endHour} = hourItem;
        const [startHourValue, startMinuteValue] = startHour.split(':').map(part => parseInt(part, 10));
        const [endHourValue, endMinuteValue] = endHour.split(':').map(part => parseInt(part, 10));

        const totalLength = this.events[this.eventId].surveyDuration + this.events[this.eventId].surveyBreakTime;
        const totalLengthDate = new Date();
        totalLengthDate.setHours(Math.floor(totalLength / 60), totalLength % 60);

        const startDate = new Date();
        startDate.setHours(startHourValue, startMinuteValue);

        const endDate = new Date();
        const totalChoiceMinutes = endMinuteValue + endHourValue * 60;
        const minutesDif = totalChoiceMinutes - totalLength;
        endDate.setHours(Math.floor(minutesDif / 60), minutesDif % 60);

        while (startDate <= endDate) {
          const currentHour = startDate.getHours();
          const currentMinute = startDate.getMinutes();
          const formattedHour = `${currentHour.toString().padStart(2, '0')}:${currentMinute.toString().padStart(2, '0')}`;

          this.filteredHoursList.push(formattedHour);
          startDate.setMinutes(startDate.getMinutes() + 30);
        }
      });
    }
  }

  //save() {
  //  // @ts-ignore
  //  const updatedHoursList = this.availabilityService.updateAvailableHours(this.filteredHoursList, this.hourChoice.value, this.events, this.eventId);
  //  console.log(updatedHoursList);
  //}

  get dayChoice() {
    return this.registrationForm.get('dayChoice');
  }

  get hourChoice() {
    return this.registrationForm.get('hourChoice');
  }

  get consents() {
    return this.registrationForm.get('consents');
  }

}

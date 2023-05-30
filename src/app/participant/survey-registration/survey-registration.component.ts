import {Component} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {EventDto} from "../../common/mainpage/EventDto";
import {EventService} from "../../event.service";
import {ActivatedRoute, Router} from "@angular/router";
import {Availability, AvailabilityDto, AvailabilityHours} from "../../common/mainpage/Availability";
import * as _ from "lodash";
import {AvailabilityService} from "../../availability.service";
import {SurveyService} from "../../survey.service";
import {SurveyDto} from "../../common/mainpage/SurveyDto";

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

  survey!: SurveyDto;
  event!: EventDto;
  availabilityList: Availability[] = [];
  isFetching: boolean = false;
  surveyCode!: string;
  registrationForm: FormGroup;
  selectedDay: string | null = null;
  selectedHour: string | null = null;
  filteredHoursList: any[] = [];

  constructor(private eventService: EventService,
              private availabilityService: AvailabilityService,
              private surveyService: SurveyService,
              private route: ActivatedRoute,
              private router: Router) {

    this.registrationForm = new FormGroup({
      dayChoice: new FormControl(''),
      hourChoice: new FormControl(''),
      consents: new FormControl()
    })

    this.route.params.subscribe(params => {
      this.surveyCode = params['code'];
    });
  }

  ngOnInit(): void {

    this.fetchSurvey()
    if (this.survey.date == null) {
      this.router.navigate(['invalid-code/:code'])
    }

    this.fetchEvent(this.survey.eventId);
    this.setFormValidators();
    this.fetchAvailabilityList();
  }

  private fetchSurvey() {
    this.surveyService.getSurvey(this.surveyCode).subscribe((surveyDto) => {
      this.survey = surveyDto
    }, (error) => {
      console.log(error)
      this.router.navigate(['invalid-code/:code'])
    })
  }

  private fetchEvent(eventId: number): void {
    this.isFetching = true;
    this.eventService.getEvent(eventId).subscribe((event) => {
      this.event = event;
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
    this.availabilityService.getAvailabilityList(this.event.id).subscribe((availabilityDtoList) => {
      this.availabilityList = this.availabilityService.mapFromDto(availabilityDtoList)
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

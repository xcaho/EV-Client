import {Component} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {EventDto} from "../../common/mainpage/EventDto";
import {EventService} from "../../event.service";
import {ActivatedRoute, Router} from "@angular/router";
import {Availability} from "../../common/mainpage/Availability";
import {AvailabilityService} from "../../availability.service";
import {SurveyService} from "../../survey.service";
import {SurveyDto, SurveyState} from "../../common/mainpage/SurveyDto";
import {ConfirmationDto} from "../../common/mainpage/ConfirmationDto";

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
  selectedDay: string = "2077-01-01";
  selectedHour: string = "00:00";
  filteredHoursList: any[] = [];
  updatedAvailabilityList: any[] = [];

  formEventName: string = "";

  formSurveyDuration: number = 0;

  formEventEndDate: string = "";

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
    this.setFormValidators();
  }

  private fetchSurvey() {
    this.surveyService.getSurvey(this.surveyCode).subscribe((surveyDto) => {
      this.survey = surveyDto
      this.fetchEvent(this.survey.eventId);
    }, (error) => {
      console.log(error)
      this.router.navigate(['/404'])
    })
  }

  private fetchEvent(eventId: number): void {
    this.isFetching = true;
    this.eventService.getEvent(eventId).subscribe((event) => {
      this.event = event;
      this.formEventName = event.name
      this.formSurveyDuration = event.surveyDuration
      this.formEventEndDate = event.endDate

      if (this.survey.surveyState != SurveyState.UNUSED || this.event.slotsTaken == this.event.maxUsers) {
        this.router.navigate(['register/' + this.surveyCode + '/invalid-code'])
      }

      this.fetchAvailabilityList();
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

  save() {
    console.log(this.updatedAvailabilityList)
   // @ts-ignore
    const updatedAvailabilites: Availability[] = this.availabilityService.updateAvailableHours(this.updatedAvailabilityList,
      this.selectedHour, this.selectedDay, this.availabilityList, this.event);

    let date: Date = new Date(this.selectedDay)
    const [hours, minutes] = this.selectedHour.split(':').map(Number);
    date.setHours(hours, minutes)
    this.survey.date = date
    this.survey.surveyState = SurveyState.USED

    this.surveyService.modifySurvey(this.survey).subscribe((survey) => {
      console.log(survey)
      this.surveyService.setTemporaryConfirmation(new ConfirmationDto(this.event.name, date))

      this.availabilityService.patchAvailabilityList(this.availabilityService.convertAvailabilityToDto(
        updatedAvailabilites), this.event.id).subscribe(
        (response) => {
          console.log(response)
        }, (exception) => {
          console.log(exception)
        }
      )

      this.router.navigate(['register/' + this.surveyCode + '/confirmation'])
    })
   console.log(updatedAvailabilites);
  }

  filterHoursList(): void {
    const selectedDayIndex = this.availabilityList.findIndex(availability =>
      availability.date.toDateString() === this.selectedDay
    );

    this.filteredHoursList = [];
    this.updatedAvailabilityList = [];

    if (selectedDayIndex !== -1) {
      this.availabilityList[selectedDayIndex].hoursList.forEach((hourItem) => {
        const {startHour, endHour} = hourItem;
        const [startHourValue, startMinuteValue] = startHour.split(':').map(part => parseInt(part, 10));
        const [endHourValue, endMinuteValue] = endHour.split(':').map(part => parseInt(part, 10));

        const totalLength = this.event.surveyDuration + this.event.surveyBreakTime;
        const totalLengthDate = new Date();
        totalLengthDate.setHours(Math.floor(totalLength / 60), totalLength % 60);

        const startDate = new Date();
        startDate.setHours(startHourValue, startMinuteValue);
        const endDate = new Date();
        endDate.setHours(endHourValue, endMinuteValue);

        const updatedStartDate = new Date();
        updatedStartDate.setHours(startHourValue, startMinuteValue);
        const updatedEndDate = new Date();
        const totalChoiceMinutes = endMinuteValue + endHourValue * 60;
        const minutesDif = totalChoiceMinutes - totalLength;
        updatedEndDate.setHours(Math.floor(minutesDif / 60), minutesDif % 60);

        while (updatedStartDate <= updatedEndDate) {
          const currentHour = updatedStartDate.getHours();
          const currentMinute = updatedStartDate.getMinutes();
          const formattedHour = `${currentHour.toString().padStart(2, '0')}:${currentMinute.toString().padStart(2, '0')}`;

          this.filteredHoursList.push(formattedHour);
          updatedStartDate.setMinutes(updatedStartDate.getMinutes() + 30);
        }

        while (startDate <= endDate) {
          const currentHour = startDate.getHours();
          const currentMinute = startDate.getMinutes();
          const formattedHour = `${currentHour.toString().padStart(2, '0')}:${currentMinute.toString().padStart(2, '0')}`;

          this.updatedAvailabilityList.push(formattedHour);
          startDate.setMinutes(startDate.getMinutes() + 30);
        }
      });
    }
  }


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

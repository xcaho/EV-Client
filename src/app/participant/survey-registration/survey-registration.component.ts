import {Component} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {EventDto} from "../../shared/dtos/EventDto";
import {EventService} from "../../event.service";
import {ActivatedRoute, Router} from "@angular/router";
import {Availability} from "../../shared/dtos/Availability";
import {AvailabilityService} from "../../availability.service";
import {SurveyService} from "../../survey.service";
import {SurveyDto} from "../../shared/dtos/SurveyDto";
import {ConfirmationDto} from "../../shared/dtos/ConfirmationDto";
import {TitleService} from "../../shared/services/title.service";
import {SurveyState} from "../../shared/enums/survey-state";
import {AlertService} from "../../common/alerts/service/alert.service";

@Component({
  selector: 'app-survey-registration',
  templateUrl: './survey-registration.component.html',
  styleUrls: ['./survey-registration.component.scss']
})

export class SurveyRegistrationComponent {
  private survey!: SurveyDto;
  private event!: EventDto;
  public availabilityList: Availability[] = [];
  private isFetching: boolean = false;
  private surveyCode!: string;
  public form!: FormGroup;
  public selectedDay: string = '';
  public selectedHour: string = '';
  public filteredHoursList: any[] = [];
  private updatedAvailabilityList: any[] = [];
  private endHours: any[] = [];
  public formEventName: string = "";
  public formSurveyDuration: number = 0;
  public formEventEndDate: string = "";

  constructor(private eventService: EventService,
              private availabilityService: AvailabilityService,
              private surveyService: SurveyService,
              private route: ActivatedRoute,
              private router: Router,
              private alertService: AlertService,
              private titleService: TitleService) {

    this.route.params.subscribe(params => {
      this.surveyCode = params['code'];
    });

  }

  ngOnInit(): void {
    this.fetchSurvey()
    document.getElementById('focusReset')?.focus();
    this.titleService.setTitle('Rejestracja na badanie');
    this.initFormGroup();
  }

  private initFormGroup() {
    this.form = new FormGroup({
      dayChoice: new FormControl(null, [Validators.required]),
      hourChoice: new FormControl(null, [Validators.required]),
      consents: new FormControl(false, [Validators.requiredTrue])
    })
  }

  private fetchSurvey() {
    this.surveyService.getSurvey(this.surveyCode).subscribe((surveyDto) => {
      this.survey = surveyDto
      this.fetchEvent(this.survey.eventId);
    }, (error) => {
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

  private fetchAvailabilityList(): void {
    this.availabilityService.getAvailabilityList(this.event.id).subscribe((availabilityDtoList) => {
      this.availabilityList = this.availabilityService.mapFromDto(availabilityDtoList)
    });
  }

  save() {
    if (this.validate()) {
      const updatedAvailabilites: Availability[] = this.availabilityService.updateAvailableHours(this.updatedAvailabilityList,
        this.selectedHour, this.selectedDay, this.availabilityList, this.event, this.endHours);

      let date: Date = new Date(this.selectedDay)
      const [hours, minutes] = this.selectedHour.split(':').map(Number);
      date.setHours(hours, minutes)
      this.survey.date = date
      this.survey.surveyState = SurveyState.USED

      this.surveyService.modifySurvey(this.survey).subscribe((survey) => {
        this.surveyService.setTemporaryConfirmation(new ConfirmationDto(this.event.name, date))

        this.availabilityService.patchAvailabilityList(this.availabilityService.convertAvailabilityToDto(
          updatedAvailabilites), this.event.id).subscribe(
          (response) => {
          }, (exception) => {
          }
        )

        this.router.navigate(['register/' + this.surveyCode + '/confirmation']);
      }, (exception) => {

        if (exception.status === 409) {
          this.alertService.showError('Wybrany termin już jest zajęty, wybierz inny lub odśwież stronę.');
        }
      })
    } else {
      this.alertService.showError('Uzupełnij wymagane pola.');
    }
  }

  private validate(): boolean {
    let noErrors: boolean = true;

    Object.keys(this.form.controls).forEach(key => {
      if (this.form.get(key)?.invalid) {
        this.form.get(key)?.markAsTouched();
        this.form.get(key)?.markAsDirty();
        this.form.get(key)?.updateValueAndValidity();
        noErrors = false;
      }
    })

    return noErrors;
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

        this.endHours.push(endHour)

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
    return this.form.get('dayChoice')!;
  }

  get hourChoice() {
    return this.form.get('hourChoice')!;
  }

  get consents() {
    return this.form.get('consents')!;
  }
}

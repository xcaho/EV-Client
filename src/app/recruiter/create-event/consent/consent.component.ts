import {Component} from '@angular/core';
import {EventDto} from "../../../shared/dtos/EventDto";
import {Availability, AvailabilityDto} from "../../../shared/dtos/Availability";
import {EventService} from "../../../event.service";
import {AvailabilityService} from "../../../availability.service";
import {ActivatedRoute, Router} from "@angular/router";
import {AlertService} from "../../../common/alerts/service/alert.service";
import {AuthService} from "../../../shared/services/auth.service";
import {EventUtils} from "../../../shared/utils/EventUtils";
import {firstValueFrom} from "rxjs";
import {faPlus, faTrash} from "@fortawesome/free-solid-svg-icons";
import {FormBuilder, FormControl, FormGroup, Validators, FormArray, AbstractControl, Form} from "@angular/forms";
import { ConsentDto } from 'src/app/shared/dtos/ConsentDto';
import {ConsentService} from "../../../shared/services/consent.service";

@Component({
  selector: 'app-consent',
  templateUrl: './consent.component.html',
  styleUrls: ['./consent.component.scss']
})
export class ConsentComponent {
  public formGroup!: FormGroup;
  public event!: EventDto;
  public availabilityList: Availability[] = [];
  public consentList: ConsentDto[] = [];
  public isEdit: boolean = false;
  public formControl = FormControl
  private eventId: number = 0;
  private userId: string | null | undefined;
  private token: string | null = null;
  public plus = faPlus;
  public trash = faTrash;

  constructor(private eventService: EventService,
              private availabilityService: AvailabilityService,
              private router: Router,
              private route: ActivatedRoute,
              private alertService: AlertService,
              private authService: AuthService,
              private fb: FormBuilder,
              private consentService: ConsentService) {
    this.token = this.authService.token;
  }

  // @HostListener('window:beforeunload', ['$event'])
  // notification($event: any): void {
  //   $event.returnValue = 'Masz niezapisane zmiany. Czy na pewno chcesz opuścić tę stronę?';
  // }


  async ngOnInit() {
    if (this.authService.isTokenExpired(this.token)) {
      this.authService.removeToken();
      this.authService.saveURL(this.router);
      this.router.navigate(['/login']);
    }

    document.getElementById('focusReset')?.focus();
    this.initFormGroup();

    this.event = this.eventService.getTemporaryEvent();
    this.isEdit = this.eventService.getIsEditConsideringRouter(this.router);
    this.eventId = EventUtils.getIdFromRoute(this.route);
    this.userId = this.authService.getUserId();

    if (this.event == undefined && this.isEdit) {
      this.event = await firstValueFrom(this.eventService.getEvent(this.eventId));
    }

    this.consentList = this.consentService.getTemporaryConsents()

    if (this.consentList) {
      this.patchForm()
      return
    }

    if (this.isEdit) {
      this.consentService.getConsentsForEvent(this.eventId).subscribe(consents => {
        this.consentList = consents
        this.patchForm()
      })
    }
  }

  private initFormGroup() {
    this.formGroup = new FormGroup({
      consentTemplate: new FormControl('',),
      textAreas: this.fb.array([]),
    })
  }

  private patchForm() {
    //TODO
  }

  public submit() {
    this.setConsentsListWithTextAreas()

    if (this.consentList.length === 0) {
      this.alertService.showError('Wydarzenie musi posiadać przynajmniej jedną zgodę.')
    } else {
      if (this.isEdit) {
        this.eventService.modifyEvent(this.event).subscribe(
          response => {
            this.saveAvailability(response.id)
          }, error => {
            this.alertService.showError('Wystąpił błąd. Spróbuj ponownie.');
          })
      } else {
        this.eventService.createEvent(this.event).subscribe(
          response => {
            this.saveAvailability(response.id);
          }, error => {
            this.alertService.showError('Wystąpił błąd. Spróbuj ponownie.');
          })
      }

    }
  }

  private saveAvailability(eventId: number) {
    let availabilityDtoList: AvailabilityDto[] = this.availabilityService.convertAvailabilityToDto(this.availabilityList)
    if (this.isEdit) {
      this.availabilityService.patchAvailabilityList(availabilityDtoList, eventId).subscribe(
        response => {
        }, error => {
          this.alertService.showError('Wystąpił błąd. Spróbuj ponownie.');
        })
    } else {
      this.availabilityService.saveAvailabilityList(availabilityDtoList, eventId).subscribe(
        response => {
          this.saveConsents(eventId)
        }, error => {
          this.alertService.showError('Wystąpił błąd. Spróbuj ponownie.');
        }
      )
    }
  }

  private saveConsents(eventId: number) {
    this.consentService.saveConsentsForEvent(this.consentList, eventId).subscribe(response => {

      this.eventService.clearTemporaryEvent();
      this.availabilityService.clearTemporaryAvailabilities();
      if (!this.isEdit) {
        this.alertService.showSuccess('Pomyślnie dodano wydarzenie.');
      }
      this.router.navigate(['/users/' + this.userId + '/appointments']);
    }, error => {
      this.alertService.showError('Wystąpił błąd. Spróbuj ponownie.');
    })
  }

  public goBack() {
    this.consentService.setTemporaryConsents(this.consentList)
  }

  public addConsent() {
    const textAreasArray = this.formGroup.get('textAreas') as FormArray;

    if (textAreasArray.length < 6) {
      let value = this.defaultValuesForTextareas(this.formGroup.get('consentTemplate')?.value);
      const control = this.fb.control(value, Validators.required) as FormControl;
      textAreasArray.push(control);
    } else {
      this.alertService.showError('Osiągnieto maksymalną ilośc zgód na jedno wydarzenie.')
    }

    this.formGroup.get('consentTemplate')?.setValue('');
  }

  public deleteConsent(i: any) {
    (this.formGroup?.get('textAreas')! as FormArray).removeAt(i);
  }

  public markAsRequired(i: any) {
    const textAreasArray = this.formGroup.get('textAreas') as FormArray;
    const formGroupAtIndex = textAreasArray.at(i) as AbstractControl;

    formGroupAtIndex.setErrors({'required': true})
  }

  private defaultValuesForTextareas(value: any) {
    switch (value) {
      case '1': {
        return 'Wyrażam zgodę na przetwarzanie moich danych osobowych przez ' +
          'Sieć Badawczą Łukasiewicz - Poznański Instytut Technologiczny w celu ' +
          'udzielenia odpowiedzi na pytanie zadane przez formularz kontaktowy zgodnie z ' +
          'wymogami RODO. Oświadczam, że zapoznałem się i akceptuję informacje o ochronie danych ' +
          'osobowych oraz politykę prywatności.'
      }
      case '2': {
        return 'Wyrażam zgodę na nagrywanie spotkania.'
      }
      case '3': {
        return 'Wyrażam zgodę na '
      }
      default: {
        return '';
      }
    }
  }

  setConsentsListWithTextAreas() {
    const textAreasArray = (this.formGroup.get('textAreas') as FormArray).controls;

    textAreasArray.forEach((control: AbstractControl) => {
      this.consentList = []
      this.consentList.push(new ConsentDto(control.value, control?.errors?.['required']))
    });
  }

  get textAreas(): AbstractControl[] {
    return (this.formGroup.get('textAreas') as FormArray)?.controls;
  }
}

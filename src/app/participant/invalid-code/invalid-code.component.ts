import {Component} from '@angular/core';
import {EventService} from "../../event.service";
import {SurveyService} from "../../survey.service";
import {SurveyDto} from "../../common/mainpage/SurveyDto";
import {EventDto} from "../../common/mainpage/EventDto";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-invalid-code',
  templateUrl: './invalid-code.component.html',
  styleUrls: ['./invalid-code.component.scss']
})
export class InvalidCodeComponent {
  survey: SurveyDto;
  event: EventDto;
  surveyCode!: string;
  isFetching: boolean = false;

  constructor(private eventService: EventService, private surveyService: SurveyService, private route: ActivatedRoute,
              private router: Router) {
    this.survey = {} as SurveyDto;
    this.event = {} as EventDto;

    this.route.params.subscribe(params => {
      this.surveyCode = params['code'];
    });
  }

  ngOnInit(): void {
    document.getElementById('focusReset')?.focus();
    this.fetchSurvey()
  }

  private fetchEvent(eventId: number): void {
    this.isFetching = true;
    this.eventService.getEvent(eventId).subscribe((event) => {
      this.event = event;
      this.isFetching = false;
    });
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

}

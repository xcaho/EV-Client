import {Component} from '@angular/core';
import {EventDto} from "../../../common/mainpage/EventDto";
import {ActivatedRoute, Router} from '@angular/router';
import {Availability, AvailabilityDto, AvailabilityHours} from "../../../common/mainpage/Availability";
import {EventService} from "../../../event.service";
import * as _ from "lodash";
import {AvailabilityService} from "../../../availability.service";
import {EventUtils} from "../../../common/mainpage/EventUtils";
import {SurveyService} from "../../../survey.service";
import {SurveyDto} from "../../../common/mainpage/SurveyDto";

@Component({
  selector: 'app-event',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.scss']
})
export class EventComponent {
  availabilityList: Availability[] = [];
  surveyList: SurveyDto[] = []
  event: EventDto;
  eventId: number = -1
  surveyDurationHHMM = "00:00";

  constructor(private eventService: EventService, private availabilityService: AvailabilityService,
              private surveyService: SurveyService, public router: Router, private route: ActivatedRoute) {

    this.event = {} as EventDto
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.eventId = params['id'];
    });

    this.eventService.getEvent(this.eventId).subscribe((eventDto) => {
      console.log(eventDto);
      this.event = eventDto;
      this.surveyDurationHHMM = EventUtils.convertMinutesToHHMM(this.event.surveyDuration)

      this.availabilityService.getAvailabilityList(this.eventId).subscribe((availabilityDtoList) => {
        this.availabilityList = this.availabilityService.mapFromDto(availabilityDtoList);
      });

      this.surveyService.getSurveys(this.event.id).subscribe((surveys) => {
        console.log(surveys);
        this.surveyList = surveys;
      })
    })
  }

  goToEdit() {
    this.router.navigate(['/edit/', this.event.id])
  }

}

import {Component, ViewChild} from '@angular/core';
import {EventDto} from "../../../common/mainpage/EventDto";
import {ActivatedRoute, Router} from '@angular/router';
import {Availability} from "../../../common/mainpage/Availability";
import {EventService} from "../../../event.service";
import {AvailabilityService} from "../../../availability.service";
import {EventUtils} from "../../../common/mainpage/EventUtils";
import {SurveyService} from "../../../survey.service";
import {SurveyDto} from "../../../common/mainpage/SurveyDto";
import {faTrash} from '@fortawesome/free-solid-svg-icons';
import {ClipboardService} from 'ngx-clipboard';
import {DeleteCodeComponent} from "./delete-code/delete-code.component";

@Component({
  selector: 'app-event',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.scss']
})
export class EventComponent {
  @ViewChild(DeleteCodeComponent) deleteCodeComponent!: DeleteCodeComponent;
  availabilityList: Availability[] = [];
  surveyList: SurveyDto[] = []
  event: EventDto;
  eventId: number = -1
  surveyDurationHHMM = "00:00";
  trash = faTrash;

  constructor(private eventService: EventService, private availabilityService: AvailabilityService,
              private surveyService: SurveyService, public router: Router, private route: ActivatedRoute, private clipboardService: ClipboardService) {

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
    }, () => {
      this.router.navigate(['/404'])
    })
  }

  copyToClipboard(code: string) {
    this.clipboardService.copyFromContent('localhost:4200/register/' + code);
  }

}

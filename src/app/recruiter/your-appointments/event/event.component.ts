import {Component} from '@angular/core';
import {EventDto} from "../../../common/mainpage/EventDto";
import {ActivatedRoute, Router} from '@angular/router';
import {Availability, AvailabilityDto, AvailabilityHours} from "../../../common/mainpage/Availability";
import {EventService} from "../../../event.service";
import * as _ from "lodash";
import {AvailabilityService} from "../../../availability.service";

@Component({
  selector: 'app-event',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.scss']
})
export class EventComponent {
  availabilityList: Availability[] = [];
  event!: EventDto;
  eventId: number = -1
  surveyDurationHHMM = "00:00";

  constructor(private eventService: EventService, private availabilityService: AvailabilityService,
              public router: Router, private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.eventId = params['id'];
    });

    this.eventService.getEvent(this.eventId).subscribe((eventDto) => {
      console.log(eventDto);
      this.event = eventDto;
    })

    this.availabilityService.getAvailabilityList(this.eventId).subscribe((availabilityDtoList) => {
      console.log(availabilityDtoList)
      console.log(availabilityDtoList[0].endDate.getDate())
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

  goToEdit() {
    this.router.navigate(['/edit/', this.event.id])
  }

}

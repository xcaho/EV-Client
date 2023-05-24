import {Component} from '@angular/core';
import {EventDto} from "../../../common/mainpage/EventDto";
import {EventUtils} from "../../../common/mainpage/EventUtils";
import {Router} from '@angular/router';
import {Availability, AvailabilityDto, AvailabilityHours} from "../../../common/mainpage/Availability";
import {EventService} from "../../../event.service";
import * as _ from "lodash";

@Component({
  selector: 'app-event',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.scss']
})
export class EventComponent {
  availabilityList: Availability[] = [];
  event!: EventDto;
  surveyDurationHHMM = "00:00";

  constructor(private eventService: EventService, public router: Router) {
    if(localStorage.getItem("event")) {
      // @ts-ignore
      this.event = JSON.parse(localStorage.getItem("event"))
      this.surveyDurationHHMM = EventUtils.convertMinutesToHHMM(this.event.surveyDuration)
    }

    this.eventService.getAvailabilityList(this.event.id).subscribe((availabilityDtoList) => {
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

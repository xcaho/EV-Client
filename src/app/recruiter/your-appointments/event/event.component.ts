import {Component, Input} from '@angular/core';
import {EventDto} from "../../../common/mainpage/EventDto";
import {ActivatedRoute, Router} from '@angular/router';
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
  event: EventDto;

  constructor(private eventService: EventService, public router: Router) {
    const navigation = this.router.getCurrentNavigation()
    let state = <EventDto>navigation?.extras.state
    this.event = new EventDto(state.name,
      state.description,
      state.researchStartDate,
      state.researchEndDate,
      state.endDate,
      state.maxUsers,
      state.surveyDuration,
      state.surveyBreakTime,
      state.slotsTaken)
    this.event.id = state.id

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



}

import {Component} from '@angular/core';
import {EventDto} from "../../../../common/mainpage/EventDto";
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-edit-event',
  templateUrl: './edit-event.component.html',
  styleUrls: ['./edit-event.component.scss']
})
export class EditEventComponent {
  events: EventDto[] = [];
  eventId: number | null = null;


  constructor(public route: ActivatedRoute) {
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.eventId = params['id'];
    });
  }

}

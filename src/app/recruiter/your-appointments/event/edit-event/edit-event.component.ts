import {Component} from '@angular/core';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-edit-event',
  templateUrl: './edit-event.component.html',
  styleUrls: ['./edit-event.component.scss']
})
export class EditEventComponent {
  eventId: number = -1;


  constructor(public route: ActivatedRoute) {
    this.route.params.subscribe(params => {
      this.eventId = params['id'];
    });
  }

}

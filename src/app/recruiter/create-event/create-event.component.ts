import {Component, Input} from '@angular/core';
import {EventService} from '../../event.service';

@Component({
  selector: 'app-create-event',
  templateUrl: './create-event.component.html',
  styleUrls: ['./create-event.component.scss'],
  providers: [EventService]
})

export class CreateEventComponent {
  @Input() eventId: number = -1;

}

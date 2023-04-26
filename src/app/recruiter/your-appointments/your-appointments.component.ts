import { Component } from '@angular/core';
import { EventService } from '../../event.service';

@Component({
  selector: 'app-your-appointments',
  templateUrl: './your-appointments.component.html',
  styleUrls: ['./your-appointments.component.scss'],
  providers: [EventService]
})
export class YourAppointmentsComponent {

  public data: any[];

  constructor(private eventService: EventService) {
    this.data = [];
  }

  ngOnInit() :void {
    this.eventService.getEvents().subscribe((data) => {
      this.data = data;
    });

  }

}

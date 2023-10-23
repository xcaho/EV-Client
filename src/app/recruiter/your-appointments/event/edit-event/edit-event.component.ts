import {Component} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {TextChangeService} from "../../../../shared/services/text-change.service";

@Component({
  selector: 'app-edit-event',
  templateUrl: './edit-event.component.html',
  styleUrls: ['./edit-event.component.scss']
})
export class EditEventComponent {
  eventId: number = -1;

  constructor(public route: ActivatedRoute,
              private textChangeService: TextChangeService) {
    this.route.params.subscribe(params => {
      this.eventId = params['id'];
    });
  }

  ngOnInit() {
    document.getElementById('focusReset')?.focus();
    this.textChangeService.setH1('Edycja wydarzenia');
    this.textChangeService.setH2('Edytuj szczegóły wydarzenia');
  }
}

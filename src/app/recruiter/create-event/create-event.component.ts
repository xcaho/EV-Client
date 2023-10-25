import {Component} from '@angular/core';
import {TextChangeService} from "../../shared/services/text-change.service";
import {TitleService} from "../../shared/services/title.service";

@Component({
  selector: 'app-create-event',
  templateUrl: './create-event.component.html',
  styleUrls: ['./create-event.component.scss']
})

export class CreateEventComponent {
  public h1: string = 'Tworzenie wydarzenia';

  constructor(private textChangeService: TextChangeService,
              private titleService: TitleService) {
  }

  ngOnInit() {
    document.getElementById('focusReset')?.focus();
    this.titleService.setTitle('Definiowanie wydarzenia');
    this.textChangeService.h1$.subscribe(h1 => {
      this.h1 = h1;
    })
  }
}

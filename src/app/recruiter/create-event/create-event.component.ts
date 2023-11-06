import {Component, HostListener} from '@angular/core';
import {TextChangeService} from "../../shared/services/text-change.service";
import {TitleService} from "../../shared/services/title.service";

@Component({
  selector: 'app-create-event',
  templateUrl: './create-event.component.html',
  styleUrls: ['./create-event.component.scss']
})

export class CreateEventComponent {
  public h1: string = 'Tworzenie wydarzenia';
  public isFormDirty: boolean = false;

  constructor(private textChangeService: TextChangeService,
              private titleService: TitleService) {
  }

  @HostListener('window:beforeunload', ['$event'])
  notification($event: any): void {
    if (this.isFormDirty) {
      $event.returnValue = 'Masz niezapisane zmiany. Czy na pewno chcesz opuścić tę stronę?';
    }
  }

  onFormDirtyChange(isFormDirty: boolean) {
    this.isFormDirty = isFormDirty;
  }

  ngOnInit() {
    document.getElementById('focusReset')?.focus();
    this.titleService.setTitle('Definiowanie wydarzenia');
    this.textChangeService.h1$.subscribe(h1 => {
      this.h1 = h1;
    })
  }
}

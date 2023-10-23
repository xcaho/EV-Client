import {Component} from '@angular/core';
import {TitleService} from "../../shared/services/title.service";

@Component({
  selector: 'app-error',
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.scss']
})
export class ErrorComponent {

  constructor(private titleService: TitleService) {
  }

  ngOnInit(): void {
    document.getElementById('focusReset')?.focus();
    this.titleService.setTitle('Strona nie znaleziona');
  }
}

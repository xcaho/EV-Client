import {Component} from '@angular/core';
import {TitleService} from "../../shared/services/title.service";
import {AuthService} from "../../shared/services/auth.service";

@Component({
  selector: 'app-error',
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.scss']
})
export class ErrorComponent {

  public userId: string | null;

  constructor(private titleService: TitleService, private authService: AuthService) {
    this.userId = this.authService.getUserId()
  }

  ngOnInit(): void {
    document.getElementById('focusReset')?.focus();
    this.titleService.setTitle('Strona nie znaleziona');
  }
}

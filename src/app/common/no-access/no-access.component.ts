import { Component } from '@angular/core';
import {TitleService} from "../../shared/services/title.service";
import {AuthService} from "../../shared/services/auth.service";

@Component({
  selector: 'app-no-access',
  templateUrl: './no-access.component.html',
  styleUrls: ['./no-access.component.scss']
})
export class NoAccessComponent {
  public userId: string | null;

  constructor(private titleService: TitleService, private authService: AuthService) {
    this.userId = this.authService.getUserId()
  }

  ngOnInit(): void {
    document.getElementById('focusReset')?.focus();
    this.titleService.setTitle('Brak dostępu');
  }
}

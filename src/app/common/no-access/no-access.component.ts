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
  private token: string | null = null;

  constructor(private titleService: TitleService,
              private authService: AuthService) {
    this.token = this.authService.token;
    this.userId = this.authService.getUserId();
  }

  ngOnInit(): void {
    if (this.authService.isTokenExpired(this.token)) {
      this.authService.removeToken();
    }

    document.getElementById('focusReset')?.focus();
    this.titleService.setTitle('Brak dostępu');
  }
}

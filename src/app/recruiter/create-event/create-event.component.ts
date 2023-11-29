import {Component, HostListener} from '@angular/core';
import {TextChangeService} from "../../shared/services/text-change.service";
import {TitleService} from "../../shared/services/title.service";
import {AuthService} from "../../shared/services/auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-create-event',
  templateUrl: './create-event.component.html',
  styleUrls: ['./create-event.component.scss']
})

export class CreateEventComponent {
  public h1: string = 'Tworzenie wydarzenia';
  public isFormDirty: boolean = false;
  private token: string | null = null;

  constructor(private textChangeService: TextChangeService,
              private titleService: TitleService,
              private authService: AuthService,
              private router: Router) {
    this.token = this.authService.token;
  }

  @HostListener('window:beforeunload', ['$event'])
  notification($event: any): void {
    if (this.isFormDirty) {
      $event.returnValue = 'Masz niezapisane zmiany. Czy na pewno chcesz opuścić tę stronę?';
    }
  }

  ngOnInit() {
    if (this.authService.isTokenExpired(this.token)) {
      this.authService.removeToken();
      this.authService.saveURL(this.router);
      this.router.navigate(['/login']);
    }

    document.getElementById('focusReset')?.focus();
    this.titleService.setTitle('Definiowanie wydarzenia');
    this.textChangeService.h1$.subscribe(h1 => {
      this.h1 = h1;
    })
  }

  onFormDirtyChange(isFormDirty: boolean) {
    this.isFormDirty = isFormDirty;
  }
}

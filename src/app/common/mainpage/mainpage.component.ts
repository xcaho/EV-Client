import {Component} from '@angular/core';
import {Router, NavigationEnd} from '@angular/router';
import {MenuService} from "../../menu.service";

@Component({
  selector: 'app-mainpage',
  templateUrl: './mainpage.component.html',
  styleUrls: ['./mainpage.component.scss']
})
export class MainpageComponent {
  constructor(private router: Router, private menuService: MenuService) {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        const shouldDisplayMenu = !event.url.includes('registration') && !event.url.includes('confirmation');
        this.menuService.setDisplayMenu(shouldDisplayMenu);
      }
    });
  }
}


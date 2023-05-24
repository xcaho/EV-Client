import { Component } from '@angular/core';
import {MenuService} from "../../menu.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  displayMenu$ = this.menuService.displayMenu$;

  constructor(public menuService: MenuService) {}

}

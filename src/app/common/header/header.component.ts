import {Component} from '@angular/core';
import {MenuService} from "../../menu.service";
import {ResolveEnd, Router} from "@angular/router";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  public displayMenu$ = this.menuService.displayMenu$;

  constructor(public menuService: MenuService,
              private router: Router) {
    this.router.events.subscribe((routerData) => {
      if(routerData instanceof ResolveEnd){
        this.route =  routerData.url.split('#')[0]
      }
    })
  }

  public route: string | undefined;
}

import {Component} from '@angular/core';
import {MenuService} from "../../menu.service";
import {ResolveEnd, Router} from "@angular/router";
import {AuthService} from "../../shared/services/auth.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  public displayMenu$ = this.menuService.displayMenu$;
  public route: string | undefined;

  constructor(public menuService: MenuService,
              private router: Router,
              public authService: AuthService) {
    this.router.events.subscribe((routerData) => {
      if(routerData instanceof ResolveEnd){
        this.route =  routerData.url.split('#')[0]
      }
    })
  }

  public deleteToken() {
    this.authService.removeToken();
  }
}

import {Component} from '@angular/core';
import {ResolveEnd, Router} from "@angular/router";
import {AuthService} from "../../shared/services/auth.service";
import {AdminService} from "../../shared/services/admin.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  public route: string | undefined;

  constructor(private router: Router,
              public authService: AuthService,
              public adminService: AdminService) {
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

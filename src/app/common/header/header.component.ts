import {Component, ElementRef, HostListener} from '@angular/core';
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
              public adminService: AdminService,
              private elementRef: ElementRef) {
    this.router.events.subscribe((routerData) => {
      if(routerData instanceof ResolveEnd){
        this.route =  routerData.url.split('#')[0]
      }
    })
  }

  @HostListener('document:click', ['$event'])
  handleDocumentClick(event: MouseEvent): void {
    const targetElement = event.target as HTMLElement;

    if (!this.elementRef.nativeElement.contains(targetElement)) {
      this.hideMenu();
    }
  }


  public deleteToken() {
    this.authService.removeToken();
  }

  hideMenu(): void {
    const navbarList = document.getElementById('navbarList');

    if (navbarList) {
      navbarList.classList.remove('show');
    }
  }
}

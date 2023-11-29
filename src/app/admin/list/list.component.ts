import {Component} from '@angular/core';
import {User} from "../../shared/dtos/User";
import {AdminService} from "../../shared/services/admin.service";
import {AuthService} from "../../shared/services/auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent {
  public users: User[] = [];
  private token: string | null = null;

  constructor(private adminService: AdminService,
              private authService: AuthService,
              private router: Router,
              ) {
    this.token = this.authService.token;
  }

  ngOnInit() {
    if (this.authService.isTokenExpired(this.token)) {
      this.authService.removeToken();
      this.authService.saveURL(this.router);
      this.router.navigate(['/login']);
    }

    this.adminService.getAllUsers().subscribe(users => {
      this.users = users;
    })

    this.adminService.getAllUsers().subscribe({
      next: (users: User[]) => {
        this.users = users;
      },
      error: (error) => {
        if (error?.status === 403) {
          this.router.navigate(['/403'], {skipLocationChange: true})
        } else {
          this.router.navigate(['/404'], {skipLocationChange: true});
        }
      }
    })
  }
}

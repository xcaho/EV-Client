import {Component} from '@angular/core';
import {User} from "../../shared/dtos/User";
import {AdminService} from "../../shared/services/admin.service";

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent {
  public users: User[] = []

  constructor(private adminService: AdminService) {
  }

  ngOnInit() {

    this.adminService.getAllUsers().subscribe(users => {

      this.users = users;
    })
  }
}

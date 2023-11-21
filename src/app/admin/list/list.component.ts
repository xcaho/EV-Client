import {Component} from '@angular/core';
import {User} from "../../shared/dtos/User";
import {AuthService} from "../../shared/services/auth.service";
import {Role} from "../../shared/enums/role";

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent {
  public users: User[] = [
    new User('sample@gmail.com', 'sample', Role.RECRUITER)
  ];

  constructor(private authService: AuthService) {
  }

  ngOnInit() {
  }
}

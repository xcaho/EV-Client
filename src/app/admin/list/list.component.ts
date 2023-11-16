import { Component } from '@angular/core';
import {User} from "../../shared/dtos/User";
import {AuthService} from "../../shared/services/auth.service";

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent {
  public users: User[] = [
    {
      email: '123',
      password: '123'
    }
  ];

  constructor(private authService: AuthService) {
  }

  ngOnInit() {
  }
}

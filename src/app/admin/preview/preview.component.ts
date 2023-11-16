import {Component, ViewChild} from '@angular/core';
import {User} from "../../shared/dtos/User";
import {faArrowUpRightFromSquare, faEdit} from "@fortawesome/free-solid-svg-icons";
import {AssignModalComponent} from "./assign-modal/assign-modal.component";

@Component({
  selector: 'app-preview',
  templateUrl: './preview.component.html',
  styleUrls: ['./preview.component.scss']
})
export class PreviewComponent {
  public user: User;
  public edit = faEdit;
  public open = faArrowUpRightFromSquare;
  @ViewChild(AssignModalComponent) assignModalComponent!: AssignModalComponent;

  constructor() {
    this.user = {
      email: '123',
      password: '123'
    } as User;
  }

  ngOnInit() {

  }

}

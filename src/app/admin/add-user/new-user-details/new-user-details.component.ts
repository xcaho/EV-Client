import {Component, ViewChild} from '@angular/core'

@Component({
  selector: 'app-new-user-details',
  templateUrl: './new-user-details.component.html',
  styleUrls: ['./new-user-details.component.scss']
})
export class NewUserDetailsComponent {
  @ViewChild('content') content: any | null;

  constructor() {
  }

  ngOnInit(){
    console.log(this.content)
  }
}

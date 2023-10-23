import {Component, OnInit} from '@angular/core';
import {AlertService} from "./service/alert.service";

@Component({
  selector: 'app-alerts',
  templateUrl: './alerts.component.html',
  styleUrls: ['./alerts.component.scss']
})
export class AlertsComponent implements OnInit {
  public message: string = '';

  constructor(private alertService: AlertService) {
  }

  ngOnInit() {
    this.alertService.getAlerts().subscribe(message => {
      this.message = message;
    });
  }

  closeAlert() {
    this.alertService.clear();
  }
}

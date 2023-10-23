import {Injectable} from '@angular/core';
import {Subject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AlertService {
  private alertSubject = new Subject<string>();

  getAlerts() {
    return this.alertSubject.asObservable();
  }

  showSuccess(message: string) {
    this.alertSubject.next(`success: ${message}`);
    setTimeout(() => {
      document.getElementById('alert-btn')?.focus();
    });
  }

  showError(message: string) {
    this.alertSubject.next(`danger: ${message}`);
    setTimeout(() => {
      document.getElementById('alert-btn')?.focus();
    });
  }

  showInfo(message: string) {
    this.alertSubject.next(`info: ${message}`);
    setTimeout(() => {
      document.getElementById('alert-btn')?.focus();
    });
  }

  showWarning(message: string) {
    this.alertSubject.next(`warning: ${message}`);
    setTimeout(() => {
      document.getElementById('alert-btn')?.focus();
    });
  }

  clear() {
    this.alertSubject.next('');
  }
}

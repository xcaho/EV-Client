import { Injectable } from '@angular/core';
import {Subject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class PreloaderService {
  private showSubject = new Subject<boolean>();
  show$ = this.showSubject.asObservable();

  show(): void {
    this.showSubject.next(true);
  }

  hide(): void {
    setTimeout(() => {
      this.showSubject.next(false);
    }, 200);
  }
}

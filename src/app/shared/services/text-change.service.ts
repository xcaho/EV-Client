import {Injectable} from '@angular/core';
import {BehaviorSubject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class TextChangeService {
  private h1 = new BehaviorSubject<string>('Tworzenie wydarzenia');
  private h2 = new BehaviorSubject<string>('Zdefiniuj nowe wydarzenie');

  h1$ = this.h1.asObservable();
  h2$ = this.h2.asObservable();

  setH1(newHeader: string) {
    this.h1.next(newHeader);
  }

  setH2(newHeader: string) {
    this.h2.next(newHeader);
  }
}

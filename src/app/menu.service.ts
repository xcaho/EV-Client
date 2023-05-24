import {Injectable} from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class MenuService {
  private displayMenu = new BehaviorSubject<boolean>(true);

  get displayMenu$() {
    return this.displayMenu.asObservable();
  }

  setDisplayMenu(display: boolean) {
    this.displayMenu.next(display);
  }
}

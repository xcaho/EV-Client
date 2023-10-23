import { Injectable } from '@angular/core';
import {BehaviorSubject} from "rxjs";
import {Title} from "@angular/platform-browser";

@Injectable({
  providedIn: 'root'
})
export class TitleService {
  private titleSubject = new BehaviorSubject<string>('Easy Visit');
  title$ = this.titleSubject.asObservable();

  constructor(private title: Title) {
  }

  setTitle(newTitle: string) {
    this.title.setTitle('Easy Visit - ' + newTitle);
  }
}

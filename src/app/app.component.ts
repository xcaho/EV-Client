import {Component} from '@angular/core';
import axios from 'axios';
import {Router} from "@angular/router";
import {TitleService} from "./shared/services/title.service";


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title: string = 'Portal do zarządzania badaniami';

  constructor(private router: Router,
              private titleService: TitleService) {
  }

  ngOnInit() {
    this.titleService.title$.subscribe(newTitle => {
      this.title = newTitle;
    })

    axios.interceptors.response.use(
      (response) => {
        console.log(response)
        return response;
      },
      (error) => {
        if (error.response && error.response.status === 404) {
          console.error('Resource not found:', error.response.data);
          this.router.navigate(['404']);
        } else {
          console.error('An error occurred:', error);
        }
        return Promise.reject(error);
      }
    );
  }
}


import { Component } from '@angular/core';
import {Subscription} from "rxjs";
import {PreloaderService} from "../../shared/services/preloader.service";

@Component({
  selector: 'app-preloader',
  templateUrl: './preloader.component.html',
  styleUrls: ['./preloader.component.scss']
})
export class PreloaderComponent {
  show = false;
  private subscription: Subscription;

  constructor(private preloaderService: PreloaderService) {
    this.subscription = this.preloaderService.show$.subscribe((show: boolean) => {
      this.show = show;
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}

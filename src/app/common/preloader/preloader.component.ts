import {ChangeDetectorRef, Component} from '@angular/core';
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

  constructor(private preloaderService: PreloaderService,
              private cdr: ChangeDetectorRef) {
    this.subscription = this.preloaderService.show$.subscribe((show: boolean) => {
      this.show = show;
      this.cdr.detectChanges();
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}

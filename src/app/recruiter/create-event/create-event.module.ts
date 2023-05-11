import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DefiningEventComponent } from './defining-event/defining-event.component';
import { AvailabilityComponent } from './availability/availability.component';
import {ReactiveFormsModule} from "@angular/forms";
import {RouterLink} from "@angular/router";



@NgModule({
    declarations: [
        DefiningEventComponent,
        AvailabilityComponent
    ],
  exports: [
    AvailabilityComponent,
    DefiningEventComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterLink
  ]
})
export class CreateEventModule { }

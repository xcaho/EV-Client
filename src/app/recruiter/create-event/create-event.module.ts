import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DefiningEventComponent } from './defining-event/defining-event.component';
import { AvailabilityComponent } from './availability/availability.component';
import {ReactiveFormsModule} from "@angular/forms";
import {RouterLink} from "@angular/router";
import { HoursAddComponent } from './availability/hours-add/hours-add.component';
import {FontAwesomeModule} from "@fortawesome/angular-fontawesome";



@NgModule({
    declarations: [
        DefiningEventComponent,
        AvailabilityComponent,
        HoursAddComponent
    ],
  exports: [
    AvailabilityComponent,
    DefiningEventComponent
  ],
    imports: [
        CommonModule,
        ReactiveFormsModule,
        RouterLink,
        FontAwesomeModule,
    ]
})
export class CreateEventModule { }

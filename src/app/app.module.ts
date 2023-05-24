import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HeaderComponent } from './common/header/header.component';
import { FooterComponent } from './common/footer/footer.component';
import { MainpageComponent } from './common/mainpage/mainpage.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {HttpClientModule} from "@angular/common/http";
import { CreateEventComponent } from './recruiter/create-event/create-event.component';
import { YourAppointmentsComponent } from './recruiter/your-appointments/your-appointments.component';
import {RouterModule, Routes} from '@angular/router';
import {CreateEventModule} from "./recruiter/create-event/create-event.module";
import {AvailabilityComponent} from "./recruiter/create-event/availability/availability.component";
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { EventComponent } from './recruiter/your-appointments/event/event.component';
import {EditEventComponent} from "./recruiter/your-appointments/event/edit-event/edit-event.component";
import {EventDto} from "./common/mainpage/EventDto";
import { SurveyRegistrationComponent } from './participant/survey-registration/survey-registration.component';

const appRoute: Routes = [
  {path: 'appointments', component: YourAppointmentsComponent},
  {path: 'availability', component: AvailabilityComponent},
  {path: 'create', component: CreateEventComponent},
  {path: 'event/:id', component: EventComponent, data: {event: EventDto}},
  {path: 'edit/:id', component: EditEventComponent},
  {path: '', redirectTo: 'appointments', pathMatch: 'full'}
]


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    MainpageComponent,
    CreateEventComponent,
    YourAppointmentsComponent,
    EventComponent,
    EditEventComponent,
    SurveyRegistrationComponent
  ],
    imports: [
        BrowserModule,
        NgbModule,
        FormsModule,
        HttpClientModule,
        RouterModule.forRoot(appRoute),
        ReactiveFormsModule,
        CreateEventModule,
        FontAwesomeModule
    ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

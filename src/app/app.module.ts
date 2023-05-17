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

const appRoute: Routes = [
  {path: 'appointments', component: YourAppointmentsComponent},
  {path: 'availability', component: AvailabilityComponent},
  {path: 'create', component: CreateEventComponent},
  {path: '', redirectTo: 'appointments', pathMatch: 'full'}
]


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    MainpageComponent,
    CreateEventComponent,
    YourAppointmentsComponent
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

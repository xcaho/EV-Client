import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {AppComponent} from './app.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {HeaderComponent} from './common/header/header.component';
import {FooterComponent} from './common/footer/footer.component';
import {MainpageComponent} from './common/mainpage/mainpage.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {HttpClientModule} from "@angular/common/http";
import {CreateEventComponent} from './recruiter/create-event/create-event.component';
import {YourAppointmentsComponent} from './recruiter/your-appointments/your-appointments.component';
import {RouterModule} from '@angular/router';
import {CreateEventModule} from "./recruiter/create-event/create-event.module";
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import {EventComponent} from './recruiter/your-appointments/event/event.component';
import {EditEventComponent} from "./recruiter/your-appointments/event/edit-event/edit-event.component";
import {SurveyRegistrationComponent} from './participant/survey-registration/survey-registration.component';
import {ConfirmationComponent} from './participant/confirmation/confirmation.component';
import {MenuService} from "./menu.service";
import {InvalidCodeComponent} from './participant/invalid-code/invalid-code.component';
import {ErrorComponent} from './common/error/error.component';
import {appRoutes} from './app.routes';
import {DeleteCodeComponent} from './recruiter/your-appointments/event/delete-code/delete-code.component';
import { DeleteEventComponent } from './recruiter/your-appointments/event/delete-event/delete-event.component';


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
    SurveyRegistrationComponent,
    ConfirmationComponent,
    InvalidCodeComponent,
    ErrorComponent,
    DeleteCodeComponent,
    DeleteEventComponent
  ],
  imports: [
    BrowserModule,
    NgbModule,
    FormsModule,
    HttpClientModule,
    RouterModule.forRoot(appRoutes),
    ReactiveFormsModule,
    CreateEventModule,
    FontAwesomeModule
  ],
  providers: [MenuService],
  bootstrap: [AppComponent]
})

export class AppModule {
}

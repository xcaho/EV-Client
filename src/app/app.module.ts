import {NgModule} from '@angular/core';
import {BrowserModule, Title} from '@angular/platform-browser';
import {AppComponent} from './app.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {HeaderComponent} from './common/header/header.component';
import {FooterComponent} from './common/footer/footer.component';
import {MainpageComponent} from './common/mainpage/mainpage.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {CreateEventComponent} from './recruiter/create-event/create-event.component';
import {YourAppointmentsComponent} from './recruiter/your-appointments/your-appointments.component';
import {RouterModule} from '@angular/router';
import {CreateEventModule} from "./recruiter/create-event/create-event.module";
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import {EventComponent} from './recruiter/your-appointments/event/event.component';
import {EditEventComponent} from "./recruiter/your-appointments/event/edit-event/edit-event.component";
import {SurveyRegistrationComponent} from './participant/survey-registration/survey-registration.component';
import {ConfirmationComponent} from './participant/confirmation/confirmation.component';
import {InvalidCodeComponent} from './participant/invalid-code/invalid-code.component';
import {ErrorComponent} from './common/error/error.component';
import {appRoutes} from './app.routes';
import {DeleteCodeComponent} from './recruiter/your-appointments/event/delete-code/delete-code.component';
import {DeleteEventComponent} from './recruiter/your-appointments/event/delete-event/delete-event.component';
import {AlertsComponent} from "./common/alerts/alerts.component";
import {AlertService} from "./common/alerts/service/alert.service";
import {LoginComponent} from './common/login/login.component';
import {RegisterComponent} from './common/register/register.component';
import {TokenInterceptorService} from "./token-interceptor.service";
import {ListComponent} from './admin/list/list.component';
import {PreviewComponent} from './admin/preview/preview.component';
import {AddUserComponent} from './admin/add-user/add-user.component';
import {AssignModalComponent} from './admin/preview/assign-modal/assign-modal.component';
import {ResetPasswordModalComponent} from './admin/preview/reset-password-modal/reset-password-modal.component';
import {BlockUserModalComponent} from './admin/preview/block-user-modal/block-user-modal.component';
import {ChangePasswordComponent} from './common/change-password/change-password.component';
import {NoAccessComponent} from './common/no-access/no-access.component';
import {NewUserDetailsComponent} from './admin/add-user/new-user-details/new-user-details.component';
import { ShowNewPasswordModalComponent } from './admin/preview/reset-password-modal/show-new-password-modal/show-new-password-modal.component';


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
    DeleteEventComponent,
    AlertsComponent,
    LoginComponent,
    RegisterComponent,
    ListComponent,
    PreviewComponent,
    AddUserComponent,
    AssignModalComponent,
    ResetPasswordModalComponent,
    BlockUserModalComponent,
    ChangePasswordComponent,
    NoAccessComponent,
    NewUserDetailsComponent,
    ShowNewPasswordModalComponent,
  ],
  imports: [
    BrowserModule,
    NgbModule,
    FormsModule,
    HttpClientModule,
    RouterModule.forRoot(appRoutes),
    ReactiveFormsModule,
    CreateEventModule,
    FontAwesomeModule,
  ],
  providers: [
    AlertService,
    Title,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptorService,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})

export class AppModule {
}

import {Routes} from "@angular/router";
import {YourAppointmentsComponent} from "./recruiter/your-appointments/your-appointments.component";
import {AvailabilityComponent} from "./recruiter/create-event/availability/availability.component";
import {CreateEventComponent} from "./recruiter/create-event/create-event.component";
import {EventComponent} from "./recruiter/your-appointments/event/event.component";
import {EditEventComponent} from "./recruiter/your-appointments/event/edit-event/edit-event.component";
import {SurveyRegistrationComponent} from "./participant/survey-registration/survey-registration.component";
import {ConfirmationComponent} from "./participant/confirmation/confirmation.component";
import {InvalidCodeComponent} from "./participant/invalid-code/invalid-code.component";
import {ErrorComponent} from "./common/error/error.component";
import {LoginComponent} from "./common/login/login.component";
import {RegisterComponent} from "./common/register/register.component";
import {ListComponent} from "./admin/list/list.component";
import {AddUserComponent} from "./admin/add-user/add-user.component";
import {PreviewComponent} from "./admin/preview/preview.component";
import {ResetPasswordComponent} from "./common/login/reset-password/reset-password.component";
import {ChangePasswordComponent} from "./common/change-password/change-password.component";

const appRoute: Routes = [
  {
    path: 'admin',
    component: ListComponent
  },
  {
    path: 'admin/add-user',
    component: AddUserComponent
  },
  {
    path: 'admin/users/:user-id',
    component: PreviewComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'register',
    component: RegisterComponent
  },
  {
    path: 'reset-password',
    component: ResetPasswordComponent
  },
  {
    path: 'change-password',
    component: ChangePasswordComponent
  },
  {
    path: 'users/:user-id/appointments',
    component: YourAppointmentsComponent
  },
  {
    path: 'availability',
    component: AvailabilityComponent
  },
  {
    path: 'edit/:id/availability',
    component: AvailabilityComponent
  },
  {
    path: 'create',
    component: CreateEventComponent,
  },
  {
    path: 'event/:id',
    component: EventComponent
  },
  {
    path: 'edit/:id',
    component: EditEventComponent
  },
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'register/:code',
    component: SurveyRegistrationComponent},
  {
    path: 'register/:code/confirmation',
    component: ConfirmationComponent
  },
  {
    path: 'register/:code/invalid-code',
    component: InvalidCodeComponent
  },
  {
    path: '404',
    component: ErrorComponent,
  },
  {
    path: '**',
    redirectTo: '/404',
  }
]

export const appRoutes: Routes = appRoute;

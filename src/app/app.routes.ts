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
import {ListComponent} from "./admin/list/list.component";
import {AddUserComponent} from "./admin/add-user/add-user.component";
import {PreviewComponent} from "./admin/preview/preview.component";
import {ChangePasswordComponent} from "./common/change-password/change-password.component";
import {NewUserDetailsComponent} from "./admin/add-user/new-user-details/new-user-details.component";
import {NoAccessComponent} from "./common/no-access/no-access.component";
import {ConsentComponent} from "./recruiter/create-event/consent/consent.component";

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
    path: 'admin/add-user/:user-id',
    component: NewUserDetailsComponent
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
    path: 'consent',
    component: ConsentComponent
  },
  {
    path: 'edit/:id/availability',
    component: AvailabilityComponent
  },
  {
    path: 'edit/:id/consent',
    component: ConsentComponent
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
    path: '403',
    component: NoAccessComponent,
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

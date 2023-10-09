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

const appRoute: Routes = [
  {path: 'appointments', component: YourAppointmentsComponent},
  {path: 'availability', component: AvailabilityComponent},
  {path: 'edit/:id/availability', component: AvailabilityComponent},
  {path: 'create', component: CreateEventComponent},
  {path: 'event/:id', component: EventComponent},
  {path: 'edit/:id', component: EditEventComponent},
  {path: '', redirectTo: 'appointments', pathMatch: 'full'},
  {path: 'register/:code', component: SurveyRegistrationComponent},
  {path: 'register/:code/confirmation', component: ConfirmationComponent},
  {path: 'register/:code/invalid-code', component: InvalidCodeComponent},
  {path: '404', component: ErrorComponent},
  {path: '**', redirectTo: '/404'}
]


export const appRoutes: Routes = appRoute;

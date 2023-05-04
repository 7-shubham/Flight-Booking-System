import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BookingFlightComponent } from './booking-flight/booking-flight.component';
import { ViewDetailsComponent } from './view-details/view-details.component';
import { InvalidPageComponent } from './invalid-page/invalid-page.component';
import { HomeComponent } from './home/home.component';
import { UserDetailsComponent } from './user-details/user-details.component';

const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'booking-flight', component:BookingFlightComponent},
  {path: 'view-booked', component: ViewDetailsComponent},
  {path: 'user-details/:id', component:UserDetailsComponent},
  {path: '**', component: InvalidPageComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

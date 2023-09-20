import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ReservationManagementComponent } from './reservation-management.component';

const routes: Routes = [
  {
    path: '',
    component: ReservationManagementComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReservationManagementRoutingModule { }

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ReservationHistoryComponent } from './reservation-history.component';

const routes: Routes = [
  {
    path: '',
    component: ReservationHistoryComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReservationHistoryRoutingModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReservationHistoryComponent } from './reservation-history.component';
import { ReservationHistoryRoutingModule } from './reservation-history-routing.module';


@NgModule({
  declarations: [
    ReservationHistoryComponent
  ],
  imports: [
    CommonModule,
    ReservationHistoryRoutingModule
  ]
})
export class ReservationHistoryModule { }

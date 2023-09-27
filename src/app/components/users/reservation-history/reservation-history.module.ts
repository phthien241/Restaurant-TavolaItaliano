import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReservationHistoryComponent } from './reservation-history.component';
import { ReservationHistoryRoutingModule } from './reservation-history-routing.module';
import { MatListModule } from '@angular/material/list';
import { MatExpansionModule } from '@angular/material/expansion';


@NgModule({
  declarations: [
    ReservationHistoryComponent
  ],
  imports: [
    CommonModule,
    ReservationHistoryRoutingModule,
    MatListModule,
    MatExpansionModule
  ]
})
export class ReservationHistoryModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReservationManagementComponent } from './reservation-management.component';
import {MatListModule} from '@angular/material/list';
import { ReservationManagementRoutingModule } from './reservation-management-routing.module';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatNativeDateModule } from '@angular/material/core';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';


@NgModule({
  declarations: [
    ReservationManagementComponent
  ],
  imports: [
    CommonModule,
    MatListModule,
    ReservationManagementRoutingModule,
    MatSelectModule,
    MatFormFieldModule,
    MatNativeDateModule,
    MatDatepickerModule,
    MatInputModule
  ]
})
export class ReservationManagementModule { }

import { Component } from '@angular/core';

@Component({
  selector: 'app-reservation-management',
  templateUrl: './reservation-management.component.html',
  styleUrls: ['./reservation-management.component.scss']
})
export class ReservationManagementComponent {
minDate: Date;
maxDate: Date;
picker: Date;
constructor(){
  this.minDate = new Date();
}
}

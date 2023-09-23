import { Component, OnInit } from '@angular/core';
import { Reservation } from 'src/app/models/reservation.model';
import { ReservationService } from 'src/app/services/reservation.service';

@Component({
  selector: 'app-reservation-management',
  templateUrl: './reservation-management.component.html',
  styleUrls: ['./reservation-management.component.scss']
})
export class ReservationManagementComponent implements OnInit {
  reservations: Reservation[] = []
  minDate: Date;
  maxDate: Date;
  picker: Date;
  constructor(private reservationService: ReservationService) {
    this.minDate = new Date();
    
  }
  ngOnInit(): void {
    this.reservationService.getReservation();
    this.reservationService.getReservationUpdatedListener().subscribe((reservation: Reservation[])=>{
      this.reservations = reservation;
    })  
  }
}

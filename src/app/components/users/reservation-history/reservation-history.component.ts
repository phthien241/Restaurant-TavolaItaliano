import { Component, OnInit } from '@angular/core';
import { Reservation } from 'src/app/models/reservation.model';
import { ReservationService } from 'src/app/services/reservation.service';

@Component({
  selector: 'app-reservation-history',
  templateUrl: './reservation-history.component.html',
  styleUrls: ['./reservation-history.component.scss']
})
export class ReservationHistoryComponent implements OnInit {
  reservations: Reservation[]=[];
  constructor(private reservationService: ReservationService){}
  ngOnInit(): void {
      this.reservationService.getReservationUser(localStorage.getItem("email"));
      this.reservationService.getReservationUpdatedListener().subscribe({
        next: response=>{
          this.reservations = [...response];
        }
      })
  }

}

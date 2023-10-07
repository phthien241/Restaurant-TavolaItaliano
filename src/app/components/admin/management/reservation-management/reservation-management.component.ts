import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Reservation } from 'src/app/models/reservation.model';
import { ReservationService } from 'src/app/services/reservation.service';

@Component({
  selector: 'app-reservation-management',
  templateUrl: './reservation-management.component.html',
  styleUrls: ['./reservation-management.component.scss']
})
export class ReservationManagementComponent implements OnInit {
  reservations: Reservation[] = []
  picker: Date;
  selectedDate: Date;
  branch: string;
  constructor(private reservationService: ReservationService, private router: Router, private route: ActivatedRoute) {
    
  }
  ngOnInit(): void {
    this.router.navigate(['/reservationmanagement']);
    this.reservationService.getReservation();
    this.reservationService.getReservationUpdatedListener().subscribe((reservation: Reservation[])=>{
      this.reservations = reservation;
    })  
  }

  dateChanged(): void {
    this.reservationService.getReservationDate(this.selectedDate, this.branch);
    if(this.selectedDate && this.branch){
      this.router.navigate([], {
        queryParams: { date: this.selectedDate.toISOString(), branch: this.branch},
        queryParamsHandling: 'merge'
      });
    }else if(this.selectedDate){
      this.router.navigate([], {
        queryParams: { date: this.selectedDate.toISOString()},
        queryParamsHandling: 'merge'
      });
    }else{
      this.router.navigate([], {
        queryParams: { branch: this.branch},
        queryParamsHandling: 'merge'
      });
    }
    
  }
}

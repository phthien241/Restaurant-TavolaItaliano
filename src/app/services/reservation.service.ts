import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Reservation } from '../models/reservation.model';

@Injectable({
  providedIn: 'root'
})
export class ReservationService {
  private reservation = []
  private reservationUpdated = new Subject<Reservation[]>()
  constructor(private http: HttpClient) { }

  getReservation(){
    this.http.get<any[]>("http://localhost:3000/api/reservation/get-reservation").subscribe({
      next: response=>{
        this.reservation = [...response];
      },
      complete: ()=>{
        this.reservationUpdated.next([...this.reservation]);
      }
    })
  }

  getReservationDate(date: Date, branch: string){
    let dateFilter = (date!=null) ? date.toISOString() : null;
    this.http.post<any[]>("http://localhost:3000/api/reservation/get-reservation-filter",{date:dateFilter, branch: branch}).subscribe({
      next: response=>{
        this.reservation = [...response];
      },
      complete: ()=>{
        this.reservationUpdated.next([...this.reservation]);
      }
    })
  }

  getReservationUser(email:string){
    this.http.post<any[]>("http://localhost:3000/api/reservation/get-reservation-user",{email:email}).subscribe({
      next: response=>{
        this.reservation = [...response]
      },
      complete:()=>{
        this.reservationUpdated.next([...this.reservation]);
      }
    })
  }

  getReservationUpdatedListener(){
    return this.reservationUpdated.asObservable();
  }

  makeReservation(reservation: any) {
    this.http.post<{message:string}>("http://localhost:3000/api/reservation/make-reservation", reservation).subscribe({
      next: response => {
        console.log(response.message);
      }, error: err => {
        console.log(err.error.message)
      },
      complete: () => {

      },
    })
  }
}

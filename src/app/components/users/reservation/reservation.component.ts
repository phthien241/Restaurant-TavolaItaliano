import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ReservationService } from 'src/app/services/reservation.service';

@Component({
  selector: 'app-reservation',
  templateUrl: './reservation.component.html',
  styleUrls: ['./reservation.component.scss']
})
export class ReservationComponent {
  today = new Date().toISOString().split('T')[0];
  currentTime: string;

  constructor(private reservationService: ReservationService) {
    this.currentTime = this.getCurrentTime();
    console.log(this.currentTime);
  }

  onSubmit(form:NgForm){
    let reservation = {name: form.value.name, size: form.value.guest, branch : form.value.branch, date: form.value.date, time : form.value.time}
    this.reservationService.makeReservation(reservation);

  }

  private getCurrentTime(): string {
    const now = new Date();
    const time24Hour = now.getHours().toString().padStart(2, '0') + ':' +
      now.getMinutes().toString().padStart(2, '0');

    if (this.isSafari()) {
      const period = now.getHours() >= 12 ? 'PM' : 'AM';
      let hour12 = now.getHours() % 12 || 12;
      return hour12 + ':' + now.getMinutes().toString().padStart(2, '0') + ' ' + period;
    }

    return time24Hour;
  }

  private isSafari(): boolean {
    const userAgent = navigator.userAgent;
    return (userAgent.indexOf('Safari') > -1 && userAgent.indexOf('Chrome') === -1);
  }

}

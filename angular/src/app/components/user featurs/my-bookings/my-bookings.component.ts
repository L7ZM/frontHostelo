import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Reservation } from 'src/app/models/reservation/reservation.model';
import { ReservationService } from 'src/app/services/reservation/reservation.service';

@Component({
  selector: 'app-my-bookings',
  templateUrl: './my-bookings.component.html',
  styleUrls: ['./my-bookings.component.scss']
})
export class MyBookingsComponent {
  bookings: Reservation[] = [];

  constructor(private http: HttpClient,
     private reservationService: ReservationService,
        private messageService: MessageService,
        private confirmationService: ConfirmationService,
  ) {}

  ngOnInit(): void {
    this.fetchBookings();
  }

  fetchBookings(): void {
    this.reservationService.getMyReservation().subscribe(
      (data) => (this.bookings = data),
      (error) => console.error('Error fetching bookings:', error)
    );
  }

  cancelReservation(bookings: Reservation) {
    console.log('youre in cancel button')
    this.confirmationService.confirm({
      message: 'Are you sure you want to cancel this reservation?',
      header: 'Confirm Cancellation',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {

        this.reservationService.cancelReservation(bookings.id).subscribe({
          next: () => {
            this.messageService.add({
              severity: 'success',
              summary: 'Success',
              detail: 'Reservation cancelled successfully'
            });
            this.fetchBookings();
          },
          error: () => this.messageService.add({
            severity: 'info',
            summary: 'Info',
            detail: 'You cannot cancel the reservation within 48 hours of check-in'
          })
        });
      },
      reject: () => {
        console.log("you remove reservation that have id : " , bookings.id)
        this.messageService.add({
          severity: 'info',
          summary: 'Cancelled',
          detail: 'Reservation cancellation cancelled'
        });
      }
    });
  }
}

import { DatePipe } from '@angular/common';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { data } from 'jquery';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Facture } from 'src/app/models/facture/facture.model';
import { Reservation } from 'src/app/models/reservation/reservation.model';
import { FactureService } from 'src/app/services/facture/facture.service';
import { ReservationService } from 'src/app/services/reservation/reservation.service';


@Component({
  selector: 'app-booking-management',
  templateUrl: './booking-management.component.html',
  styleUrls: ['./booking-management.component.scss'],
  providers: [DatePipe]
})
export class BookingManagementComponent  implements OnInit {
  reservations: any[] = [];
  statusOptions: { label: string; value: string }[] = [];
  factureDialogVisible: boolean=false;
  facture: any;

  constructor(private changeDetectorRef: ChangeDetectorRef,
    private reservationService: ReservationService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private factureService: FactureService,
    private datePipe: DatePipe) {}

  ngOnInit() {
    this.loadReservations();
  }
  loadReservations() {
    this.reservationService.getAllReservation().subscribe(
      (data) => {
        console.log(data)
        this.reservations = this.transformDates(data);
           },
      (error) => {
        console.error('Error loading services', error);
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Could not load services' });
      }
    );
    this.changeDetectorRef.detectChanges();
  }
  getSeverity(status: string ){
    switch (status) {
        case 'EN_ATTENTE':
            return 'danger';

        case 'CONFIRMEE':
            return 'success';

            default:
      return '';
    }
  }

    transformDates(data: any[]): any[] {
      return data.map(item => {
        if (item.dateDebut) {
          item.dateDebut = this.datePipe.transform(item.dateDebut, 'MM/dd/yyyy');
        }
        if (item.dateFin) {
          item.dateFin = this.datePipe.transform(item.dateFin, 'MM/dd/yyyy');
        }
        return item;
      });
  }

validateReservation(reservation: Reservation) {
  this.confirmationService.confirm({
    message: 'Are you sure you want to validate this reservation?',
    header: 'Confirm validation',
    icon: 'pi pi-exclamation-triangle',
    accept: () => {
      this.reservationService.validateReservation(reservation.id).subscribe({
        next: (response: any) => {
          // Handle response (JSON or plain text)
          const successMessage = typeof response === 'string' ? response : response.message;
          this.messageService.add({
            severity: 'success',
            summary: 'Success',
            detail: successMessage,
          });
          this.loadReservations(); // Refresh the data
        },
        error: (err) => {
          console.error('Validation error:', err);
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: 'Could not validate the reservation',
          });
        },
      });
    },
    reject: () => {
      this.messageService.add({
        severity: 'info',
        summary: 'Cancelled',
        detail: 'Reservation validation cancelled',
      });
    },
  });
}

viewFacture(booking: any): void {
  this.factureDialogVisible = true;
  const reservationId = booking.id; 

  this.reservationService.getFactureByReservationId(reservationId).subscribe(
    (data: any) => {
      this.facture = data;
    },
    (error) => {
      console.error('Error fetching facture:', error);
      this.factureDialogVisible = false;
    }
  );
}

clearFacture(): void {
  this.facture = null;
}

closeFactureDialog(): void {
  this.factureDialogVisible = false;
  this.clearFacture();
}

validatePayment(facture: Facture): void {
  if (!facture) {
    this.messageService.add({
      severity: 'error',
      summary: 'Error',
      detail: 'Facture not found.',
    });
    return;
  }

  this.factureService.payerFacture(facture.id).subscribe({
    next: (updatedFacture) => {
      console.log(facture.id);
      facture.etatPaiement = updatedFacture.etatPaiement;

      this.messageService.add({
        severity: 'success',
        summary: 'Success',
        detail: 'Payment validated successfully.',
      });
    },
    error: (err) => {
      console.log(facture.id) , "error";
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'Failed to validate payment.',
      });
    },
  });
}

  deleteReservation(reservation: Reservation) {
    this.confirmationService.confirm({
      message: 'Are you sure you want to cancel this reservation?',
      header: 'Confirm Cancellation',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {

        this.reservationService.cancelReservation(reservation.id).subscribe({
          next: () => {
            this.messageService.add({
              severity: 'success',
              summary: 'Success',
              detail: 'Reservation cancelled successfully'
            });
            this.loadReservations();
          },
          error: () => this.messageService.add({
            severity: 'info',
            summary: 'Info',
            detail: 'You cannot cancel the reservation within 48 hours of check-in'
          })
        });
      },
      reject: () => {
        console.log("you remove reservation that have id : " , reservation.id)
        this.messageService.add({
          severity: 'info',
          summary: 'Cancelled',
          detail: 'Reservation cancellation cancelled'
        });
      }
    });
  }
}




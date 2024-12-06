import { Component } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Room } from 'src/app/models/room/room.model';
import { RoomService } from 'src/app/services/rooms/room-service.service';

@Component({
  selector: 'app-room',
  templateUrl: './room-management.component.html',
  styleUrls: ['./room-management.component.scss'],
  providers: [MessageService,ConfirmationService]
})
export class RoomManagementComponent {

  rooms: Room[] = [];
  room: Room = {
    numeroChambre: 0,
    etat: '',
    type: '',
    prix: 0,
    description: '',
    photos: []
  };
  selectedRoom: Room | null = null;
  displayDialog = false;
  isNew = false;

  typeOptions = [
    { label: 'Single', value: 'single' },
    { label: 'Double', value: 'Double' },
    { label: 'Deluxe', value: 'Deluxe' }
  ];

  etatOptions = [
    { label: 'DISPONIBLE', value: 'DISPONIBLE' },
    { label: 'OCCUPE', value: 'OCCUPEE' },
    { label: 'MAINTENANCE', value: 'EN_ENTRETIEN' }
  ];

  constructor(
    private roomService: RoomService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
  ) {
    this.loadRooms();
  }

  loadRooms() {
    this.roomService.getAll().subscribe({
      next: (data) => this.rooms = data,
      error: () => this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'Failed to load rooms'
      })
    });
  }

  openNew() {
    this.room = {
      numeroChambre: 0,
      etat: '',
      type: '',
      prix: 0,
      description: '',
      photos: []
    };
    this.isNew = true;
    this.displayDialog = true;
  }

  editRoom(room: Room) {
    this.room = { ...room };
    this.isNew = false;
    this.displayDialog = true;
  }

  deleteRoom(room: Room) {
    this.confirmationService.confirm({
      message: 'Are you sure you want to delete this room?',
      header: 'Confirm Deletion',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.roomService.delete(room.id!).subscribe({
          next: () => {
            this.messageService.add({
              severity: 'success',
              summary: 'Success',
              detail: 'Room deleted successfully'
            });
            this.loadRooms();
          },
          error: () => this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: 'Failed to delete room'
          })
        });
      },
      reject: () => {
        this.messageService.add({
          severity: 'info',
          summary: 'Cancelled',
          detail: 'Room deletion cancelled'
        });
      }
    });
  }

  onPhotoSelect(event: any) {
    const files = event.files;
    if (files && files.length > 0) {
      // Use type assertion to ensure TypeScript understands the array contains File objects
      (files as File[]).forEach((file: File) => {
        // Check if it's a valid File object
        if (file instanceof File) {
          this.room.photos.push(file);
        }
      });
    }
  }



  removePhoto(index: number) {
    this.room.photos.splice(index, 1);
  }
  saveRoom() {
    const formData = new FormData();
    formData.append('chambre', JSON.stringify(this.room)); // The room details as JSON string

    // Append each file in the photos array to FormData
    this.room.photos.forEach((photo: File) => {
      formData.append('photo', photo, photo.name); // 'photo' as the field name and `photo.name` for the filename
    });

    // Send the form data to the backend
    if (this.isNew) {
      this.roomService.create(formData).subscribe({
        next: () => {
          this.messageService.add({
            severity: 'success',
            summary: 'Success',
            detail: 'Room created successfully'
          });
          this.loadRooms();
          this.displayDialog = false;
        },
        error: () => this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Failed to create room'
        })
      });
    } else {
      this.roomService.update(this.room.id!, formData).subscribe({
        next: () => {
          this.messageService.add({
            severity: 'success',
            summary: 'Success',
            detail: 'Room updated successfully'
          });
          this.loadRooms();
          this.displayDialog = false;
        },
        error: () => this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Failed to update room'
        })
      });
    }
  }

}

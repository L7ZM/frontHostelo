import { Component } from '@angular/core';
import { MessageService } from 'primeng/api';
import { Room } from 'src/app/models/room/room.model';
import { RoomService } from 'src/app/services/rooms/room-service.service';

@Component({
  selector: 'app-room',
  templateUrl: './room-management.component.html',
  styleUrls: ['./room-management.component.scss'],
  providers: [MessageService]
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
    private messageService: MessageService
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
    if (confirm('Are you sure you want to delete this room?')) {
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
    }
  }

  onPhotoSelect(event: any) {
    const files = event.files;
    Array.from(files).forEach((file: any) => {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.room.photos.push(e.target.result.split(',')[1]);
      };
      reader.readAsDataURL(file);
    });
  }

  removePhoto(index: number) {
    this.room.photos.splice(index, 1);
  }

  saveRoom() {
    if (this.isNew) {
      this.roomService.create(this.room).subscribe({
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
      this.roomService.update(this.room.id!, this.room).subscribe({
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

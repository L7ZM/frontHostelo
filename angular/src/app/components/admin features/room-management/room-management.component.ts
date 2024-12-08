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
    // Ensure this.room.photos exists before using it
    if (!this.room.photos) {
      this.room.photos = [];
    }

    const files: FileList = event.files;
    if (files && files.length > 0) {
      Array.from(files).forEach((file: File) => {
        this.room.photos.push(file); // Push each file into the photos array
      });
    }
  }


  removePhoto(index: number) {
    this.room.photos.splice(index, 1);
  }

  saveRoom() {
    if (this.isNew) {
      const formData = new FormData();
      formData.append("chambre", JSON.stringify(this.room)); // Serialize the room object

      // Append each photo
      this.room.photos.forEach(photo => {
        formData.append("photo", photo);  // Assuming the API expects 'photo' key
      });

      this.roomService.create(formData).subscribe({
        next: (room) => {
          console.log("Room created successfully:", room);
        },
        error: (error) => {
          console.error("Error creating room:", error);
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: 'Failed to create room'
          });
        }
      });
    }
  }



}

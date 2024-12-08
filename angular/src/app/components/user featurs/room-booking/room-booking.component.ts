import { RoomService } from 'src/app/services/rooms/room-service.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-room-booking',
  templateUrl: './room-booking.component.html',
  styleUrls: ['./room-booking.component.scss'],
})
export class RoomBookingComponent {
  dates: Date[] = [];  // Model for the date range picker
  startDate!: Date;
  endDate!: Date;

  onSearch() {
    if (this.dates) {
      console.log(`Searching for rooms between ${this.dates}`);
      // Implement the logic to filter rooms based on the date range
    } else {
      console.log('Please select both start and end dates.');
    }
  }
  rooms: any[] = [];
  roomPhotos: any = {}; 
  constructor(private roomService: RoomService) {}
  ngOnInit(): void {
    this.roomService.getAll().subscribe(
      (data) => {
        this.rooms = data;
      },
      (error) => {
        console.error('Error fetching room data', error);
      }
    );
  }
    // Method to fetch room photos by room ID
    fetchRoomPhotos(roomId: number): void {
      this.roomService.getPhotoById(roomId).subscribe(
        (photos) => {
          this.roomPhotos[roomId] = photos; // Store photos for the specific room
        },
        (error) => {
          console.error('Error fetching photos for room', error);
        }
      );
    }
}

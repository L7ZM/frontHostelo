import { RoomService } from 'src/app/services/rooms/room-service.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-room-booking',
  templateUrl: './room-booking.component.html',
  styleUrls: ['./room-booking.component.scss'],
})
export class RoomBookingComponent {
  rooms: any[] = [];
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
}

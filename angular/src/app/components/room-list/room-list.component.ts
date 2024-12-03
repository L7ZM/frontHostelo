import { Component, OnInit } from '@angular/core';
import { RoomService } from 'src/app/services/rooms/room-service.service';
import { Room } from 'src/app/models/room/room.model';

@Component({
  selector: 'app-room-list',
  templateUrl: './room-list.component.html',
  styleUrls: ['./room-list.component.scss']
})
export class RoomListComponent implements OnInit {
  rooms: Room[] = [];
  filteredRooms: Room[] = [];
  selectedDate: string = '';
  selectedPeople: number = 1;
  searchQuery: string = '';

  constructor(private roomService: RoomService) {}

  ngOnInit(): void {
    this.roomService.getAll().subscribe((data) => {
      this.rooms = data;
      this.filteredRooms = [...this.rooms]; // Initially show all rooms
    });
  }

  filterRooms(): void {
    this.filteredRooms = this.rooms.filter((room) => {
      const matchesSearchQuery = room.type.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
                                room.description.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
                                room.prix.toString().includes(this.searchQuery);

      return matchesSearchQuery;
    });
  }

  onServiceChange(room: Room): void {

  }

  bookRoom(roomId: number|any): void {
    if (this.selectedDate) {
      alert(`Room ${roomId} booked for ${this.selectedDate} with ${this.selectedPeople} people.`);
    } else {
      alert('Please select a date');
    }
  }
}

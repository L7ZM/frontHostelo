import { Component, OnInit } from '@angular/core';
import { RoomService } from 'src/app/services/rooms/room-service.service';

@Component({
  selector: 'app-room-booking',
  templateUrl: './room-booking.component.html',
  styleUrls: ['./room-booking.component.scss'],
})
export class RoomBookingComponent implements OnInit {
  // Date related properties
  dates: Date[] = [];
  startDate!: Date;
  endDate!: Date;

  // Room and guest properties
  rooms: any[] = [];
  roomTypes: any[] = [];
  roomPhotos: { [key: number]: string[] } = {};

  // Filter properties
  roomTypeFilter: any;
  priceFilter: any;
  availabilityFilter: any;
  priceRange: number[] = [0, 1000];

  // Dialog control
  displayDialog: boolean = false;
  selectedRoom: any = null;

  // Dropdown options
  guestOptions: any[] = [
    { label: '1 Room, 1 Guest', value: '1-1' },
    { label: '1 Room, 2 Guests', value: '1-2' },
    { label: '1 Room, 3 Guests', value: '1-3' },
    { label: '2 Rooms, 4 Guests', value: '2-4' }
  ];

  specialRateOptions: any[] = [
    { label: 'Standard Rate', value: 'STANDARD' },
    { label: 'Member Rate', value: 'MEMBER' },
    { label: 'Corporate Rate', value: 'CORPORATE' },
    { label: 'Senior Rate', value: 'SENIOR' }
  ];

  // Form model properties
  guestCount: any;
  roomsGuests: any;
  specialRate: any;

  constructor(private roomService: RoomService) {}

  ngOnInit(): void {
    this.initializeData();
  }

  private initializeData(): void {
    // Fetch rooms
    this.fetchRooms();

    // Initialize default values
    this.roomsGuests = this.guestOptions[0].value;
    this.specialRate = this.specialRateOptions[0].value;
  }

  private fetchRooms(): void {
    this.roomService.getAll().subscribe({
      next: (data) => {
        this.rooms = data;
        // Fetch photos for each room
        this.rooms.forEach(room => {
          this.fetchRoomPhotos(room.id);
        });
      },
      error: (error) => {
        console.error('Error fetching room data', error);
      }
    });
  }

  fetchRoomPhotos(roomId: number): void {
    this.roomService.getPhotoById(roomId).subscribe({
      next: (photos) => {
        this.roomPhotos[roomId] = photos;
      },
      error: (error) => {
        console.error(`Error fetching photos for room ${roomId}:`, error);
      }
    });
  }

  searchRooms(): void {
    const searchCriteria = {
      startDate: this.startDate,
      endDate: this.endDate,
      guestCount: this.roomsGuests,
      specialRate: this.specialRate,
      priceRange: this.priceRange,
      roomType: this.roomTypeFilter,
      availability: this.availabilityFilter
    };

    console.log('Search criteria:', searchCriteria);
    // Implement search logic here using the roomService
  }

  onSearch(): void {
    if (this.dates && this.dates.length === 2) {
      this.startDate = this.dates[0];
      this.endDate = this.dates[1];
      this.searchRooms();
    } else {
      console.log('Please select both start and end dates.');
    }
  }

  openRoomDetails(room: any): void {
    this.selectedRoom = room;
    this.displayDialog = true;
  }

  bookRoom(room: any): void {
    console.log('Booking room:', room);
    // Implement booking logic here
  }

  // Helper method to get photos for a specific room
  getRoomPhotos(roomId: number): string[] {
    return this.roomPhotos[roomId] || [];
  }

  // Optional: Method to format price for display
  formatPrice(price: number): string {
    return new Intl.NumberFormat('fr-FR', {
      style: 'currency',
      currency: 'EUR'
    }).format(price);
  }
}

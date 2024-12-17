import { Component, HostListener, OnInit } from '@angular/core';
import { RoomService } from 'src/app/services/rooms/room-service.service';

@Component({
  selector: 'app-room-booking',
  templateUrl: './room-booking.component.html',
  styleUrls: ['./room-booking.component.scss'],
})
export class RoomBookingComponent implements OnInit {
  dateFrom!: Date;
  dateTo!: Date;
  rooms: any[] = [];
  filteredRooms: any[] = [];
  navbarfixed: boolean = false;

  // Filters properties
  visible: boolean = false;
  priceRange: number[] = [100, 1000]; // Price range filter
  roomTypes: string[] = ['SIMPLE', 'DELUXE', 'DOUBLE']; // Static room types
  selectedRoomTypes: string[] = []; // User selected room types

  // Availability options
  availabilityOptions: string[] = ['DISPONIBLE', 'OCCUPEE', 'EN_ENTRETIEN'];
  selectedAvailability: string = ''; // Stores selected availability option

  @HostListener('window:scroll', ['$event'])
  onscroll() {
    this.navbarfixed = window.scrollY > 100;
  }

  constructor(private roomService: RoomService) {}

  ngOnInit(): void {
    this.fetchRooms();
  }

  // Fetch all rooms
  fetchRooms(): void {
    this.roomService.getAll().subscribe(
      (data) => {
        this.rooms = data;
        this.filteredRooms = [...this.rooms]; // Initialize filteredRooms with all rooms
      },
      (error) => {
        console.error('Error fetching room data', error);
      }
    );
  }

  // Apply Filters
  applyFilters(): void {
    this.filteredRooms = this.rooms.filter((room) => {
      // Check if room price is within the selected range
      const inPriceRange =
        room.prix >= this.priceRange[0] && room.prix <= this.priceRange[1];

      // Check if room type matches selected types (or if no types are selected)
      const matchesType =
        this.selectedRoomTypes.length === 0 || this.selectedRoomTypes.includes(room.type);

      // Check if room availability matches the selected availability (or if no availability filter is selected)
      const matchesAvailability =
        this.selectedAvailability === '' || room.etat === this.selectedAvailability;

      return inPriceRange && matchesType && matchesAvailability;
    });

    this.visible = false; // Close the dialog after applying filters
  }

  // Reset Filters
  resetFilters(): void {
    this.priceRange = [100, 1000]; // Reset price range
    this.selectedRoomTypes = []; // Clear selected room types
    this.selectedAvailability = ''; // Clear selected availability
    this.filteredRooms = [...this.rooms]; // Reset filtered rooms to all rooms
  }
}

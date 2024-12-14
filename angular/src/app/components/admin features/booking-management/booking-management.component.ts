import { Component,  HostListener } from '@angular/core';
import { FormControl } from '@angular/forms';
import * as $ from 'jquery'; // Import jQuery
import { RoomService } from 'src/app/services/rooms/room-service.service';

@Component({
  selector: 'app-booking-management',
  templateUrl: './booking-management.component.html',
  styleUrls: ['./booking-management.component.scss']
})
export class BookingManagementComponent   {
  dateFrom!: Date;
  dateTo!: Date;
  dates: Date[] = [];
  roomPhotos: { [key: number]: string[] } = {};
  rooms: any[] = [];
  navbarfixed:boolean = false;

  @HostListener('window:scroll',['$event']) onscroll(){
    if(window.scrollY > 100)
    {
      this.navbarfixed = true;
    }
    else
    {
      this.navbarfixed = false;
    }
  }

  onSearch() {
    if (this.dates) {
      console.log(`Searching for rooms from ${this.dateFrom} to ${this.dateTo} `);
      // Implement the logic to filter rooms based on the date range
    } else {
      console.log('Please select both start and end dates.');
    }
  }

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

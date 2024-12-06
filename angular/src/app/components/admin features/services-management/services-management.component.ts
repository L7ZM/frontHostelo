import { Component } from '@angular/core';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-services-management',
  templateUrl: './services-management.component.html',
  styleUrls: ['./services-management.component.scss'],
  providers: [MessageService],
})
export class ServicesManagementComponent {
addService() {
throw new Error('Method not implemented.');
}
  services = [
    { id: 1, name: 'Premium Cleaning', description: 'Detailed cleaning service for rooms', price: 50 },
    { id: 2, name: 'Laundry Service', description: 'Fast and reliable laundry service', price: 15 },
    { id: 3, name: 'Room Service', description: '24/7 food and beverage service', price: 30 },
  ];

  serviceDialog: boolean = false;
  service: any = {};
  submitted: boolean = false;

  constructor(private messageService: MessageService) {}

  // Open dialog for new service
  openNew() {
    this.service = {};
    this.submitted = false;
    this.serviceDialog = true;
  }

  // Hide the dialog
  hideDialog() {
    this.serviceDialog = false;
  }

  // Save a new or edited service
  saveService() {
    this.submitted = true;

    if (this.service.name && this.service.description && this.service.price) {
      if (this.service.id) {
        // Update existing service
        const index = this.services.findIndex((s) => s.id === this.service.id);
        if (index !== -1) {
          this.services[index] = { ...this.service };
        }
        this.messageService.add({ severity: 'success', summary: 'Updated', detail: 'Service updated successfully' });
      } else {
        // Add new service
        this.service.id = this.services.length + 1;
        this.services.push(this.service);
        this.messageService.add({ severity: 'success', summary: 'Added', detail: 'Service added successfully' });
      }
      this.serviceDialog = false;
    } else {
      this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Please fill all fields' });
    }
  }

  // Edit an existing service
  editService(service: any) {
    this.service = { ...service };
    this.serviceDialog = true;
  }

  // Delete a service
  deleteService(service: any) {
    this.services = this.services.filter((s) => s.id !== service.id);
    this.messageService.add({ severity: 'success', summary: 'Deleted', detail: 'Service deleted successfully' });
  }
}

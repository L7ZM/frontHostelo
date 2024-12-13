import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { ServicesManageService } from 'src/app/services/servicesManagement/services-manage.service'; // Import the service

@Component({
  selector: 'app-services-management',
  templateUrl: './services-management.component.html',
  styleUrls: ['./services-management.component.scss'],
  providers: [MessageService],
})
export class ServicesManagementComponent implements OnInit {
  services: any[] = [];
  serviceDialog: boolean = false;
  service: any = {};
  submitted: boolean = false;

  constructor(
    private messageService: MessageService,
    private serviceService: ServicesManageService // Inject the service
  ) {}

  ngOnInit(): void {
    this.loadServices(); // Load services from the API when the component initializes
  }

  // Load all services from the API
  loadServices() {
    this.serviceService.getAllServices().subscribe(
      (data) => {
        this.services = data;
      },
      (error) => {
        console.error('Error loading services', error);
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Could not load services' });
      }
    );
  }

  // Open dialog for new service
  openNew() {
    this.service = {};
    this.submitted = false;
    this.serviceDialog = true;
  }

  // Hide the service dialog
  hideDialog() {
    this.serviceDialog = false;
  }

  // Save the service (add or update)
  saveService() {
    this.submitted = true;

    if (this.service.name && this.service.description && this.service.price) {
      if (this.service.id) {
        // Update existing service
        this.serviceService.updateService(this.service.id,this.service).subscribe(
          () => {
            this.loadServices();
            this.serviceDialog = false;
            this.messageService.add({ severity: 'success', summary: 'Updated', detail: 'Service updated successfully' });
          },
          (error) => {
            this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Error updating service' });
          }
        );
      } else {
        // Add new service
        this.serviceService.addService(this.service).subscribe(
          () => {
            this.loadServices();
            this.serviceDialog = false;
            this.messageService.add({ severity: 'success', summary: 'Added', detail: 'Service added successfully' });
          },
          (error) => {
            this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Error adding service' });
          }
        );
      }
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
    this.serviceService.deleteService(service.id).subscribe(
      () => {
        this.loadServices();
        this.messageService.add({ severity: 'success', summary: 'Deleted', detail: 'Service deleted successfully' });
      },
      (error) => {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Error deleting service' });
      }
    );
  }
}

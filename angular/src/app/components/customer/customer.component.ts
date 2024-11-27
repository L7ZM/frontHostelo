import { Component, OnInit } from '@angular/core';
import { CustomerDTO } from '../../models/customer/customer-dto';
import { CustomerService } from '../../services/customer/customer.service';
import { CustomerRegistrationRequest } from '../../models/customer/customer-registration-request';
import { ConfirmationService, MessageService } from 'primeng/api';
import { AuthenticationService } from 'src/app/services/authentication/authentication.service';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.scss']
})
export class CustomerComponent implements OnInit {

  display = false;
  operation: 'create' | 'update' = 'create';
  customers: Array<CustomerDTO> = [];
  customer: CustomerRegistrationRequest = {};

  constructor(
    private customerService: CustomerService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private authService: AuthenticationService
  ) {}

  ngOnInit(): void {
    this.findAllCustomers();
  }


  private findAllCustomers() {
    this.customerService.findAll()
    .subscribe({
      next: (data) => {
        this.customers = data;
        console.log(data);
      }
    })
  }

  save(customer: CustomerRegistrationRequest) {
    const token = this.authService.getToken(); // Get the token
    if (!token) {
      this.messageService.add({
        severity: 'error',
        summary: 'Unauthorized',
        detail: 'No authentication token found!',
      });
      return;
    }

    if (customer && customer.id !== undefined) {
      customer.pointsFidelite = 0;
      this.customerService.updateCustomer(customer.id!, customer as CustomerDTO, token).subscribe({
        next: () => {
          this.findAllCustomers();
          this.display = false;
          this.customer = {};
          this.messageService.add({
            severity: 'success',
            summary: 'Customer updated',
            detail: `Customer ${customer.nom} was successfully updated`,
          });
        },
      });
      
    } else {
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'Customer ID is missing!',
      });
    }
    
  }
  
  deleteCustomer(customer: CustomerDTO) {
    this.confirmationService.confirm({
      header: 'Delete customer',
      message: `Are you sure you want to delete ${customer.nom}? You can\'t undo this action afterwords`,
      accept: () => {
        this.customerService.deleteCustomer(customer.id)
        .subscribe({
          next: () => {
            this.findAllCustomers();
            this.messageService.add(
              {
                severity:'success',
                summary: 'Customer deleted',
                detail: `Customer ${customer.nom} was successfully deleted`
              }
            );
          }
        });
      }
    });
  }

  updateCustomer(customerDTO: CustomerDTO) {
    this.display = true;
    this.customer = customerDTO; // Populate the form with customer data
    this.operation = 'update'; // Set operation to update for form handling
  }
  

  createCustomer() {
    this.display = true;
    this.customer = {};
    this.operation = 'create';
  }

  cancel() {
    this.display = false;
    this.customer = {};
    this.operation = 'create';
  }
}

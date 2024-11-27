import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CustomerRegistrationRequest } from '../../models/customer/customer-registration-request';

@Component({
  selector: 'app-manage-customer',
  templateUrl: './manage-customer.component.html',
  styleUrls: ['./manage-customer.component.scss']
})
export class ManageCustomerComponent {

  @Input()
  customer: CustomerRegistrationRequest = {};
  @Input()
  operation: 'create' | 'update' = 'create';
  @Output()
  submit: EventEmitter<CustomerRegistrationRequest> = new EventEmitter<CustomerRegistrationRequest>();
  @Output()
  cancel: EventEmitter<void> = new EventEmitter<void>();

  get isCustomerValid(): boolean {
    return this.hasLength(this.customer.nom) && this.hasLength(this.customer.prenom) &&
      this.hasLength(this.customer.email) &&
      (
        this.operation === 'update' ||
        this.hasLength(this.customer.password) 
      )
      ;
  }

  private hasLength(input: string | undefined): boolean {
    return input !== null && input !== undefined && input.length > 0
  }

  onSubmit() {
    this.submit.emit(this.customer);
  }

  onCancel() {
    this.cancel.emit();
  }
}

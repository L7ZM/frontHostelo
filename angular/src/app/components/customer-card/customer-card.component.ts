import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CustomerDTO } from '../../models/customer-dto';

@Component({
  selector: 'app-customer-card',
  templateUrl: './customer-card.component.html',
  styleUrls: ['./customer-card.component.scss']
})
export class CustomerCardComponent {

  @Input()
  customer: CustomerDTO = {
    pointsFidelite: 0
  };
  @Input()
  customerIndex = 0;

  @Output()
  delete: EventEmitter<CustomerDTO> = new EventEmitter<CustomerDTO>();
  @Output()
  update: EventEmitter<CustomerDTO> = new EventEmitter<CustomerDTO>();

  get customerImage(): string {
    const gender = this.customer.pointsFidelite === 0 ? 30 : 50 ;
    return `https://randomuser.me/api/portraits/male/${this.customerIndex}.jpg`;
  }

  onDelete() {
    this.delete.emit(this.customer);
  }
  onUpdate() {
    this.update.emit(this.customer);
  }
}

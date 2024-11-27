import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CustomerDTO } from '../../models/customer/customer-dto';
import { environment } from '../../../environments/environment';
import { CustomerRegistrationRequest } from '../../models/customer/customer-registration-request';
import { CustomerUpdateRequest } from '../../models/customer/customer-update-request';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  private readonly customerUrl = `${environment.api.baseUrl}/${environment.api.customerUrl}`;

  constructor(
    private http: HttpClient
  ) { }

  findAll(): Observable<CustomerDTO[]> {
    return this.http.get<CustomerDTO[]>(this.customerUrl);
  }

  registerCustomer(customer: CustomerRegistrationRequest): Observable<void> {
    return this.http.post<void>(this.customerUrl, customer);
  }

  deleteCustomer(id: number | undefined): Observable<void> {
    return this.http.delete<void>(`${this.customerUrl}/${id}`);
  }
  updateCustomer(id: number, customer: CustomerDTO, token: string): Observable<CustomerDTO> {
    return this.http.put<CustomerDTO>(`${this.customerUrl}/${id}`, customer, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }
  
  
}

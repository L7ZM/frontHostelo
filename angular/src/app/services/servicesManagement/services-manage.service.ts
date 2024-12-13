import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ServicesManageService {
  private apiUrl = 'http://localhost:8080/api/admin/services'; // URL to your API

  constructor(private http: HttpClient) { }

  // Get all services
  getAllServices(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}`);
  }

  // Get a service by ID
  getServiceById(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }

  // Add a new service
  addService(service: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}`, service);
  }

  // Update an existing service
  updateService(id: number, service: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${id}`, service);
  }

  // Delete a service
  deleteService(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${id}`);
  }
}

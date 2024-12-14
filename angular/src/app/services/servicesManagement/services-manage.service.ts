import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ServicesManageService {
  private ApiUrl = 'http://localhost:8080/api/admin/serviceAdditionnel'; // URL to your API
  private DeleteApiUrl = 'http://localhost:8080/api/admin'; // URL to your API

  constructor(private http: HttpClient) { }

  // Get all services
  getAllServices(): Observable<any> {
    return this.http.get<any>(`${this.ApiUrl}`);
  }

  // Add a new service
  addService(service: any): Observable<any> {
    let params = new HttpParams();
    for (let key in service) {
      if (service.hasOwnProperty(key)) {
        params = params.set(key, service[key]);
      }
    }
    return this.http.post<any>(`${this.ApiUrl}`, null, { params });
  }

  // Update an existing service
  updateService(id: number, service: any): Observable<any> {
    let params = new HttpParams();
    for (let key in service) {
      if (service.hasOwnProperty(key)) {
        params = params.set(key, service[key]);
      }
    }
    return this.http.put<any>(`${this.ApiUrl}/${id}`, null, { params });
  }

  // Delete a service
  deleteService(id: number): Observable<any> {
    return this.http.delete<any>(`${this.DeleteApiUrl}/${id}`);
  }
}

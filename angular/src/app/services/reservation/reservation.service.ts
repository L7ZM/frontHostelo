import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ReservationService {
  private ApiUrl = 'http://localhost:8080/api/reservations';

  constructor(private http: HttpClient) { }

   getAllReservation(): Observable<any> {
      return this.http.get<any>(`${this.ApiUrl}`);
    }

    cancelReservation(idReservation: number): Observable<void> {
      return this.http.delete<void>(`${this.ApiUrl}/${idReservation}`);
    }

    validateReservation(id: number): Observable<string> {
      return this.http.put<string>(`${this.ApiUrl}/${id}/validate`, {});
    }
}

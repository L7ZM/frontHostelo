// src/app/services/room.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Room } from 'src/app/models/room/room.model';
@Injectable({
  providedIn: 'root'
})
export class RoomService {
  private baseUrl = 'http://localhost:8080/api/chambres';

  constructor(private http: HttpClient) { }

  getAll(): Observable<Room[]> {
    return this.http.get<Room[]>(this.baseUrl)
      .pipe(catchError(this.handleError));
  }

  getById(id: number): Observable<Room> {
    return this.http.get<Room>(`${this.baseUrl}/${id}`)
      .pipe(catchError(this.handleError));
  }

  create(room: Room): Observable<Room> {
    return this.http.post<Room>(this.baseUrl, room)
      .pipe(catchError(this.handleError));
  }

  update(id: number, room: Room): Observable<Room> {
    return this.http.put<Room>(`${this.baseUrl}/${id}`, room)
      .pipe(catchError(this.handleError));
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`)
      .pipe(catchError(this.handleError));
  }

  getAvailable(): Observable<Room[]> {
    return this.http.get<Room[]>(`${this.baseUrl}/disponibles`)
      .pipe(catchError(this.handleError));
  }

  private handleError(error: HttpErrorResponse) {
    let errorMessage = 'An error occurred';
    if (error.error instanceof ErrorEvent) {
      errorMessage = `Error: ${error.error.message}`;
    } else {
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    return throwError(() => new Error(errorMessage));
  }
}
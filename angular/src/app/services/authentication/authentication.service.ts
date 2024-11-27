import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthenticationRequest } from '../../models/auth/authentication-request';
import { Observable } from 'rxjs';
import { AuthenticationResponse } from '../../models/auth/authentication-response';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  private readonly authUrl = `${environment.api.baseUrl}/${environment.api.authUrl}`;

  constructor(
    private http: HttpClient
  ) { }

  login(authRequest: AuthenticationRequest): Observable<AuthenticationResponse> {
    return this.http.post<AuthenticationResponse>(this.authUrl, authRequest);
  }
  
  getToken(): string | undefined | null{
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      const authResponse: AuthenticationResponse = JSON.parse(storedUser);
      return authResponse.token; // Extract and return the token
    }
    return null;
  }
}

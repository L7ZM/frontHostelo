import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Facture } from 'src/app/models/facture/facture.model';

@Injectable({
  providedIn: 'root'
})
export class FactureService {
  private ApiUrl = 'http://localhost:8080/api/factures/payer';
 constructor(private http: HttpClient) {}

 payerFacture(factureId: number): Observable<Facture> {
  return this.http.post<Facture>(`${this.ApiUrl}/${factureId}` , {});
}
}

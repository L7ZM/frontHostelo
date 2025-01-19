export interface Facture {
    id: number; 
    dateEmission: string;
    montantTotal: number; 
    etatPaiement: 'PAID' | 'NOT_PAID'; 
    reservationId: number; 
  }
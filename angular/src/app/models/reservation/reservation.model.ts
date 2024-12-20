export interface Reservation {
    id: number;  
    numeroChambre: number; 
    dateDebut: string;      
    dateFin: string;       
    clientId: number;      
    status: string;        
    totalPrice?: number;    
    services?: string[];    
  }
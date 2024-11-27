export interface Room {
    id?: number;
    numeroChambre: number;
    etat: string;
    type: string;
    prix: number;
    description: string;
    photos: string[]; // Array of base64 strings
}
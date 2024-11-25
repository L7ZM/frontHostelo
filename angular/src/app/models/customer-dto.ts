export interface CustomerDTO {

  id?: number;
  nom?: string;
  prenom?: string;
  adresse?: string ;
  telephone?: string ;
  pointsFidelite: number;
  age?: number;
  dateNaissance? : Date;
  roles?: string[],
  username?: string;
}

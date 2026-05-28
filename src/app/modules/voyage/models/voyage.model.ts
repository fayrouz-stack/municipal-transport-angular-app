export interface Ligne {
  id: number;
  numero: string;
  destination: string;
}

export interface Horaire {
  id: number;
  date_voyage: string;
  horaire_depart: string;
  horaire_arrive: string;
  retard_estime: number;
}

export interface Vehicule {
  id: number;
  marque: string;
  type_vehicule: string;
  matriculeFourni: string;
  modele: string;                    // ✅ add
  carburant: string;                 // ✅ add
  etat: string;                      // ✅ add (e.g., 'Bon', 'Moyen', 'Mauvais')
  vehiculeDispo: boolean;            // ✅ add
  kilometrage: number;               // ✅ add
  localisation: string;              // ✅ add
  date_fin_assurance: string | Date; // ✅ add
  date_prochain_ct: string | Date;   // ✅ add
  date_premiere_mise_circulation: string | Date; // ✅ add
  date_validite_exploitation: string | Date;    // ✅ add
}

export interface Chauffeur {
  matricule: string;
  nom: string;
  prenom: string;
}

export interface Voyage {
  id: number;
  dateVoyage: string;
  nombrePlacesDisponible: number;
  prix: number;
  ligne: Ligne;
  horaire: Horaire;
  vehicule: Vehicule;
  chauffeur: Chauffeur;
}
export class Vehicule {
  id?: number;
  marque!: string;
  modele!: string;
  type_vehicule!: string;           // Nouveau
  etat!: string;                     // Au lieu de statut
  vehiculeDispo!: boolean;           // Nouveau
  matriculeFourni!: string;          // Au lieu de immatriculation
  localisation!: string;             // Nouveau
  kilometrage!: number;
  date_fin_assurance!: Date | null;  // Nouveau
  date_prochain_ct!: Date | null;    // Nouveau
  date_premiere_mise_circulation!: Date | null; // Nouveau
  carburant!: string;
  date_validite_exploitation!: Date | null;     // Nouveau

  constructor(data?: Partial<Vehicule>) {
    Object.assign(this, data);
  }
}

export type VehiculeEtat = 
  | 'disponible' 
  | 'en service' 
  | 'en panne' 
  | 'bon état' 
  | 'neuf' 
  | 'usé' 
  | 'en réparation';

export const ETATS = {
  'disponible': { label: 'Disponible', color: 'success', icon: 'cil-check-circle' },
  'en service': { label: 'En service', color: 'primary', icon: 'cil-truck' },
  'en panne': { label: 'En panne', color: 'danger', icon: 'cil-ban' },
  'bon état': { label: 'Bon état', color: 'info', icon: 'cil-check' },
  'neuf': { label: 'Neuf', color: 'success', icon: 'cil-star' },
  'usé': { label: 'Usé', color: 'secondary', icon: 'cil-warning' },
  'en réparation': { label: 'En réparation', color: 'warning', icon: 'cil-settings' }
};

export const CARBURANTS = [
  'Essence', 'Diesel', 'Électrique', 'Hybride', 'GPL'
];

export const MARQUES = [
  'Renault', 'Peugeot', 'Citroën', 'Mercedes', 'BMW', 'Audi', 'Volkswagen', 
  'Ford', 'Toyota', 'Nissan', 'Hyundai', 'Kia', 'Fiat', 'Volvo', 'MAN'
];

export const TYPES_VEHICULE = [
  'Voiture', 'Bus', 'Minibus', 'Camion', 'Utilitaire'
];
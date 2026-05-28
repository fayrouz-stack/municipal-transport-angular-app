import { Component, OnInit, inject } from '@angular/core';
import { VehiculeService, Vehicule } from 'src/app/modules/vehicule/vehicule.service';

@Component({
  selector: 'app-vehicule-list',
  templateUrl: './vehicule-list.component.html',
  styleUrls: ['./vehicule-list.component.scss']
})
export class VehiculeListComponent implements OnInit {
  private vehiculeService = inject(VehiculeService);

  vehicules: Vehicule[] = [];
  filteredVehicules: Vehicule[] = [];
  loading = false;
  searchTerm = '';
  etatFilter = '';

  currentPage = 1;
  itemsPerPage = 10;
  totalItems = 0;
  totalPages = 0;

  etats = [
    'disponible',
    'en service',
    'en panne',
    'bon état',
    'neuf',
    'usé',
    'en réparation'
  ];

  ngOnInit(): void {
    this.loadVehicules();
  }

  loadVehicules(): void {
    this.loading = true;
    this.vehiculeService.getAll().subscribe({
      next: (response: Vehicule[]) => {
        // ✅ CORRIGÉ : response est directement un tableau Vehicule[]
        this.vehicules = response;
        this.applyFilters();
        this.loading = false;
      },
      error: (err) => {
        console.error('Erreur', err);
        this.loading = false;
      }
    });
  }

  applyFilters(): void {
    this.filteredVehicules = this.vehicules.filter(v => {
      const matchSearch = !this.searchTerm || 
        v.matriculeFourni?.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        v.marque?.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        v.modele?.toLowerCase().includes(this.searchTerm.toLowerCase());
      
      const matchEtat = !this.etatFilter || v.etat === this.etatFilter;
      
      return matchSearch && matchEtat;
    });
    this.totalItems = this.filteredVehicules.length;
    this.totalPages = Math.ceil(this.totalItems / this.itemsPerPage);
  }

  onSearch(): void {
    this.currentPage = 1;
    this.applyFilters();
  }

  onEtatChange(): void {
    this.currentPage = 1;
    this.applyFilters();
  }

  resetFilters(): void {
    this.searchTerm = '';
    this.etatFilter = '';
    this.applyFilters();
  }

  deleteVehicule(id: number): void {
    if (confirm('Êtes-vous sûr ?')) {
      this.vehiculeService.delete(id).subscribe({
        next: () => this.loadVehicules(),
        error: (err) => console.error(err)
      });
    }
  }

  getEtatClass(etat: string): string {
    const classes: Record<string, string> = {
      'disponible': 'bg-success',
      'en service': 'bg-primary',
      'en panne': 'bg-danger',
      'bon état': 'bg-info',
      'neuf': 'bg-success',
      'usé': 'bg-secondary',
      'en réparation': 'bg-warning'
    };
    return classes[etat] || 'bg-secondary';
  }

  getDisponibiliteLabel(disponible: boolean): string {
    return disponible ? 'Oui' : 'Non';
  }

  get paginatedVehicules(): Vehicule[] {
    const start = (this.currentPage - 1) * this.itemsPerPage;
    return this.filteredVehicules.slice(start, start + this.itemsPerPage);
  }

  previousPage(): void {
    if (this.currentPage > 1) this.currentPage--;
  }

  nextPage(): void {
    if (this.currentPage < this.totalPages) this.currentPage++;
  }
}
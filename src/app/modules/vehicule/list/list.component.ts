import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';
import { Subscription } from 'rxjs';
import { VehiculeService, Vehicule } from '../vehicule.service';

@Component({
  selector: 'app-vehicule-list',
  standalone: false,
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit, OnDestroy {
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

  private routerSubscription!: Subscription;

  constructor(
    private vehiculeService: VehiculeService,
    private router: Router
  ) {}

  ngOnInit(): void {
    // 🔥 Charge les données immédiatement
    this.loadVehicules();

    // 🔥 Recharge les données à chaque fois qu'on revient sur cette page
    this.routerSubscription = this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => {
      if (this.router.url.includes('/vehicules/list')) {
        console.log('🟢 Rechargement des données après navigation...');
        this.loadVehicules();
      }
    });
  }

  ngOnDestroy(): void {
    if (this.routerSubscription) {
      this.routerSubscription.unsubscribe();
    }
  }

  loadVehicules(): void {
    console.log('🟢 Chargement des véhicules...');
    this.loading = true;
    this.vehiculeService.getAll().subscribe({
      next: (response: Vehicule[]) => {
        console.log('🟢 Données reçues :', response.length);
        this.vehicules = response;
        this.applyFilters();
        this.loading = false;
      },
      error: (err) => {
        console.error('🔴 Erreur', err);
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

  assuranceClass(date: Date | string | null): string {
    if (!date) return 'bg-secondary';
    const d = new Date(date);
    const now = new Date();
    const diffDays = Math.floor((d.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
    if (diffDays < 0) return 'bg-danger';
    if (diffDays <= 30) return 'bg-warning text-dark';
    return 'bg-success';
  }

  assuranceLabel(date: Date | string | null): string {
    if (!date) return '-';
    const d = new Date(date);
    const now = new Date();
    const diffDays = Math.floor((d.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
    const formatted = d.toLocaleDateString('fr-FR');
    if (diffDays < 0) return `⚠️ Expirée (${formatted})`;
    if (diffDays <= 30) return `⏳ ${diffDays}j (${formatted})`;
    return formatted;
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
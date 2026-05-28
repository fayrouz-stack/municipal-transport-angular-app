import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ChauffeurService } from '../chauffeur.service';
import { Chauffeur } from '../chauffeur.model';

@Component({
  selector: 'app-chauffeur-list',
  standalone: false,
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ChauffeurListComponent implements OnInit {

  private chauffeurService = inject(ChauffeurService);
  private route = inject(ActivatedRoute);

  chauffeurs: Chauffeur[] = [];
  filteredChauffeurs: Chauffeur[] = [];

  loading = false;
  searchTerm = '';

  currentPage = 1;
  itemsPerPage = 10;

  totalItems = 0;
  totalPages = 0;

  ngOnInit(): void {
    // ✅ FIX: reload data every time route is activated
    this.route.url.subscribe(() => {
      this.loadChauffeurs();
    });
  }

  loadChauffeurs(): void {
    this.loading = true;

    this.chauffeurService.getAll().subscribe({
      next: (response) => {
        this.chauffeurs = response;
        this.applyFilters();
        this.loading = false;
      },
      error: (err) => {
        console.error('Erreur lors du chargement', err);
        this.loading = false;
      }
    });
  }

  applyFilters(): void {
    const search = this.searchTerm.toLowerCase();

    this.filteredChauffeurs = this.chauffeurs.filter(c =>
      !this.searchTerm ||
      c.nom?.toLowerCase().includes(search) ||
      c.prenom?.toLowerCase().includes(search) ||
      c.cin?.toLowerCase().includes(search)
    );

    this.totalItems = this.filteredChauffeurs.length;
    this.totalPages = Math.ceil(this.totalItems / this.itemsPerPage);

    if (this.totalPages === 0) {
      this.totalPages = 1;
    }
  }

  onSearch(): void {
    this.currentPage = 1;
    this.applyFilters();
  }

  resetFilters(): void {
    this.searchTerm = '';
    this.currentPage = 1;
    this.applyFilters();
  }

  deleteChauffeur(id: number): void {
    if (confirm('Êtes-vous sûr de vouloir supprimer ce chauffeur ?')) {
      this.chauffeurService.delete(id).subscribe({
        next: () => {
          this.loadChauffeurs();
        },
        error: (err) => {
          console.error('Erreur suppression', err);
        }
      });
    }
  }

  get paginatedChauffeurs(): Chauffeur[] {
    const start = (this.currentPage - 1) * this.itemsPerPage;
    return this.filteredChauffeurs.slice(start, start + this.itemsPerPage);
  }

  previousPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
    }
  }

  nextPage(): void {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
    }
  }
}

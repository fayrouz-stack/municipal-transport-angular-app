import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AffectationService } from '../affectation.service';
import { Affectation } from '../affectation.model';

@Component({
  selector: 'app-affectation-list',
  standalone: false,
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class AffectationListComponent implements OnInit {

  private service = inject(AffectationService);
  private route = inject(ActivatedRoute);

  affectations: Affectation[] = [];
  filtered: Affectation[] = [];
  loading = false;
  filterStatut = '';

  ngOnInit(): void {
    this.route.url.subscribe(() => this.load());
  }

  load(): void {
    this.loading = true;
    this.service.getAll().subscribe({
      next: (data) => {
        this.affectations = data;
        this.applyFilters();
        this.loading = false;
      },
      error: (err) => {
        console.error('Erreur chargement affectations', err);
        this.loading = false;
      }
    });
  }

  applyFilters(): void {
    this.filtered = this.affectations.filter(a =>
      !this.filterStatut || a.statut === this.filterStatut
    );
  }

  deleteAffectation(id: number): void {
    if (confirm('Supprimer cette affectation ?')) {
      this.service.delete(id).subscribe({
        next: () => this.load(),
        error: (err) => console.error(err)
      });
    }
  }

  statutBadgeColor(statut?: string): string {
    switch (statut) {
      case 'PLANIFIEE': return 'info';
      case 'EN_COURS':  return 'primary';
      case 'TERMINEE':  return 'success';
      case 'ANNULEE':   return 'danger';
      default:          return 'secondary';
    }
  }
}

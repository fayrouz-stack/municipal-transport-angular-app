import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { VehiculeService, Vehicule } from '../vehicule.service';

@Component({
  selector: 'app-vehicule-detail',
  templateUrl: './detail.component.html',
  standalone: false,
  styleUrls: ['./detail.component.scss']
})
export class DetailComponent implements OnInit {
  private vehiculeService = inject(VehiculeService);
  private route = inject(ActivatedRoute);
  private router = inject(Router);

  vehicule: Vehicule | null = null;
  loading = true;

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    if (id) {
      this.loadVehicule(id);
    }
  }

  loadVehicule(id: number): void {
    this.loading = true;
    this.vehiculeService.getById(id).subscribe({
      next: (data) => {
        this.vehicule = data;
        this.loading = false;
      },
      error: (err) => {
        console.error('Erreur lors du chargement du véhicule', err);
        this.loading = false;
      }
    });
  }

  goBack(): void {
    this.router.navigate(['/vehicules']);
  }

  dateClass(date: Date | string | null): string {
    if (!date) return '';
    const d = new Date(date);
    const diffDays = Math.floor((d.getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24));
    if (diffDays < 0) return 'text-danger fw-bold';
    if (diffDays <= 30) return 'text-warning fw-bold';
    return 'text-success';
  }

  dateLabel(date: Date | string | null): string {
    if (!date) return '-';
    const d = new Date(date);
    const diffDays = Math.floor((d.getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24));
    const formatted = d.toLocaleDateString('fr-FR');
    if (diffDays < 0) return `⚠️ Expirée — ${formatted}`;
    if (diffDays <= 30) return `⏳ ${diffDays}j — ${formatted}`;
    return formatted;
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

  formatDate(date: Date | null | undefined): string {
    if (!date) return '-';
    return new Date(date).toLocaleDateString('fr-FR');
  }
}
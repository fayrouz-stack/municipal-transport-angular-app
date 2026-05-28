import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HoraireService } from '../../horaire.service';
import { Horaire } from '../../../voyage/voyage/models/voyage.model';

@Component({
  selector: 'app-horaire-list',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule],
  templateUrl: './horaire-list.component.html',
  styleUrl: './horaire-list.component.scss',
})
export class HoraireListComponent implements OnInit {
  horaires: Horaire[] = [];
  filtered: Horaire[] = [];
  loading = false;
  searchDate = '';

  constructor(private horaireService: HoraireService) {}

  ngOnInit(): void { this.load(); }

  load(): void {
    this.loading = true;
    this.horaireService.getAll().subscribe({
      next: (data) => { this.horaires = data; this.applyFilter(); this.loading = false; },
      error: () => { this.loading = false; }
    });
  }

  applyFilter(): void {
    this.filtered = this.searchDate
      ? this.horaires.filter(h => h.date_voyage?.includes(this.searchDate))
      : [...this.horaires];
  }

  retardClass(retard: number): string {
    if (retard === 0) return 'badge bg-success';
    if (retard <= 10) return 'badge bg-warning text-dark';
    return 'badge bg-danger';
  }

  delete(id: number | undefined): void {
    if (!id || !confirm('Supprimer cet horaire ?')) return;
    this.horaireService.delete(id).subscribe(() => this.load());
  }
}

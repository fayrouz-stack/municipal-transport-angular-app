import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink, Router } from '@angular/router';
import { LigneService } from '../../ligne.service';
import { Ligne } from '../../../voyage/voyage/models/voyage.model';

@Component({
  selector: 'app-ligne-list',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './ligne-list.component.html',
  styleUrl: './ligne-list.component.scss',
})
export class LigneListComponent implements OnInit {
  lignes: Ligne[] = [];
  filtered: Ligne[] = [];
  loading = false;
  search = '';

  constructor(private ligneService: LigneService, private router: Router) {}

  ngOnInit(): void { this.load(); }

  load(): void {
    this.loading = true;
    this.ligneService.getAll().subscribe({
      next: (data) => { this.lignes = data; this.applyFilter(); this.loading = false; },
      error: () => { this.loading = false; }
    });
  }

  applyFilter(): void {
    const s = this.search.toLowerCase();
    this.filtered = s
      ? this.lignes.filter(l => l.numero?.toLowerCase().includes(s) || l.destination?.toLowerCase().includes(s))
      : [...this.lignes];
  }

  edit(id: number | undefined): void {
    if (id) this.router.navigate(['/lignes/edit', id]);
  }

  delete(id: number | undefined): void {
    if (!id || !confirm('Supprimer cette ligne ?')) return;
    this.ligneService.delete(id).subscribe(() => this.load());
  }
}

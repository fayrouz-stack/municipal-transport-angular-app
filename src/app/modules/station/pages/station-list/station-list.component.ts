import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink, Router } from '@angular/router';
import { StationService, Station } from '../../station.service';

@Component({
  selector: 'app-station-list',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './station-list.component.html',
  styleUrl: './station-list.component.scss',
})
export class StationListComponent implements OnInit {
  stations: Station[] = [];
  filtered: Station[] = [];
  loading = false;
  search = '';

  constructor(private stationService: StationService, private router: Router) {}

  ngOnInit(): void { this.load(); }

  load(): void {
    this.loading = true;
    this.stationService.getAll().subscribe({
      next: (data) => { this.stations = data; this.applyFilter(); this.loading = false; },
      error: () => { this.loading = false; }
    });
  }

  applyFilter(): void {
    const s = this.search.toLowerCase();
    this.filtered = s
      ? this.stations.filter(st =>
          st.nom?.toLowerCase().includes(s) ||
          st.ville?.toLowerCase().includes(s) ||
          st.adresse?.toLowerCase().includes(s))
      : [...this.stations];
  }

  edit(id: number | undefined): void {
    if (id) this.router.navigate(['/stations/edit', id]);
  }

  delete(id: number | undefined): void {
    if (!id || !confirm('Supprimer cette station ?')) return;
    this.stationService.delete(id).subscribe(() => this.load());
  }
}

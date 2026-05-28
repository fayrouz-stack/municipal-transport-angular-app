import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, Router } from '@angular/router';
import { VoyageService } from '../../services/voyage.service';
import { Voyage } from '../../models/voyage.model';

@Component({
  selector: 'app-voyage-list',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './voyage-list.component.html',
  styleUrls: ['./voyage-list.component.scss']
})
export class VoyageListComponent implements OnInit {
  voyages: Voyage[] = [];

  constructor(private voyageService: VoyageService, private router: Router) {}

  ngOnInit(): void {
    this.loadVoyages();
  }

  loadVoyages(): void {
    this.voyageService.getAll().subscribe(data => this.voyages = data);
  }

  edit(id: number): void {
    this.router.navigate(['/voyages/edit', id]);
  }

  delete(id: number): void {
    if (confirm('Supprimer ce voyage ?')) {
      this.voyageService.delete(id).subscribe(() => this.loadVoyages());
    }
  }

  goToPayment(id: number): void {
    this.router.navigate(['/voyages/payment', id]);
  }
}
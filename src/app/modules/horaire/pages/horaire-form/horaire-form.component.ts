import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { HoraireService } from '../../horaire.service';

@Component({
  selector: 'app-horaire-form',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './horaire-form.component.html',
  styleUrl: './horaire-form.component.scss',
})
export class HoraireFormComponent implements OnInit {
  horaire = { date_voyage: '', horaire_depart: '', horaire_arrive: '', retard_estime: 0 };
  isEditMode = false;
  horaireId: number | null = null;
  loading = false;

  constructor(
    private horaireService: HoraireService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.isEditMode = true;
      this.horaireId = +id;
      this.horaireService.getById(this.horaireId).subscribe(data => {
        this.horaire = { ...data };
      });
    }
  }

  save(): void {
    this.loading = true;
    const obs = this.isEditMode
      ? this.horaireService.update(this.horaireId!, this.horaire as any)
      : this.horaireService.create(this.horaire as any);

    obs.subscribe({
      next: () => this.router.navigate(['/horaires']),
      error: () => { this.loading = false; }
    });
  }
}

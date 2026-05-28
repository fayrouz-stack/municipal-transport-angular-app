import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { AffectationService } from '../affectation.service';
import { Affectation } from '../affectation.model';

@Component({
  selector: 'app-affectation-form',
  standalone: false,
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class AffectationFormComponent implements OnInit {

  private service = inject(AffectationService);
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private http = inject(HttpClient);

  private apiBase = 'http://localhost:8080/api';

  affectation: Affectation = this.initForm();
  loading = false;
  errorMsg = '';
  isEdit = false;

  chauffeurs: any[] = [];
  vehicules: any[] = [];
  lignes: any[] = [];

  ngOnInit(): void {
    // Chargement des listes pour les selects
    this.http.get<any[]>(`${this.apiBase}/chauffeurs`).subscribe(d => this.chauffeurs = d);
    this.http.get<any[]>(`${this.apiBase}/vehicules`).subscribe(d => this.vehicules = d);
    this.http.get<any[]>(`${this.apiBase}/lignes`).subscribe(d => this.lignes = d);

    const id = Number(this.route.snapshot.paramMap.get('id'));
    if (id) {
      this.isEdit = true;
      this.service.getById(id).subscribe({
        next: (data) => {
          this.affectation = {
            ...this.initForm(),
            ...data,
            dateDebut: this.toDatetimeLocal(data.dateDebut),
            dateFin: this.toDatetimeLocal(data.dateFin)
          };
        },
        error: (err) => console.error(err)
      });
    }
  }

  private initForm(): Affectation {
    return {
      chauffeurId: 0,
      vehiculeId: 0,
      ligneId: 0,
      dateDebut: '',
      dateFin: '',
      statut: 'PLANIFIEE',
      remarque: ''
    };
  }

  // Conversion ISO datetime → format datetime-local (YYYY-MM-DDTHH:mm)
  private toDatetimeLocal(iso?: string): string {
    if (!iso) return '';
    const d = new Date(iso);
    const pad = (n: number) => String(n).padStart(2, '0');
    return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}T${pad(d.getHours())}:${pad(d.getMinutes())}`;
  }

  save(form: any): void {
    if (form.invalid || this.loading) return;
    this.loading = true;
    this.errorMsg = '';

    // Conversion datetime-local → ISO datetime pour le backend
    const payload: Affectation = {
      ...this.affectation,
      dateDebut: new Date(this.affectation.dateDebut).toISOString(),
      dateFin: new Date(this.affectation.dateFin).toISOString()
    };

    const obs = this.isEdit
      ? this.service.update(this.affectation.id!, payload)
      : this.service.create(payload);

    obs.subscribe({
      next: () => {
        this.loading = false;
        this.router.navigate(['/affectations']);
      },
      error: (err) => {
        this.loading = false;
        this.errorMsg = err?.error?.error || 'Erreur lors de l\'enregistrement';
        console.error(err);
      }
    });
  }
}

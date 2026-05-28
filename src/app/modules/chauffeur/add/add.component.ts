import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ChauffeurService } from '../chauffeur.service';
import { Chauffeur } from '../chauffeur.model';

@Component({
  selector: 'app-chauffeur-add',
  standalone: false,
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss']
})
export class ChauffeurAddComponent implements OnInit {

  chauffeur: Chauffeur = this.initForm();

  loading = false;

  constructor(
    private service: ChauffeurService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.chauffeur.dateStart = this.today();
  }

  private initForm(): Chauffeur {
    return {
      cin: '',
      nom: '',
      prenom: '',
      permis: 'B',
      telephone: '',
      matricule: '',
      psw: '',
      email: '',
      holidayRemaining: 0,
      dateStart: '',
      lastShiftStart: '',
      lastShiftEnd: '',
      countWorkDays: 0
    };
  }

  private today(): string {
    return new Date().toISOString().split('T')[0];
  }

  private generatePassword(): string {
    return Math.random().toString(36).substring(2, 10);
  }

  private generateMatricule(): string {
    return 'BUS-' + Date.now().toString().slice(-5);
  }

  save(form: any): void {
    if (form.invalid || this.loading) return;

    this.loading = true;

    const payload: Chauffeur = {
      ...this.chauffeur,

      // AUTO FIELDS ONLY ON CREATE
      psw: this.generatePassword(),
      matricule: this.generateMatricule(),

      holidayRemaining: 0,
      countWorkDays: 0,
      lastShiftStart: null as any,
      lastShiftEnd: null as any
    };

    this.service.create(payload).subscribe({
      next: () => {
        this.loading = false;
        this.router.navigate(['/chauffeurs']);
      },
      error: err => {
        this.loading = false;
        console.error(err);
      }
    });
  }
}

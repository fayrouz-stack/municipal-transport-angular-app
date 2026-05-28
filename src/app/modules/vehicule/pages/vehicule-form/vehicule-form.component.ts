import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { VehiculeService } from '../../vehicule.service';  // ← Correction

@Component({
  selector: 'app-vehicule-form',
  templateUrl: './vehicule-form.component.html',
  styleUrls: ['./vehicule-form.component.scss']
})
export class VehiculeFormComponent implements OnInit {
  private fb = inject(FormBuilder);
  private vehiculeService = inject(VehiculeService);
  private router = inject(Router);
  private route = inject(ActivatedRoute);

  vehiculeForm!: FormGroup;
  isEditMode = false;
  vehiculeId?: number;
  submitting = false;

  typesVehicule = ['Voiture', 'Bus', 'Minibus', 'Camion', 'Utilitaire'];
  etats = ['disponible', 'en service', 'en panne', 'bon état', 'neuf', 'usé', 'en réparation'];
  carburants = ['Essence', 'Diesel', 'Hybride', 'Électrique', 'GPL'];

  ngOnInit(): void {
    this.initForm();
    
    const id = this.route.snapshot.params['id'];
    if (id) {
      this.isEditMode = true;
      this.vehiculeId = +id;
      this.loadVehicule();
    }
  }

  initForm(): void {
    this.vehiculeForm = this.fb.group({
      marque: ['', [Validators.required, Validators.minLength(2)]],
      modele: ['', [Validators.required, Validators.minLength(1)]],
      typeVehicule: ['', Validators.required],
      etat: ['bon état', Validators.required],
      vehiculeDispo: [true],
      matriculeFourni: ['', [Validators.required, Validators.minLength(3)]],
      localisation: [''],
      kilometrage: [0, [Validators.required, Validators.min(0)]],
      dateFinAssurance: [null],
      dateProchainCt: [null],
      datePremiereMiseCirculation: [null],
      carburant: ['', Validators.required],
      dateValiditeExploitation: [null]
    });
  }

  loadVehicule(): void {
    if (!this.vehiculeId) return;
    this.vehiculeService.getById(this.vehiculeId).subscribe({
      next: (vehicule: any) => {  // ← Correction: ajouter le type
        this.vehiculeForm.patchValue(vehicule);
      },
      error: (err: any) => {  // ← Correction: ajouter le type
        console.error(err);
      }
    });
  }

  onSubmit(): void {
    if (this.vehiculeForm.invalid) {
      Object.keys(this.vehiculeForm.controls).forEach(key => {
        this.vehiculeForm.get(key)?.markAsTouched();
      });
      return;
    }

    this.submitting = true;
    const request = this.isEditMode
      ? this.vehiculeService.update(this.vehiculeId!, this.vehiculeForm.value)
      : this.vehiculeService.create(this.vehiculeForm.value);

    request.subscribe({
      next: () => {
        this.router.navigate(['/vehicule/list']);
      },
      error: (err: any) => {  // ← Correction: ajouter le type
        console.error('Erreur', err);
        this.submitting = false;
      }
    });
  }

  get f() {
    return this.vehiculeForm.controls;
  }
}
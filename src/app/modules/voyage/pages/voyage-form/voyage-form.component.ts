import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { VoyageService } from '../../services/voyage.service';
import { LigneService } from '../../../ligne/ligne.service';
import { HoraireService } from '../../../horaire/horaire.service';
import { ChauffeurService } from '../../../chauffeur/chauffeur.service';
import { VehiculeService } from '../../../vehicule/vehicule.service';
import { Ligne, Horaire, Chauffeur, Vehicule } from '../../models/voyage.model';

@Component({
  selector: 'app-voyage-form',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './voyage-form.component.html',
  styleUrls: ['./voyage-form.component.scss']
})
export class VoyageFormComponent implements OnInit {
  voyage = {
    dateVoyage: '',
    nombrePlacesDisponible: 0,
    prix: 0,
    ligneId: 0,
    horaireId: 0,
    vehiculeId: 0,
    chauffeurMatricule: ''
  };
  isEditMode = false;
  validationError = '';
  lignes: Ligne[] = [];
  horaires: Horaire[] = [];
  chauffeurs: Chauffeur[] = [];
  vehicules: Vehicule[] = [];
  voyageId: number | null = null;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private voyageService: VoyageService,
    private ligneService: LigneService,
    private horaireService: HoraireService,
    private chauffeurService: ChauffeurService,
    private vehiculeService: VehiculeService
  ) {}

  ngOnInit(): void {
    this.loadLists();
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.isEditMode = true;
      this.voyageId = +id;
      this.loadVoyage(this.voyageId);
    }
  }

  private loadLists(): void {
    this.ligneService.getAll().subscribe(data => this.lignes = data);
    this.horaireService.getAll().subscribe(data => this.horaires = data);
    this.chauffeurService.getAll().subscribe(data => this.chauffeurs = data);
    this.vehiculeService.getAll().subscribe(data => this.vehicules = data);
  }

  private loadVoyage(id: number): void {
    this.voyageService.getById(id).subscribe({
      next: (data: any) => {
        this.voyage = {
          dateVoyage: data.dateVoyage,
          nombrePlacesDisponible: data.nombrePlacesDisponible,
          prix: data.prix,
          ligneId: data.ligne?.id || 0,
          horaireId: data.horaire?.id || 0,
          vehiculeId: data.vehicule?.id || 0,
          chauffeurMatricule: data.chauffeur?.matricule || ''
        };
      },
      error: () => {
        alert('Voyage introuvable');
        this.router.navigate(['/voyages']);
      }
    });
  }

  private validateForm(): boolean {
    if (!this.voyage.dateVoyage) {
      this.validationError = 'La date du voyage est requise.';
      return false;
    }
    if (this.voyage.nombrePlacesDisponible <= 0) {
      this.validationError = 'Le nombre de places doit être supérieur à 0.';
      return false;
    }
    if (this.voyage.prix <= 0) {
      this.validationError = 'Le prix doit être supérieur à 0.';
      return false;
    }
    if (!this.voyage.ligneId) {
      this.validationError = 'Veuillez sélectionner une ligne.';
      return false;
    }
    if (!this.voyage.horaireId) {
      this.validationError = 'Veuillez sélectionner un horaire.';
      return false;
    }
    if (!this.voyage.vehiculeId) {
      this.validationError = 'Veuillez sélectionner un véhicule.';
      return false;
    }
    if (!this.voyage.chauffeurMatricule) {
      this.validationError = 'Veuillez sélectionner un chauffeur.';
      return false;
    }
    this.validationError = '';
    return true;
  }

  save(): void {
    if (!this.validateForm()) return;

    const payload = {
      dateVoyage: this.voyage.dateVoyage,
      nombrePlacesDisponible: this.voyage.nombrePlacesDisponible,
      prix: this.voyage.prix,
      ligne: { id: this.voyage.ligneId },
      horaire: { id: this.voyage.horaireId },
      vehicule: { id: this.voyage.vehiculeId },
      chauffeur: { matricule: this.voyage.chauffeurMatricule }
    };

    if (this.isEditMode && this.voyageId) {
      this.voyageService.update(this.voyageId, payload).subscribe({
        next: () => this.router.navigate(['/voyages']),
        error: (err) => alert('Erreur modification : ' + err.message)
      });
    } else {
      this.voyageService.create(payload).subscribe({
        next: () => this.router.navigate(['/voyages']),
        error: (err) => alert('Erreur ajout : ' + err.message)
      });
    }
  }
}
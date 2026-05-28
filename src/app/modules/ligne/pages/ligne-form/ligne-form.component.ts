import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink, Router, ActivatedRoute } from '@angular/router';
import { LigneService } from '../../ligne.service';
import { Ligne } from '../../../voyage/voyage/models/voyage.model';

@Component({
  selector: 'app-ligne-form',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './ligne-form.component.html',
  styleUrl: './ligne-form.component.scss',
})
export class LigneFormComponent implements OnInit {
  ligne: Ligne = { numero: '', destination: '' };
  isEdit = false;
  id?: number;

  constructor(
    private ligneService: LigneService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    const idParam = this.route.snapshot.paramMap.get('id');
    if (idParam) {
      this.isEdit = true;
      this.id = +idParam;
      this.ligneService.getById(this.id).subscribe(l => this.ligne = l);
    }
  }

  save(): void {
    if (this.isEdit && this.id) {
      this.ligneService.update(this.id, this.ligne).subscribe(() => this.router.navigate(['/lignes']));
    } else {
      this.ligneService.create(this.ligne).subscribe(() => this.router.navigate(['/lignes']));
    }
  }
}

import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink, Router, ActivatedRoute } from '@angular/router';
import { StationService, Station } from '../../station.service';

@Component({
  selector: 'app-station-form',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './station-form.component.html',
  styleUrl: './station-form.component.scss',
})
export class StationFormComponent implements OnInit {
  station: Station = { nom: '', adresse: '', ville: '' };
  isEdit = false;
  id?: number;

  constructor(
    private stationService: StationService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    const idParam = this.route.snapshot.paramMap.get('id');
    if (idParam) {
      this.isEdit = true;
      this.id = +idParam;
      this.stationService.getById(this.id).subscribe(s => this.station = s);
    }
  }

  save(): void {
    if (this.isEdit && this.id) {
      this.stationService.update(this.id, this.station).subscribe(() => this.router.navigate(['/stations']));
    } else {
      this.stationService.create(this.station).subscribe(() => this.router.navigate(['/stations']));
    }
  }
}

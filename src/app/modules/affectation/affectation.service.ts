import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Affectation } from './affectation.model';

@Injectable({ providedIn: 'root' })
export class AffectationService {

  private apiUrl = 'http://localhost:8080/api/affectations';
  private http = inject(HttpClient);

  getAll(): Observable<Affectation[]> {
    return this.http.get<Affectation[]>(this.apiUrl);
  }

  getById(id: number): Observable<Affectation> {
    return this.http.get<Affectation>(`${this.apiUrl}/${id}`);
  }

  create(a: Affectation): Observable<Affectation> {
    return this.http.post<Affectation>(this.apiUrl, a);
  }

  update(id: number, a: Affectation): Observable<Affectation> {
    return this.http.put<Affectation>(`${this.apiUrl}/${id}`, a);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  getPlanning(debut: string, fin: string): Observable<Affectation[]> {
    return this.http.get<Affectation[]>(
      `${this.apiUrl}/planning?debut=${debut}&fin=${fin}`
    );
  }
}

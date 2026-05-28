import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { timeout, catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

export interface Vehicule {
  id?: number;
  marque: string;
  modele: string;
  typeVehicule: string;
  etat: string;
  vehiculeDispo: boolean;
  matriculeFourni: string;
  localisation: string;
  kilometrage: number;
  dateFinAssurance: Date | null;
  dateProchainCt: Date | null;
  datePremiereMiseCirculation: Date | null;
  carburant: string;
  dateValiditeExploitation: Date | null;
}

@Injectable({
  providedIn: 'root'
})
export class VehiculeService {
  private apiUrl = 'http://localhost:8080/api/vehicules';

  constructor(private http: HttpClient) { }

  getAll(): Observable<Vehicule[]> {
    return this.http.get<Vehicule[]>(this.apiUrl).pipe(
      timeout(5000),
      catchError(err => {
        console.error('ERREUR DÉTAILLÉE :', err);
        return throwError(() => err);
      })
    );
  }

  getById(id: number): Observable<Vehicule> {
    return this.http.get<Vehicule>(`${this.apiUrl}/${id}`).pipe(
      timeout(5000),
      catchError(err => {
        console.error('ERREUR DÉTAILLÉE :', err);
        return throwError(() => err);
      })
    );
  }

  create(vehicule: Vehicule): Observable<Vehicule> {
    return this.http.post<Vehicule>(this.apiUrl, vehicule).pipe(
      timeout(5000),
      catchError(err => {
        console.error('ERREUR DÉTAILLÉE :', err);
        return throwError(() => err);
      })
    );
  }

  update(id: number, vehicule: Vehicule): Observable<Vehicule> {
    return this.http.put<Vehicule>(`${this.apiUrl}/${id}`, vehicule).pipe(
      timeout(5000),
      catchError(err => {
        console.error('ERREUR DÉTAILLÉE :', err);
        return throwError(() => err);
      })
    );
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`).pipe(
      timeout(5000),
      catchError(err => {
        console.error('ERREUR DÉTAILLÉE :', err);
        return throwError(() => err);
      })
    );
  }
}
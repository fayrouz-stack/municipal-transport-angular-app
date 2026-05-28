import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Chauffeur } from './chauffeur.model';

@Injectable({
  providedIn: 'root'
})
export class ChauffeurService {

  private apiUrl = 'http://localhost:8080/api/chauffeurs';

  constructor(private http: HttpClient) {}

  getAll(): Observable<Chauffeur[]> {
    return this.http.get<Chauffeur[]>(this.apiUrl);
  }

  getById(id: number): Observable<Chauffeur> {
    return this.http.get<Chauffeur>(`${this.apiUrl}/${id}`);
  }

  create(chauffeur: Chauffeur): Observable<Chauffeur> {
    return this.http.post<Chauffeur>(this.apiUrl, chauffeur);
  }

  update(id: number, chauffeur: Chauffeur): Observable<Chauffeur> {
    return this.http.put<Chauffeur>(`${this.apiUrl}/${id}`, chauffeur);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}

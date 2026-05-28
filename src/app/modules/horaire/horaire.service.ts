import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Horaire } from '../voyage/voyage/models/voyage.model';

@Injectable({
  providedIn: 'root'
})
export class HoraireService {

  private apiUrl = 'http://localhost:8080/api/horaires';

  constructor(private http: HttpClient) {}

  getAll(): Observable<Horaire[]> {
    return this.http.get<Horaire[]>(this.apiUrl);
  }

  getById(id: number): Observable<Horaire> {
    return this.http.get<Horaire>(`${this.apiUrl}/${id}`);
  }

  create(horaire: Horaire): Observable<Horaire> {
    return this.http.post<Horaire>(this.apiUrl, horaire);
  }

  update(id: number, horaire: Horaire): Observable<Horaire> {
    return this.http.put<Horaire>(`${this.apiUrl}/${id}`, horaire);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}

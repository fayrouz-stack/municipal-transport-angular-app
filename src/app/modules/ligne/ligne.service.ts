import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Ligne } from '../voyage/voyage/models/voyage.model';

@Injectable({
  providedIn: 'root'
})
export class LigneService {

  private apiUrl = 'http://localhost:8080/api/lignes';

  constructor(private http: HttpClient) {}

  getAll(): Observable<Ligne[]> {
    return this.http.get<Ligne[]>(this.apiUrl);
  }

  getById(id: number): Observable<Ligne> {
    return this.http.get<Ligne>(`${this.apiUrl}/${id}`);
  }

  create(ligne: Ligne): Observable<Ligne> {
    return this.http.post<Ligne>(this.apiUrl, ligne);
  }

  update(id: number, ligne: Ligne): Observable<Ligne> {
    return this.http.put<Ligne>(`${this.apiUrl}/${id}`, ligne);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}

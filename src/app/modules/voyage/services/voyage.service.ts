import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Voyage } from '../models/voyage.model';
import { environment } from '../../../../environnement/environment';

@Injectable({ providedIn: 'root' })
export class VoyageService {
  private apiUrl = `${environment.apiUrl}/voyages`;

  constructor(private http: HttpClient) {}

  getAll(): Observable<Voyage[]> {
    return this.http.get<Voyage[]>(this.apiUrl);
  }

  getById(id: number): Observable<Voyage> {
    return this.http.get<Voyage>(`${this.apiUrl}/${id}`);
  }

  create(voyage: any): Observable<Voyage> {
    return this.http.post<Voyage>(this.apiUrl, voyage);
  }

  update(id: number, voyage: any): Observable<Voyage> {
    return this.http.put<Voyage>(`${this.apiUrl}/${id}`, voyage);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  processPayment(payload: any): Observable<any> {
    return this.http.post(`${environment.apiUrl}/payments/process`, payload);
  }
}
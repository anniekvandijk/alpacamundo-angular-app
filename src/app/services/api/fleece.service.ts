import { Injectable } from '@angular/core';
import { Observable, filter, map } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Fleece } from '../../models/fleece';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FleeceService {

  constructor(
    private http: HttpClient) { }

  private url = `${environment.apiBaseUrl}/api/fleeces`;
  getFleeces(): Observable<Fleece[]> {
    return this.http.get<Fleece[]>(this.url);
  }

  public getFleecesByAlpacaId(alpacaId: string): Observable<Fleece[]> {
    return this.getFleeces().pipe(
      map(f => f.filter(f => f.alpacaId === alpacaId))
    );
  }
}

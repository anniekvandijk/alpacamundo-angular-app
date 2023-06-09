import { Injectable } from '@angular/core';
import { Observable, filter, map } from 'rxjs';
import { HttpService } from './http.service';
import { Fleece } from '../models/fleece';

@Injectable({
  providedIn: 'root'
})
export class FleeceService {

  constructor(
    private http: HttpService) { }

  private url = 'api/fleeces';

  getFleeces(): Observable<Fleece[]> {
    return this.http.get<Fleece[]>(this.url);
  }

  getFleecesByAlpacaId(alpacaId: string): Observable<Fleece[]> {
    return this.getFleeces().pipe(
      map(f => f.filter(f => f.alpacaId === alpacaId))
    );
  }
}

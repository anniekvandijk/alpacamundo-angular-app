import { Injectable } from '@angular/core';
import { Observable, filter, map } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Alpacashow } from '../../models/alpacashow';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AlpacashowService {

  constructor(
    private http: HttpClient) { }

  private url = `${environment.apiBaseUrl}/api/alpacashows`;
  getAlpacashows(): Observable<Alpacashow[]> {
    return this.http.get<Alpacashow[]>(this.url);
  }

  getAlpacashowById(id: string): Observable<Alpacashow> {
    return this.getAlpacashows().pipe(
      map(f => f.find(f => f.id === id)),
      filter(f => !!f),
      map(f => f as Alpacashow)
    );
  }
}

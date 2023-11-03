import { Injectable, inject } from '@angular/core';
import { Observable, filter, map } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Alpacashow } from './alpacashow.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AlpacashowService {
  private http = inject(HttpClient);
  private url = `${environment.apiBaseUrl}/api/alpacashows`;
  public getAlpacashows(): Observable<Alpacashow[]> {
    return this.http.get<Alpacashow[]>(this.url);
  }

  public getAlpacashowById(id: string): Observable<Alpacashow> {
    return this.getAlpacashows().pipe(
      map(f => f.find(f => f.id === id)),
      filter(f => !!f),
      map(f => f as Alpacashow)
    );
  }
}

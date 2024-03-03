import { Injectable, inject } from '@angular/core';
import { Observable, filter, map } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Alpacashow } from './alpacashow.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AlpacashowService {
  private http = inject(HttpClient);
  private url = `${environment.apiBaseUrl}/api/alpacashows`;
  public getAlpacashows(componentId: string): Observable<Alpacashow[]> {
    return this.http.get<Alpacashow[]>(this.url, { headers: new HttpHeaders().set('X-ComponentId', componentId) });
  }

  public getAlpacashowById(id: string, componentId: string): Observable<Alpacashow> {
    return this.getAlpacashows(componentId).pipe(
      map(f => f.find(f => f.id === id)),
      filter(f => !!f),
      map(f => f as Alpacashow)
    );
  }
}

import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Alpaca } from './alpaca.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AlpacaService {
  private http = inject(HttpClient);
  private url = `${environment.apiBaseUrl}/api/alpacas`;

  public getAlpacas(componentId: string): Observable<Alpaca[]> {
    return this.http.get<Alpaca[]>(this.url, { headers: new HttpHeaders().set('X-ComponentId', componentId) });
  }

  public getAlpaca(id : string, componentId: string): Observable<Alpaca> {
    return this.http.get<Alpaca>(this.url.concat('/', id), { headers: new HttpHeaders().set('X-ComponentId', componentId) });
  } 
}

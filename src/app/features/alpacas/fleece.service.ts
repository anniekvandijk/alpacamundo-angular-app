import { Injectable, inject } from '@angular/core';
import { Observable, map } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Fleece } from './fleece.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FleeceService {
  private http = inject(HttpClient);
  private url = `${environment.apiBaseUrl}/api/fleeces`;
  
  public getFleeces(componentId: string): Observable<Fleece[]> {
    return this.http.get<Fleece[]>(this.url, { headers: new HttpHeaders().set('X-ComponentId', componentId) });
  }

  public getFleecesByAlpacaId(alpacaId: string, componentId: string): Observable<Fleece[]> {
    return this.getFleeces(componentId).pipe(
      map(f => f.filter(f => f.alpacaId === alpacaId))
    );
  }
}

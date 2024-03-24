import { Injectable, inject } from '@angular/core';
import { Observable, filter, map } from 'rxjs';
import { Alpacashow } from './alpacashow.model';
import { environment } from 'src/environments/environment';
import { HttpService } from 'src/app/shared/services/http-service';

@Injectable({
  providedIn: 'root'
})
export class AlpacashowService {
  private httpService = inject(HttpService);
  private url = `${environment.apiBaseUrl}/api/alpacashows`;
  public getAlpacashows(componentId: string): Observable<Alpacashow[]> {
    return this.httpService.get<Alpacashow[]>(this.url, componentId);
  }

  // TODO Backend call
  public getAlpacashowById(id: string, componentId: string): Observable<Alpacashow> {
    return this.getAlpacashows(componentId).pipe(
      map(f => f.find(f => f.id === id)),
      filter(f => !!f),
      map(f => f as Alpacashow)
    );
  }
}

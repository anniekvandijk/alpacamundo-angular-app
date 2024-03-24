import { Injectable, inject } from '@angular/core';
import { Observable, map } from 'rxjs';
import { Fleece } from './fleece.model';
import { environment } from 'src/environments/environment';
import { HttpService } from 'src/app/shared/services/http-service';

@Injectable({
  providedIn: 'root'
})
export class FleeceService {
  private httpService = inject(HttpService);
  private url = `${environment.apiBaseUrl}/api/fleeces`;
  
  public getFleeces(componentId: string): Observable<Fleece[]> {
    return this.httpService.get<Fleece[]>(this.url, componentId);
  }

  // TODO Backend call
  public getFleecesByAlpacaId(alpacaId: string, componentId: string): Observable<Fleece[]> {
    return this.getFleeces(componentId).pipe(
      map(f => f.filter(f => f.alpacaId === alpacaId))
    );
  }
}

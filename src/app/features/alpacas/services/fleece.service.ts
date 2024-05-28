import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { Fleece } from '../models/fleece.model';
import { environment } from 'src/environments/environment';
import { HttpService } from 'src/app/shared/services/http-service';

@Injectable({
  providedIn: 'root'
})
export class FleeceService {
  private httpService = inject(HttpService);
  private url = `${environment.apiBaseUrl}/api/fleeces`;
  
  getFleeces(componentId: string): Observable<Fleece[]> {
    return this.httpService.get<Fleece[]>(this.url, componentId);
  }

  getFleecesByAlpacaId(alpacaId: string, componentId: string): Observable<Fleece[]> {
    const alpacaFleeceUrl = `${environment.apiBaseUrl}/api/alpacas/${alpacaId}/fleeces`
    return this.httpService.get<Fleece[]>(alpacaFleeceUrl, componentId);
  }

  postFleece(fleece: Fleece, componentId: string): Observable<Fleece> {
    return this.httpService.post<Fleece>(this.url, fleece, componentId);
  }

  putFleece(fleece: Fleece, componentId: string): Observable<Fleece> {
    return this.httpService.put<Fleece>(this.url, fleece, componentId);
  }

  deleteFleece(fleeceId: string, componentId: string): Observable<boolean> {
    const deleteUrl = `${this.url}/${fleeceId}`;
    return this.httpService.delete(deleteUrl, componentId);
  }
}

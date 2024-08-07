import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { Alpaca } from '../models/alpaca.model';
import { environment } from 'src/environments/environment';
import { HttpService } from 'src/app/shared/services/http-service';

@Injectable({
  providedIn: 'root'
})
export class AlpacaService {
  private httpService = inject(HttpService);
  private url = `${environment.apiBaseUrl}/api/alpacas`;

  getAlpacas(componentId: string): Observable<Alpaca[]> {
    return this.httpService.get<Alpaca[]>(this.url, componentId);
  }

  getAlpaca(id : string, componentId: string): Observable<Alpaca> {
    return this.httpService.get<Alpaca>(this.url.concat('/', id), componentId);
  } 
}

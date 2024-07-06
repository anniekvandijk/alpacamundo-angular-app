import { Injectable, inject } from '@angular/core';
import { Observable, of } from 'rxjs';
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

  putAlpaca(alpaca: Alpaca, componentId: string): Observable<Alpaca> {
    console.log('putAlpaca', alpaca);
    return of(alpaca)
    //return this.httpService.put<Alpaca>(this.url, alpaca, componentId);
  }
  
  postAlpaca(alpaca: Alpaca, componentId: string): Observable<Alpaca> {
    return this.httpService.post<Alpaca>(this.url, alpaca, componentId);
  }
}

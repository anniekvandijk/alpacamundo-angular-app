import { Injectable } from '@angular/core';
import { Observable, catchError, filter, map } from 'rxjs';
import { HttpService } from '../http.service';
import { Alpaca } from '../../models/alpaca';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AlpacaService {

  constructor(
    private http: HttpService) { }

  private url = `${environment.apiBaseUrl}/api/alpacas`;

  getAlpacas(): Observable<Alpaca[]> {
    return this.http.get<Alpaca[]>(this.url);
  }

  getAlpaca(id : string): Observable<Alpaca> {
    return this.http.getbyId<Alpaca>(this.url, id);
  } 
}

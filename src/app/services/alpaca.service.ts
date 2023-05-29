import { Injectable } from '@angular/core';
import { Observable, catchError, filter, map } from 'rxjs';
import { HttpService } from './http.service';
import { Alpaca } from '../models/alpaca';

@Injectable({
  providedIn: 'root'
})
export class AlpacaService {

  constructor(
    private http: HttpService) { }

  private url = 'api/alpacas';

  getAlpacas(): Observable<Alpaca[]> {
    return this.http.get<Alpaca[]>(this.url);
  }

  getAlpaca(id : string): Observable<Alpaca> {
    return this.http.get<Alpaca>(this.url.concat('/', id));
  } 
}

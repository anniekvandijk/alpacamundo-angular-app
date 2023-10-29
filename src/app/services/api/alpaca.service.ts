import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Alpaca } from '../../models/alpaca';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AlpacaService {

  constructor(
    private http: HttpClient) { }

  private url = `${environment.apiBaseUrl}/api/alpacas`;

  public getAlpacas(): Observable<Alpaca[]> {
    return this.http.get<Alpaca[]>(this.url);
  }

  public getAlpaca(id : string): Observable<Alpaca> {
    return this.http.get<Alpaca>(this.url.concat('/', id));
  } 
}

import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Infopage } from '../../models/infopage';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class InfopagesService {

  constructor(private http: HttpClient) { }

  private url = `${environment.apiBaseUrl}/api/infopages`;

  public getInfopages(): Observable<Infopage[]> {
    return this.http.get<Infopage[]>(this.url);
  }

  public getInfopage(id : string): Observable<Infopage> {
    return this.http.get<Infopage>(this.url.concat('/', id));
  } 
}

import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpService } from '../http.service';
import { Infopage } from '../../models/infopage';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class InfopagesService {

  constructor(private http: HttpService) { }

  private url = `${environment.apiBaseUrl}/api/infopages`;

  getInfopages(): Observable<Infopage[]> {
    return this.http.get<Infopage[]>(this.url);
  }

  getInfopage(id : string): Observable<Infopage> {
    return this.http.get<Infopage>(this.url.concat('/', id));
  } 
}

import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Infopage } from './infopage.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class InfopagesService {
  private http = inject(HttpClient);
  private url = `${environment.apiBaseUrl}/api/infopages`;

  public getInfopages(componentId: string): Observable<Infopage[]> {
    return this.http.get<Infopage[]>(this.url, { headers: new HttpHeaders().set('X-ComponentId', componentId) });
  }

  public getInfopage(id : string, componentId: string): Observable<Infopage> {
    return this.http.get<Infopage>(this.url.concat('/', id), { headers: new HttpHeaders().set('X-ComponentId', componentId) });
  } 
}

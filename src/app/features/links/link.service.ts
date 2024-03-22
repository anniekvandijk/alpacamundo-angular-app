import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { Link } from './link.model.js';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LinkService {
  private http = inject(HttpClient);
  private url = `${environment.apiBaseUrl}/api/links`;

  public getLinks(componentId: string): Observable<Link[]> {
    return this.http.get<Link[]>(this.url, { headers: new HttpHeaders().set('X-ComponentId', componentId) });
  }

  public getLink(id: string, componentId: string): Observable<Link> {
    return this.http.get<Link>(this.url.concat('/', id), { headers: new HttpHeaders().set('X-ComponentId', componentId) });
  }
}

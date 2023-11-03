import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { Link } from './link.model.js';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LinkService {
  private http = inject(HttpClient);
  private url = `${environment.apiBaseUrl}/api/links`;

  public getLinks(): Observable<Link[]> {
    return this.http.get<Link[]>(this.url);
  }
}

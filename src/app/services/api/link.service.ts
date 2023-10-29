import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Link } from '../../models/link';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LinkService {

  constructor(private http: HttpClient) { }

  private url = `${environment.apiBaseUrl}/api/links`;

  public getLinks(): Observable<Link[]> {
    return this.http.get<Link[]>(this.url);
  }
}

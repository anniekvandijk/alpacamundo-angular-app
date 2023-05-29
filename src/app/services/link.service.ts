import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Link } from '../models/link';
import { HttpService } from './http.service';

@Injectable({
  providedIn: 'root'
})
export class LinkService {

  constructor(private http: HttpService) { }

  private url = 'api/links';

  getLinks(): Observable<Link[]> {
    return this.http.get<Link[]>(this.url);
  }
}

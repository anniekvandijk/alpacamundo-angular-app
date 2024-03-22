import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { Link, LinkType } from './link.model.js';
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

  public postLink(link: Link, componentId: string): void {
    console.log('Post Link', link);
    //this.http.post(this.url, link, { headers: new HttpHeaders().set('X-ComponentId', componentId) });
  }

  public putLink(link: Link, componentId: string): void {
    console.log('Put Link', link);
    //this.http.put(this.url, link, { headers: new HttpHeaders().set('X-ComponentId', componentId) });
  }

  // LinkTypes

  public getLinkTypes(componentId: string): Observable<LinkType[]> {
    return this.http.get<LinkType[]>(this.url.concat('/linktypes'), { headers: new HttpHeaders().set('X-ComponentId', componentId) });
  }

  public postLinkType(linkType: LinkType, componentId: string): void {
    console.log('Post LinkType', linkType);
   // this.http.post(this.url.concat('/linktypes'), linkType, { headers: new HttpHeaders().set('X-ComponentId', componentId) });
  }

  public putLinkType(linkType: LinkType, componentId: string): void {
    console.log('Put LinkType', linkType);
    //this.http.put(this.url.concat('/linktypes'), linkType, { headers: new HttpHeaders().set('X-ComponentId', componentId) });
  }
}

import { Injectable, inject } from '@angular/core';
import { Observable, map } from 'rxjs';
import { Link, LinkType } from './link.model';
import { environment } from 'src/environments/environment';
import { HttpService } from 'src/app/shared/services/http-service';
import { HttpServiceResponse } from 'src/app/shared/models/http-service-response.model';

@Injectable({
  providedIn: 'root'
})
export class LinkService {
  private httpService = inject(HttpService);
  private url = `${environment.apiBaseUrl}/api/links`;

  public getLinks(componentId: string): Observable<Link[]> {
    return this.httpService.get(this.url, componentId)
    .pipe(
      map(
        (response: HttpServiceResponse) => { return response.body as Link[] }
      )
    )
  }

  public getLink(id: string, componentId: string): Observable<Link> {
    return this.httpService.get(this.url.concat('/', id), componentId)
    .pipe(
      map(
        (response: HttpServiceResponse) => { return response.body as Link }
      )
    )
  }

  public postLink(link: Link, componentId: string): Observable<boolean> {
    return this.httpService.post(this.url, link, componentId)
    .pipe(
      map(
        (response: HttpServiceResponse) => { return response.ok }
      )
    )
  }

  public putLink(link: Link, componentId: string): Observable<boolean> {
    return this.httpService.put(this.url, link, componentId)
    .pipe(
      map(
        (response: HttpServiceResponse) => { return response.ok }
      )
    )
  }

  // LinkTypes

  public getLinkTypes(componentId: string): Observable<LinkType[]> {
    return this.httpService.get(this.url.concat('/linktypes'), componentId)
    .pipe(
      map(
        (response: HttpServiceResponse) => { return response.body as LinkType[] }
      )
    )
  }

  public postLinkType(linkType: LinkType, componentId: string): Observable<boolean> {
    return this.httpService.post(this.url.concat('/linktypes'), linkType, componentId)
    .pipe(
      map(
        (response: HttpServiceResponse) => { return response.ok }
      )
    )
  }

  public putLinkType(linkType: LinkType, componentId: string): Observable<boolean> {
    return this.httpService.put(this.url.concat('/linktypes'), linkType, componentId)
    .pipe(
      map(
        (response: HttpServiceResponse) => { return response.ok }
      )
    )
  }

  public deleteLinkType(id: string, componentId: string): Observable<boolean> {
    return this.httpService.delete(this.url.concat('/linktypes/', id), componentId)
      .pipe(
        map(
          (response: HttpServiceResponse) => { return response.ok }
        )
      )
  }
}
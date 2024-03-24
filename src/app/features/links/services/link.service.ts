import { Injectable, inject } from '@angular/core';
import { Observable, map } from 'rxjs';
import { Link, LinkType } from '../models/link.model';
import { environment } from 'src/environments/environment';
import { HttpService } from 'src/app/shared/services/http-service';
import { HttpServiceResponse } from 'src/app/shared/models/http-service-response.model';
import { PutLinkRequest } from '../models/put-link-request.model';
import { PutLinkTypeRequest } from '../models/put-linkType-request.model';
import { PostLinkRequest } from '../models/post-link-request.model';
import { PostLinkTypeRequest } from '../models/post-linkType-request.model';

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

  public postLink(link: PostLinkRequest, componentId: string): Observable<boolean> {
    return this.httpService.post(this.url, link, componentId)
    .pipe(
      map(
        (response: HttpServiceResponse) => { return response.ok }
      )
    )
  }

  public putLink(link: PutLinkRequest, componentId: string): Observable<boolean> {
    return this.httpService.put(this.url, link, componentId)
    .pipe(
      map(
        (response: HttpServiceResponse) => { return response.ok }
      )
    )
  }

  public deleteLink(id: string, componentId: string): Observable<boolean> {
    return this.httpService.delete(this.url.concat('/', id), componentId)
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

  public getLinkType(id: string, componentId: string): Observable<LinkType> {
    return this.httpService.get(this.url.concat('/linktypes/', id), componentId)
    .pipe(
      map(
        (response: HttpServiceResponse) => { return response.body as LinkType }
      )
    )
  }

  public postLinkType(linkType: PostLinkTypeRequest, componentId: string): Observable<boolean> {
    return this.httpService.post(this.url.concat('/linktypes'), linkType, componentId)
    .pipe(
      map(
        (response: HttpServiceResponse) => { return response.ok }
      )
    )
  }

  public putLinkType(linkType: PutLinkTypeRequest, componentId: string): Observable<boolean> {
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
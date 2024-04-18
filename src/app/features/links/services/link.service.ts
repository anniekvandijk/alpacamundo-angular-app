import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { Link, LinkType } from '../models/link.model';
import { environment } from 'src/environments/environment';
import { HttpService } from 'src/app/shared/services/http-service';
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

  getLinks(componentId: string): Observable<Link[]> {
    return this.httpService.get<Link[]>(this.url, componentId);
  }

  getLink(id: string, componentId: string): Observable<Link> {
    return this.httpService.get<Link>(this.url.concat('/', id), componentId);
  }

  postLink(link: PostLinkRequest, componentId: string): Observable<Link> {
    return this.httpService.post<Link>(this.url, link, componentId);
  }

  putLink(link: PutLinkRequest, componentId: string): Observable<Link> {
    return this.httpService.put<Link>(this.url, link, componentId)
  }

  deleteLink(id: string, componentId: string): Observable<boolean> {
    return this.httpService.delete(this.url.concat('/', id), componentId)
  }

  // LinkTypes

  getLinkTypes(componentId: string): Observable<LinkType[]> {
    return this.httpService.get<LinkType[]>(this.url.concat('/linktypes'), componentId);
  }

  getLinkType(id: string, componentId: string): Observable<LinkType> {
    return this.httpService.get<LinkType>(this.url.concat('/linktypes/', id), componentId);
  }

  postLinkType(linkType: PostLinkTypeRequest, componentId: string): Observable<LinkType> {
    return this.httpService.post<LinkType>(this.url.concat('/linktypes'), linkType, componentId);
  }

  putLinkType(linkType: PutLinkTypeRequest, componentId: string): Observable<LinkType> {
    return this.httpService.put<LinkType>(this.url.concat('/linktypes'), linkType, componentId)
  }

  deleteLinkType(id: string, componentId: string): Observable<boolean> {
    return this.httpService.delete(this.url.concat('/linktypes/', id), componentId)
  }
}
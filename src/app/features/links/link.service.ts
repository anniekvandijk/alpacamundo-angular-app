import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { Link, LinkType } from './link.model.js';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { MessageService } from 'src/app/shared/features/messages/message.service';
import { Message, MessageType } from './../../shared/features/messages/message.model';


@Injectable({
  providedIn: 'root'
})
export class LinkService {
  private http = inject(HttpClient);
  private messageService = inject(MessageService);
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
    this.http.post(this.url.concat('/linktypes'), linkType, { headers: new HttpHeaders().set('X-ComponentId', componentId) })
      .subscribe({
        complete: () => {
          console.log('Post LinkType', 'Completed');
          this.messageService.showMessage(this.createMessage('addLinkType', 'LinkType toegevoegd'));
        }
      });
  }

  public putLinkType(linkType: LinkType, componentId: string): void {
    console.log('Put LinkType', linkType);
    this.http.put(this.url.concat('/linktypes'), linkType, { headers: new HttpHeaders().set('X-ComponentId', componentId) })
      .subscribe({
        complete: () => {
          console.log('Put LinkType', 'Completed');
          this.messageService.showMessage(this.createMessage('updateLinkType', 'LinkType bijgewerkt'));
        }
      });
  }

  public deleteLinkType(id: string, componentId: string): void {
    this.http.delete(this.url.concat('/linktypes/', id), { headers: new HttpHeaders().set('X-ComponentId', componentId) })
      .subscribe({
        complete: () => {
          console.log('Delete LinkType', 'Completed');
          this.messageService.showMessage(this.createMessage('deleteLinkType', 'LinkType verwijderd'));
        }
      });
  }

  createMessage (operation: string, userMessage: string): Message {
    
    const message: Message = {
      operation: operation,
      technicalMessage: null,
      userMessage: userMessage,
      messageType: MessageType.Success
    };

    return message;
  }
}

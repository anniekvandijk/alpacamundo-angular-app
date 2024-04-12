import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { Infopage } from '../models/infopage.model';
import { environment } from 'src/environments/environment';
import { HttpService } from 'src/app/shared/services/http-service';

@Injectable({
  providedIn: 'root'
})
export class InfopagesService {
  private httpService = inject(HttpService);
  private url = `${environment.apiBaseUrl}/api/infopages`;

  public getInfopages(componentId: string): Observable<Infopage[]> {
    return this.httpService.get<Infopage[]>(this.url, componentId);
  }

  public getInfopage(id : string, componentId: string): Observable<Infopage> {
    return this.httpService.get<Infopage>(this.url.concat('/', id), componentId);
  } 
}

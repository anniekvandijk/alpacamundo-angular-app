import { Injectable, inject } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Profile } from './profile.model';
import { HttpClient } from '@angular/common/http';
import { AccountInfo } from '@azure/msal-browser';

const GRAPH_ENDPOINT = 'https://graph.microsoft.com/v1.0/me';
const GRAPH_ENDPOINT_PHOTO = 'https://graph.microsoft.com/v1.0/me/photo/$value';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private http = inject(HttpClient);
  public isUserLoggedIn:Subject<boolean> = new Subject<boolean>();
  public activeAccount: Subject<AccountInfo> = new Subject<AccountInfo>();

  public getUserProfile() : Observable<Profile> {
    return this.http.get<Profile>(GRAPH_ENDPOINT, { });
  }

  public getUserProfilePhoto() {
    return this.http.get(GRAPH_ENDPOINT_PHOTO, { responseType: 'blob' });
  }

}

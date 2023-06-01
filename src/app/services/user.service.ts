import { Injectable, inject } from '@angular/core';
import { Subject } from 'rxjs';
import { Profile } from '../models/profile';
import { HttpClient } from '@angular/common/http';
import { AccountInfo } from '@azure/msal-browser';

const GRAPH_ENDPOINT = 'https://graph.microsoft.com/v1.0/me';
const GRAPH_ENDPOINT_PHOTO = 'https://graph.microsoft.com/v1.0/me/photo/$value';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  isUserLoggedIn:Subject<boolean> = new Subject<boolean>();
  activeAccount: Subject<AccountInfo> = new Subject<AccountInfo>();
  private readonly http = inject(HttpClient);

  getUserProfile() {
    return this.http.get<Profile>(GRAPH_ENDPOINT);
  }

  getUserProfilePhoto() {
    return this.http.get(GRAPH_ENDPOINT_PHOTO, { responseType: 'blob' });
  }

}

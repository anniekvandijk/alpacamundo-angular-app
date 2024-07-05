import { Injectable, inject } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { User } from '../models/user.model';
import { HttpClient } from '@angular/common/http';
import { AccountInfo } from '@azure/msal-browser';

const GRAPH_ENDPOINT = 'https://graph.microsoft.com/v1.0/me';
const GRAPH_ENDPOINT_PHOTO = 'https://graph.microsoft.com/v1.0/me/photo/$value';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private http = inject(HttpClient);
  isUserLoggedIn:Subject<boolean> = new Subject<boolean>();
  activeAccount: Subject<AccountInfo> = new Subject<AccountInfo>();

  getUser() : Observable<User> {
    return this.http.get<User>(GRAPH_ENDPOINT, { });
  }

  getUserPhoto() {
    return this.http.get(GRAPH_ENDPOINT_PHOTO, { responseType: 'blob' });
  }

}

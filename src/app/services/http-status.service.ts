import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class HttpStatusService {  
  public loading = new BehaviorSubject<{ loading: boolean, url: string }>({ loading: false, url: '' });

  public startRequest(url: string) {
    this.loading.next({ loading: true, url });
  }

  public endRequest(url: string) {
    this.loading.next({ loading: false, url });
  }
}
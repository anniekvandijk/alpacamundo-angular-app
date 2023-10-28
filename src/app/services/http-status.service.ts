import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class HttpStatusService {  
  public loading = new BehaviorSubject<{ loading: boolean, url: string }>({ loading: false, url: '' });

  startRequest(url: string) {
    this.loading.next({ loading: true, url });
  }

  endRequest(url: string) {
    this.loading.next({ loading: false, url });
  }
}
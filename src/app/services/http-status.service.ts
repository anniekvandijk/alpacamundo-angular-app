import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class HttpStatusService {  
  public isLoading = new BehaviorSubject<boolean>(false);


}
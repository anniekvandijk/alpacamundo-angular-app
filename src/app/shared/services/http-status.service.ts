import { Injectable } from '@angular/core';
import { set } from 'cypress/types/lodash';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class HttpStatusService {  

  public isLoading = new BehaviorSubject<boolean>(false);

}
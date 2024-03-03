import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class HttpStatusService {  

  private loadingMap: Map<string, BehaviorSubject<boolean>> = new Map();

  getLoadingState(componentId: string): BehaviorSubject<boolean> {
    if (!this.loadingMap.has(componentId)) {
      this.loadingMap.set(componentId, new BehaviorSubject<boolean>(false));
    }
    return this.loadingMap.get(componentId)!;
  }

}
import { Injectable } from "@angular/core";
import { Subject } from "rxjs";

@Injectable({
  providedIn : 'root'
})
export class FormService {

  cancelAction$ = new Subject<string>();
  cancelActionComplete$ = new Subject<string>();
  submitAction$ = new Subject<string>();

  triggerCancel(componentId: string) {
    this.cancelAction$.next(componentId);
  }

  triggerSubmit(componentId: string) {
    this.submitAction$.next(componentId);
  }

  cancelActionComplete(componentId: string) {
    this.cancelActionComplete$.next(componentId);
  }
}
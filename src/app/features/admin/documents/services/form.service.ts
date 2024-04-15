import { Injectable } from "@angular/core";
import { Subject } from "rxjs";

@Injectable({
  providedIn : 'root'
})
export class FormService {

  private formSource = new Subject<string>();
  cancelAction$ = this.formSource.asObservable();
  submitAction$ = this.formSource.asObservable();

  triggerCancel(componentId: string) {
    this.formSource.next(componentId);
  }

  triggerSubmit(componentId: string) {
    this.formSource.next(componentId);
  }
}
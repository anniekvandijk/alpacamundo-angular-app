import { Injectable } from "@angular/core";
import { Subject } from "rxjs";

@Injectable({
  providedIn : 'root'
})
export class FormService {

  private formSource = new Subject<string>();
  public cancelAction$ = this.formSource.asObservable();
  public submitAction$ = this.formSource.asObservable();

  public triggerCancel(componentId: string) {
    this.formSource.next(componentId);
  }

  public triggerSubmit(componentId: string) {
    this.formSource.next(componentId);
  }
}
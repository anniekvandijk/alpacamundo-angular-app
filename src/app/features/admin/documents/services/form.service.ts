import { Injectable } from "@angular/core";
import { Subject } from "rxjs";

export enum FormState {
  Initial = 'initial',
  Submitted = 'submitted',
  Cancelled = 'cancelled',
  Deleted = 'deleted'
}

@Injectable({
  providedIn : 'root'
})
export class FormService {

  private formState = new Subject<{ componentId: string, formstate: FormState }>();
  public formState$ = this.formState.asObservable();

  public registerComponent(componentId: string) {
    this.formState.next({ componentId, formstate: FormState.Initial });
  }

  public setFormState(componentId: string, formState: FormState) {
    this.formState.next({ componentId, formstate: formState });
  }
}
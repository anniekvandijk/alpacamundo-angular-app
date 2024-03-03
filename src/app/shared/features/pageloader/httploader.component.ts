import { Component, Input, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SpinnerComponent } from './spinner.component';
import { Observable } from 'rxjs';
import { HttpStatusService } from '../../services/http-status.service';

@Component({
  standalone: true,
  imports: [ CommonModule, SpinnerComponent ],
  selector: 'app-http-loader',
  template: `
    <ng-template #content>
      <ng-content></ng-content>
    </ng-template>

    <ng-container *ngIf="isLoading$ | async; else content">
      <app-spinner></app-spinner>
    </ng-container>`,
  
})
export class HttploaderComponent implements OnInit {
  @Input() componentId!: string;
  private httpStatusService = inject(HttpStatusService)
  public isLoading$!: Observable<boolean>;

  ngOnInit(): void {
    this.isLoading$ = this.httpStatusService.getLoadingState(this.componentId);
  }
}
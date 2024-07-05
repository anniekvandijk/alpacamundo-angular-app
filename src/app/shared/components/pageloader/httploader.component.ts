import { Component, Input, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';
import { HttpStatusService } from '../../services/http-status.service';
import { LoadingSpinnerComponent } from './pure-css-loader/loading-spinner.component';

@Component({
  standalone: true,
  imports: [ CommonModule, LoadingSpinnerComponent ],
  selector: 'app-http-loader',
  template: `
    <ng-template #content>
      <ng-content></ng-content>
    </ng-template>

    <ng-container *ngIf="isLoading$ | async; else content">
      <app-loading-spinner></app-loading-spinner>
    </ng-container>`,
  
})
export class HttploaderComponent implements OnInit {
  @Input() componentId!: string;
  private httpStatusService = inject(HttpStatusService)
  isLoading$!: Observable<boolean>;

  ngOnInit(): void {
    this.isLoading$ = this.httpStatusService.getLoadingState(this.componentId);
  }
}
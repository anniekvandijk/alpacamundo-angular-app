import { Component } from '@angular/core';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  standalone: true,
  imports: [
    MatProgressSpinnerModule
  ],
  selector: 'app-spinner',
  template: `
    <mat-progress-spinner 
      mode="indeterminate" 
      color="primary" 
      [diameter]="60">
    </mat-progress-spinner>`,
  
  styles: [`
    mat-progress-spinner {
      margin: 0 auto;
      display: block;
      padding-top: 20px;
      padding-bottom: 30px; 
    }
  `]
})
export class SpinnerComponent {}

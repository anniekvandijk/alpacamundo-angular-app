import { CommonModule } from '@angular/common';
import { Component, Input, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { Infopage } from 'src/app/features/infopages/infopage.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-infopage-card',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
  ],
  templateUrl: './infopage-card.component.html',
  styleUrls: ['./infopage-card.component.scss']
})
export class InfopageCardComponent {
  @Input() infopage!: Infopage;
  private router = inject(Router);

  public navigateToDetails(infopage: Infopage) {
    this.router.navigate(['/info/detail', infopage.id]);
  }
}

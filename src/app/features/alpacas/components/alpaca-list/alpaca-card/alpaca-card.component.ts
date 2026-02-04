import { Component, DestroyRef, Input, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Alpaca } from 'src/app/features/alpacas/models/alpaca.model';
import { AlpacaService } from 'src/app/features/alpacas/services/alpaca.service';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-alpaca-card',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    MatCardModule,
    MatIconModule,
  ],
  templateUrl: './alpaca-card.component.html',
  styleUrls: ['./alpaca-card.component.scss']
})
export class AlpacaCardComponent implements OnInit {
  @Input() alpaca!: Alpaca;
  readonly componentId = this.constructor.name;
  private destroyRef = inject(DestroyRef);
  private alpacasService = inject(AlpacaService);
  private router = inject(Router);
  alpacaMainImageUrl!: string;

  ngOnInit(): void {
    this.alpacaMainImageUrl = environment.storageUrls.alpacaMainImageUrl;
  }

  navigateToDetails(alpaca: Alpaca) {
    this.router.navigate(['/alpacas/detail', alpaca.id]);
  }
}

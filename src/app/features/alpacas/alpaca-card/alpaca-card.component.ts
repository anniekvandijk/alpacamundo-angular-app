import { Component, DestroyRef, Input, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Alpaca } from 'src/app/features/alpacas/alpaca.model';
import { Configuration } from 'src/app/shared/configuration/configuration.model';
import { CONFIGURATION } from 'src/app/shared/configuration/configuration.token';
import { AlpacaService } from 'src/app/features/alpacas/alpaca.service';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { SpinnerComponent } from 'src/app/shared/features/pageloader/spinner.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-alpaca-card',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    MatCardModule,
    MatIconModule,
    SpinnerComponent
  ],
  templateUrl: './alpaca-card.component.html',
  styleUrls: ['./alpaca-card.component.scss']
})
export class AlpacaCardComponent {
  @Input() alpaca!: Alpaca;
  private readonly destroyRef = inject(DestroyRef);
  private configuration: Configuration = inject(CONFIGURATION);
  private alpacasService = inject(AlpacaService);
  private router = inject(Router);
  public alpacaMainImageUrl!: string;

  ngOnInit(): void {
    this.alpacaMainImageUrl = this.configuration.storage.alpacaMainImageUrl;
    if (this.alpaca.sireId) {
      this.alpacasService.getAlpaca(this.alpaca.sireId)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe (alpaca => {
        this.alpaca.sire = alpaca;
      });
    }
    if (this.alpaca.damId) {
      this.alpacasService.getAlpaca(this.alpaca.damId)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe (alpaca => {
        this.alpaca.dam = alpaca;
      });
    }
  }

  public navigateToDetails(alpaca: Alpaca) {
    this.router.navigate(['/alpacas/detail', alpaca.id]);
  }
}

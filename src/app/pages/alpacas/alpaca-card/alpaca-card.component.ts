import { Component, DestroyRef, Inject, Input, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Alpaca } from 'src/app/models/alpaca';
import { Configuration } from 'src/app/models/configuration';
import { CONFIGURATION } from 'src/app/utilities/configuration.token';
import { AlpacaService } from 'src/app/services/api/alpaca.service';
import { NavigationService } from 'src/app/services/navigation.service';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { HttpStatusService } from 'src/app/services/http-status.service';
import { SpinnerComponent } from 'src/app/components/spinner.component';
import { Observable } from 'rxjs';

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
  public alpacaMainImageUrl!: string;
  public isLoading$! : Observable<boolean>;

  constructor(
    private alpacasService: AlpacaService,
    private navigationService: NavigationService,
    private httpStatusService: HttpStatusService,
    @Inject(CONFIGURATION) private configuration: Configuration
    ) { }

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

  ngOnViewInit(): void {
    this.isLoading$ = this.httpStatusService.isLoading;
  }

  public navigateToDetails(alpaca: Alpaca) {
    this.navigationService.goToAlpacaDetail(alpaca);
  }
}

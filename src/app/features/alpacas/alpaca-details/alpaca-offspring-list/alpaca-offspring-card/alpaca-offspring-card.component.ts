import { Component, Input, OnInit, inject } from '@angular/core';
import { Alpaca } from 'src/app/features/alpacas/alpaca.model';
import { Router } from '@angular/router';
import { Configuration } from 'src/app/shared/configuration/configuration.model';
import { CONFIGURATION } from 'src/app/shared/configuration/configuration.token';
import { MatCardModule } from '@angular/material/card';
import { SpinnerComponent } from 'src/app/shared/features/pageloader/spinner.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-alpaca-offspring-card',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    SpinnerComponent
  ],
  templateUrl: './alpaca-offspring-card.component.html',
  styleUrls: ['./alpaca-offspring-card.component.scss']
})
export class AlpacaOffspringCardComponent implements OnInit {
  @Input() alpaca!: Alpaca;
  private configuration: Configuration = inject(CONFIGURATION);
  private router = inject(Router);
  public alpacaMainImageUrl!: string;

  ngOnInit(): void {
    this.alpacaMainImageUrl = this.configuration.storage.alpacaMainImageUrl;
  }

  public navigateToDetails(alpaca: Alpaca) {
    this.router.navigate(['/alpacas/detail', alpaca.id]);
  }
}

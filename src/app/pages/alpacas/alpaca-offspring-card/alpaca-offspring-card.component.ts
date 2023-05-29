import { Component, Inject, Input } from '@angular/core';
import { Alpaca } from 'src/app/models/alpaca';
import { Router } from '@angular/router';
import { Configuration } from 'src/app/models/configuration';
import { CONFIGURATION } from 'src/app/utilities/configuration.token';
import { NavigationService } from 'src/app/services/navigation.service';
import { MatCard, MatCardModule } from '@angular/material/card';
import { SpinnerComponent } from 'src/app/components/spinner.component';
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
export class AlpacaOffspringCardComponent {
  @Input() alpaca!: Alpaca;
  alpacaMainImageUrl!: string;

  constructor(
    private navigationService: NavigationService,
    @Inject(CONFIGURATION) private configuration: Configuration
    ) { }

  ngOnInit(): void {
    this.alpacaMainImageUrl = this.configuration.storage.alpacaMainImageUrl;
  }

  navigateToDetails(alpaca: Alpaca) {
    this.navigationService.goToAlpacaDetailPage(alpaca);
  }
}

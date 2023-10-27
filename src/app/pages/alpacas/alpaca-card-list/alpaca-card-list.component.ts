import { Component, DestroyRef, inject } from '@angular/core';
import { Alpaca } from '../../../models/alpaca';
import { AlpacaService } from 'src/app/services/api/alpaca.service';
import { ActivatedRoute } from '@angular/router';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { AlpacaCardComponent } from '../alpaca-card/alpaca-card.component';
import { CommonModule } from '@angular/common';
import { SpinnerComponent } from 'src/app/components/spinner.component';

@Component({
  selector: 'app-alpaca-card-list',
  standalone: true,
  imports: [
    CommonModule,
    AlpacaCardComponent,
    SpinnerComponent,
  ],
  templateUrl: './alpaca-card-list.component.html',
  styleUrls: ['./alpaca-card-list.component.scss']
})
export class AlpacaCardListComponent {
  readonly destroyRef = inject(DestroyRef);
  alpacas : Alpaca[] = [];
  filteredAlpacas: Alpaca[] | null = null;
  title = 'Onze alpaca\'s';
  noResultsMessage = 'Geen alpaca\'s gevonden';
  cardListType = 'alpaca';
  
  constructor(private alpacaService: AlpacaService,
    private route: ActivatedRoute
    ) {}

  ngOnInit(): void {
    this.route.params
    .pipe(takeUntilDestroyed(this.destroyRef))
    .subscribe(params => {
      const filter = params['filter'];
  
      this.alpacaService.getAlpacas()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(alpacas => {
        let sorted = alpacas.sort((a, b) => a.shortName.localeCompare(b.shortName));
        this.alpacas = sorted;
  
        if (filter === 'forsale') {
          this.filteredAlpacas = alpacas
            .filter(alpaca => alpaca.status === "Te koop")
            .filter(alpaca => alpaca.status !== "Verkocht")
            .filter(alpaca => alpaca.status !== "Overleden")
          this.title = 'Alpaca\'s te koop';
          this.cardListType = 'alpaca';
          this.noResultsMessage = 'Er zijn op dit moment geen alpaca\'s te koop.';
        } else if (filter === 'sold') {
          this.filteredAlpacas = alpacas
            .filter(alpaca => alpaca.status === "Verkocht");
          this.title = `Alpaca\'s verkocht (${this.filteredAlpacas.length})`;
          this.cardListType = 'alpaca';
        } else if (filter === 'studservice') {
          this.filteredAlpacas = alpacas
            .filter(alpaca => alpaca.category === "Dekhengsten")
            .filter(alpaca => alpaca.status !== "Verkocht")
            .filter(alpaca => alpaca.status !== "Overleden")
          this.title = 'Dekhengsten';
          this.noResultsMessage = 'Er zijn op dit moment geen dekhengsten beschikbaar.';
          this.cardListType = 'alpaca';
        } else if (filter === 'crias') {
          this.filteredAlpacas = alpacas
            .filter(alpaca => alpaca.bornOnFarm === true);
          this.title = `Onze cria\'s hier geboren (${this.filteredAlpacas.length})`;
          this.cardListType = 'crias';
        } else {
          this.filteredAlpacas = alpacas
            .filter(alpaca => alpaca.status !== "Verkocht")
            .filter(alpaca => alpaca.status !== "Overleden")
            .filter(alpaca => alpaca.category !== "Externe  hengsten")
          this.title = `Onze Alpaca\'s (${this.filteredAlpacas.length})`;
          this.cardListType = 'alpaca';
        }
      });
    });
  }
}

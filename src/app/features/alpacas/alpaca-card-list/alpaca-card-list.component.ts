import { Component, DestroyRef, inject } from '@angular/core';
import { Alpaca } from '../alpaca.model';
import { AlpacaService } from 'src/app/features/alpacas/alpaca.service';
import { ActivatedRoute } from '@angular/router';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { AlpacaCardComponent } from '../alpaca-card/alpaca-card.component';
import { CommonModule } from '@angular/common';
import { SpinnerComponent } from 'src/app/shared/features/pageloader/spinner.component';
import { HttploaderComponent } from 'src/app/shared/features/pageloader/httploader.component';

@Component({
  selector: 'app-alpaca-card-list',
  standalone: true,
  imports: [
    CommonModule,
    AlpacaCardComponent,
    SpinnerComponent,
    HttploaderComponent
  ],
  templateUrl: './alpaca-card-list.component.html',
  styleUrls: ['./alpaca-card-list.component.scss']
})
export class AlpacaCardListComponent extends HttploaderComponent {
  private readonly destroyRef = inject(DestroyRef);
  private alpacaService = inject(AlpacaService);
  private route = inject(ActivatedRoute);
  public alpacas : Alpaca[] = [];
  public filteredAlpacas: Alpaca[] | null = null;
  public title = '';
  public noResultsMessage = 'Geen alpaca\'s gevonden';
  public cardListType = 'alpaca';

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
        
        // For sale page
        if (filter === 'forsale') {
          this.filteredAlpacas = alpacas
            .filter(alpaca => alpaca.status === "Te koop")
          this.title = 'Alpaca\'s te koop';
          this.cardListType = 'alpaca';
          this.noResultsMessage = 'Er zijn op dit moment geen alpaca\'s te koop.';
        } 
        
        // Sold page
        else if (filter === 'sold') {
          this.filteredAlpacas = alpacas
            .filter(alpaca => alpaca.status === "Verkocht");
          this.title = `Alpaca\'s verkocht (${this.filteredAlpacas.length})`;
          this.cardListType = 'alpaca';
        } 
        
        // Studservice page
        else if (filter === 'studservice') {
          this.filteredAlpacas = alpacas
            .filter(alpaca => alpaca.category === "Dekhengsten")
            .filter(alpaca => alpaca.status !== "Verkocht")
            .filter(alpaca => alpaca.status !== "Overleden")
          this.title = 'Dekhengsten';
          this.noResultsMessage = 'Er zijn op dit moment geen dekhengsten beschikbaar.';
          this.cardListType = 'alpaca';
        } 
        
        // Crias page
        else if (filter === 'crias') {
          this.filteredAlpacas = alpacas
            .filter(alpaca => alpaca.bornOnFarm === true);
          this.title = `Onze cria\'s hier geboren (${this.filteredAlpacas.length})`;
          this.cardListType = 'crias';
        } 
        
        // All owned alpacas page
        else {
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

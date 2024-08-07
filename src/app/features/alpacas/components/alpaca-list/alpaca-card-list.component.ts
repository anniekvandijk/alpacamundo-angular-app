import { Component, DestroyRef, OnInit, inject } from '@angular/core';
import { Alpaca } from '../../models/alpaca.model';
import { AlpacaService } from 'src/app/features/alpacas/services/alpaca.service';
import { ActivatedRoute } from '@angular/router';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { AlpacaCardComponent } from './alpaca-card/alpaca-card.component';
import { CommonModule } from '@angular/common';
import { HttploaderComponent } from 'src/app/shared/components/pageloader/httploader.component';
import { map, switchMap, tap } from 'rxjs';

@Component({
  selector: 'app-alpaca-card-list',
  standalone: true,
  imports: [
    CommonModule,
    AlpacaCardComponent,
    HttploaderComponent
  ],
  templateUrl: './alpaca-card-list.component.html',
  styleUrls: []
})
export class AlpacaCardListComponent implements OnInit {
  readonly componentId = this.constructor.name;
  private destroyRef = inject(DestroyRef);
  private alpacaService = inject(AlpacaService);
  private route = inject(ActivatedRoute);
  alpacas : Alpaca[] = [];
  filter!: string;
  filteredAlpacas: Alpaca[] | null = null;
  title!: string;
  counter!: number | null;
  noResultsMessage = 'Geen alpaca\'s gevonden';
  cardListType = 'alpaca';

  ngOnInit(): void {
    this.route.params.pipe(
      map(params => {
        const filter = params['filter'];
        this.filter = filter;
        return filter;
      }),
      takeUntilDestroyed(this.destroyRef),
      tap(() => {
        if (this.filter === 'forsale') {
          this.title = 'Alpaca\'s te koop';
          this.cardListType = 'alpaca';
          this.noResultsMessage = 'Er zijn op dit moment geen alpaca\'s te koop.';
        } 
        else if (this.filter === 'sold') {
          this.title = `Alpaca's verkocht`;
          this.cardListType = 'alpaca';
        } 
        else if (this.filter === 'studservice') {
          this.title = 'Dekhengsten';
          this.noResultsMessage = 'Er zijn op dit moment geen dekhengsten beschikbaar.';
          this.cardListType = 'alpaca';
        } 
        else if (this.filter === 'crias') {
          this.title = `Onze cria's hier geboren`;
          this.cardListType = 'crias';
        } 
        else {
          this.title = `Onze alpaca's`;
          this.cardListType = 'alpaca';
        }
      }),
      switchMap(() => 
        this.alpacaService.getAlpacas(this.componentId).pipe(
        takeUntilDestroyed(this.destroyRef))
      )
    ).subscribe(alpacas => {
        const sorted = alpacas.sort((a, b) => a.shortName.localeCompare(b.shortName));
        this.alpacas = sorted;
        if (this.filter === 'forsale') {
          this.filteredAlpacas = alpacas
            .filter(alpaca => alpaca.status === "Te koop");
          this.counter = null;
        } 
        else if (this.filter === 'sold') {
          this.filteredAlpacas = alpacas
            .filter(alpaca => alpaca.status === "Verkocht");
          this.counter = this.filteredAlpacas && this.filteredAlpacas.length;  
        } 
        else if (this.filter === 'studservice') {
          this.filteredAlpacas = alpacas
            .filter(alpaca => alpaca.category === "Dekhengsten")
            .filter(alpaca => alpaca.status !== "Verkocht")
            .filter(alpaca => alpaca.status !== "Overleden");
          this.counter = this.filteredAlpacas && this.filteredAlpacas.length;
        } 
        else if (this.filter === 'crias') {
          this.filteredAlpacas = alpacas
            .filter(alpaca => alpaca.bornOnFarm === true);
          this.counter = this.filteredAlpacas && this.filteredAlpacas.length;
        } 
        else {
          this.filteredAlpacas = alpacas
            .filter(alpaca => alpaca.status !== "Verkocht")
            .filter(alpaca => alpaca.status !== "Overleden")
            .filter(alpaca => alpaca.category !== "Externe hengsten");
          this.counter = this.filteredAlpacas && this.filteredAlpacas.length;
        }
      });
    }
  }


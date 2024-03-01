import { Component, DestroyRef, Input, OnChanges, OnInit, SimpleChanges, inject } from '@angular/core';
import { Alpaca } from '../../alpaca.model';
import { AlpacaOffspringCardComponent } from './alpaca-offspring-card/alpaca-offspring-card.component';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { AlpacaService } from '../../alpaca.service';
import { forkJoin, map, mergeMap, of } from 'rxjs';

@Component({
  selector: 'app-alpaca-offspring-list',
  standalone: true,
  imports: [
    AlpacaOffspringCardComponent
  ],
  templateUrl: './alpaca-offspring-list.component.html',
  styleUrl: './alpaca-offspring-list.component.scss'
})
export class AlpacaOffspringListComponent implements OnChanges{
  @Input() alpaca!: Alpaca;
  private readonly destroyRef = inject(DestroyRef);
  private readonly alpacaService = inject(AlpacaService);
  offsprings: Alpaca[] = [];

  ngOnChanges(): void {
    this.getOffspring();
  }

  getOffspring() {
    if (this.alpaca.offspring.length > 0) {
      const offspringObservables = this.alpaca.offspring.map(offspring => 
        this.alpacaService.getAlpaca(offspring.id)
        .pipe(
          takeUntilDestroyed(this.destroyRef),
          mergeMap((offspringAlpaca: Alpaca) => {
            const sireObservable = offspringAlpaca.sireId ? 
              this.alpacaService.getAlpaca(offspringAlpaca.sireId).pipe(takeUntilDestroyed(this.destroyRef)) 
              : of(null);
            const damObservable = offspringAlpaca.damId ? 
              this.alpacaService.getAlpaca(offspringAlpaca.damId).pipe(takeUntilDestroyed(this.destroyRef)) 
              : of(null);
            return forkJoin([of(offspringAlpaca), sireObservable, damObservable]);
          }),
          map(([offspringAlpaca, sire, dam]) => {
            if (sire) {
              offspringAlpaca.sire = sire;
            }
            if (dam) {
              offspringAlpaca.dam = dam;
            }
            return offspringAlpaca;
          })
        )
      );
      forkJoin(offspringObservables)
        .subscribe((completedOffsprings: Alpaca[]) => {
          this.offsprings.push(...completedOffsprings);
      });
    }
  }
}

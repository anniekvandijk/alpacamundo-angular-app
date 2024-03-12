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
})
export class AlpacaOffspringListComponent{
  @Input() set alpaca (alpaca: Alpaca) {
    this.getOffspring(alpaca);
  }

  public componentId = this.constructor.name;
  private readonly destroyRef = inject(DestroyRef);
  private readonly alpacaService = inject(AlpacaService);
  public offsprings: Alpaca[] = [];

  private getOffspring(alpaca: Alpaca): void {
    this.offsprings = [];
    if (alpaca.offspring.length > 0) {
      const offspringObservables = alpaca.offspring.map(offspring => 
        this.alpacaService.getAlpaca(offspring.id, this.componentId)
        .pipe(
          takeUntilDestroyed(this.destroyRef),
          mergeMap((offspringAlpaca: Alpaca) => {
            const sireObservable = offspringAlpaca.sireId ? 
              this.alpacaService.getAlpaca(offspringAlpaca.sireId, this.componentId).pipe(takeUntilDestroyed(this.destroyRef)) 
              : of(null);
            const damObservable = offspringAlpaca.damId ? 
              this.alpacaService.getAlpaca(offspringAlpaca.damId, this.componentId).pipe(takeUntilDestroyed(this.destroyRef)) 
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
          completedOffsprings.sort((a, b) => new Date(b.dateOfBirth).getFullYear() - new Date(a.dateOfBirth).getFullYear())
          this.offsprings.push(...completedOffsprings);
      });
    }
  }
}

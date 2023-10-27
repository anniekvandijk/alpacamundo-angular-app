import { Component, DestroyRef, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Alpaca } from 'src/app/models/alpaca';
import { AlpacaService } from 'src/app/services/api/alpaca.service';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-alpacas-sidebar',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
  ],
  templateUrl: './alpacas-sidebar.component.html',
  styleUrls: ['./alpacas-sidebar.component.scss']
})
export class AlpacasSidebarComponent {
  readonly destroyRef = inject(DestroyRef);
  alpacas : Alpaca[] = [];
  groupedAlpacas: { [key: string]: Alpaca[] } = {};

  constructor(private alpacaService: AlpacaService) { }

  ngOnInit(): void {
    this.alpacaService.getAlpacas()
    .pipe(takeUntilDestroyed(this.destroyRef))
    .subscribe((alpacas: Alpaca[]) => {
      this.alpacas = alpacas
      .filter(alpaca => alpaca.status !== "Verkocht")
      .filter(alpaca => alpaca.status !== "Overleden")
      .filter(alpaca => alpaca.category !== "Externe  hengsten");
      this.groupedAlpacas = this.groupAlpacasByCategory(this.alpacas);
    });
  }

  groupAlpacasByCategory(alpacas: Alpaca[]): { [key: string]: Alpaca[] } {
    return alpacas.reduce<{ [key: string]: Alpaca[] }>((acc, alpaca) => {
      if (!acc[alpaca.category]) {
        acc[alpaca.category] = [];
      }
      acc[alpaca.category].push(alpaca);
      return acc;
    }, {});
  }

}

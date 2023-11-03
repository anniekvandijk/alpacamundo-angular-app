import { Component, DestroyRef, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Alpaca } from 'src/app/features/alpacas/alpaca.model';
import { AlpacaService } from 'src/app/features/alpacas/alpaca.service';
import { RouterModule } from '@angular/router';
import { SpinnerComponent } from 'src/app/shared/features/pageloader/spinner.component';
import { HttploaderComponent } from 'src/app/shared/features/pageloader/httploader.component';

@Component({
  selector: 'app-alpacas-sidebar',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    SpinnerComponent,
    HttploaderComponent
  ],
  templateUrl: './alpacas-sidebar.component.html',
  styleUrls: ['./alpacas-sidebar.component.scss']
})
export class AlpacasSidebarComponent extends HttploaderComponent {
  readonly destroyRef = inject(DestroyRef);
  private alpacaService = inject(AlpacaService);
  public alpacas : Alpaca[] = [];
  public groupedAlpacas: { [key: string]: Alpaca[] } = {};

  constructor() { super(); }

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

  private groupAlpacasByCategory(alpacas: Alpaca[]): { [key: string]: Alpaca[] } {
    return alpacas.reduce<{ [key: string]: Alpaca[] }>((acc, alpaca) => {
      if (!acc[alpaca.category]) {
        acc[alpaca.category] = [];
      }
      acc[alpaca.category].push(alpaca);
      return acc;
    }, {});
  }

}

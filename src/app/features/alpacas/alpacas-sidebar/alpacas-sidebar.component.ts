import { Component, DestroyRef, OnInit, inject } from '@angular/core';
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
export class AlpacasSidebarComponent implements OnInit{
  public componentId = this.constructor.name;
  private readonly destroyRef = inject(DestroyRef);
  private alpacaService = inject(AlpacaService);
  public alpacas : Alpaca[] = [];
  public groupedAlpacas: { [key: string]: Alpaca[] } = {};

  ngOnInit(): void {
    this.alpacaService.getAlpacas(this.componentId)
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
      const alpacaDob = new Date(alpaca.dateOfBirth);
      const oneYearAgo = new Date();
      oneYearAgo.setFullYear(oneYearAgo.getFullYear() - 1);
      if (alpacaDob > oneYearAgo) {
        alpaca.category = "Cria's " + oneYearAgo.getFullYear();
      }
      if (!acc[alpaca.category]) {
        acc[alpaca.category] = [];
      }
      acc[alpaca.category].push(alpaca);
      return acc;
    }, {});
  }

}

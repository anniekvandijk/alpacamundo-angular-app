import { CommonModule } from '@angular/common';
import { Component, DestroyRef, Input, ViewChild, inject } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { SpinnerComponent } from 'src/app/shared/features/pageloader/spinner.component';
import { Alpaca } from 'src/app/features/alpacas/alpaca.model';
import { Showresult } from 'src/app/features/alpacas/showresult.model';
import { MatSort, MatSortModule, Sort } from '@angular/material/sort';
import { ShowresultService } from '../../showresult.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { HttploaderComponent } from 'src/app/shared/features/pageloader/httploader.component';

@Component({
  selector: 'app-alpaca-showresults',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatSortModule,
    SpinnerComponent,
    HttploaderComponent
  ],
  templateUrl: './alpaca-showresults.component.html',
  styleUrls: []
})
export class AlpacaShowresultsComponent {
  @Input() set alpaca (alpaca: Alpaca) {
    this.setShowResults(alpaca);
  }
  public componentId = this.constructor.name;
  private readonly destroyRef = inject(DestroyRef);
  private readonly showresultService = inject(ShowresultService);
  @ViewChild(MatSort) sort: MatSort = new MatSort();
  public showresults: Showresult[] = [];
  public displayedColumns: string[] = [
    'showYear',
    'result',
    'showname',
  ];
  public dataSource = new MatTableDataSource<Showresult>();

  private setShowResults(alpaca: Alpaca): void {
    this.showresults = [];
    this.dataSource.data = [];
    this.showresultService.getShowresultsByAlpacaId(alpaca.id, this.componentId)
    .pipe(takeUntilDestroyed(this.destroyRef))
    .subscribe ((showresults: Showresult[]) => {
      this.showresults = showresults;
      this.dataSource.data = this.showresults;
      this.dataSource.sortingDataAccessor = (item: Showresult, property: string) => {
        switch(property) {
          case 'showYear': return item.alpacashow.showYear;
          default: return (item as any)[property];
        }
      };
      this.dataSource.sort = this.sort;
      const sortState: Sort = {active: 'showYear', direction: 'desc'};
      this.sort.active = sortState.active;
      this.sort.direction = sortState.direction;
      this.sort.sortChange.emit(sortState);

    });
  }
}


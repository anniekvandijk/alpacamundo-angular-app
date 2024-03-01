import { CommonModule } from '@angular/common';
import { Component, DestroyRef, Input, OnChanges, OnInit, ViewChild, inject } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { SpinnerComponent } from 'src/app/shared/features/pageloader/spinner.component';
import { Alpaca } from 'src/app/features/alpacas/alpaca.model';
import { Showresult } from 'src/app/features/alpacas/showresult.model';
import { MatSort, MatSortModule, Sort } from '@angular/material/sort';
import { ShowresultService } from '../../showresult.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-alpaca-showresults',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatSortModule,
    SpinnerComponent
  ],
  templateUrl: './alpaca-showresults.component.html',
  styleUrls: []
})
export class AlpacaShowresultsComponent implements OnInit, OnChanges {
  @Input() alpaca!: Alpaca;
  private readonly destroyRef = inject(DestroyRef);
  private showresultService = inject(ShowresultService);
  @ViewChild(MatSort) sort: MatSort = new MatSort();
  public showresults: Showresult[] = [];

  public displayedColumns: string[] = [
    'showYear',
    'result',
    'showname',
  ];

  public dataSource = new MatTableDataSource<Showresult>();

  ngOnInit(): void {
    this.setShowResults(this.alpaca.id);
  }

  ngOnChanges(): void {
    this.setShowResults(this.alpaca.id);
  }

  private setShowResults(alpacaId: string): void {
    this.showresultService.getShowresultsByAlpacaId(alpacaId)
    .pipe(takeUntilDestroyed(this.destroyRef))
    .subscribe ((showresults: Showresult[]) => {
      if (showresults.length === 0) {
        this.dataSource.data = [];
        return;
      }
      this.dataSource.data = showresults;
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
    console.log(this.dataSource.data);
  }
}

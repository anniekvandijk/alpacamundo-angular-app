import { CommonModule } from '@angular/common';
import { Component, Input, ViewChild } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { Alpaca } from 'src/app/features/alpacas/models/alpaca.model';
import { Showresult } from 'src/app/features/alpacas/models/showresult.model';
import { MatSort, MatSortModule, Sort } from '@angular/material/sort';

@Component({
  selector: 'app-alpaca-showresults',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatSortModule,
  ],
  templateUrl: './alpaca-showresults.component.html',
  styleUrls: []
})
export class AlpacaShowresultsComponent {
  @Input() set alpaca (alpaca: Alpaca) {
    this.dataSource.data = [];
    this.setShowResults(alpaca);
  }
  @ViewChild(MatSort) sort: MatSort = new MatSort();
  public displayedColumns: string[] = [
    'showYear',
    'result',
    'showname',
  ];
  public dataSource = new MatTableDataSource<Showresult>();

  private setShowResults(alpaca: Alpaca): void {
    this.dataSource.data = alpaca.showresults;
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
  } 

}


import { CommonModule } from '@angular/common';
import { Component, Input, ViewChild } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { Alpaca } from 'src/app/features/alpacas/models/alpaca.model';
import { Showresult } from 'src/app/features/alpacas/models/showresult.model';

@Component({
  selector: 'app-alpaca-showresults',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
  ],
  templateUrl: './alpaca-showresults.component.html',
  styleUrls: []
})
export class AlpacaShowresultsComponent {
  @Input() set alpaca (alpaca: Alpaca) {
    this.dataSource.data = [];
    this.setShowResults(alpaca);
  }
  displayedColumns: string[] = [
    'showYear',
    'result',
    'showname',
  ];
  dataSource = new MatTableDataSource<Showresult>();

  private setShowResults(alpaca: Alpaca): void {
    const hasShowResults = alpaca.showresults && alpaca.showresults.length > 0;
    if (!hasShowResults) return;
    const sortedShowResults = alpaca.showresults.sort((a, b) => b.alpacashow.showYear - a.alpacashow.showYear);
    this.dataSource.data = sortedShowResults;
  } 
}


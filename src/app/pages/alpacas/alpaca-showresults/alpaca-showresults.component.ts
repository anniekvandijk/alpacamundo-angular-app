import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { SpinnerComponent } from 'src/app/components/spinner.component';
import { Alpaca } from 'src/app/models/alpaca';
import { Showresult } from 'src/app/models/showresult';

@Component({
  selector: 'app-alpaca-showresults',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    SpinnerComponent
  ],
  templateUrl: './alpaca-showresults.component.html',
  styleUrls: ['./alpaca-showresults.component.scss']
})
export class AlpacaShowresultsComponent {
  @Input() alpaca!: Alpaca;
  showresults: Showresult[] = [];

  displayedColumns: string[] = [
    'showYear',
    'result',
    'showname',
  ];

  dataSource = new MatTableDataSource<Showresult>();

  ngOnInit(): void {
    this.setShowResults();
  }

  ngOnChanges(): void {
    this.setShowResults();
  }

  setShowResults(): void {
    if (this.alpaca && this.alpaca.showresults) {
      this.showresults = this.alpaca.showresults;
      this.showresults.sort((a, b) => {
        if (a.alpacashow && a.alpacashow.showYear && b.alpacashow && b.alpacashow.showYear) {
          return a.alpacashow.showYear - b.alpacashow.showYear;
        } else {
          return 0;
        }
      });
      this.dataSource.data = this.showresults;
    }

  }
}


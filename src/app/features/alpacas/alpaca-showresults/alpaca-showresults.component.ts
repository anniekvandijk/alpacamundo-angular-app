import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { SpinnerComponent } from 'src/app/shared/features/pageloader/spinner.component';
import { Alpaca } from 'src/app/features/alpacas/alpaca.model';
import { Showresult } from 'src/app/features/alpacas/showresult.model';

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
  public showresults: Showresult[] = [];

  public displayedColumns: string[] = [
    'showYear',
    'result',
    'showname',
  ];

  public dataSource = new MatTableDataSource<Showresult>();

  ngOnInit(): void {
    this.setShowResults();
  }

  ngOnChanges(): void {
    this.setShowResults();
  }

  private setShowResults(): void {
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


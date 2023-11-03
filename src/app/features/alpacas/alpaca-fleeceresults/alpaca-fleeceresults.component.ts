import { Component, Input, Inject } from '@angular/core';
import { Alpaca } from 'src/app/features/alpacas/alpaca.model';
import { Configuration } from 'src/app/shared/configuration/configuration.model';
import { Fleece } from 'src/app/features/alpacas/fleece.model';
import { CONFIGURATION } from 'src/app/shared/configuration/configuration.token';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { SpinnerComponent } from 'src/app/shared/features/pageloader/spinner.component';

@Component({
  selector: 'app-alpaca-fleeceresults',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatIconModule,
    SpinnerComponent
  ],
  templateUrl: './alpaca-fleeceresults.component.html',
  styleUrls: ['./alpaca-fleeceresults.component.scss']
})
export class AlpacaFleeceresultsComponent {
  @Input() alpaca!: Alpaca;
  public fleeces: Fleece[] = [];
  public fleeceResultsUrl!: string;
  constructor(
    @Inject(CONFIGURATION) private configuration: Configuration
  ) { }

  public displayedColumns: string[] = [
    'year',
    'fleecenumber',
    'mfd',
    'sd',
    'cv',
    'crv',
    'cf',
    'fleeceTestReport'
  ];
  
  public dataSource = new MatTableDataSource<Fleece>();
  
  ngOnInit(): void {
    this.setFleeceResults();
    this.fleeceResultsUrl = this.configuration.storage.alpacaFleeceResultsUrl;
  }

  ngOnChanges(): void {
    this.setFleeceResults();
  }

  private setFleeceResults() {
    this.fleeces = this.alpaca.fleeceresults;
    // Sort the fleeces by year
    let sorted = this.fleeces.sort((a, b) => b.fleecenumber - a.fleecenumber);
    this.dataSource.data = sorted;
  }
}


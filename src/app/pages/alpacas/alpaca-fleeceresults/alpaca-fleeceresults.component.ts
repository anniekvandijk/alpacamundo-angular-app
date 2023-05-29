import { Component, Input, Inject } from '@angular/core';
import { Alpaca } from 'src/app/models/alpaca';
import { Configuration } from 'src/app/models/configuration';
import { Fleece } from 'src/app/models/fleece';
import { CONFIGURATION } from 'src/app/utilities/configuration.token';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { SpinnerComponent } from 'src/app/components/spinner.component';

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
  fleeces: Fleece[] = [];
  fleeceResultsUrl!: string;
  constructor(
    @Inject(CONFIGURATION) private configuration: Configuration
  ) { }

  displayedColumns: string[] = [
    'year',
    'fleecenumber',
    'mfd',
    'sd',
    'cv',
    'crv',
    'cf',
    'fleeceTestReport'
  ];
  
  dataSource = new MatTableDataSource<Fleece>();
  
  ngOnInit(): void {
    this.setFleeceResults();
    this.fleeceResultsUrl = this.configuration.storage.alpacaFleeceResultsUrl;
  }

  ngOnChanges(): void {
    this.setFleeceResults();
  }

  setFleeceResults() {
    this.fleeces = this.alpaca.fleeceresults;
    // Sort the fleeces by year
    let sorted = this.fleeces.sort((a, b) => b.fleecenumber - a.fleecenumber);
    this.dataSource.data = sorted;
  }
}


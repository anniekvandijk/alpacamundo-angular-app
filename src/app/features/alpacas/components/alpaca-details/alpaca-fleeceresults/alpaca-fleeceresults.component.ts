import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { Alpaca } from 'src/app/features/alpacas/models/alpaca.model';
import { Fleece } from 'src/app/features/alpacas/models/fleece.model';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-alpaca-fleeceresults',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatIconModule,
  ],
  templateUrl: './alpaca-fleeceresults.component.html',
  styleUrls: ['./alpaca-fleeceresults.component.scss']
})
export class AlpacaFleeceresultsComponent implements OnInit {
  @Input() set alpaca (alpaca: Alpaca) {
    this.dataSource.data = [];
    this.setFleeceResults(alpaca);
  }
  readonly componentId = this.constructor.name;
  fleeceResultsUrl!: string;

  displayedColumns: string[] = [
    'year',
    'fleeceNumber',
    'mfd',
    'sd',
    'cv',
    'crv',
    'cf',
    'fleeceTestReport'
  ];
  
  dataSource = new MatTableDataSource<Fleece>();
  
  ngOnInit(): void {
    this.fleeceResultsUrl = environment.storageUrls.alpacaFleeceResultsUrl;
  }

  private setFleeceResults(alpaca: Alpaca) : void {
    const hasFleeceResults = alpaca.fleeceresults && alpaca.fleeceresults.length > 0;
    if (!hasFleeceResults) return;
    const sortedFleeceResults = alpaca.fleeceresults.sort((a, b) => b.fleeceNumber - a.fleeceNumber);
    this.dataSource.data = sortedFleeceResults;
  }
}


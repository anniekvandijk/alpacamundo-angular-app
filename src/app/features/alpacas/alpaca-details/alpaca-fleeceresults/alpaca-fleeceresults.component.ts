import { Component, DestroyRef, Input, OnChanges, OnInit, ViewChild, inject } from '@angular/core';
import { Alpaca } from 'src/app/features/alpacas/alpaca.model';
import { Configuration } from 'src/app/shared/configuration/configuration.model';
import { Fleece } from 'src/app/features/alpacas/fleece.model';
import { CONFIGURATION } from 'src/app/shared/configuration/configuration.token';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { SpinnerComponent } from 'src/app/shared/features/pageloader/spinner.component';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FleeceService } from '../../fleece.service';
import { MatSort, Sort } from '@angular/material/sort';

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
export class AlpacaFleeceresultsComponent implements OnInit {
  @Input() set alpaca (alpaca: Alpaca) {
    this.setFleeceResults(alpaca);
  }
  @ViewChild(MatSort) sort: MatSort = new MatSort();
  private readonly destroyRef = inject(DestroyRef);
  private readonly fleeceService = inject(FleeceService);
  private readonly configuration: Configuration = inject(CONFIGURATION);
  fleeces: Fleece[] = [];
  fleeceResultsUrl!: string;

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
    this.fleeceResultsUrl = this.configuration.storage.alpacaFleeceResultsUrl;
  }

  private setFleeceResults(alpaca: Alpaca) : void {
    this.fleeces = [];
    this.dataSource.data = [];
    this.fleeceService.getFleecesByAlpacaId(alpaca.id)
    .pipe(takeUntilDestroyed(this.destroyRef))
    .subscribe ((fleeces: Fleece[]) => {
      this.fleeces = fleeces;
      this.dataSource.data = this.fleeces;
      this.dataSource.sortingDataAccessor = (item: Fleece, property: string) => {
        switch(property) {
          case 'fleecenumber': return item.fleecenumber;
          default: return (item as any)[property];
        }
      };
      this.dataSource.sort = this.sort;
      const sortState: Sort = {active: 'fleecenumber', direction: 'desc'};
      this.sort.active = sortState.active;
      this.sort.direction = sortState.direction;
      this.sort.sortChange.emit(sortState);
    });
  }
}


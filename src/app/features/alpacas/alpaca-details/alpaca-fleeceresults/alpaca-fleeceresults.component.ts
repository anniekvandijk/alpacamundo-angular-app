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
import { HttploaderComponent } from 'src/app/shared/features/pageloader/httploader.component';

@Component({
  selector: 'app-alpaca-fleeceresults',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatIconModule,
    SpinnerComponent,
    HttploaderComponent
  ],
  templateUrl: './alpaca-fleeceresults.component.html',
  styleUrls: ['./alpaca-fleeceresults.component.scss']
})
export class AlpacaFleeceresultsComponent implements OnInit {
  @Input() set alpaca (alpaca: Alpaca) {
    this.setFleeceResults(alpaca);
  }
  public componentId = this.constructor.name;
  @ViewChild(MatSort) sort: MatSort = new MatSort();
  private readonly destroyRef = inject(DestroyRef);
  private readonly fleeceService = inject(FleeceService);
  private readonly configuration: Configuration = inject(CONFIGURATION);
  public fleeces: Fleece[] = [];
  public fleeceResultsUrl!: string;

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
    this.fleeceResultsUrl = this.configuration.storage.alpacaFleeceResultsUrl;
  }

  private setFleeceResults(alpaca: Alpaca) : void {
    this.fleeces = [];
    this.dataSource.data = [];
    this.fleeceService.getFleecesByAlpacaId(alpaca.id, this.componentId)
    .pipe(takeUntilDestroyed(this.destroyRef))
    .subscribe ((fleeces: Fleece[]) => {
      this.fleeces = fleeces;
      this.dataSource.data = this.fleeces;
      this.dataSource.sort = this.sort;
      const sortState: Sort = {active: 'fleecenumber', direction: 'desc'};
      this.sort.active = sortState.active;
      this.sort.direction = sortState.direction;
      this.sort.sortChange.emit(sortState);
    });
  }
}


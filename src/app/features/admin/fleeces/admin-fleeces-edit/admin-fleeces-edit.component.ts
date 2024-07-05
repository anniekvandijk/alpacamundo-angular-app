import { Component, DestroyRef, Input, OnInit, ViewChild, inject } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatSort, Sort } from '@angular/material/sort';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { DeleteConfirmationDialogComponent } from 'src/app/shared/components/dialogs/delete-confirmation-dialog/delete-confirmation-dialog.component';
import { FleeceService } from 'src/app/features/alpacas/services/fleece.service';
import { Fleece } from 'src/app/features/alpacas/models/fleece.model';
import { environment } from 'src/environments/environment';
import { StopClickPropagationDirective } from './stop-click-propagation.directive';
import { MatTooltipModule } from '@angular/material/tooltip';

@Component({
  selector: 'app-admin-fleeces-edit',
  standalone: true,
  imports: [
    ReactiveFormsModule, 
    MatTableModule,
    FormsModule,
    MatFormFieldModule, 
    MatInputModule, 
    MatButtonModule,
    MatIconModule,
    DeleteConfirmationDialogComponent,
    MatTooltipModule,
    StopClickPropagationDirective
  ],
  templateUrl: './admin-fleeces-edit.component.html',
  styleUrls: ['./admin-fleeces-edit.component.scss']
})
export class AdminFleecesEditComponent implements OnInit{
  @Input() alpacaId!: string;
  @ViewChild(MatSort) sort: MatSort = new MatSort();
  private destroyRef = inject(DestroyRef);
  readonly componentId = this.constructor.name;
  private readonly fleeceService = inject(FleeceService);
  displayedColumns: string[] = [
    'year',
    'fleeceNumber',
    'mfd',
    'sd',
    'cv',
    'crv',
    'cf',
    'fleeceTestReport',
    'actions'
  ];
  dataSource = new MatTableDataSource<Fleece>();
  fleeceResultsUrl!: string;
  isAddingNewRow = false;
  editingRowIndex = -1;
  editingRow!: Fleece | null;

  resetToDefault: Fleece = {
    id: '',
    alpacaId: this.alpacaId, 
    fleeceNumber: 0, 
    year: 0, 
    mfd: 0, 
    sd: 0, 
    cv: 0, 
    crv: 0, 
    cf: 0, 
    fleeceTestReport: null };

  newRow: Fleece = this.resetToDefault;

  ngOnInit(): void {
    this.fleeceResultsUrl = environment.storageUrls.alpacaFleeceResultsUrl;
    this.getFleeceData();
  }
  
  getFleeceData(): void {
    this.fleeceService.getFleecesByAlpacaId(this.alpacaId, this.componentId)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(
        fleeces => {
          if (fleeces.length === 0) {
            this.dataSource.data = [];
          } else {
            this.dataSource.data = fleeces;
            this.dataSource.sort = this.sort;
            const sortState: Sort = {active: 'fleeceNumber', direction: 'desc'};
            this.sort.active = sortState.active;
            this.sort.direction = sortState.direction;
            this.sort.sortChange.emit(sortState);
          }
        }
    );
  }

  addNewRow(): void {
    this.isAddingNewRow = true;
    this.newRow = this.resetToDefault;
  }

  saveNewRow(): void {
    if (this.newRow !== null) {
      this.dataSource.data.push(this.newRow);
      this.newRow = this.resetToDefault; 
    }
  }

  onCancelNewRow(): void {
    this.newRow = this.resetToDefault;
    this.isAddingNewRow = false;
  }

  saveEditRow(): void {
    this.editingRowIndex = -1;
    this.editingRow = null;
  }

  cancelEditRow(): void {
    this.editingRowIndex = -1;
    this.editingRow = null;
  }

  editRow(row: any, index: number): void {
    // TODO make this a form
    this.editingRowIndex = index;
    this.editingRow = this.dataSource.data.filter(r => r === row)[0];
  }

  deleteRow(row: any): void {
    this.dataSource.data = this.dataSource.data.filter(r => r !== row);
    // TODO delete row from database
  }
}
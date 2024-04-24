import { CommonModule } from "@angular/common";
import { AfterViewInit, Component, DestroyRef, OnInit, ViewChild, inject } from "@angular/core";
import { takeUntilDestroyed } from "@angular/core/rxjs-interop";
import { MatButtonModule } from "@angular/material/button";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MatPaginatorModule, MatPaginator } from "@angular/material/paginator";
import { MatSelectChange, MatSelectModule } from "@angular/material/select";
import { MatSortModule, MatSort, Sort } from "@angular/material/sort";
import { MatTableModule, MatTableDataSource } from "@angular/material/table";
import { RouterModule } from "@angular/router";
import { Alpaca } from "src/app/features/alpacas/models/alpaca.model";
import { AlpacaService } from "src/app/features/alpacas/services/alpaca.service";
import { HttploaderComponent } from "src/app/shared/components/pageloader/httploader.component";

@Component({
  selector: 'app-admin-alpacas-list',
  standalone: true,
  imports: [    
    CommonModule,
    RouterModule,
    MatTableModule,
    MatSelectModule,
    MatSortModule,
    MatButtonModule,
    MatPaginatorModule,
    MatInputModule,
    MatFormFieldModule,
    HttploaderComponent
  ],
  styleUrls: ['./admin-alpacas-list.component.scss'],
  templateUrl: './admin-alpacas-list.component.html',
})
export class AdminAlpacasListComponent implements OnInit, AfterViewInit {
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  readonly componentId = this.constructor.name;
  private destroyRef = inject(DestroyRef);
  private alpacaService = inject(AlpacaService);
  private searchFilter = '';
  selectedStatuses: string[] = [];
  selectedCategories: string[] = [];
  dataSource = new MatTableDataSource<Alpaca>();
  statuses: string[] = [];
  categories: string[] = [];
  displayedColumns: string[] = ['shortName', 'status', 'category'];

  ngOnInit(): void {
    this.selectedStatuses = ['Niet te koop', 'Te koop'];
    this.getAlpacas();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    const sortState: Sort = {active: 'shortName', direction: 'asc'};
    this.sort.active = sortState.active;
    this.sort.direction = sortState.direction;
    this.sort.sortChange.emit(sortState);
    this.dataSource.filterPredicate = (data: any, filter: string) => {
      let matchFound = false;
      for (const column of this.displayedColumns) {
        if(column in data) {
          if(data[column]) {
            matchFound = (matchFound || data[column].toString().trim().toLowerCase().indexOf(filter.trim().toLowerCase()) !== -1)
          }
        }
      }
      return matchFound;
    };
  }

  applySearchByNameFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.searchFilter = filterValue.trim().toLowerCase();
    this.applyFilter();
  
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  applyStatusFilter(event: MatSelectChange) {
    this.selectedStatuses = event.value;
    this.applyFilter();
  }
  
  applyCategoryFilter(event: MatSelectChange) {
    this.selectedCategories = event.value;
    this.applyFilter();
  }

  private applyFilter(): void {
    this.dataSource.filterPredicate = (data: Alpaca, filter: string) => {
      return (this.selectedStatuses.length ? this.selectedStatuses.includes(data.status) : true) &&
             (this.selectedCategories.length ? this.selectedCategories.includes(data.category) : true) &&
             (this.searchFilter ? data.shortName.toLowerCase().includes(this.searchFilter) : true);
    };
    this.dataSource.filter = `${this.selectedStatuses.join(',')},${this.selectedCategories.join(',')},${this.searchFilter}`;
  }

  private getAlpacas(): void {
    this.alpacaService.getAlpacas(this.componentId)
    .pipe(
      takeUntilDestroyed(this.destroyRef),
    )
    .subscribe((alpacas: Alpaca[]) => {
      this.dataSource.data = alpacas;

      // Get all unique statuses
      const allStatuses = alpacas.map(alpaca => alpaca.status);
      this.statuses = Array.from(new Set(allStatuses));

      // Get all unique categories
      const allCategories = alpacas.map(alpaca => alpaca.category);
      this.categories = Array.from(new Set(allCategories));

      this.applyFilter();
    });
  }
}
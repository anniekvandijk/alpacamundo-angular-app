import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, DestroyRef, OnInit, ViewChild, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import {MatInputModule} from '@angular/material/input';
import { MatSort, MatSortModule, Sort } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { Link } from 'src/app/features/links/link.model';
import { LinkService } from 'src/app/features/links/link.service';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-admin-links-list',
  standalone: true,
  imports: [    
    CommonModule,
    RouterModule,
    MatTableModule,
    MatSortModule,
    MatButtonModule,
    MatPaginatorModule,
    MatInputModule,
    MatFormFieldModule,
  ],
  templateUrl: './admin-links-list.component.html',
})
export class AdminLinksListComponent implements OnInit, AfterViewInit{
  readonly destroyRef = inject(DestroyRef);
  public componentId = this.constructor.name;
  private linkService = inject(LinkService);
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  public dataSource = new MatTableDataSource<Link>();
  public displayedColumns: string[] = ['title'];

  ngOnInit(): void {
    this.getLinks();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    const sortState: Sort = {active: 'title', direction: 'asc'};
    this.sort.active = sortState.active;
    this.sort.direction = sortState.direction;
    this.sort.sortChange.emit(sortState);
  }

  public applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  private getLinks() {
    this.linkService.getLinks(this.componentId)
    .pipe(
      takeUntilDestroyed(this.destroyRef),
    )
    .subscribe(links => {
      this.dataSource.data = links;
    });
  }
}

import { AfterViewInit, Component, DestroyRef, OnInit, ViewChild, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { MatSort, MatSortModule, Sort } from '@angular/material/sort';
import { Document } from '../models/document.model';
import { DocumentService } from '../services/document.service';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-admin-documents-list',
  standalone: true,
  imports: [
    MatTableModule,
    MatIconModule,
    MatSortModule,
    MatButtonModule,
    MatPaginatorModule,
    MatInputModule,
    MatFormFieldModule,
  ],
  templateUrl: './admin-documents-list.component.html',
  styleUrl: './admin-documents-list.component.scss'
})
export class AdminDocumentsListComponent implements OnInit, AfterViewInit {
  readonly destroyRef = inject(DestroyRef);
  public componentId = this.constructor.name;
  private documentService = inject(DocumentService);
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  public dataSource = new MatTableDataSource<Document>();
  public displayedColumns: string[] = ['image','name', 'documentCategory'];


  getStorageUrl(document: Document): string {
    return `${this.documentService.getStorageUrl(document)}`;
  }

  getDocumentType(document: Document): string {
    return `${this.documentService.getDocumentType(document)}`;
  }

  ngOnInit(): void {
    this.getDocuments();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  public applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  private getDocuments() {
    this.documentService.getDocuments(this.componentId)
    .pipe(
      takeUntilDestroyed(this.destroyRef),
    )
    .subscribe(documents => {
      this.dataSource.data = documents;
      const sortState: Sort = {active: 'name', direction: 'asc'};
      this.sort.active = sortState.active;
      this.sort.direction = sortState.direction;
      this.sort.sortChange.emit(sortState);
    });
  }
}

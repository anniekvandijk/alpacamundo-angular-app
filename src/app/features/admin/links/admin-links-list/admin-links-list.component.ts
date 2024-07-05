import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, DestroyRef, OnInit, ViewChild, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import {MatInputModule} from '@angular/material/input';
import { MatSort, MatSortModule, Sort } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { Link } from 'src/app/features/links/models/link.model';
import { LinkService } from 'src/app/features/links/services/link.service';
import { RouterModule } from '@angular/router';
import { HttploaderComponent } from 'src/app/shared/components/pageloader/httploader.component';
import { link } from 'fs';
import { FlattenLink } from '../../../links/models/flattenLink.model';

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
    HttploaderComponent
  ],
  templateUrl: './admin-links-list.component.html',
})
export class AdminLinksListComponent implements OnInit, AfterViewInit{
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  readonly componentId = this.constructor.name;
  private destroyRef = inject(DestroyRef);
  private linkService = inject(LinkService);
  dataSource = new MatTableDataSource<FlattenLink>();
  displayedColumns: string[] = [
    'title', 
    'linkTypeName'
  ];

  ngOnInit() {
    this.getLinks();
  }
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
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

  applyFilter(event: Event) {
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
      this.dataSource.data = links.map(link => this.mapLinkToFlattenLink(link));
      const sortState: Sort = {active: 'title', direction: 'asc'};
      this.sort.active = sortState.active;
      this.sort.direction = sortState.direction;
      this.sort.sortChange.emit(sortState);
    });
  }

  private mapLinkToFlattenLink(link: Link): FlattenLink {
    return {
      id: link.id,
      body: link.body,
      imageId: link.image.id,
      imageName: link.image.name,
      imageContentType: link.image.contentType,
      imageDocumentCategory: link.image.documentCategory,
      imageUrl: link.image.url,
      linkTypeId: link.linkType.id,
      linkTypeName: link.linkType.name,
      title: link.title,
      url: link.url
    };
  }
}

import { Component, inject } from '@angular/core';
import { Link } from 'src/app/models/link';
import { LinkService } from 'src/app/services/api/link.service';
import { Configuration } from 'src/app/models/configuration';
import { CONFIGURATION } from 'src/app/utilities/configuration.token';
import { Observable, map, tap } from 'rxjs';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { SpinnerComponent } from 'src/app/components/spinner.component';
import { CommonModule, NgFor, NgIf } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { HttpStatusService } from 'src/app/services/http-status.service';


@Component({
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    MatCardModule,
    MatIconModule,
    SpinnerComponent,
  ],
  selector: 'app-links-main',
  templateUrl: './links-main.component.html',
  styleUrls: ['./links-main.component.scss']
})
export class LinksMainComponent {
  private readonly configuration: Configuration = inject(CONFIGURATION);
  public isLoading!: boolean;
  groupedLinks$!: Observable<{ [key: string]: Link[] }>;
  linkImagesUrl!: string;

  constructor(private linkService: LinkService, 
    private httpStatus: HttpStatusService) { 
    this.httpStatus.loading.subscribe((status) => {
      console.log('status', status);
      this.isLoading = status.loading;
    });
  }

  ngOnInit(): void {
    this.linkImagesUrl = this.configuration.storage.linkImagesUrl;
    this.groupedLinks$ = this.linkService.getLinks().pipe(
      map((links) => this.groupLinksByType(links))
    );
  }

  groupLinksByType(links: Link[]): { [key: string]: Link[] } {
    return links.reduce<{ [key: string]: Link[] }>((acc, link) => {
      if (!acc[link.linkType]) {
        acc[link.linkType] = [];
      }
      acc[link.linkType].push(link);
      return acc;
    }, {});
  }

  navigateTo(link: Link): void {
    window.open(link.url, '_blank');
  }

}

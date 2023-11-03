import { Component, Inject } from '@angular/core';
import { Link } from 'src/app/models/link';
import { LinkService } from 'src/app/services/api/link.service';
import { Configuration } from 'src/app/models/configuration';
import { CONFIGURATION } from 'src/app/utilities/configuration.token';
import { Observable, map } from 'rxjs';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { SpinnerComponent } from 'src/app/components/spinner.component';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { HttploaderComponent } from 'src/app/components/httploader.component';

@Component({
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    MatCardModule,
    MatIconModule,
    SpinnerComponent,
    HttploaderComponent
  ],
  selector: 'app-links-main',
  templateUrl: './links-main.component.html',
  styleUrls: ['./links-main.component.scss']
})
export class LinksMainComponent extends HttploaderComponent {
  public groupedLinks$!: Observable<{ [key: string]: Link[] }>;
  public linkImagesUrl!: string;

  constructor(
    @Inject(CONFIGURATION) private readonly configuration: Configuration,
    private readonly linkService: LinkService,
  ) { super(); }

  ngOnInit(): void {
    this.linkImagesUrl = this.configuration.storage.linkImagesUrl;
    this.groupedLinks$ = this.linkService.getLinks().pipe(
      map((links) => this.groupLinksByType(links))
    );
  }

  private groupLinksByType(links: Link[]): { [key: string]: Link[] } {
    return links.reduce<{ [key: string]: Link[] }>((acc, link) => {
      if (!acc[link.linkType]) {
        acc[link.linkType] = [];
      }
      acc[link.linkType].push(link);
      return acc;
    }, {});
  }

  public navigateTo(link: Link): void {
    window.open(link.url, '_blank');
  }
}

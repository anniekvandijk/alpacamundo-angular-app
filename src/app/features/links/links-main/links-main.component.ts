import { Component, inject } from '@angular/core';
import { Link } from 'src/app/features/links/link.model';
import { LinkService } from 'src/app/features/links/link.service';
import { Configuration } from 'src/app/shared/configuration/configuration.model';
import { CONFIGURATION } from 'src/app/shared/configuration/configuration.token';
import { Observable, map } from 'rxjs';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { SpinnerComponent } from 'src/app/shared/features/pageloader/spinner.component';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { HttploaderComponent } from 'src/app/shared/features/pageloader/httploader.component';

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
  private configuration: Configuration = inject(CONFIGURATION);
  private linkService = inject(LinkService);
  public groupedLinks$!: Observable<{ [key: string]: Link[] }>;
  public linkImagesUrl!: string;

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

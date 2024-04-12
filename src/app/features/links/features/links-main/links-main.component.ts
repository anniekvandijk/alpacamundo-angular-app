import { Component, OnInit, inject } from '@angular/core';
import { Link } from 'src/app/features/links/models/link.model';
import { LinkService } from 'src/app/features/links/services/link.service';
import { Observable, map } from 'rxjs';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { HttploaderComponent } from 'src/app/shared/features/pageloader/httploader.component';
import { environment } from 'src/environments/environment';

@Component({
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    MatCardModule,
    MatIconModule,
    HttploaderComponent
  ],
  selector: 'app-links-main',
  templateUrl: './links-main.component.html',
  styleUrls: ['./links-main.component.scss']
})
export class LinksMainComponent implements OnInit {
  public componentId = this.constructor.name;
  private linkService = inject(LinkService);
  public groupedLinks$!: Observable<{ [key: string]: Link[] }>;
  public linkImagesUrl!: string;
  
  ngOnInit(): void {
    this.linkImagesUrl = environment.storageUrls.linkImagesUrl;
    this.groupedLinks$ = this.linkService.getLinks(this.componentId).pipe(
      map((links) => this.groupLinksByType(links))
    );
  }

  private groupLinksByType(links: Link[]): { [key: string]: Link[] } {
    return links.reduce<{ [key: string]: Link[] }>((acc, link) => {
      if (!acc[link.linkType.name]) {
        acc[link.linkType.name] = [];
      }
      acc[link.linkType.name].push(link);
      return acc;
    }, {});
  }

  public navigateTo(link: Link): void {
    window.open(link.url, '_blank');
  }
}

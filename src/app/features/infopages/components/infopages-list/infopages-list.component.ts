import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Infopage } from 'src/app/features/infopages/models/infopage.model';
import { InfopagesService } from 'src/app/features/infopages/services/infopages.service';
import { InfopageCardComponent } from './infopage-card/infopage-card.component';
import { HttploaderComponent } from 'src/app/shared/features/pageloader/httploader.component';

@Component({
  selector: 'app-infopages-list',
  standalone: true,
  imports: [
    CommonModule,
    InfopageCardComponent,
    HttploaderComponent
  ],
  templateUrl: './infopages-list.component.html',
  styleUrls: []
})
export class InfopagesListComponent implements OnInit{
  public componentId = this.constructor.name;
  private infopagesService = inject(InfopagesService);
  public groupedInfopages$!: Observable<{ [key: string]: Infopage[] }>;

  ngOnInit(): void {
    this.groupedInfopages$ = this.infopagesService.getInfopages(this.componentId).pipe(
      map((infopages) => this.groupInfopagesByCategory(infopages))
    );
  }

  private groupInfopagesByCategory(infopages: Infopage[]): { [key: string]: Infopage[] } {
    return infopages.reduce<{ [key: string]: Infopage[] }>((acc, infopage) => {
      if (!acc[infopage.categories.toString()]) {
        acc[infopage.categories.toString()] = [];
      }
      acc[infopage.categories.toString()].push(infopage);
      return acc;
    }, {});
  }

}

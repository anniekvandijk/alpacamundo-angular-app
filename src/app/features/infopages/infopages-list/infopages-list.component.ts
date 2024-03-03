import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { map, Observable } from 'rxjs';
import { SpinnerComponent } from 'src/app/shared/features/pageloader/spinner.component';
import { Infopage } from 'src/app/features/infopages/infopage.model';
import { InfopagesService } from 'src/app/features/infopages/infopages.service';
import { InfopageCardComponent } from '../infopage-card/infopage-card.component';
import { HttploaderComponent } from 'src/app/shared/features/pageloader/httploader.component';

@Component({
  selector: 'app-infopages-list',
  standalone: true,
  imports: [
    CommonModule,
    SpinnerComponent,
    InfopageCardComponent,
    HttploaderComponent
  ],
  templateUrl: './infopages-list.component.html',
  styleUrls: ['./infopages-list.component.scss']
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
      if (!acc[infopage.category.toString()]) {
        acc[infopage.category.toString()] = [];
      }
      acc[infopage.category.toString()].push(infopage);
      return acc;
    }, {});
  }

}

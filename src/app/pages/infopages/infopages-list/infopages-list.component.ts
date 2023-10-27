import { CommonModule, NgFor, NgIf } from '@angular/common';
import { Component, inject } from '@angular/core';
import { map, Observable, tap } from 'rxjs';
import { SpinnerComponent } from 'src/app/components/spinner.component';
import { Infopage } from 'src/app/models/infopage';
import { InfopagesService } from 'src/app/services/api/infopages.service';
import { InfopageCardComponent } from '../infopage-card/infopage-card.component';

@Component({
  selector: 'app-infopages-list',
  standalone: true,
  imports: [
    CommonModule,
    SpinnerComponent,
    InfopageCardComponent
  ],
  templateUrl: './infopages-list.component.html',
  styleUrls: ['./infopages-list.component.scss']
})
export class InfopagesListComponent {
  private readonly infopagesService = inject(InfopagesService);
  groupedInfopages$!: Observable<{ [key: string]: Infopage[] }>;

  ngOnInit(): void {
    this.groupedInfopages$ = this.infopagesService.getInfopages().pipe(
      map((infopages) => this.groupInfopagesByCategory(infopages))
    );
  }

  groupInfopagesByCategory(infopages: Infopage[]): { [key: string]: Infopage[] } {
    return infopages.reduce<{ [key: string]: Infopage[] }>((acc, infopage) => {
      if (!acc[infopage.category.toString()]) {
        acc[infopage.category.toString()] = [];
      }
      acc[infopage.category.toString()].push(infopage);
      return acc;
    }, {});
  }

}

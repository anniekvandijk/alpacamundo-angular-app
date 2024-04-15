import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Observable, map } from 'rxjs';
import { Infopage } from 'src/app/features/infopages/models/infopage.model';
import { InfopagesService } from 'src/app/features/infopages/services/infopages.service';
import { HttploaderComponent } from 'src/app/shared/components/pageloader/httploader.component';

@Component({
  selector: 'app-infopages-sidebar',
  standalone: true,
  imports: [
    CommonModule, 
    RouterModule,
    HttploaderComponent
  ],
  templateUrl: './infopages-sidebar.component.html',
  styleUrls: ['./infopages-sidebar.component.scss']
})
export class InfopagesSidebarComponent implements OnInit{
  readonly componentId = this.constructor.name;
  private infopagesService = inject(InfopagesService);
  groupedInfopages$!: Observable<{ [key: string]: Infopage[] }>;


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

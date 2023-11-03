import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Observable, map } from 'rxjs';
import { SpinnerComponent } from 'src/app/shared/features/pageloader/spinner.component';
import { Infopage } from 'src/app/features/infopages/infopage.model';
import { InfopagesService } from 'src/app/features/infopages/infopages.service';
import { HttploaderComponent } from 'src/app/shared/features/pageloader/httploader.component';

@Component({
  selector: 'app-infopages-sidebar',
  standalone: true,
  imports: [
    CommonModule, 
    RouterModule,
    SpinnerComponent,
    HttploaderComponent
  ],
  templateUrl: './infopages-sidebar.component.html',
  styleUrls: ['./infopages-sidebar.component.scss']
})
export class InfopagesSidebarComponent extends HttploaderComponent{
  private infopagesService = inject(InfopagesService);
  public groupedInfopages$!: Observable<{ [key: string]: Infopage[] }>;


  ngOnInit(): void {
    this.groupedInfopages$ = this.infopagesService.getInfopages().pipe(
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

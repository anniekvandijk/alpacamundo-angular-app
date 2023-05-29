import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { Observable, map } from 'rxjs';
import { SpinnerComponent } from 'src/app/components/spinner.component';
import { Infopage } from 'src/app/models/infopage';
import { InfopagesService } from 'src/app/services/infopages.service';

@Component({
  selector: 'app-infopages-sidebar',
  standalone: true,
  imports: [
    CommonModule, 
    RouterModule,
    SpinnerComponent
  ],
  templateUrl: './infopages-sidebar.component.html',
  styleUrls: ['./infopages-sidebar.component.scss']
})
export class InfopagesSidebarComponent {
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

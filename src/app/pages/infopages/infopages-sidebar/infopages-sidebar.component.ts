import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { Observable, map } from 'rxjs';
import { SpinnerComponent } from 'src/app/components/spinner.component';
import { Infopage } from 'src/app/models/infopage';
import { InfopagesService } from 'src/app/services/api/infopages.service';
import { HttpStatusService } from 'src/app/services/http-status.service';

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
  groupedInfopages$!: Observable<{ [key: string]: Infopage[] }>;

  constructor(private infopagesService: InfopagesService,
    public httpStatus: HttpStatusService,
    ) {}

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

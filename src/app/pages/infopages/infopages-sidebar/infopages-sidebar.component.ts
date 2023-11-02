import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
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
  public groupedInfopages$!: Observable<{ [key: string]: Infopage[] }>;
  public isLoading$! : Observable<boolean>;
  
  constructor(
    private infopagesService: InfopagesService,
    private httpStatusService: HttpStatusService,
    ) {}

  ngOnInit(): void {
    this.groupedInfopages$ = this.infopagesService.getInfopages().pipe(
      map((infopages) => this.groupInfopagesByCategory(infopages))
    );
  }

  ngOnViewInit(): void {
    this.isLoading$ = this.httpStatusService.isLoading;
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

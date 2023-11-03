import { Component, Inject, inject } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Observable, switchMap } from 'rxjs';
import { Infopage } from 'src/app/features/infopages/infopage.model';
import { InfopagesService } from 'src/app/features/infopages/infopages.service';
import { Configuration } from 'src/app/shared/configuration/configuration.model';
import { CONFIGURATION } from 'src/app/shared/configuration/configuration.token';
import { DomSanitizer } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { SpinnerComponent } from 'src/app/shared/features/pageloader/spinner.component';
import { HttpStatusService } from 'src/app/shared/services/http-status.service';

@Component({
  selector: 'app-infopages-details',
  standalone: true,
  imports: [
    CommonModule,
    SpinnerComponent
  ],
  templateUrl: './infopages-details.component.html',
  styleUrls: ['./infopages-details.component.scss']
})
export class InfopagesDetailsComponent {
  public infopage$!: Observable<Infopage>;
  public isLoading$! : Observable<boolean>;
  public infopageImagesUrl! : string;

  constructor(
    private route: ActivatedRoute,
    private infopagesService: InfopagesService,
    private sanitizer: DomSanitizer,
    private httpStatusService: HttpStatusService,
    @Inject(CONFIGURATION) private configuration: Configuration

  ) { }

  ngOnInit(): void {
    this.infopage$ = this.route.params.pipe(
        switchMap((params: Params) => {
          return this.infopagesService.getInfopage(params['id'])
        })
      )
    this.infopageImagesUrl = this.configuration.storage.infopageImagesUrl;
    }

    ngOnViewInit(): void {
      this.isLoading$ = this.httpStatusService.isLoading;
    }

    public getSafeHtml(html: string) {
      return this.sanitizer.bypassSecurityTrustHtml(html);
    }
}

import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Observable, switchMap } from 'rxjs';
import { Infopage } from 'src/app/features/infopages/infopage.model';
import { InfopagesService } from 'src/app/features/infopages/infopages.service';
import { Configuration } from 'src/app/shared/configuration/configuration.model';
import { CONFIGURATION } from 'src/app/shared/configuration/configuration.token';
import { DomSanitizer } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { SpinnerComponent } from 'src/app/shared/features/pageloader/spinner.component';
import { HttploaderComponent } from 'src/app/shared/features/pageloader/httploader.component';

@Component({
  selector: 'app-infopages-details',
  standalone: true,
  imports: [
    CommonModule,
    SpinnerComponent,
    HttploaderComponent
  ],
  templateUrl: './infopages-details.component.html',
  styleUrls: ['./infopages-details.component.scss']
})
export class InfopagesDetailsComponent extends HttploaderComponent implements OnInit{
  private configuration: Configuration = inject(CONFIGURATION);
  private infopagesService = inject(InfopagesService);
  private route = inject(ActivatedRoute);
  private sanitizer = inject(DomSanitizer);
  public infopage$!: Observable<Infopage>;
  public infopageImagesUrl! : string;

  ngOnInit(): void {
    this.infopage$ = this.route.params.pipe(
        switchMap((params: Params) => {
          return this.infopagesService.getInfopage(params['id'])
        })
      )
    this.infopageImagesUrl = this.configuration.storage.infopageImagesUrl;
    }

    public getSafeHtml(html: string) {
      return this.sanitizer.bypassSecurityTrustHtml(html);
    }
}

import { Component, inject } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Observable, switchMap } from 'rxjs';
import { Infopage } from 'src/app/models/infopage';
import { InfopagesService } from 'src/app/services/api/infopages.service';
import { CONFIGURATION } from 'src/app/utilities/configuration.token';
import { DomSanitizer } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { SpinnerComponent } from 'src/app/components/spinner.component';

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
  private readonly configuration = inject(CONFIGURATION);
  private readonly infopagesService = inject(InfopagesService);
  private readonly route = inject(ActivatedRoute);
  private readonly sanitizer = inject(DomSanitizer);
  infopage$!: Observable<Infopage>;
  infopageImagesUrl! : string;

  ngOnInit(): void {
    this.infopage$ = this.route.params.pipe(
        switchMap((params: Params) => {
          return this.infopagesService.getInfopage(params['id'])
        })
      )

    this.infopageImagesUrl = this.configuration.storage.infopageImagesUrl;
    }

    getSafeHtml(html: string) {
      return this.sanitizer.bypassSecurityTrustHtml(html);
    }
}

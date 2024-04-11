import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Observable, switchMap } from 'rxjs';
import { Infopage } from 'src/app/features/infopages/infopage.model';
import { InfopagesService } from 'src/app/features/infopages/infopages.service';
import { DomSanitizer } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { HttploaderComponent } from 'src/app/shared/features/pageloader/httploader.component';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-infopages-details',
  standalone: true,
  imports: [
    CommonModule,
    HttploaderComponent
  ],
  templateUrl: './infopages-details.component.html',
  styleUrls: []
})
export class InfopagesDetailsComponent implements OnInit{
  public componentId = this.constructor.name;
  private infopagesService = inject(InfopagesService);
  private route = inject(ActivatedRoute);
  private sanitizer = inject(DomSanitizer);
  public infopage$!: Observable<Infopage>;
  public infopageImagesUrl! : string;

  ngOnInit(): void {
    this.infopage$ = this.route.params.pipe(
        switchMap((params: Params) => {
          return this.infopagesService.getInfopage(params['id'], this.componentId)
        })
      )
    this.infopageImagesUrl = environment.storageUrls.infopageImagesUrl;
    }

  public getSafeHtml(html: string) {
    return this.sanitizer.bypassSecurityTrustHtml(html);
  }
}

import { Component, DestroyRef, OnInit, inject } from '@angular/core';
import { switchMap } from 'rxjs/operators';
import { Alpaca } from '../../models/alpaca.model';
import { ActivatedRoute, Params, Router, RouterModule } from '@angular/router';
import { AlpacaService } from 'src/app/features/alpacas/services/alpaca.service';
import { DomSanitizer } from '@angular/platform-browser';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { CommonModule } from '@angular/common';
import { AlpacaShowresultsComponent } from './alpaca-showresults/alpaca-showresults.component';
import { AlpacaFleeceresultsComponent } from './alpaca-fleeceresults/alpaca-fleeceresults.component';
import { AlpacaOffspringCardComponent } from './alpaca-offspring-list/alpaca-offspring-card/alpaca-offspring-card.component';
import { HttploaderComponent } from 'src/app/shared/components/pageloader/httploader.component';
import { AlpacaOffspringListComponent } from './alpaca-offspring-list/alpaca-offspring-list.component';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-alpaca-details',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    AlpacaShowresultsComponent,
    AlpacaFleeceresultsComponent,
    AlpacaOffspringListComponent,
    AlpacaOffspringCardComponent,
    HttploaderComponent
  ],
  templateUrl: './alpaca-details.component.html',
  styleUrls: ['./alpaca-details.component.scss']
})
export class AlpacaDetailsComponent implements OnInit {
  readonly componentId = this.constructor.name;
  private destroyRef = inject(DestroyRef);
  private alpacaService = inject(AlpacaService);
  private router = inject(Router);
  private route = inject(ActivatedRoute);
  private sanitizer = inject(DomSanitizer);
  alpaca!: Alpaca;
  alpacaMainImageUrl!: string;
  alpacaImagesUrl! : string;
  alpacaPedigreeUrl! : string;
  alpacaFleeceResultsUrl! : string;

  ngOnInit(): void {
    this.getAlpaca();
    this.alpacaMainImageUrl = environment.storageUrls.alpacaMainImageUrl;
    this.alpacaImagesUrl = environment.storageUrls.alpacaImagesUrl;
    this.alpacaPedigreeUrl = environment.storageUrls.alpacaPedigreeUrl;
    this.alpacaFleeceResultsUrl = environment.storageUrls.alpacaFleeceResultsUrl;
  }

  private getAlpaca(): void {
    this.route.params.pipe(
      takeUntilDestroyed(this.destroyRef),
      switchMap((params: Params) => this.alpacaService.getAlpaca(params['id'], this.componentId)),
    )
    .subscribe((alpaca: Alpaca) => {
      this.alpaca = alpaca;
    });
  }

  getSafeHtml(html: string) {
    return this.sanitizer.bypassSecurityTrustHtml(html);
  }

  navigateToPedegree(name: string): void {
    window.open(this.alpacaPedigreeUrl+name, '_blank');
  }

  navigateToDetails(alpacaId : string) {
    this.router.navigate(['/alpacas/detail', alpacaId]);
  }
}

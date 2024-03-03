import { Component, DestroyRef, OnInit, inject } from '@angular/core';
import { map, switchMap } from 'rxjs/operators';
import { Alpaca } from '../alpaca.model';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { AlpacaService } from 'src/app/features/alpacas/alpaca.service';
import { Configuration } from 'src/app/shared/configuration/configuration.model';
import { CONFIGURATION } from 'src/app/shared/configuration/configuration.token';
import { DomSanitizer } from '@angular/platform-browser';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { SpinnerComponent } from 'src/app/shared/features/pageloader/spinner.component';
import { CommonModule } from '@angular/common';
import { AlpacaShowresultsComponent } from './alpaca-showresults/alpaca-showresults.component';
import { AlpacaFleeceresultsComponent } from './alpaca-fleeceresults/alpaca-fleeceresults.component';
import { AlpacaOffspringCardComponent } from './alpaca-offspring-list/alpaca-offspring-card/alpaca-offspring-card.component';
import { HttploaderComponent } from 'src/app/shared/features/pageloader/httploader.component';
import { AlpacaOffspringListComponent } from './alpaca-offspring-list/alpaca-offspring-list.component';
import { forkJoin, of } from 'rxjs';

@Component({
  selector: 'app-alpaca-details',
  standalone: true,
  imports: [
    CommonModule,
    AlpacaShowresultsComponent,
    AlpacaFleeceresultsComponent,
    AlpacaOffspringListComponent,
    AlpacaOffspringCardComponent,
    SpinnerComponent,
    HttploaderComponent
  ],
  templateUrl: './alpaca-details.component.html',
  styleUrls: ['./alpaca-details.component.scss']
})
export class AlpacaDetailsComponent implements OnInit {
  public componentId = this.constructor.name;
  private readonly destroyRef = inject(DestroyRef);
  private configuration: Configuration = inject(CONFIGURATION);
  private alpacaService = inject(AlpacaService);
  private router = inject(Router);
  private route = inject(ActivatedRoute);
  private sanitizer = inject(DomSanitizer);
  public alpaca!: Alpaca;
  public alpacaMainImageUrl!: string;
  public alpacaImagesUrl! : string;
  public alpacaPedigreeUrl! : string;
  public alpacaFleeceResultsUrl! : string;

  ngOnInit(): void {
    this.getAlpaca();
    this.alpacaMainImageUrl = this.configuration.storage.alpacaMainImageUrl;
    this.alpacaImagesUrl = this.configuration.storage.alpacaImagesUrl;
    this.alpacaPedigreeUrl = this.configuration.storage.alpacaPedigreeUrl;
    this.alpacaFleeceResultsUrl = this.configuration.storage.alpacaFleeceResultsUrl;
  }

  private getAlpaca(): void {
    this.route.params.pipe(
      takeUntilDestroyed(this.destroyRef),
      switchMap((params: Params) => this.alpacaService.getAlpaca(params['id'], this.componentId)),
      switchMap((alpaca: Alpaca) => {
        const sireObservable = alpaca.sireId ? 
          this.alpacaService.getAlpaca(alpaca.sireId, this.componentId).pipe(takeUntilDestroyed(this.destroyRef)) : 
          of(null);
        const damObservable = alpaca.damId ? 
          this.alpacaService.getAlpaca(alpaca.damId, this.componentId).pipe(takeUntilDestroyed(this.destroyRef)) : 
          of(null);
        return forkJoin([of(alpaca), sireObservable, damObservable]);
      }),
      map(([alpaca, sire, dam]) => {
        if (sire) { alpaca.sire = sire; }
        if (dam) { alpaca.dam = dam; }
        return alpaca;
      })
    )
    .subscribe((alpaca: Alpaca) => {
      this.alpaca = alpaca;
    });
  }

  public getSafeHtml(html: string) {
    return this.sanitizer.bypassSecurityTrustHtml(html);
  }

  public navigateToPedegree(name: string): void {
    window.open(this.alpacaPedigreeUrl+name, '_blank');
  }

  public navigateToDetails(alpaca: Alpaca) {
    this.router.navigate(['/alpacas/detail', alpaca.id]);
  }
}

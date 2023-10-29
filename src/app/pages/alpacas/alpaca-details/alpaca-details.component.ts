import { Component, DestroyRef, Inject, OnInit, inject } from '@angular/core';
import { switchMap } from 'rxjs/operators';
import { Alpaca } from '../../../models/alpaca';
import { ActivatedRoute, Params } from '@angular/router';
import { AlpacaService } from 'src/app/services/api/alpaca.service';
import { Configuration } from 'src/app/models/configuration';
import { CONFIGURATION } from 'src/app/utilities/configuration.token';
import { NavigationService } from 'src/app/services/navigation.service';
import { FleeceService } from 'src/app/services/api/fleece.service';
import { Fleece } from 'src/app/models/fleece';
import { ShowresultService } from 'src/app/services/api/showresult.service';
import { Showresult } from 'src/app/models/showresult';
import { DomSanitizer } from '@angular/platform-browser';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { SpinnerComponent } from 'src/app/components/spinner.component';
import { CommonModule } from '@angular/common';
import { AlpacaShowresultsComponent } from '../alpaca-showresults/alpaca-showresults.component';
import { AlpacaFleeceresultsComponent } from '../alpaca-fleeceresults/alpaca-fleeceresults.component';
import { AlpacaOffspringCardComponent } from '../alpaca-offspring-card/alpaca-offspring-card.component';
import { HttpStatusService } from 'src/app/services/http-status.service';

@Component({
  selector: 'app-alpaca-details',
  standalone: true,
  imports: [
    CommonModule,
    AlpacaShowresultsComponent,
    AlpacaFleeceresultsComponent,
    AlpacaOffspringCardComponent,
    SpinnerComponent
  ],
  templateUrl: './alpaca-details.component.html',
  styleUrls: ['./alpaca-details.component.scss']
})
export class AlpacaDetailsComponent {
  private readonly destroyRef = inject(DestroyRef);
  public isLoading: boolean | undefined;
  public alpaca!: Alpaca;
  public alpacaMainImageUrl!: string;
  public alpacaImagesUrl! : string;
  public alpacaPedigreeUrl! : string;
  public alpacaFleeceResultsUrl! : string;

  constructor(
    private route: ActivatedRoute,
    private alpacaService: AlpacaService,
    private showresultService: ShowresultService,
    private fleeceService: FleeceService,
    private navigationService: NavigationService,
    private sanitizer: DomSanitizer,
    private httpStatus: HttpStatusService,
    @Inject(CONFIGURATION) private configuration: Configuration
    
    ) { }

  ngOnInit(): void {
    this.getAlpaca();
    this.alpacaMainImageUrl = this.configuration.storage.alpacaMainImageUrl;
    this.alpacaImagesUrl = this.configuration.storage.alpacaImagesUrl;
    this.alpacaPedigreeUrl = this.configuration.storage.alpacaPedigreeUrl;
    this.alpacaFleeceResultsUrl = this.configuration.storage.alpacaFleeceResultsUrl;
  }

  ngOnViewInit(): void {
    this.httpStatus.loading
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((status) => {
      this.isLoading = status.loading;
    });
  }

  private getAlpaca(): void {
  // Get the alpaca id from the route parameters
  this.route.params
  .pipe(
    takeUntilDestroyed(this.destroyRef),
    switchMap((params: Params) => {
      // Get the alpaca from the alpaca service
      return this.alpacaService.getAlpaca(params['id'])
    })
  )
  .subscribe((alpaca: Alpaca) => {
      // Set the alpaca
      this.alpaca = alpaca;
      // Sire
      if (alpaca.sireId) {
        // Get the sire from the alpaca service
        this.alpacaService.getAlpaca(alpaca.sireId)
        .pipe(takeUntilDestroyed(this.destroyRef))
        .subscribe((sire: Alpaca) => {
          // Set the sire
          alpaca.sire = sire;
        })
      }
      // Dam
      if (alpaca.damId) {
        // Get the dam from the alpaca service
        this.alpacaService.getAlpaca(alpaca.damId)
        .pipe(takeUntilDestroyed(this.destroyRef))
        .subscribe((dam: Alpaca) => {
          // Set the dam
          alpaca.dam = dam;
        })
      }
      // Show results
      this.showresultService.getShowresultsByAlpacaId(alpaca.id)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe ((showresults: Showresult[]) => {
        // Set the show results
        alpaca.showresults = showresults;
      });
      // Fleeces
      this.fleeceService.getFleecesByAlpacaId(alpaca.id)
        .pipe(takeUntilDestroyed(this.destroyRef))
        .subscribe ((fleeces: Fleece[]) => {
          // Set the fleeces
          alpaca.fleeceresults = fleeces;
      });
      // Offspring
      if (this.alpaca.offspring.length > 0) {
        this.alpaca.offspring.forEach(o => {
          // Get the cria from the alpaca service
          this.alpacaService.getAlpaca(o.id)
          .pipe(takeUntilDestroyed(this.destroyRef))
          .subscribe ((cria: Alpaca) => {
            // Cria Sire
            if (cria.sireId) {
              //  Get the cria sire from the alpaca service
              this.alpacaService.getAlpaca(cria.sireId)
              .pipe(takeUntilDestroyed(this.destroyRef))
              .subscribe (alpaca => {
                // Set the cria sire
                cria.sire = alpaca;
              });
            }
            // Cria Dam
            if (cria.damId) {
              //  Get the cria dam from the alpaca service
              this.alpacaService.getAlpaca(cria.damId)
              .pipe(takeUntilDestroyed(this.destroyRef))
              .subscribe (alpaca => {
                // Set the cria dam
                cria.dam = alpaca;
              });
            }
            // Set the cria
            o.alpaca = cria;
        });
      });
    };
  });
  } 


  public getSafeHtml(html: string) {
    return this.sanitizer.bypassSecurityTrustHtml(html);
  }

  public navigateToPedegree(name: string): void {
    window.open(this.alpacaPedigreeUrl+name, '_blank');
  }

  public navigateToDetails(alpaca: Alpaca) {
    this.navigationService.goToAlpacaDetailPage(alpaca);
  }
}

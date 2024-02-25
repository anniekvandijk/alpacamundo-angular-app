import { Component, DestroyRef, OnInit, inject } from '@angular/core';
import { switchMap } from 'rxjs/operators';
import { Alpaca, Offspring } from '../alpaca.model';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { AlpacaService } from 'src/app/features/alpacas/alpaca.service';
import { Configuration } from 'src/app/shared/configuration/configuration.model';
import { CONFIGURATION } from 'src/app/shared/configuration/configuration.token';
import { FleeceService } from 'src/app/features/alpacas/fleece.service';
import { Fleece } from 'src/app/features/alpacas/fleece.model';
import { ShowresultService } from 'src/app/features/alpacas/showresult.service';
import { Showresult } from 'src/app/features/alpacas/showresult.model';
import { DomSanitizer } from '@angular/platform-browser';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { SpinnerComponent } from 'src/app/shared/features/pageloader/spinner.component';
import { CommonModule } from '@angular/common';
import { AlpacaShowresultsComponent } from './alpaca-showresults/alpaca-showresults.component';
import { AlpacaFleeceresultsComponent } from './alpaca-fleeceresults/alpaca-fleeceresults.component';
import { AlpacaOffspringCardComponent } from './alpaca-offspring-card/alpaca-offspring-card.component';
import { HttploaderComponent } from 'src/app/shared/features/pageloader/httploader.component';

@Component({
  selector: 'app-alpaca-details',
  standalone: true,
  imports: [
    CommonModule,
    AlpacaShowresultsComponent,
    AlpacaFleeceresultsComponent,
    AlpacaOffspringCardComponent,
    SpinnerComponent,
    HttploaderComponent
  ],
  templateUrl: './alpaca-details.component.html',
  styleUrls: ['./alpaca-details.component.scss']
})
export class AlpacaDetailsComponent extends HttploaderComponent implements OnInit {
  private readonly destroyRef = inject(DestroyRef);
  private configuration: Configuration = inject(CONFIGURATION);
  private alpacaService = inject(AlpacaService);
  private showresultService = inject(ShowresultService);
  private fleeceService = inject(FleeceService);
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
    }
  });
  } 

  sortOffspringByBirthYear(alpacaOffspring : Offspring[]) : Offspring[] {
    return alpacaOffspring.sort(function (a, b) {
      return a.alpaca.dateOfBirth.getFullYear() - b.alpaca.dateOfBirth.getFullYear();
    })
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

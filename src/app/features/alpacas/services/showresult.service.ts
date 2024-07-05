import { DestroyRef, Injectable, inject } from '@angular/core';
import { Observable, forkJoin, map } from 'rxjs';
import { Showresult } from '../models/showresult.model';
import { AlpacashowService } from './alpacashow.service';
import { Alpacashow } from '../models/alpacashow.model';
import { AlpacaService } from './alpaca.service';
import { Alpaca } from '../models/alpaca.model';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { environment } from 'src/environments/environment';
import { switchMap } from 'rxjs/operators';
import { HttpService } from 'src/app/shared/services/http-service';

@Injectable({
  providedIn: 'root'
})
export class ShowresultService {
  readonly componentId = this.constructor.name;
  private destroyRef = inject(DestroyRef);
  private httpService = inject(HttpService);
  private alpacashowService = inject(AlpacashowService);
  private alpacaService = inject(AlpacaService);
  private url = `${environment.apiBaseUrl}/api/showresults`;

  getShowresults(componentId: string): Observable<Showresult[]> {
    return this.httpService.get<Showresult[]>(this.url, componentId);
  }

  // TODO Backend call
  getShowresultsByAlpacaId(alpacaId: string, componentId: string): Observable<Showresult[]> {
    return this.getShowresults(componentId).pipe(
      takeUntilDestroyed(this.destroyRef),
      map(f => f.filter(f => f.alpacaId === alpacaId)),
      switchMap((showresults: Showresult[]) => {
        const alpacashowObservables = showresults.map(showresult =>
          this.alpacashowService.getAlpacashowById(showresult.alpacashowId, componentId).pipe(
            takeUntilDestroyed(this.destroyRef),
            map((show: Alpacashow | null) => {
              if (show) showresult.alpacashow = show;
              return showresult;
            })
          )
        );
        return forkJoin(alpacashowObservables);
      })
    );
  }

  // TODO Backend call
  getShowresultsByAlpacashowId(showId: string, componentId: string): Observable<Showresult[]> {
    return this.getShowresults(componentId).pipe(
      takeUntilDestroyed(this.destroyRef),
      map(f => f.filter(f => f.alpacashowId === showId)),
      map((showresults: Showresult[]) => {
        showresults.forEach(showresult => {
          this.alpacaService.getAlpaca(showresult.alpacaId, componentId)
            .pipe(takeUntilDestroyed(this.destroyRef))
            .subscribe((alpaca: Alpaca | null) => {
              if (alpaca) showresult.alpaca = alpaca;
            } 
          );
        });
        return showresults;
      })
      
    );
  }
}

import { DestroyRef, Injectable, inject } from '@angular/core';
import { Observable, forkJoin, map } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Showresult } from './showresult.model';
import { AlpacashowService } from './alpacashow.service';
import { Alpacashow } from './alpacashow.model';
import { AlpacaService } from './alpaca.service';
import { Alpaca } from './alpaca.model';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { environment } from 'src/environments/environment';
import { switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ShowresultService {
  componentId = this.constructor.name;
  readonly destroyRef = inject(DestroyRef);
  private http = inject(HttpClient);
  private alpacashowService = inject(AlpacashowService);
  private alpacaService = inject(AlpacaService);
  private url = `${environment.apiBaseUrl}/api/showresults`;

  public getShowresults(componentId: string): Observable<Showresult[]> {
    return this.http.get<Showresult[]>(this.url, { headers: new HttpHeaders().set('X-ComponentId', componentId) });
  }

  public getShowresultsByAlpacaId(alpacaId: string, componentId: string): Observable<Showresult[]> {
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

  public getShowresultsByAlpacashowId(showId: string, componentId: string): Observable<Showresult[]> {
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

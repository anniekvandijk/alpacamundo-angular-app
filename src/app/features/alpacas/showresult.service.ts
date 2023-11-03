import { DestroyRef, Injectable, inject } from '@angular/core';
import { Observable, map } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Showresult } from './showresult.model';
import { AlpacashowService } from './alpacashow.service';
import { Alpacashow } from './alpacashow.model';
import { AlpacaService } from './alpaca.service';
import { Alpaca } from './alpaca.model';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ShowresultService {
  readonly destroyRef = inject(DestroyRef);
  private http = inject(HttpClient);
  private alpacashowService = inject(AlpacashowService);
  private alpacaService = inject(AlpacaService);
  private url = `${environment.apiBaseUrl}/api/showresults`;

  public getShowresults(): Observable<Showresult[]> {
    return this.http.get<Showresult[]>(this.url);
  }

  public getShowresultsByAlpacaId(alpacaId: string): Observable<Showresult[]> {
    return this.getShowresults().pipe(
      takeUntilDestroyed(this.destroyRef),
      map(f => f.filter(f => f.alpacaId === alpacaId)),
      map((showresults: Showresult[]) => {
        showresults.forEach(showresult => {
          this.alpacashowService.getAlpacashowById(showresult.alpacashowId)
          .pipe(takeUntilDestroyed(this.destroyRef))
            .subscribe((show: Alpacashow | null) => {
              if (show) showresult.alpacashow = show;
            } 
          );
        });
        return showresults;
      })
    );
  }

  public getShowresultsByAlpacashowId(showId: string): Observable<Showresult[]> {
    return this.getShowresults().pipe(
      takeUntilDestroyed(this.destroyRef),
      map(f => f.filter(f => f.alpacashowId === showId)),
      map((showresults: Showresult[]) => {
        showresults.forEach(showresult => {
          this.alpacaService.getAlpaca(showresult.alpacaId)
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

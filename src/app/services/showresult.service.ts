import { DestroyRef, Injectable, inject } from '@angular/core';
import { Observable, filter, map, take, tap } from 'rxjs';
import { HttpService } from './http.service';
import { Showresult } from '../models/showresult';
import { AlpacashowService } from './alpacashow.service';
import { Alpacashow } from '../models/alpacashow';
import { AlpacaService } from './alpaca.service';
import { Alpaca } from '../models/alpaca';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Injectable({
  providedIn: 'root'
})
export class ShowresultService {
  readonly destroyRef = inject(DestroyRef);

  constructor(
    private http: HttpService,
    private alpacashowService: AlpacashowService,
    private alpacaService: AlpacaService
    ) { }

  private url = 'api/showresults';

  getShowresults(): Observable<Showresult[]> {
    return this.http.get<Showresult[]>(this.url);
  }

  getShowresultsByAlpacaId(alpacaId: string): Observable<Showresult[]> {
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

  getShowresultsByAlpacashowId(showId: string): Observable<Showresult[]> {
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

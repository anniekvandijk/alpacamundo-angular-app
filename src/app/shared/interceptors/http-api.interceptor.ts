import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { EMPTY, Observable, of } from 'rxjs';
import { catchError, finalize, tap } from 'rxjs/operators';
import { HttpStatusService } from '../services/http-status.service';
import { ErrorService } from '../services/error.service';
import { CacheService } from '../services/cache.service';

@Injectable()
export class HttpApiInterceptor implements HttpInterceptor {

  private httpStatusService = inject(HttpStatusService);
  private errorService = inject(ErrorService);
  private cacheService = inject(CacheService);

  public intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {

    if (!this.isCachable(req)) {
      return this.sentRequest(req, next);
    }

    const cachedResponse = this.cacheService.getCache(req.url);
    if (!cachedResponse) {
      return this.sentRequest(req, next);
    }

    return of(cachedResponse)
  }

  private isCachable(req: HttpRequest<any>) {
    return req.method === 'GET';
  }

  private sentRequest(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> { 
    
    this.httpStatusService.isLoading.next(true);

    return next.handle(req).pipe(
      tap((event) => {
        if (this.isCachable(req)) {
          this.cacheService.setCache(req.url, event, new Date())
        }
      }),
      catchError((err) => {
        this.errorService.handleError(req.url, err);
        return EMPTY;
      }),
      finalize(() => {
        this.httpStatusService.isLoading.next(false);
      })
    );

  }
}

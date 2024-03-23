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
export class HttpApiInterceptor<T> implements HttpInterceptor {

  private httpStatusService = inject(HttpStatusService);
  private errorService = inject(ErrorService);
  private cacheService = inject(CacheService);

  public intercept(
    req: HttpRequest<T>,
    next: HttpHandler
  ): Observable<HttpEvent<T>> {

    const componentId: string = req.headers.get('X-ComponentId') || '';
    const cacheKey = `${req.url}__${componentId}`;

    if (!this.isCachable(req)) {
      return this.sentRequest(req, cacheKey, next, componentId);
    }
    
    const cachedResponse = this.cacheService.getCache(cacheKey);
    if (!cachedResponse) {
      return this.sentRequest(req, cacheKey, next, componentId);
    }

    return of(cachedResponse)
  }

  private isCachable(req: HttpRequest<T>) {
    // Only cache GET requests that are not admin requests
    return req.method === 'GET' && !(req.url.includes('admin'));
  }

  private sentRequest(req: HttpRequest<T>, cacheKey: string, next: HttpHandler, componentId: string): Observable<HttpEvent<T>> { 
    const loadingState = this.httpStatusService.getLoadingState(componentId);
    loadingState.next(true);

    return next.handle(req).pipe(
      tap((event) => {
        if (this.isCachable(req)) {
          this.cacheService.setCache(cacheKey, event, new Date())
        }
      }),
      catchError((err) => {
        this.errorService.handleError(req.url, err);
        return EMPTY;
      }),
      finalize(() => {
        loadingState.next(false);
      })
    );

  }
}

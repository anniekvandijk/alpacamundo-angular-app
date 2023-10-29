import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EMPTY, Observable } from 'rxjs';
import { catchError, finalize } from 'rxjs/operators';
import { HttpStatusService } from '../services/http-status.service';
import { ErrorService } from '../services/error.service';

@Injectable()
export class HttpApiInterceptor implements HttpInterceptor {
  constructor(private status: HttpStatusService, private errorService: ErrorService) {}

  public intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {

    this.status.startRequest(req.url);

    return next.handle(req).pipe(
      catchError((err) => {
        this.errorService.handleError(req.url, err);
        return EMPTY;
      }),
      finalize(() => {
        this.status.endRequest(req.url);
      })
    );
  }
}

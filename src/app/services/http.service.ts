import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { catchError, finalize, tap } from 'rxjs/operators';
import { ErrorService } from './error.service';
import { HttpStatusService } from './http-status.service';

@Injectable({
  providedIn: 'root',
})
export class HttpService {
  constructor(
    private http: HttpClient,
    private status: HttpStatusService,
    private errorService: ErrorService
  ) {}

  public get<T>(url: string, headers?: HttpHeaders): Observable<T> {
    this.status.startRequest(url);
    return this.http.get<T>(url, { headers }).pipe(
      catchError((error) => {
        this.errorService.handleError('GET request', error);
        return of([] as T);	
      }),
      finalize(() => this.status.endRequest(url))
    );
  }

  public getbyId<T>(url: string, id: string, headers?: HttpHeaders): Observable<T> {
    const fullUrl = url + '/' + id;
    this.status.startRequest(url);
    return this.http.get<T>(fullUrl, { headers }).pipe(
      catchError((error) => {
        this.errorService.handleError('GET request', error);
        return of({} as T);	
      }),
      finalize(() => this.status.endRequest(fullUrl))
    );
  }

  public post<T>(url: string, data: any, headers?: HttpHeaders): Observable<T> {
    this.status.startRequest(url);
    return this.http.post<T>(url, data, { headers }).pipe(
      catchError((error) => {
        this.errorService.handleError('POST request', error);
        return of({} as T);	
      }),
      finalize(() => this.status.endRequest(url))
    );
  }

  public put<T>(url: string, data: any, headers?: HttpHeaders): Observable<T> {
    this.status.startRequest(url);
    return this.http.put<T>(url, data, { headers }).pipe(
      catchError((error) => {
        this.errorService.handleError('PUT request', error);
        return of({} as T);	
      }),
      finalize(() => this.status.endRequest(url))
    );
  }

  public delete<T>(url: string, headers?: HttpHeaders): Observable<T> {
    this.status.startRequest(url);
    return this.http.delete<T>(url, { headers }).pipe(
      catchError((error) => {
        this.errorService.handleError('DELETE request', error);
        return of({} as T);	
      }),
      finalize(() => this.status.endRequest(url))
    );
  }
}

import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { MessageService } from './message.service';
import { ErrorService } from './error.service';

@Injectable({
  providedIn: 'root',
})
export class HttpService {
  constructor(
    private http: HttpClient,
    private messageService: MessageService,
    private errorService: ErrorService
  ) {}

  get<T>(url: string, headers?: HttpHeaders): Observable<T> {
    return this.http.get<T>(url, { headers }).pipe(
      tap(_ => this.messageService.add(``)),
      catchError((error) => {
        console.error('Error in GET request:', error);
        this.errorService.handleError<T>('get')
        return throwError(() => new Error(error))
      })
    );
  }

  post<T>(url: string, data: any, headers?: HttpHeaders): Observable<T> {
    return this.http.post<T>(url, data, { headers }).pipe(
      catchError((error) => {
        console.error('Error in POST request:', error);
        return throwError(() => new Error(error))
      })
    );
  }

  put<T>(url: string, data: any, headers?: HttpHeaders): Observable<T> {
    return this.http.put<T>(url, data, { headers }).pipe(
      catchError((error) => {
        console.error('Error in PUT request:', error);
        return throwError(() => new Error(error))
      })
    );
  }

  delete<T>(url: string, headers?: HttpHeaders): Observable<T> {
    return this.http.delete<T>(url, { headers }).pipe(
      catchError((error) => {
        console.error('Error in DELETE request:', error);
        return throwError(() => new Error(error))
      })
    );
  }
}

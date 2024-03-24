import { HttpClient, HttpHeaders, HttpResponse } from "@angular/common/http";
import { Injectable, inject } from "@angular/core";
import { Observable, map } from "rxjs";

@Injectable({
    providedIn : 'root'
})
export class HttpService {

  private http = inject(HttpClient);

  public get<T>(url: string, componentId: string): Observable<T> {
    return this.http.get(
      url, 
      { 
        headers: new HttpHeaders().set('X-ComponentId', componentId),
        observe: 'response' 
      })
      .pipe(
        map(
          (response: HttpResponse<object>) => { 
            return response.body as T;
          } 
        )
      )
  }

  public post<T>(url: string, data: T, componentId: string): Observable<boolean> {
    return this.http.post(
      url, 
      data, 
      { 
        headers: new HttpHeaders().set('X-ComponentId', componentId),
        observe: 'response' 
      }
    )
    .pipe(
      map(
        (response: HttpResponse<object>) => { 
          return response.ok
        }
      )
    )
  }

  public put<T>(url: string, data: T, componentId: string): Observable<boolean> {
    return this.http.put(
      url, 
      data, 
      { 
        headers: new HttpHeaders().set('X-ComponentId', componentId),
        observe: 'response' 
      }
    )
    .pipe(
      map(
        (response: HttpResponse<object>) => { 
          return response.ok
        } 
      )
    )
  }

  public delete(url: string, componentId: string): Observable<boolean> {
    return this.http.delete(
      url, 
      { 
        headers: new HttpHeaders().set('X-ComponentId', componentId),
        observe: 'response' 
      }
    )
    .pipe(
      map(
        (response: HttpResponse<object>) => { 
          return response.ok
        } 
      )
    )
  }
}


import { HttpClient, HttpHeaders, HttpResponse } from "@angular/common/http";
import { Injectable, inject } from "@angular/core";
import { Observable, map } from "rxjs";
import { HttpServiceResponse } from "../models/http-service-response.model";

@Injectable({
    providedIn : 'root'
})
export class HttpService {

  private http = inject(HttpClient);

  public get(url: string, componentId: string): Observable<HttpServiceResponse> {
    return this.http.get(
      url, 
      { 
        headers: new HttpHeaders().set('X-ComponentId', componentId),
        observe: 'response' 
      })
      .pipe(
        map(
          (response: HttpResponse<object>) => { 
            return {
              body: response.body,
              status: response.status,
              ok: response.ok,
            };
          } 
        )
      )
  }

  public post<T>(url: string, data: T, componentId: string): Observable<HttpServiceResponse> {
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
          return {
            body: response.body,
            status: response.status,
            ok: response.ok,
          };
        } 
      )
    )
  }

  public put<T>(url: string, data: T, componentId: string): Observable<HttpServiceResponse> {
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
          return {
            body: response.body,
            status: response.status,
            ok: response.ok,
          };
        } 
      )
    )
  }

  public delete(url: string, componentId: string): Observable<HttpServiceResponse> {
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
          return {
            body: response.body,
            status: response.status,
            ok: response.ok,
          };
        } 
      )
    )
  }
}


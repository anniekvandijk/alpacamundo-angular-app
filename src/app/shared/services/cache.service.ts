import { HttpEvent } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root',
  })
export class CacheService<T> {

  private cache = new Map();
  private expiry: number;

  constructor() {
    this.expiry = environment.cacheLifetime;
}

  public getCache(url: string): HttpEvent<T> | undefined {
    const result = this.cache.get(url);

    if (!result) {
      return undefined;
    }

    const response: HttpEvent<T> = result.response;
    const resDate: Date = result.date;

    if (Date.now() - resDate.getTime() > this.expiry) {
      this.deleteCache(url);
      return undefined;
    }

    return response;
  }

  public setCache(url: string, response: HttpEvent<T>, date: Date): void {
    this.cache.set(url, { response, date });
  }

  private deleteCache(url: string): void {
    this.cache.delete(url);
  }
}
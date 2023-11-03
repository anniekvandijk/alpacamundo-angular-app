import { HttpEvent } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root',
  })
export class CacheService {
  private cache = new Map();
  private expiry: number = 10000; // 10sec

  public getCache(url: string): HttpEvent<any> | undefined {
    let result = this.cache.get(url);

    if (!result) {
      return undefined;
    }

    let response: HttpEvent<any> = result.response;
    let resDate: Date = result.date;

    if (Date.now() - resDate.getTime() > this.expiry) {
      this.deleteCache(url);
      return undefined;
    }

    return response;
  }

  public setCache(url: string, response: HttpEvent<any>, date: Date): void {
    this.cache.set(url, { response, date });
  }

  private deleteCache(url: string): void {
    this.cache.delete(url);
  }
}
import { Injectable } from "@angular/core";

export enum WebStorageType {
  LOCAL_STORAGE = "localStorage",
  SESSION_STORAGE = "sessionStorage",
}

@Injectable({
  providedIn: "root",
})
export class WebStorageService {

  public setItem(key: string, value: string, webStorageType: WebStorageType): void {
    if (webStorageType === WebStorageType.LOCAL_STORAGE) {
      localStorage.setItem(key, value);
    }
    else if (webStorageType === WebStorageType.SESSION_STORAGE) {
      sessionStorage.setItem(key, value);
    }
    else {
      throw new Error("Invalid webstorageType");
    }
  }

  public getItem(key: string, webStorageType: WebStorageType): string | null {
    if (webStorageType === WebStorageType.LOCAL_STORAGE) {
      const item =  localStorage.getItem(key);
      if (item) return item;
      else return null;
    }
    else if (webStorageType === WebStorageType.SESSION_STORAGE) {
      const item = sessionStorage.getItem(key);
      if (item) return item;
      else return null;
    }
    else {
      throw new Error("Invalid webstorageType");
    }
  }
}
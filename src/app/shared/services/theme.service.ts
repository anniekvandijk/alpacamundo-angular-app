import { Injectable, inject } from '@angular/core';
import { WebStorageService, WebStorageType } from './web-storage.service';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  private darkMode!: boolean;
  private webStorageService = inject(WebStorageService);

  isDarkMode() {
    // fist check if darkmode is set in session storage
    const darkmode = this.webStorageService.getItem('darkMode', WebStorageType.SESSION_STORAGE);
    if (darkmode) {
      if (darkmode === 'true') this.setDarkMode();
      if (darkmode === 'false') this.setLightMode();
    }
    // then check if darkmode is set in the OS
    if (this.darkMode === undefined) {
      if (this.prefersDarkColorSchemeDark()) this.setDarkMode();
      else this.setLightMode();
    }
    return this.darkMode;
  }

  toggleColorMode(setDarkMode: boolean) {
    this.darkMode = setDarkMode;
    if (setDarkMode) this.setDarkMode();
    else this.setLightMode();
  }

  private prefersDarkColorSchemeDark() {
  return window &&
    window.matchMedia &&
    window.matchMedia('(prefers-color-scheme: dark)').matches;
  }

  private setDarkMode() {
    document.body.classList.add('dark-theme');
    document.body.classList.remove('light-theme');
    this.webStorageService.setItem('darkMode', 'true', WebStorageType.SESSION_STORAGE);
    this.darkMode = true;
  }

  private setLightMode() {
    document.body.classList.add('light-theme');
    document.body.classList.remove('dark-theme');
    this.webStorageService.setItem('darkMode', 'false', WebStorageType.SESSION_STORAGE);
    this.darkMode = false;
  }

}
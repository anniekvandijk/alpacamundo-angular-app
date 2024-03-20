import { Injectable, OnDestroy, inject } from '@angular/core';
import { WebStorageService, WebStorageType } from './web-storage.service';

@Injectable({
  providedIn: 'root',
})
export class ThemeService implements OnDestroy {
  private darkMode!: boolean;
  private webStorageService = inject(WebStorageService);
  private darkModeMediaQuery: MediaQueryList;

  constructor() {
    this.darkModeMediaQuery = this.prefersDarkMode();
    this.darkModeMediaQuery.addEventListener('change', this.darkModeChangeHandler.bind(this));
  }


  ngOnDestroy() {
    this.darkModeMediaQuery.removeEventListener('change', this.darkModeChangeHandler.bind(this));
  }

  isDarkMode() {
    // fist check if darkmode is set in session storage
    const darkmode = this.webStorageService.getItem('darkMode', WebStorageType.SESSION_STORAGE);
    if (darkmode) {
      if (darkmode === 'true') this.setDarkMode();
      if (darkmode === 'false') this.setLightMode();
    }
    // then check if darkmode is set in the OS
    if (this.darkMode === undefined) {
      if (this.prefersDarkMode().matches) this.setDarkMode();
      else this.setLightMode();
    }
    return this.darkMode;
  }

  toggleColorMode(setDarkMode: boolean) {
    this.darkMode = setDarkMode;
    if (setDarkMode) this.setDarkMode();
    else this.setLightMode();
  }

  private prefersDarkMode() {
  return window &&
    window.matchMedia &&
    window.matchMedia('(prefers-color-scheme: dark)');
  }

  private darkModeChangeHandler(event: MediaQueryListEvent) {
    if (event.matches) this.setDarkMode();
    else this.setLightMode();
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
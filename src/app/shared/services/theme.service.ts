import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  private darkMode!: boolean;

  isDarkMode() {
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
    this.darkMode = true;
  }

  private setLightMode() {
    document.body.classList.add('light-theme');
    document.body.classList.remove('dark-theme');
    this.darkMode = false;
  }

}
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  private darkMode!: boolean;

  isDarkMode() {
    if (this.darkMode === undefined) {
      if (window.matchMedia('(prefers-color-scheme: dark)'))
      {
        document.body.classList.add('dark-theme');
        this.setDarkMode(true);
      }
      else if (window.matchMedia('(prefers-color-scheme: light)'))
      {
        document.body.classList.add('light-theme');
        this.setDarkMode(false);
      }
      else {
        this.setDarkMode(false);
      }
    }
    return this.darkMode;
  }

  setDarkMode(isDarkMode: boolean) {
    this.darkMode = isDarkMode;
    if (isDarkMode) {
      document.body.classList.add('dark-theme');
      document.body.classList.remove('light-theme');
    } else {
      document.body.classList.add('light-theme');
      document.body.classList.remove('dark-theme');
    }
  }
}
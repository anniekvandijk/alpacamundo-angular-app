import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { ThemeService } from 'src/app/shared/services/theme.service';

@Component({
  selector: 'app-light-dark-mode-toggle',
  standalone: true,
  imports: [
    MatButtonModule,
    MatIconModule,
    MatTooltipModule
  ],
  templateUrl: './light-dark-mode-toggle.component.html',
  styleUrl: './light-dark-mode-toggle.component.scss',
})
export class LightDarkModeToggleComponent {

  isDarkMode: boolean;

  constructor(private themeService: ThemeService) {
    this.isDarkMode = this.themeService.isDarkMode();
  }

  toggleTheme() {
    this.isDarkMode = !this.isDarkMode; 
    this.themeService.toggleColorMode(this.isDarkMode);
  }
}

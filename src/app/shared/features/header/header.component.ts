import { Component } from '@angular/core';
import { MenuComponent } from './menu/menu.component';
import { environment } from 'src/environments/environment';
import { CommonModule } from '@angular/common';
import { UsermenuComponent } from './usermenu/usermenu.component';
import { LightDarkModeToggleComponent } from './light-dark-mode-toggle/light-dark-mode-toggle.component';

@Component({
  selector: 'app-header',
  standalone: true,
  imports : [
    CommonModule,    
    MenuComponent,
    UsermenuComponent,
    LightDarkModeToggleComponent
  ],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  environment = environment;
}

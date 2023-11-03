import { Component } from '@angular/core';
import { MenuComponent } from './menu/menu.component';
import { environment } from 'src/environments/environment';
import { CommonModule } from '@angular/common';
import { UsermenuComponent } from './usermenu/usermenu.component';

@Component({
  selector: 'app-header',
  standalone: true,
  imports : [
    CommonModule,    
    MenuComponent,
    UsermenuComponent
  ],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  environment = environment;
}

import { Component } from '@angular/core';
import { MenuComponent } from './menu/menu.component';
import { environment } from 'src/environments/environment';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'header',
  standalone: true,
  imports : [
    CommonModule,    
    MenuComponent
  ],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  environment = environment;
}

import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'footer',
  standalone: true,
  imports: [
    RouterModule
  ],
  template: `
  <div class="footer-text">© Copyright 2023 Alpacamundo - <a routerLink="/login" title="Login" rel="login">login</a></div>
  `
})
export class FooterComponent {

}

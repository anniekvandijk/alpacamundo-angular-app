import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule, MatMenuTrigger } from '@angular/material/menu';
import { RouterModule } from '@angular/router';
import { LightDarkModeToggleComponent } from '../light-dark-mode-toggle/light-dark-mode-toggle.component';

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [
    MatMenuModule,
    MatButtonModule,
    RouterModule,
    LightDarkModeToggleComponent
  ],
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent {

  private enteredButton = false;
  private isMatMenuOpen = false;

  dropdownMenuEnter() {
    this.isMatMenuOpen = true;
  }

  dropdownMenuLeave(trigger: MatMenuTrigger) {
    setTimeout(() => {
      if (!this.enteredButton) {
        this.isMatMenuOpen = false;
        trigger.closeMenu();
      } else {
        this.isMatMenuOpen = false;
      }
    }, 80)
  }

  menuButtonEnter(trigger: MatMenuTrigger) {
    setTimeout(() => {
        trigger.openMenu();
    })
  }

  menuButtonLeave(trigger: MatMenuTrigger) {
    setTimeout(() => {
      if (this.enteredButton && !this.isMatMenuOpen) {
        trigger.closeMenu();
      } if (!this.isMatMenuOpen) {
        trigger.closeMenu();
      } else {
        this.enteredButton = false;
      }
    }, 100)
  }

}

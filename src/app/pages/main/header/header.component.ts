import { Component } from '@angular/core';
import { MenuComponent } from './menu/menu.component';
import { environment } from 'src/environments/environment';
import { CommonModule } from '@angular/common';
import { UserService } from 'src/app/services/user.service';
import { tap } from 'rxjs';
import { UsermenuComponent } from './usermenu/usermenu.component';

@Component({
  selector: 'header',
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
  isUserLoggedIn: boolean = false;
  environment = environment;

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.userService.isUserLoggedIn
    .subscribe(value => {
      this.isUserLoggedIn = value;
    });
  }
}

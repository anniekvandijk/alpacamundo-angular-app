import { Component } from '@angular/core';
import { UserComponent } from './user/user.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-main',
  standalone: true,
  imports: [UserComponent],
  templateUrl: './admin-main.component.html',
  styleUrl: './admin-main.component.scss'
})
export class AdminMainComponent {

  constructor(router: Router) {
    console.log(router.routerState.snapshot.url);
   }

}

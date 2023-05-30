import { CommonModule } from '@angular/common';
import { Component, DestroyRef, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';
import { AccountInfo } from '@azure/msal-browser';
import { Observable } from 'rxjs';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-usermenu',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatButtonModule
  ],
  templateUrl: './usermenu.component.html',
  styleUrls: ['./usermenu.component.scss']
})
export class UsermenuComponent {
  private destroyRef = inject(DestroyRef);
  isUserLoggedIn$!: Observable<boolean>;
  user!: AccountInfo;

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.isUserLoggedIn$ = this.userService.isUserLoggedIn;
    this.userService.account
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(account => {
        this.user = account;
    });
  }

}

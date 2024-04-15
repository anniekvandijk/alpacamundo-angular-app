import { CommonModule } from '@angular/common';
import { Component, DestroyRef, OnInit, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';
import { AccountInfo } from '@azure/msal-browser';
import { Observable, tap } from 'rxjs';
import { UserService } from 'src/app/shared/services/user.service';

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
export class UsermenuComponent implements OnInit {
  private destroyRef = inject(DestroyRef);
  private userService = inject(UserService);
  isUserLoggedIn$!: Observable<boolean>;
  activeAccount$!: Observable<AccountInfo>;
  account!: AccountInfo;


  ngOnInit(): void {
    this.isUserLoggedIn$ = this.userService.isUserLoggedIn;
    this.activeAccount$ = this.userService.activeAccount;
    this.userService.activeAccount.pipe(
      takeUntilDestroyed(this.destroyRef)
    ).subscribe(
      (activeAccount: AccountInfo) => {
        this.account = activeAccount;
      }
    );
  }


}

import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';
import { AccountInfo } from '@azure/msal-browser';
import { Observable, tap } from 'rxjs';
import { UserService } from 'src/app/features/users/user.service';

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
  private userService = inject(UserService);
  public isUserLoggedIn$!: Observable<boolean>;
  public activeAccount$!: Observable<AccountInfo>;
  public account!: AccountInfo;


  ngOnInit(): void {
    this.isUserLoggedIn$ = this.userService.isUserLoggedIn;
    this.activeAccount$ = this.userService.activeAccount;
    this.userService.activeAccount.pipe(
      tap((activeAccount: AccountInfo) => { 
      //  console.log('activeAccount', activeAccount);
      }),
    ).subscribe(
      (activeAccount: AccountInfo) => {
        this.account = activeAccount;
      }
    );
  }


}

import { CommonModule } from '@angular/common';
import { Component, DestroyRef, Inject, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MSAL_GUARD_CONFIG, MsalBroadcastService, MsalGuardConfiguration, MsalService } from '@azure/msal-angular';
import { InteractionStatus, RedirectRequest } from '@azure/msal-browser';
import { environment } from 'src/environments/environment';
import { MatButtonModule } from '@angular/material/button';
import { filter } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'footer',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    RouterModule
  ],
  template: `
  <div class="footer-text">© Copyright 2023 Alpacamundo - 
    <a *ngIf="!isUserLoggedIn" (click)="login()" title="Login" rel="login">login here</a>
    <a *ngIf="isUserLoggedIn" (click)="logout()" title="Logout" rel="logout">logout</a>
  </div>
  `,
  
})
export class FooterComponent {
  private destroyRef = inject(DestroyRef);
  isUserLoggedIn: boolean = false;

  constructor(
    private authService: MsalService, 
    private msalBroadcastService: MsalBroadcastService, 
    private userService: UserService,
    @Inject(MSAL_GUARD_CONFIG) private msalGuardConfig: MsalGuardConfiguration) { }

  ngOnInit() {	
    this.msalBroadcastService.inProgress$.pipe(
      filter((interactionStatus: InteractionStatus) => interactionStatus == InteractionStatus.None),
      takeUntilDestroyed(this.destroyRef)
    ).subscribe(() => {
      const activeAccount = this.authService.instance.getActiveAccount();
      if (activeAccount) {
        this.isUserLoggedIn = true;
        this.userService.account.next(activeAccount);
        this.userService.isUserLoggedIn.next(this.isUserLoggedIn);
        this.userService.isUserLoggedIn
          .pipe(takeUntilDestroyed(this.destroyRef))
          .subscribe(value => { this.isUserLoggedIn = value; })
      }
    });
  }

  login() {
    if(this.msalGuardConfig.authRequest) {
      this.authService.loginRedirect({...this.msalGuardConfig.authRequest} as RedirectRequest);
    }
    else {
      this.authService.loginRedirect();
    }
  }

  logout() {
    this.authService.logoutRedirect({postLogoutRedirectUri:environment.postLogoutRedirectUrl});
  }
}

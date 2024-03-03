import { CommonModule } from '@angular/common';
import { Component, DestroyRef, Inject, OnInit, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MSAL_GUARD_CONFIG, MsalBroadcastService, MsalGuardConfiguration, MsalService } from '@azure/msal-angular';
import { InteractionStatus, RedirectRequest } from '@azure/msal-browser';
import { environment } from 'src/environments/environment';
import { MatButtonModule } from '@angular/material/button';
import { filter } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { UserService } from 'src/app/features/users/user.service';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const project = require('../../../../../package.json');

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    RouterModule
  ],
  template: `
  <div class="footer-text">© Copyright 2024 Alpacamundo - v{{getProjectVersion()}}
    <ng-container *ngIf="!isUserLoggedIn; else loggedIn">
      <a role="button" (click)="login()" (keydown)="login()" title="Login" rel="login" tabindex="0" style="cursor: pointer;">login here</a>
    </ng-container>
    <ng-template #loggedIn>
      <a role="button" (click)="logout()" (keydown)="login()" title="Logout" rel="logout" tabindex="0" style="cursor: pointer;">logout</a>
    </ng-template> 
  `,
  
})
export class FooterComponent implements OnInit {
  private destroyRef = inject(DestroyRef);
  public isUserLoggedIn = false;

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
        this.userService.isUserLoggedIn.next(this.isUserLoggedIn);
        this.userService.activeAccount.next(activeAccount);
      }
    });
  }

  public getProjectVersion() : string {
    return project.version;
  }

  public login() : void {
    if(this.msalGuardConfig.authRequest) {
      this.authService.loginRedirect({...this.msalGuardConfig.authRequest} as RedirectRequest);
    }
    else {
      this.authService.loginRedirect();
    }
  }

  public logout() : void {
    this.authService.logoutRedirect({postLogoutRedirectUri:environment.postLogoutRedirectUrl});
  }
}

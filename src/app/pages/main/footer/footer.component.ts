import { CommonModule } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MSAL_GUARD_CONFIG, MsalGuardConfiguration, MsalService } from '@azure/msal-angular';
import { RedirectRequest } from '@azure/msal-browser';
import { environment } from 'src/environments/environment';
import { MatButtonModule } from '@angular/material/button';

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
    <a mat-button *ngIf="!isUserLoggedIn" (click)="login()" title="Login" rel="login">login here</a>
    <a mat-button *ngIf="isUserLoggedIn" (click)="logout()" title="Logout" rel="logout">logout</a>
  </div>
  `,
  
})
export class FooterComponent {
  isUserLoggedIn: boolean = false;

  constructor(
    private authService: MsalService, 
    @Inject(MSAL_GUARD_CONFIG) private msalGuardConfig: MsalGuardConfiguration) { }

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

import { CommonModule } from '@angular/common';
import { Component, DestroyRef, Inject, OnInit, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MSAL_GUARD_CONFIG, MsalBroadcastService, MsalGuardConfiguration, MsalService } from '@azure/msal-angular';
import { InteractionStatus, RedirectRequest } from '@azure/msal-browser';
import { environment } from 'src/environments/environment';
import { MatButtonModule } from '@angular/material/button';
import { filter } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { UserService } from 'src/app/shared/services/user.service';
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
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss'
})
export class FooterComponent implements OnInit {
  private destroyRef = inject(DestroyRef);
  private authService = inject(MsalService);
  private msalBroadcastService = inject(MsalBroadcastService);
  private userService = inject(UserService);
  isUserLoggedIn = false;

  // TODO - replace this @Inject with inject
  constructor(
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

  getProjectVersion() : string {
    return project.version;
  }

  login() : void {
    if(this.msalGuardConfig.authRequest) {
      this.authService.loginRedirect({...this.msalGuardConfig.authRequest} as RedirectRequest);
    }
    else {
      this.authService.loginRedirect();
    }
  }

  logout() : void {
    this.authService.logoutRedirect({postLogoutRedirectUri:environment.postLogoutRedirectUrl});
  }
}

import { Component, DestroyRef, inject } from '@angular/core';
import { UserService } from './services/user.service';
import { InteractionStatus } from '@azure/msal-browser';
import { filter } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { MsalBroadcastService, MsalService } from '@azure/msal-angular';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Alpacamundo';

  private destroyRef = inject(DestroyRef);
  isUserLoggedIn: boolean = false;

  constructor(
    private authService: MsalService, 
    private msalBroadcastService: MsalBroadcastService, 
    private userService: UserService) { }

  ngOnInit() {
    this.msalBroadcastService.inProgress$.pipe(
      filter((interactionStatus: InteractionStatus) => interactionStatus == InteractionStatus.None),
      takeUntilDestroyed(this.destroyRef)
    ).subscribe(() => {
      this.isUserLoggedIn = this.authService.instance.getAllAccounts.length > 0;
      console.log('AppComponent.ngOnInit: this.isUserLoggedIn = ' + this.isUserLoggedIn);
      this.userService.isUserLoggedIn.next(this.isUserLoggedIn);
    }
    );
  }
}

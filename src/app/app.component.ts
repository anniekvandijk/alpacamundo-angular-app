import { Component, DestroyRef, inject } from '@angular/core';
import { UserService } from './features/users/user.service';
import { AuthenticationResult, EventMessage, EventType, InteractionStatus } from '@azure/msal-browser';
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

  constructor(
    private authService: MsalService,
    private msalBroadcastService: MsalBroadcastService) { }

  ngOnInit() {
    this.msalBroadcastService.msalSubject$
    .pipe(
      filter((msg: EventMessage) => msg.eventType === EventType.LOGIN_SUCCESS),
      takeUntilDestroyed(this.destroyRef)
    )
    .subscribe((result: EventMessage) => {
      const payload = result.payload as AuthenticationResult;
      this.authService.instance.setActiveAccount(payload.account);
    });
  }
}

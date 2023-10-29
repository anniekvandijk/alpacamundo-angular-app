import { DEFAULT_CURRENCY_CODE, LOCALE_ID, NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { InMemoryDataService } from './mocks/in-memory-data.service';
import { MAT_FORM_FIELD_DEFAULT_OPTIONS } from '@angular/material/form-field';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { HeaderComponent } from './pages/main/header/header.component';
import { FooterComponent } from './pages/main/footer/footer.component';
import { registerLocaleData } from '@angular/common';
import localeNl from '@angular/common/locales/nl';
import { ROUTES } from './app.routes';
import { MsalGuard, MsalInterceptor, MsalModule, MsalRedirectComponent } from '@azure/msal-angular';
import { InteractionType, PublicClientApplication } from '@azure/msal-browser';
import { environment } from 'src/environments/environment';
import { HttpApiInterceptor } from './utilities/http-api.interceptor';

registerLocaleData(localeNl, 'nl-NL'); 

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatSnackBarModule,
    RouterModule.forRoot(ROUTES, {scrollPositionRestoration: 'enabled'}),
    HttpClientModule,
    // The HttpClientInMemoryWebApiModule module intercepts HTTP requests
    // and returns simulated server responses.
    // Remove it when a real server is ready to receive requests.
    HttpClientInMemoryWebApiModule.forRoot(
      InMemoryDataService, { dataEncapsulation: false, passThruUnknownUrl: true }
    ),
    HeaderComponent,
    FooterComponent,
    MsalModule.forRoot(new PublicClientApplication(
        { 
        auth: {
            clientId: '13f9d129-96e3-4d32-9199-1786494d46ec',
            redirectUri: environment.loginRedirectUri,
            authority: `https://login.microsoftonline.com/0ef5acdf-6f69-4f04-af24-fa0934009a75`
        },
        cache: {
            cacheLocation: 'localStorage',
            storeAuthStateInCookie: true
        }
        }
    ),
    {
        interactionType: InteractionType.Redirect,
        authRequest: {
        scopes: ['user.read']
        }
    },
    {
        interactionType: InteractionType.Redirect,
        protectedResourceMap: new Map([
        ['https://graph.microsoft.com/v1.0/me', ['user.read']] 
        ])
    }      
    ),
   ],
    providers: [
    {
        provide: HTTP_INTERCEPTORS,
        useClass: MsalInterceptor,
        multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpApiInterceptor,
      multi: true
    },
    MsalGuard,
    {
      provide: MAT_FORM_FIELD_DEFAULT_OPTIONS, 
      useValue: {
        appearance: 'outline',
        floatLabel: 'always'
      }
    },
    { 
      provide: LOCALE_ID,
      useValue: 'nl-NL' 
    },
    {
      provide: DEFAULT_CURRENCY_CODE, 
      useValue: 'EUR'
    }
  ],
  bootstrap: [AppComponent, MsalRedirectComponent]
})
export class AppModule { }

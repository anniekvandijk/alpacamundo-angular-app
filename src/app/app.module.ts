import { DEFAULT_CURRENCY_CODE, LOCALE_ID, NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { InMemoryDataService } from './shared/services/in-memory-data.service';
import { MAT_FORM_FIELD_DEFAULT_OPTIONS } from '@angular/material/form-field';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { HeaderComponent } from './shared/features/header/header.component';
import { FooterComponent } from './shared/features/footer/footer.component';
import { registerLocaleData } from '@angular/common';
import localeNl from '@angular/common/locales/nl';
import { ROUTES } from './app.routes';
import { MsalGuard, MsalInterceptor, MsalModule, MsalRedirectComponent } from '@azure/msal-angular';
import { InteractionType, PublicClientApplication } from '@azure/msal-browser';
import { environment } from 'src/environments/environment';
import { HttpApiInterceptor } from './shared/interceptors/http-api.interceptor';

registerLocaleData(localeNl, 'nl-NL'); 

const scopes = 
  {
    apiWrite: 'api://88dd619d-a72e-49f5-bd69-985cdf0a8a12/access_as_user',
    graphRead: 'user.read'
  }


const apiScopeArray = [
  { httpMethod: 'POST', scopes: [scopes.apiWrite] },
  { httpMethod: 'PUT', scopes: [scopes.apiWrite] },
  { httpMethod: 'DELETE', scopes: [scopes.apiWrite] }, 
]

const graphScopeArray = [
  { httpMethod: 'GET', scopes: [scopes.graphRead] },
]

// TODO: get rid of this NgModule 
// move to main.ts
// bootstrapApplication with providers ans omporftProvidersFrom

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatSnackBarModule,
    RouterModule.forRoot(ROUTES, {
      scrollPositionRestoration: 'enabled',
      preloadingStrategy: PreloadAllModules
    }),
    HttpClientModule,
    // The HttpClientInMemoryWebApiModule module intercepts HTTP requests
    // and returns simulated server responses.
    // Remove it when a real server is ready to receive requests.
    HttpClientInMemoryWebApiModule.forRoot(
      InMemoryDataService, { 
        dataEncapsulation: false, 
        passThruUnknownUrl: true,
        delay: 0 
      }
    ),
    HeaderComponent,
    FooterComponent,
    MsalModule.forRoot(new PublicClientApplication(
        { 
        auth: {
            clientId: environment.clientId,
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
        scopes: [scopes.apiWrite, scopes.graphRead]
      }
    },
    {
      interactionType: InteractionType.Redirect,
      protectedResourceMap: new Map([
      ['https://graph.microsoft.com/v1.0/me', graphScopeArray],
      [`${environment.apiBaseUrl}/api/*`, apiScopeArray] 
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
       // appearance: 'outline'
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

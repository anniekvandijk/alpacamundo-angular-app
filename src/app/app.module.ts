import { DEFAULT_CURRENCY_CODE, LOCALE_ID, NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { HTTP_INTERCEPTORS, provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { HeaderComponent } from './shared/components/header/header.component';
import { FooterComponent } from './shared/components/footer/footer.component';
import { registerLocaleData } from '@angular/common';
import localeNl from '@angular/common/locales/nl';
import { ROUTES } from './app.routes';
import { MsalGuard, MsalInterceptor, MsalModule, MsalRedirectComponent } from '@azure/msal-angular';
import { HttpApiInterceptor } from './shared/interceptors/http-api.interceptor';
import { msalGuardConfiguration, msalInstanceConfig, protectedResourceMap } from './auth/auth';
import { MAT_DATE_LOCALE } from '@angular/material/core';

registerLocaleData(localeNl, 'nl-NL'); 

// TODO: get rid of this NgModule 
// move to main.ts

@NgModule({ declarations: [
        AppComponent,
    ],
    bootstrap: [AppComponent, MsalRedirectComponent], imports: [BrowserModule,
        BrowserAnimationsModule,
        MatSnackBarModule,
        RouterModule.forRoot(ROUTES, {
            scrollPositionRestoration: 'enabled',
            preloadingStrategy: PreloadAllModules
        }),
        HeaderComponent,
        FooterComponent,
        MsalModule.forRoot(msalInstanceConfig, msalGuardConfiguration, {
            interactionType: msalGuardConfiguration.interactionType,
            protectedResourceMap: new Map(protectedResourceMap)
        })], providers: [
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
            provide: LOCALE_ID,
            useValue: 'nl-NL'
        },
        { provide: MAT_DATE_LOCALE,
            useValue: 'nl-NL'
        },
        {
            provide: DEFAULT_CURRENCY_CODE,
            useValue: 'EUR'
        },
        provideHttpClient(withInterceptorsFromDi())
    ] })
export class AppModule { }

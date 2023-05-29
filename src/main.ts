
import { ROUTES } from './app/app.routes'; 
import { BrowserModule, bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { PreloadAllModules, provideRouter, withDebugTracing, withInMemoryScrolling, withPreloading } from '@angular/router';
import { provideAnimations } from '@angular/platform-browser/animations';
import { DEFAULT_CURRENCY_CODE, LOCALE_ID, importProvidersFrom } from '@angular/core';
import { provideHttpClient } from '@angular/common/http';
import { CONFIGURATION } from './app/utilities/configuration.token';
import { registerLocaleData } from '@angular/common';
import localeNl from '@angular/common/locales/nl';
import { MAT_FORM_FIELD_DEFAULT_OPTIONS } from '@angular/material/form-field';
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { InMemoryDataService } from './app/mocks/in-memory-data.service';

registerLocaleData(localeNl, 'nl-NL'); 

// Get configuration from config.json
fetch('/assets/config.json')
  .then((response) => {
    if (response.ok) {
      return response.json()
    } else {
      throw Error(response.status + ': ' + response.statusText);
    }
  })
  // Bootstrap application with configuration
  .then((configuration) => {
    bootstrapApplication(AppComponent, {
      providers: [
        importProvidersFrom(BrowserModule),
        provideAnimations(),
        provideRouter(ROUTES, 
          withPreloading(PreloadAllModules),
          withDebugTracing(),
          withInMemoryScrolling({scrollPositionRestoration: 'enabled'})
        ),
        provideHttpClient(),
        importProvidersFrom(
          HttpClientInMemoryWebApiModule.forRoot(
            InMemoryDataService, { dataEncapsulation: false }
          ),
        ),
        { 
            provide: CONFIGURATION, 
            useValue: configuration
        },
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
    })
      .catch(err => console.error(err));
  });


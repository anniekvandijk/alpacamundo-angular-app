import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { CONFIGURATION } from './app/utilities/configuration.token';
import { AppModule } from './app/app.module';

fetch('/assets/config.json')
  .then((response) => {
    if (response.ok) {
      return response.json()
    } else {
      throw Error(response.status + ': ' + response.statusText);
    }
  })
  .then((configuration) => {
    platformBrowserDynamic([{ provide: CONFIGURATION, useValue: configuration }])
      .bootstrapModule(AppModule)
      .catch(err => console.error(err));
  });
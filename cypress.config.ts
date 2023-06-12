import { defineConfig } from "cypress";

export default defineConfig({
  e2e: {
    experimentalModifyObstructiveThirdPartyCode: true,
    env: {
      AD_USERNAME: '',
      AD_PASSWORD: '',
      BASE_URL: 'http://localhost:4200/'
    },
    setupNodeEvents(on, config) {
      if (config.env['environment'] = 'local') {  
        const settings = require(`./local.settings.json`)
        if (settings.env) {
          config.env = {
            ...config.env,
            ...settings.env,
          }
        }
        console.log('loaded local settings:')
        console.log(config.env)
      }
      return config
    },
  }
});

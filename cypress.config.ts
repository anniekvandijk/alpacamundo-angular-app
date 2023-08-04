import { defineConfig } from "cypress";

export default defineConfig({
  e2e: {
    baseUrl: "http://localhost:4300",
    experimentalModifyObstructiveThirdPartyCode: true,
    env: {
      AD_USERNAME: "",
      AD_PASSWORD: "",
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

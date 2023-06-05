import { defineConfig } from "cypress";

export default defineConfig({
  e2e: {
    experimentalModifyObstructiveThirdPartyCode: true,
    env: {
      environmentName: 'local',
      AD_USERNAME: '',
      AD_PASSWORD: '',
      BASE_URL: 'http://localhost:4200/'
    },
    setupNodeEvents(on, config) {
      const environmentName = config.env['environmentName'] || 'local'
      const environmentFilename = `./${environmentName}.settings.json`
      console.log('loading %s', environmentFilename)
      const settings = require(environmentFilename)
      if (settings.baseUrl) {
        config.baseUrl = settings.baseUrl
      }
      if (settings.env) {
        config.env = {
          ...config.env,
          ...settings.env,
        }
      }
      console.log('loaded settings for environment %s', environmentName)
      return config
    },
  }
});

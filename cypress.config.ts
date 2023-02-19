import { defineConfig } from 'cypress'
import allureWriter from '@shelex/cypress-allure-plugin/writer'

export default defineConfig({
  experimentalStudio: true,
  viewportWidth: 1920,
  viewportHeight: 1080,
  screenshotOnRunFailure: true,
  screenshotsFolder: 'cypress/results/screenshots',
  videosFolder: 'cypress/results/videos',
  video: true,
  reporter: 'cypress-multi-reporters',
  reporterOptions: {
    configFile: 'reporter-config.json',
  },
  defaultCommandTimeout: 10000,
  numTestsKeptInMemory: 2,
  redirectionLimit: 200,
  chromeWebSecurity: false,
  retries: 0,
  e2e: {
    // We've imported your old cypress plugins here.
    // You may want to clean this up later by importing these.
    setupNodeEvents(on, config) {
      allureWriter(on, config);
      return config;
  },
    baseUrl: 'https://sppt-dev.tvp.pl:8070/',
    supportFile: 'cypress/support/e2e.{js,ts}',
    specPattern: 'cypress/e2e/**/*.cy.{feature,js,ts}',
    experimentalRunAllSpecs: true
  },
  env: {
    http_proxy: 'http://proxy.tvp.pl:8080',
    https_proxy: 'http://proxy.tvp.pl:8080',
    no_proxy: 'sppt-dev.tvp.pl'
}
})

// ***********************************************************
// This example support/index.js is processed and
// loaded automatically before your test files.
//
// This is a great place to put global configuration and
// behavior that modifies Cypress.
//
// You can change the location of this file or turn off
// automatically serving support files with the
// 'supportFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/configuration
// ***********************************************************

// Import commands.js using ES2015 syntax:
import '@shelex/cypress-allure-plugin'
import './commands'
import './loginCommands'
import './goToCommands'
import './universalCommands'

// Alternatively you can use CommonJS syntax:
// require('./commands')
require('cypress-commands')
// require('cypress-dark/src/halloween')
// require('cypress-dark')

const faker = require('faker')   // require('faker/locale/pl')
faker.locale = 'pl'
export { faker }

Cypress.on('uncaught:exception', (_err, _runnable) => {
    // returning false here prevents Cypress from
    // failing the test
    return false
})

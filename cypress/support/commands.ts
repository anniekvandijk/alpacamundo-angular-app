/// <reference types="cypress" />

import { loginViaAAD } from './ad-login';

declare global {
	namespace Cypress {
		interface Chainable {
			ADlogin(): Chainable;
		}
	}
}

// Login via Azure Active Directory
Cypress.Commands.add('ADlogin', () => {
    const username = Cypress.env('AD_USERNAME')
    const password = Cypress.env('AD_PASSWORD')
    const log = Cypress.log({
      displayName: 'Azure Active Directory Login',
      message: [`🔐 Authenticating | ${username}`],
      autoEnd: false,
    })
    log.snapshot('before')
  
    loginViaAAD(username, password)
  
    log.snapshot('after')
    log.end()
  })

  
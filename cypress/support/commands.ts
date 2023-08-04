/// <reference types="cypress" />

import { loginViaAAD } from './ad-login';

declare global {
	namespace Cypress {
    interface Chainable<Subject> {
      ADlogin(username: string, password: string): void;
    }
	}
}

// Login via Azure Active Directory
Cypress.Commands.add('ADlogin', (username: string, password: string) => {
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

  
describe('Login', () => {

    it('should login with azure AD', () => {
        const username = Cypress.env('AD_USERNAME')
        const password = Cypress.env('AD_PASSWORD')
        cy.ADlogin(username, password)
        // Ensure Microsoft has redirected us back to the sample app with our logged in user.
        cy.url().should('equal', 'http://localhost:4300/')
        cy.get('app-usermenu h2').should(
        'contain',
        `${Cypress.env('AD_USERNAME')}`
        )
    }
    );
});

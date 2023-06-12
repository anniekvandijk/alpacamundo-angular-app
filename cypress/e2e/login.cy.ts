describe('Login', () => {

    it('should login with azure AD', () => {
        const username = Cypress.env('AD_USERNAME')
        const password = Cypress.env('AD_PASSWORD')
        cy.ADlogin(username, password)
        cy.visit('http://localhost:4200')
    }
    );
});

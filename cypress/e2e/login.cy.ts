describe('Login', () => {

    it('should login', () => {
        // cy.log('baseUrl: ', Cypress.env('BASE_URL'));
        // cy.log('AZURE_CLIENT_ID: ', Cypress.env('AZURE_CLIENT_ID'));
        // cy.visit(Cypress.env('BASE_URL'));
        // cy.get('a[rel="login"]').click();
        // cy.adlogin();

        cy.ADlogin()
        cy.visit('http://localhost:4200')

    }
    );
});

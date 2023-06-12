describe('Login', () => {

    it('should login with azure AD', () => {
        cy.ADlogin()
        cy.visit('http://localhost:4200')
    }
    );
});

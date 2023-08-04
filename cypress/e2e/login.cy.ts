describe('Login', () => {

    it('should login', () => {
        cy.ADlogin()
        cy.visit('http://localhost:4200')
    });
});

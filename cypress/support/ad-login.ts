export function loginViaAAD(username: string, password: string) {
    cy.visit('/')
    cy.get('a[rel="login"]').click();
  
    // Login to your AAD tenant.
    cy.origin(
      'login.microsoftonline.com',
      {
        args: {
          username,
        },
      },
      ({ username }) => {
        cy.get('input[type="email"]').type(username, {
          log: false,
        })
        cy.get('input[type="submit"]').click()
      }
    )
  
    // depending on the user and how they are registered with Microsoft, the origin may go to live.com
    cy.origin(
        'login.microsoftonline.com',
   //   'login.live.com',
      {
        args: {
          password,
        },
      },
      ({ password }) => {
        cy.get('input[type="password"]').type(password, {
          log: false,
        })
        cy.get('input[type="submit"]').click()
        cy.get('#idBtn_Back').click()
      }
    )


  }
    



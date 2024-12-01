describe('Prueba de login exitoso', () => {
  it('passes', () => {
    cy.visit('http://127.0.0.1:8081/sigec/')

     cy.get('#email').type('isaac.ocampo.giles@gmail.com')

     cy.get('#password').type('testNewPass')
 
     cy.get('button[type="submit"]').click()

     //cy.url().should('include', 'views/projectList.html')

  })
})


describe('Prueba de login con contraseña incorrecta', () => {
  it('Debería recibir un error 403 cuando las credenciales son incorrectas', () => {
    
    cy.intercept('POST', 'http://localhost:8080/login').as('loginRequest') 

    cy.visit('http://127.0.0.1:8081/sigec/')

    cy.get('#email').type('isaac.ocampo.giles@gmail.com')

    cy.get('#password').type('pass')

    cy.get('button[type="submit"]').click()

    cy.wait('@loginRequest').its('response.statusCode').should('eq', 403)

    cy.get('#message').should('be.visible')
    cy.get('#message-text').should('contain', 'Usuario o contraseña incorrectos') 
  })
})

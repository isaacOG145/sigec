describe('Prueba de inicio de sesión exitoso', () => {
  it('passes', () => {

    cy.visit('http://127.0.0.1:8081')

    cy.get('#email').type('admin@domain.com')

    cy.get('#password').type('adminPassword')

    cy.get('button[type="submit"]').click()

    //cy.url().should('include', 'views/projectList.html')

  })
})

describe('Prueba de inicio de sesión con usuario inactivo', () => {
  it('Debería recibir un error 403 cuando las credenciales son incorrectas', () => {

    cy.intercept('POST', 'http://localhost:8080/login').as('loginRequest')

    cy.visit('http://127.0.0.1:8081')

    cy.get('#email').type('admin@domain.com')

    cy.get('#password').type('queryPassword')

    cy.get('button[type="submit"]').click()

    cy.wait('@loginRequest').its('response.statusCode').should('eq', 403)

    cy.get('#message').should('be.visible')
    cy.get('#message-text').should('contain', 'Usuario o contraseña incorrectos')
  })
})


describe('Prueba de inicio de sesión con contraseña incorrecta', () => {
  it('Debería recibir un error 403 cuando las credenciales son incorrectas', () => {

    cy.intercept('POST', 'http://localhost:8080/login').as('loginRequest')

    cy.visit('http://127.0.0.1:8081')

    cy.get('#email').type('admin@domain.com')

    cy.get('#password').type('password')

    cy.get('button[type="submit"]').click()

    cy.wait('@loginRequest').its('response.statusCode').should('eq', 403)

    cy.get('#message').should('be.visible')
    cy.get('#message-text').should('contain', 'Usuario o contraseña incorrectos')
  })
})

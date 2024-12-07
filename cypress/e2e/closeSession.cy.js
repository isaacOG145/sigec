describe('Prueba de cierre sesion', () => {
  it('passes', () => {

    cy.visit('http://127.0.0.1:8081')

    cy.get('#email').type('admin@domain.com')

    cy.get('#password').type('newAdminPassword')

    cy.get('button[type="submit"]').click()

    cy.url().should('include', 'http://127.0.0.1:8081/views/projectList.html')

    cy.get('a.nav-link').contains('Perfil').click();

    cy.url().should('include', 'http://127.0.0.1:8081/views/profile.html')

    cy.get('#logout').click();

    cy.url().should('include', "http://127.0.0.1:8081")
  })
})

describe('Prueba de cierre sesion', () => {
  it('Cierra la pagina al presionar el boton', () => {
    //ip en pc de axel "http: //localhost:8081"
    //ip en pc de isaac http: //127.0.0.1:8081
    cy.visit('http://localhost:8081')

    cy.get('#email').type('admin@domain.com')

    cy.get('#password').type('newAdminPassword')

    cy.get('button[type="submit"]').click()

    cy.url().should('include', 'http://localhost:8081/views/projectList.html')

    cy.get('a.nav-link').contains('Perfil').click();

    cy.url().should('include', 'http://localhost:8081/views/profile.html')

    cy.get('#logout').click();

    cy.url().should('include', "http://localhost:8081")
  })
})

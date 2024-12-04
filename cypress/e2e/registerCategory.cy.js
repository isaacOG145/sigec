describe('Prueba de registro de categoría', () => {
  it('Debe registrar una categoría correctamente', () => {

    cy.visit('http://localhost:8081/views/categoryRegister.html');


    cy.get('#name').type('Aplicacion web');
    cy.get('#description').type('Pagina web en la nube');

    cy.get('#categoryForm').submit();

    cy.get('#message').should('be.visible');

    cy.get('#message-text').should('contain', 'Categoría de proyecto guardada exitosamente');

    cy.get('#name').should('have.value', '');
    cy.get('#description').should('have.value', '');
  });
});

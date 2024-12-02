describe('Prueba de registro de categoría', () => {
  it('Debe registrar una categoría correctamente', () => {
    
    cy.visit('http://127.0.0.1:8081/sigec/views/categoryRegister');  

  
    cy.get('#PC.nombre').type('Aplicacion web');  
    cy.get('#PC.descripcion').type('Pagina web en la nube');  

    cy.get('#categoryForm').submit();

    cy.get('#message').should('be.visible');  

    cy.get('#message-text').should('contain', 'Categoría de proyecto guardada exitosamente');  

    cy.get('#PC.nombre').should('have.value', ''); 
    cy.get('#PC.descripcion').should('have.value', '');  
  });
});

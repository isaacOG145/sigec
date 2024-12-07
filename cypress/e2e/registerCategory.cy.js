describe('Formulario de Registro de Categoría', () => {


  it('Prueba de registro de categoria exitoso', () => {

    cy.visit('http://127.0.0.1:8081/views/categoryRegister.html');
    cy.get('#name').type('Nueva Categoría');
    cy.get('#description').type('Descripción de la nueva categoría');
    cy.get('#categoryForm').submit();

    cy.get('#message').should('be.visible');
    cy.get('#message-text').should('contain', 'Categoría de proyecto guardada exitosamente');
  });

  it('Prueba de registro de categoria que ya existe', () => {

    cy.visit('http://127.0.0.1:8081/views/categoryRegister.html');
    cy.get('#name').type('Nueva Categoría');
    cy.get('#description').type('Descripción de la nueva categoría nueva');
    cy.get('#categoryForm').submit();

    cy.get('#message').should('be.visible');
    cy.get('#message-text').should('contain', 'El nombre de la categoría ya está registrado');
  });

  it('Prueba de registro de categoria con nombre invalido', () => {

    cy.visit('http://127.0.0.1:8081/views/categoryRegister.html');
    cy.get('#name').type('&&&&&&&&');
    cy.get('#description').type('Descripción de la nueva categoría');
    cy.get('#categoryForm').submit();

    cy.get('#message').should('be.visible');
    cy.get('#message-text').should('contain', 'El nombre no puede contener carácteres especiales');
  });

  it('Prueba de registro de categoria con descripción invalida', () => {

    cy.visit('http://127.0.0.1:8081/views/categoryRegister.html');
    cy.get('#name').type('Nueva Categoría');
    cy.get('#description').type('&&&&&&&&&&&');
    cy.get('#categoryForm').submit();

    cy.get('#message').should('be.visible');
    cy.get('#message-text').should('contain', 'La descripcion no puede contener carácteres especiales');
  });



});

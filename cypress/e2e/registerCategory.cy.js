describe('Registro de Categoría Exitoso', () => {
  it('Debería registrar una categoría correctamente', () => {
    cy.visit('http://localhost:8081/views/categoryRegister.html');
    cy.get('#name').type('Nueva Categoría');
    cy.get('#description').type('Descripción de la nueva categoría');
    cy.get('#categoryForm').submit();

    cy.get('#message').should('be.visible');
    cy.get('#message-text').should('contain', 'Categoría de proyecto guardada exitosamente');
  });
});

describe('Registro de Categoría que Ya Existe', () => {
  it('Debería mostrar un error si el nombre de la categoría ya está registrado', () => {
    cy.visit('http://localhost:8081/views/categoryRegister.html');
    cy.get('#name').type('Nueva Categoría');
    cy.get('#description').type('Descripción de la nueva categoría nueva');
    cy.get('#categoryForm').submit();

    cy.get('#message').should('be.visible');
    cy.get('#message-text').should('contain', 'El nombre de la categoría ya está registrado');
  });
});

describe('Registro de Categoría con Nombre Inválido', () => {
  it('Debería mostrar un error si el nombre contiene caracteres especiales', () => {
    cy.visit('http://localhost:8081/views/categoryRegister.html');
    cy.get('#name').type('&&&&&&&&');
    cy.get('#description').type('Descripción de la nueva categoría');
    cy.get('#categoryForm').submit();

    cy.get('#message').should('be.visible');
    cy.get('#message-text').should('contain', 'El nombre no puede contener carácteres especiales');
  });
});

describe('Registro de Categoría con Descripción Inválida', () => {
  it('Debería mostrar un error si la descripción contiene caracteres especiales', () => {
    cy.visit('http://localhost:8081/views/categoryRegister.html');
    cy.get('#name').type('Nueva Categoría');
    cy.get('#description').type('&&&&&&&&&&&');
    cy.get('#categoryForm').submit();

    cy.get('#message').should('be.visible');
    cy.get('#message-text').should('contain', 'La descripcion no puede contener carácteres especiales');
  });
});


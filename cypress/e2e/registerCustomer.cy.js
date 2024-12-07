describe('Prueba de registro de cliente', () => {
  it('Prueba de registro de cliente exitoso', () => {

    cy.visit('http://127.0.0.1:8081/views/customerRegister.html');


    cy.get('#name').type('Juan Pérez');
    cy.get('#email').type('juan.perez@example.com');
    cy.get('#phone').type('5551234567');

    cy.get('#customer-form').submit();

    cy.get('#message').should('be.visible');
    cy.get('#message-text').should('contain', 'Cliente guardado exitosamente');


    cy.get('#name').should('have.value', '');
    cy.get('#email').should('have.value', '');
    cy.get('#phone').should('have.value', '');
  });
});

describe('Prueba de registro de cliente con correo repetido', () => {
  it('Debe dar un mensaje de correo registrado', () => {

    cy.visit('http://127.0.0.1:8081/views/customerRegister.html');


    cy.get('#name').type('Juan Pérez Valle');
    cy.get('#email').type('juan.perez@example.com');
    cy.get('#phone').type('5551234569');

    cy.get('#customer-form').submit();

    cy.get('#message').should('be.visible');
    cy.get('#message-text').should('contain', 'El correo electrónico ya está registrado');


  });
});

describe('Prueba de nombre con caracteres especiales', () => {
  it('Debe dar un mensaje de error sobre el nombre ', () => {

    cy.visit('http://127.0.0.1:8081/views/customerRegister.html');


    cy.get('#name').type('&&&&&&&&&&');
    cy.get('#email').type('juan.perez@example.com');
    cy.get('#phone').type('5551234569');

    cy.get('#customer-form').submit();

    cy.get('#message').should('be.visible');
    cy.get('#message-text').should('contain', 'El nombre no puede contener caracteres especiales');


  });
});

describe('Prueba de correo invalido', () => {
  it('Debe dar un mensaje de error sobre correo invalido', () => {

    cy.visit('http://127.0.0.1:8081/views/customerRegister.html');


    cy.get('#name').type('juan perez valle');
    cy.get('#email').type('juan.perez.com');
    cy.get('#phone').type('5551234569');

    cy.get('#customer-form').submit();

    cy.get('#message').should('be.visible');
    cy.get('#message-text').should('contain', 'El correo debe ser válido');


  });
});

describe('Prueba de numero de telefono invalido', () => {
  it('Debe dar un mensaje de error sobre telefono invalido', () => {

    cy.visit('http://127.0.0.1:8081/views/customerRegister.html');


    cy.get('#name').type('Daniel Perez Juarez');
    cy.get('#email').type('daniel.perez@gmail.com');
    cy.get('#phone').type('telefono');

    cy.get('#customer-form').submit();

    cy.get('#message').should('be.visible');
    cy.get('#message-text').should('contain', 'El teléfono debe contener solo 10 dígitos numéricos');


  });
});

describe('Prueba de numero de telefono excediendo limite de caracteres', () => {
  it('Debe dar un mensaje de error sobre telefono pasando el numero de caracteres', () => {

    cy.visit('http://127.0.0.1:8081/views/customerRegister.html');


    cy.get('#name').type('Daniel Perez Juarez');
    cy.get('#email').type('daniel.juarez@gmail.com');
    cy.get('#phone').type('1111111111111111111111111111111111111');

    cy.get('#customer-form').submit();

    cy.get('#message').should('be.visible');
    cy.get('#message-text').should('contain', 'El número de teléfono no puede exceder los 10 caracteres');


  });
});

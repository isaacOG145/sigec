// cypress/e2e/registerUser.spec.js

describe('Prueba de registro de usuario', () => {
  it('Prueba de registro de usuario correctamente', () => {

    cy.visit('http://127.0.0.1:8081/views/userRegister.html');

    cy.get('#name').type('Juan');
    cy.get('#lastName').type('Pérez');
    cy.get('#email').type('juan.perez@example.com');
    cy.get('#phone').type('1234567898');
    cy.get('#password').type('contraseña123');
    cy.get('#passwordCon').type('contraseña123');
    cy.get('#rol').select('Usuario');

    cy.get('#userForm').submit();

    cy.get('#message').should('be.visible');
    cy.get('#message-text').should('contain', 'Usuario guardado exitosamente');

    cy.get('#name').should('have.value', '');
    cy.get('#lastName').should('have.value', '');
    cy.get('#email').should('have.value', '');
    cy.get('#phone').should('have.value', '');
    cy.get('#password').should('have.value', '');
    cy.get('#passwordCon').should('have.value', '');
    cy.get('#rol').should('have.value', '');
  });

  it('Prueba de registro de usuario con contraseñas sin coincidir', () => {

    cy.visit('http://127.0.0.1:8081/views/userRegister.html');

    cy.get('#name').type('Ana');
    cy.get('#lastName').type('Gómez');
    cy.get('#email').type('ana.gomez@example.com');
    cy.get('#phone').type('987654321');
    cy.get('#password').type('contraseña123');
    cy.get('#passwordCon').type('contraseña456');
    cy.get('#rol').select('Usuario');

    cy.get('#userForm').submit();

    cy.get('#message').should('be.visible');
    cy.get('#message-text').should('contain', 'Las contraseñas no coinciden');
  });

  it('Prueba de registro de usuario con telefono invalido', () => {

    cy.visit('http://127.0.0.1:8081/views/userRegister.html');

    cy.get('#name').type('Ana');
    cy.get('#lastName').type('Gómez');
    cy.get('#email').type('ana.gomez2@gmail.com');
    cy.get('#phone').type('tel');
    cy.get('#password').type('contraseña123');
    cy.get('#passwordCon').type('contraseña123');
    cy.get('#rol').select('Usuario');

    cy.get('#userForm').submit();

    cy.get('#message').should('be.visible');
    cy.get('#message-text').should('contain', 'El teléfono debe contener solo dígitos numéricos');
  });

  it('Prueba de registro de usuario con telefono repetido', () => {

    cy.visit('http://127.0.0.1:8081/views/userRegister.html');

    cy.get('#name').type('Hector');
    cy.get('#lastName').type('Gónzales');
    cy.get('#email').type('hector.gonzales@gmail.com');
    cy.get('#phone').type('1234567890');
    cy.get('#password').type('contraseña123');
    cy.get('#passwordCon').type('contraseña123');
    cy.get('#rol').select('Usuario');

    cy.get('#userForm').submit();

    cy.get('#message').should('be.visible');
    cy.get('#message-text').should('contain', 'El número de teléfono ya está registrado');
  });


});

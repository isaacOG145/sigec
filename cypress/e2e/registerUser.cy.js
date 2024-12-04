// cypress/e2e/registerUser.spec.js

describe('Prueba de registro de usuario', () => {
  it('Debe registrar un usuario correctamente', () => {
    // Visita la página de registro de usuarios
    cy.visit('http://localhost:8081/views/userRegister.html');  // Cambia la URL según tu entorno local

    // Rellenar el formulario con los datos del usuario
    cy.get('#name').type('Juan');
    cy.get('#lastName').type('Pérez');
    cy.get('#email').type('juan.perez@example.com');
    cy.get('#phone').type('123456789');
    cy.get('#password').type('contraseña123');
    cy.get('#passwordCon').type('contraseña123');
    cy.get('#rol').select('Usuario');

    // Enviar el formulario
    cy.get('#userForm').submit();

    // Verifica que el mensaje de éxito se muestra
    cy.get('#message').should('be.visible');  // El mensaje debe aparecer
    cy.get('#message-text').should('contain', 'Usuario registrado correctamente');  // Verifica el mensaje de éxito

    // Verificar que los campos se han limpiado después del registro
    cy.get('#name').should('have.value', '');  // El campo nombre debe estar vacío
    cy.get('#lastName').should('have.value', '');  // El campo apellidos debe estar vacío
    cy.get('#email').should('have.value', '');  // El campo email debe estar vacío
    cy.get('#phone').should('have.value', '');  // El campo teléfono debe estar vacío
    cy.get('#password').should('have.value', '');  // El campo contraseña debe estar vacío
    cy.get('#passwordCon').should('have.value', '');  // El campo confirmar contraseña debe estar vacío
    cy.get('#rol').should('have.value', '');  // El campo rol debe estar vacío
  });

  it('Debe mostrar un error si las contraseñas no coinciden', () => {
    // Visita la página de registro de usuarios
    cy.visit('http://localhost:8081/views/userRegister.html');  // Cambia la URL según tu entorno local

    // Rellenar el formulario con contraseñas que no coinciden
    cy.get('#name').type('Ana');
    cy.get('#lastName').type('Gómez');
    cy.get('#email').type('ana.gomez@example.com');
    cy.get('#phome').type('987654321');
    cy.get('#password').type('contraseña123');
    cy.get('#passwordCon').type('contraseña456');
    cy.get('#rol').select('Administrador');

    // Enviar el formulario
    cy.get('#userForm').submit();

    // Verifica que el mensaje de error esté visible
    cy.get('#message').should('be.visible');  // El mensaje debe aparecer
    cy.get('#message-text').should('contain', 'Las contraseñas no coinciden');  // Verifica el mensaje de error
  });

  it('Debe mostrar un error si falta completar algún campo', () => {

    cy.visit('http://localhost:8081/views/userRegister.html');  // Cambia la URL según tu entorno local

    cy.get('#name').type('Carlos');
    cy.get('#lastName').type('');
    cy.get('#email').type('');
    cy.get('#phone').type('');
    cy.get('#password').type('');
    cy.get('#passwordCon').type('');
    cy.get('#rol').select('');

    // Enviar el formulario
    cy.get('#userForm').submit();

    // Verifica que el mensaje de error esté visible
    cy.get('#message').should('be.visible');  // El mensaje debe aparecer
    cy.get('#message-text').should('contain', 'Por favor, complete todos los campos');  // Verifica el mensaje de error
  });
});

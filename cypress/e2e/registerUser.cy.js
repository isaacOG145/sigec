// cypress/e2e/registerUser.spec.js

describe('Prueba de registro de usuario', () => {
  it('Debe registrar un usuario correctamente', () => {
    // Visita la página de registro de usuarios
    cy.visit('http://127.0.0.1:8081/sigec/views/userRegister');  // Cambia la URL según tu entorno local

    // Rellenar el formulario con los datos del usuario
    cy.get('#U.nombre').type('Juan');
    cy.get('#U.apellidos').type('Pérez');
    cy.get('#U.email').type('juan.perez@example.com');
    cy.get('#U.telefono').type('123456789');
    cy.get('#U.password').type('contraseña123');
    cy.get('#U.Cpassword').type('contraseña123');
    cy.get('#U.rol').select('Usuario');

    // Enviar el formulario
    cy.get('#userForm').submit();

    // Verifica que el mensaje de éxito se muestra
    cy.get('#message').should('be.visible');  // El mensaje debe aparecer
    cy.get('#message-text').should('contain', 'Usuario registrado correctamente');  // Verifica el mensaje de éxito

    // Verificar que los campos se han limpiado después del registro
    cy.get('#U.nombre').should('have.value', '');  // El campo nombre debe estar vacío
    cy.get('#U.apellidos').should('have.value', '');  // El campo apellidos debe estar vacío
    cy.get('#U.email').should('have.value', '');  // El campo email debe estar vacío
    cy.get('#U.telefono').should('have.value', '');  // El campo teléfono debe estar vacío
    cy.get('#U.password').should('have.value', '');  // El campo contraseña debe estar vacío
    cy.get('#U.Cpassword').should('have.value', '');  // El campo confirmar contraseña debe estar vacío
    cy.get('#U.rol').should('have.value', '');  // El campo rol debe estar vacío
  });

  it('Debe mostrar un error si las contraseñas no coinciden', () => {
    // Visita la página de registro de usuarios
    cy.visit('http://127.0.0.1:8081/sigec/views/userRegister');  // Cambia la URL según tu entorno local

    // Rellenar el formulario con contraseñas que no coinciden
    cy.get('#U.nombre').type('Ana');
    cy.get('#U.apellidos').type('Gómez');
    cy.get('#U.email').type('ana.gomez@example.com');
    cy.get('#U.telefono').type('987654321');
    cy.get('#U.password').type('contraseña123');
    cy.get('#U.Cpassword').type('contraseña456');
    cy.get('#U.rol').select('Administrador');

    // Enviar el formulario
    cy.get('#userForm').submit();

    // Verifica que el mensaje de error esté visible
    cy.get('#message').should('be.visible');  // El mensaje debe aparecer
    cy.get('#message-text').should('contain', 'Las contraseñas no coinciden');  // Verifica el mensaje de error
  });

  it('Debe mostrar un error si falta completar algún campo', () => {
    // Visita la página de registro de usuarios
    cy.visit('http://127.0.0.1:8081/sigec/views/userRegister');  // Cambia la URL según tu entorno local

    // Rellenar el formulario con datos faltantes
    cy.get('#U.nombre').type('Carlos');
    cy.get('#U.apellidos').type('');
    cy.get('#U.email').type('');
    cy.get('#U.telefono').type('');
    cy.get('#U.password').type('');
    cy.get('#U.Cpassword').type('');
    cy.get('#U.rol').select('');

    // Enviar el formulario
    cy.get('#userForm').submit();

    // Verifica que el mensaje de error esté visible
    cy.get('#message').should('be.visible');  // El mensaje debe aparecer
    cy.get('#message-text').should('contain', 'Por favor, complete todos los campos');  // Verifica el mensaje de error
  });
});

describe('Prueba de registro de usuario', () => {
  it('Debe registrar un usuario exitosamente', () => {

    cy.visit('http://localhost:8081/views/userRegister.html');

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
});

describe('Prueba de registro de usuario con contraseñas no coincidentes', () => {
  it('Debe mostrar un mensaje de error cuando las contraseñas no coincidan', () => {

    cy.visit('http://localhost:8081/views/userRegister.html');

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
});

describe('Prueba de registro de usuario con teléfono inválido', () => {
  it('Debe mostrar un mensaje de error si el teléfono contiene caracteres no numéricos', () => {

    cy.visit('http://localhost:8081/views/userRegister.html');

    cy.get('#name').type('Ana');
    cy.get('#lastName').type('Gómez');
    cy.get('#email').type('ana.gomez2@gmail.com');
    cy.get('#phone').type('tel');  // Teléfono inválido
    cy.get('#password').type('contraseña123');
    cy.get('#passwordCon').type('contraseña123');
    cy.get('#rol').select('Usuario');

    cy.get('#userForm').submit();

    cy.get('#message').should('be.visible');
    cy.get('#message-text').should('contain', 'El teléfono debe contener solo dígitos numéricos');
  });
});

describe('Prueba de registro de usuario con teléfono repetido', () => {
  it('Debe mostrar un mensaje de error si el teléfono ya está registrado', () => {

    cy.visit('http://localhost:8081/views/userRegister.html');

    cy.get('#name').type('Héctor');
    cy.get('#lastName').type('Gonzáles');
    cy.get('#email').type('hector.gonzales@gmail.com');
    cy.get('#phone').type('1234567890');  // Teléfono ya registrado
    cy.get('#password').type('contraseña123');
    cy.get('#passwordCon').type('contraseña123');
    cy.get('#rol').select('Usuario');

    cy.get('#userForm').submit();

    cy.get('#message').should('be.visible');
    cy.get('#message-text').should('contain', 'El número de teléfono ya está registrado');
  });
});

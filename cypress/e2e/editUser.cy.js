describe('Prueba de filtro de usuarios', () => {
  let allUsers;

  beforeEach(() => {
    cy.intercept('GET', 'http://localhost:8080/user/all').as('getUsers');
    cy.visit('http://localhost:8081/views/userList.html');

    // Esperamos que se carguen los usuarios
    cy.wait('@getUsers').then((interception) => {
      allUsers = interception.response.body.result;
    });
  });

  describe('Edición de usuario exitoso', () => {
    it('Debería editar un usuario correctamente', () => {
      cy.get('#Categoria').select('Activos');
      cy.get('#user-list tr').should('have.length.greaterThan', 0);

      // Verificar que todos los usuarios en la tabla son activos
      allUsers.filter(user => user.status === true).forEach((activeUser) => {
        cy.get('#user-list').contains(activeUser.name);
        cy.get('#user-list').contains(activeUser.lastName);
        cy.get('#user-list').contains(activeUser.email);
        cy.get('#user-list').contains(activeUser.phoneNumber);
        cy.get('#user-list').contains(activeUser.role.name === "ROLE_ADMIN" ? "Administrador" : "Usuario");

        cy.get(':nth-child(1) > :nth-child(7) > .btn-edit').click();
        cy.get(':nth-child(1) > .form-control').clear().type('superAdmin');
        cy.get(':nth-child(1) > :nth-child(7) > .btn-edit').click();

        cy.get('#message').should('be.visible');
        cy.get('#message-text').should('contain', 'Usuario editado correctamente.');
      });
    });
  });

  describe('Edición de usuario con apellido inválido', () => {
    it('Debería mostrar un error si el apellido contiene caracteres especiales', () => {
      cy.get('#Categoria').select('Activos');
      cy.get('#user-list tr').should('have.length.greaterThan', 0);

      // Verificar que todos los usuarios en la tabla son activos
      allUsers.filter(user => user.status === true).forEach((activeUser) => {
        cy.get('#user-list').contains(activeUser.name);
        cy.get('#user-list').contains(activeUser.lastName);
        cy.get('#user-list').contains(activeUser.email);
        cy.get('#user-list').contains(activeUser.phoneNumber);
        cy.get('#user-list').contains(activeUser.role.name === "ROLE_ADMIN" ? "Administrador" : "Usuario");

        cy.get(':nth-child(1) > :nth-child(7) > .btn-edit').click();
        cy.get(':nth-child(2) > .form-control').clear().type('&&&&&&');
        cy.get(':nth-child(1) > :nth-child(7) > .btn-edit').click();

        cy.get('#message').should('be.visible');
        cy.get('#message-text').should('contain', 'El nombre no puede contener cáracteres especiales');
      });
    });
  });

  describe('Edición de usuario con email inválido', () => {
    it('Debería mostrar un error si el correo no es válido', () => {
      cy.get('#Categoria').select('Activos');
      cy.get('#user-list tr').should('have.length.greaterThan', 0);

      // Verificar que todos los usuarios en la tabla son activos
      allUsers.filter(user => user.status === true).forEach((activeUser) => {
        cy.get('#user-list').contains(activeUser.name);
        cy.get('#user-list').contains(activeUser.lastName);
        cy.get('#user-list').contains(activeUser.email);
        cy.get('#user-list').contains(activeUser.phoneNumber);
        cy.get('#user-list').contains(activeUser.role.name === "ROLE_ADMIN" ? "Administrador" : "Usuario");

        cy.get(':nth-child(1) > :nth-child(7) > .btn-edit').click();
        cy.get(':nth-child(3) > .form-control').clear().type('correo');
        cy.get(':nth-child(1) > :nth-child(7) > .btn-edit').click();

        cy.get('#message').should('be.visible');
        cy.get('#message-text').should('contain', 'El correo debe ser válido');
      });
    });
  });

  describe('Edición de usuario con teléfono inválido', () => {
    it('Debería mostrar un error si el teléfono no es válido', () => {
      cy.get('#Categoria').select('Activos');
      cy.get('#user-list tr').should('have.length.greaterThan', 0);

      // Verificar que todos los usuarios en la tabla son activos
      allUsers.filter(user => user.status === true).forEach((activeUser) => {
        cy.get('#user-list').contains(activeUser.name);
        cy.get('#user-list').contains(activeUser.lastName);
        cy.get('#user-list').contains(activeUser.email);
        cy.get('#user-list').contains(activeUser.phoneNumber);
        cy.get('#user-list').contains(activeUser.role.name === "ROLE_ADMIN" ? "Administrador" : "Usuario");

        cy.get(':nth-child(1) > :nth-child(7) > .btn-edit').click();
        cy.get(':nth-child(4) > .form-control').clear().type('telefono');
        cy.get(':nth-child(1) > :nth-child(7) > .btn-edit').click();

        cy.get('#message').should('be.visible');
        cy.get('#message-text').should('contain', 'El teléfono debe contener solo dígitos numéricos');
      });
    });
  });
});

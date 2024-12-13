describe('Prueba de cambio de estado', () => {
  let allUsers; // Para almacenar todos los usuarios

  beforeEach(() => {
    // Interceptamos la solicitud de los usuarios para poder verificar la respuesta
    cy.intercept('GET', 'http://localhost:8080/user/all').as('getUsers');
    cy.visit('http://localhost:8081/views/userList.html'); // Asegúrate de que la URL sea correcta

    // Esperamos que se carguen los usuarios
    cy.wait('@getUsers').then((interception) => {
      allUsers = interception.response.body.result; // Guardamos todos los usuarios
    });
  });

  it('Prueba de cambio a incativo', () => {
    // Seleccionamos la opción "Activos" en el filtro
    cy.get('#Categoria').select('Activos');

    // Verificamos que la tabla se actualice y solo se muestren los usuarios activos
    cy.get('#user-list tr').should('have.length.greaterThan', 0); // Aseguramos que haya filas en la tabla

    // Verificar que todos los usuarios en la tabla son activos
    allUsers.filter(user => user.status === true).forEach((activeUser) => {
      cy.get('#user-list').contains(activeUser.name);
      cy.get('#user-list').contains(activeUser.lastName);
      cy.get('#user-list').contains(activeUser.email);
      cy.get('#user-list').contains(activeUser.phoneNumber);
      cy.get('#user-list').contains(activeUser.role.name === "ROLE_ADMIN" ? "Administrador" : "Usuario");

      cy.get(':nth-child(1) > :nth-child(6) > .btn-sm').click();
      cy.get('#message').should('be.visible');
      cy.get('#message-text').should('contain', 'Estado del usuario cambiado exitosamente.');
    });
  });

  it('Prueba de cambio a activo', () => {
    // Seleccionamos la opción "Inactivos" en el filtro
    cy.get('#Categoria').select('Inactivos');

    // Verificamos que la tabla se actualice y solo se muestren los usuarios inactivos
    cy.get('#user-list tr').should('have.length.greaterThan', 0); // Aseguramos que haya filas en la tabla

    // Verificar que todos los usuarios en la tabla son inactivos
    allUsers.filter(user => user.status === false).forEach((inactiveUser) => {
      cy.get('#user-list').contains(inactiveUser.name);
      cy.get('#user-list').contains(inactiveUser.lastName);
      cy.get('#user-list').contains(inactiveUser.email);
      cy.get('#user-list').contains(inactiveUser.phoneNumber);
      cy.get('#user-list').contains(inactiveUser.role.name === "ROLE_ADMIN" ? "Administrador" : "Usuario");

      cy.get(':nth-child(1) > :nth-child(6) > .btn-sm').click();
      cy.get('#message').should('be.visible');
      cy.get('#message-text').should('contain', 'Estado del usuario cambiado exitosamente.');
    });
  });
});


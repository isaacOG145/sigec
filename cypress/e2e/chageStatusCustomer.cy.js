describe('Prueba de cambio de estado de cliente', () => {
  let allClients;

  beforeEach(() => {

    cy.intercept('GET', 'http://localhost:8080/customers/all').as('getClients');
    cy.visit('http://127.0.0.1:8081/views/customerList.html'); // Asegúrate de que la URL sea correcta

    cy.wait('@getClients').then((interception) => {
      allClients = interception.response.body.result;
    });
  });

  it('Prueba de cambio a inactivo', () => {
    cy.get('#Categoria').select('Activos');
    cy.get('#customer-list tr').should('have.length.greaterThan', 0);

    // Verificamos que solo se muestren clientes activos
    allClients.filter(client => client.status === true).forEach((activeClient) => {
      cy.get('#customer-list').contains(activeClient.name);
      cy.get('#customer-list').contains(activeClient.email);
      cy.get('#customer-list').contains(activeClient.phoneNumber);
    });

    cy.get('.btn-sm').click();
    cy.get('#message').should('be.visible');
    cy.get('#message-text').should('contain', 'Estado del cliente actualizado correctamente');
  });

  it('Prueba de cambio a activo', () => {
    cy.get('#Categoria').select('Inactivos');
    cy.get('#customer-list tr').should('have.length.greaterThan', 0);

    allClients.filter(client => client.status === false).forEach((inactiveClient) => {
      cy.get('#customer-list').contains(inactiveClient.name);
      cy.get('#customer-list').contains(inactiveClient.email);
      cy.get('#customer-list').contains(inactiveClient.phoneNumber);

      cy.get(':nth-child(2) > :nth-child(4) > .btn-sm').click();
      cy.get('#message').should('be.visible');
      cy.get('#message-text').should('contain', 'Estado del cliente actualizado correctamente');
    });
  });


});

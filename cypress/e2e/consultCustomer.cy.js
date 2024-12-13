describe('Prueba de filtro de clientes', () => {
  let allClients;

  beforeEach(() => {

    cy.intercept('GET', 'http://localhost:8080/customers/all').as('getClients');
    cy.visit('http://localhost:8081/views/customerList.html'); // Asegúrate de que la URL sea correcta

    cy.wait('@getClients').then((interception) => {
      allClients = interception.response.body.result;
    });
  });

  it('Prueba de filtro de clientes activos', () => {
    cy.get('#Categoria').select('Activos');
    cy.get('#customer-list tr').should('have.length.greaterThan', 0);

    // Verificamos que solo se muestren clientes activos
    allClients.filter(client => client.status === true).forEach((activeClient) => {
      cy.get('#customer-list').contains(activeClient.name);
      cy.get('#customer-list').contains(activeClient.email);
      cy.get('#customer-list').contains(activeClient.phoneNumber);
    });
  });

  it('prueba de filtro de clientes inactivos', () => {
    cy.get('#Categoria').select('Inactivos');
    cy.get('#customer-list tr').should('have.length.greaterThan', 0);

    allClients.filter(client => client.status === false).forEach((inactiveClient) => {
      cy.get('#customer-list').contains(inactiveClient.name);
      cy.get('#customer-list').contains(inactiveClient.email);
      cy.get('#customer-list').contains(inactiveClient.phoneNumber);
    });
  });
});

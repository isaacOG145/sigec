describe('Prueba de edicion de clientes', () => {
  let allClients;

  beforeEach(() => {

    cy.intercept('GET', 'http://localhost:8080/customers/all').as('getClients');
    cy.visit('http://127.0.0.1:8081/views/customerList.html'); // Asegúrate de que la URL sea correcta

    cy.wait('@getClients').then((interception) => {
      allClients = interception.response.body.result;
    });
  });

  it('Prueba de edicion de cliente exitosa', () => {
    cy.get('#Categoria').select('Activos');
    cy.get('#customer-list tr').should('have.length.greaterThan', 0);

    // Verificamos que solo se muestren clientes activos
    allClients.filter(client => client.status === true).forEach((activeClient) => {
      cy.get('#customer-list').contains(activeClient.name);
      cy.get('#customer-list').contains(activeClient.email);
      cy.get('#customer-list').contains(activeClient.phoneNumber);

      cy.get('.btn-edit').click();
      cy.get(':nth-child(1) > .form-control').clear().type('Pablo');
      cy.get('.btn-edit').click()

      cy.get('#message').should('be.visible');
      cy.get('#message-text').should('contain', 'Usuario editado correctamente');
    });
  });

  it('Prueba de edicion de cliente con nombre invalido', () => {
    cy.get('#Categoria').select('Activos');
    cy.get('#customer-list tr').should('have.length.greaterThan', 0);

    // Verificamos que solo se muestren clientes activos
    allClients.filter(client => client.status === true).forEach((activeClient) => {
      cy.get('#customer-list').contains(activeClient.name);
      cy.get('#customer-list').contains(activeClient.email);
      cy.get('#customer-list').contains(activeClient.phoneNumber);

      cy.get('.btn-edit').click();
      cy.get(':nth-child(1) > .form-control').clear().type('%%%%%%%');
      cy.get('.btn-edit').click()

      cy.get('#message').should('be.visible');
      cy.get('#message-text').should('contain', 'El nombre no puede contener caracteres especiales');
    });
  });

  it('Prueba de edicion de cliente con correo invalido', () => {
    cy.get('#Categoria').select('Activos');
    cy.get('#customer-list tr').should('have.length.greaterThan', 0);

    // Verificamos que solo se muestren clientes activos
    allClients.filter(client => client.status === true).forEach((activeClient) => {
      cy.get('#customer-list').contains(activeClient.name);
      cy.get('#customer-list').contains(activeClient.email);
      cy.get('#customer-list').contains(activeClient.phoneNumber);

      cy.get('.btn-edit').click();
      cy.get(':nth-child(2) > .form-control').clear().type('correo');
      cy.get('.btn-edit').click()

      cy.get('#message').should('be.visible');
      cy.get('#message-text').should('contain', 'El correo debe ser válido');
    });
  });

  it('Prueba de edicion de cliente con telefono invalido', () => {
    cy.get('#Categoria').select('Activos');
    cy.get('#customer-list tr').should('have.length.greaterThan', 0);

    // Verificamos que solo se muestren clientes activos
    allClients.filter(client => client.status === true).forEach((activeClient) => {
      cy.get('#customer-list').contains(activeClient.name);
      cy.get('#customer-list').contains(activeClient.email);
      cy.get('#customer-list').contains(activeClient.phoneNumber);

      cy.get('.btn-edit').click();
      cy.get(':nth-child(3) > .form-control').clear().type('tel');
      cy.get('.btn-edit').click()

      cy.get('#message').should('be.visible');
      cy.get('#message-text').should('contain', 'El teléfono debe contener solo 10 dígitos numéricos');
    });
  });


});

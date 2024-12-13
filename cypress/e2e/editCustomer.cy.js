describe('Prueba de edición de cliente exitosa', () => {
  let allClients;

  beforeEach(() => {
    cy.intercept('GET', 'http://localhost:8080/customers/all').as('getClients');
    cy.visit('http://localhost:8081/views/customerList.html'); // Asegúrate de que la URL sea correcta

    cy.wait('@getClients').then((interception) => {
      allClients = interception.response.body.result;
    });
  });

  it('Debería permitir la edición del nombre del cliente correctamente', () => {
    cy.get('#Categoria').select('Activos');
    cy.get('#customer-list tr').should('have.length.greaterThan', 0);

    // Verificamos que solo se muestren clientes activos
    allClients.filter(client => client.status === true).forEach((activeClient) => {
      cy.get('#customer-list').contains(activeClient.name);
      cy.get('#customer-list').contains(activeClient.email);
      cy.get('#customer-list').contains(activeClient.phoneNumber);

      // Hacemos clic en el botón de edición y cambiamos el nombre
      cy.get('.btn-edit').click();
      cy.get(':nth-child(1) > .form-control').clear().type('Pablo');
      cy.get('.btn-edit').click();

      // Verificamos que el mensaje de éxito se muestra
      cy.get('#message').should('be.visible');
      cy.get('#message-text').should('contain', 'Usuario editado correctamente');
    });
  });
});

describe('Prueba de edición de cliente con nombre inválido', () => {
  let allClients;

  beforeEach(() => {
    cy.intercept('GET', 'http://localhost:8080/customers/all').as('getClients');
    cy.visit('http://localhost:8081/views/customerList.html'); // Asegúrate de que la URL sea correcta

    cy.wait('@getClients').then((interception) => {
      allClients = interception.response.body.result;
    });
  });

  it('No debería permitir la edición con un nombre inválido', () => {
    cy.get('#Categoria').select('Activos');
    cy.get('#customer-list tr').should('have.length.greaterThan', 0);

    // Verificamos que solo se muestren clientes activos
    allClients.filter(client => client.status === true).forEach((activeClient) => {
      cy.get('#customer-list').contains(activeClient.name);
      cy.get('#customer-list').contains(activeClient.email);
      cy.get('#customer-list').contains(activeClient.phoneNumber);

      // Intentamos editar con un nombre inválido
      cy.get('.btn-edit').click();
      cy.get(':nth-child(1) > .form-control').clear().type('%%%%%%%');
      cy.get('.btn-edit').click();

      // Verificamos que el mensaje de error sea visible
      cy.get('#message').should('be.visible');
      cy.get('#message-text').should('contain', 'El nombre no puede contener caracteres especiales');
    });
  });
});

describe('Prueba de edición de cliente con correo inválido', () => {
  let allClients;

  beforeEach(() => {
    cy.intercept('GET', 'http://localhost:8080/customers/all').as('getClients');
    cy.visit('http://localhost:8081/views/customerList.html'); // Asegúrate de que la URL sea correcta

    cy.wait('@getClients').then((interception) => {
      allClients = interception.response.body.result;
    });
  });

  it('No debería permitir la edición con un correo inválido', () => {
    cy.get('#Categoria').select('Activos');
    cy.get('#customer-list tr').should('have.length.greaterThan', 0);

    // Verificamos que solo se muestren clientes activos
    allClients.filter(client => client.status === true).forEach((activeClient) => {
      cy.get('#customer-list').contains(activeClient.name);
      cy.get('#customer-list').contains(activeClient.email);
      cy.get('#customer-list').contains(activeClient.phoneNumber);

      // Intentamos editar con un correo inválido
      cy.get('.btn-edit').click();
      cy.get(':nth-child(2) > .form-control').clear().type('correo');
      cy.get('.btn-edit').click();

      // Verificamos que el mensaje de error sea visible
      cy.get('#message').should('be.visible');
      cy.get('#message-text').should('contain', 'El correo debe ser válido');
    });
  });
});

describe('Prueba de edición de cliente con teléfono inválido', () => {
  let allClients;

  beforeEach(() => {
    cy.intercept('GET', 'http://localhost:8080/customers/all').as('getClients');
    cy.visit('http://localhost:8081/views/customerList.html'); // Asegúrate de que la URL sea correcta

    cy.wait('@getClients').then((interception) => {
      allClients = interception.response.body.result;
    });
  });

  it('No debería permitir la edición con un teléfono inválido', () => {
    cy.get('#Categoria').select('Activos');
    cy.get('#customer-list tr').should('have.length.greaterThan', 0);

    // Verificamos que solo se muestren clientes activos
    allClients.filter(client => client.status === true).forEach((activeClient) => {
      cy.get('#customer-list').contains(activeClient.name);
      cy.get('#customer-list').contains(activeClient.email);
      cy.get('#customer-list').contains(activeClient.phoneNumber);

      // Intentamos editar con un teléfono inválido
      cy.get('.btn-edit').click();
      cy.get(':nth-child(3) > .form-control').clear().type('tel');
      cy.get('.btn-edit').click();

      // Verificamos que el mensaje de error sea visible
      cy.get('#message').should('be.visible');
      cy.get('#message-text').should('contain', 'El teléfono debe contener solo 10 dígitos numéricos');
    });
  });
});

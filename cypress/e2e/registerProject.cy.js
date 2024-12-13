describe('Registro de Proyecto Exitoso', () => {
  it('Debería registrar un proyecto correctamente', () => {
    cy.request('GET', 'http://localhost:8080/customers/active').then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body.result.length).to.be.greaterThan(0);
      const customerId = response.body.result[0].id;

      cy.request('GET', 'http://localhost:8080/projectCat/active').then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body.result.length).to.be.greaterThan(0);
        const categoryId = response.body.result[0].id;

        cy.visit('http://localhost:8081/views/projectRegister.html');
        cy.get('#name').type('Nuevo Proyecto');
        cy.get('#abbreviation').type('NP');
        cy.get('#description').type('Este es un proyecto válido');
        cy.get('#category').select(categoryId);
        cy.get('#customer').select(customerId);
        cy.get('#project-form').submit();

        cy.get('#message').should('be.visible');
        cy.get('#message-text').should('contain', 'Proyecto guardado exitosamente');
      });
    });
  });
});

describe('Registro de Proyecto con Nombre Inválido', () => {
  it('Debería mostrar un error por nombre inválido', () => {
    cy.request('GET', 'http://localhost:8080/customers/active').then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body.result.length).to.be.greaterThan(0);
      const customerId = response.body.result[0].id;

      cy.request('GET', 'http://localhost:8080/projectCat/active').then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body.result.length).to.be.greaterThan(0);
        const categoryId = response.body.result[0].id;

        cy.visit('http://localhost:8081/views/projectRegister.html');
        cy.get('#name').type('%%%%%%%%%%%');
        cy.get('#abbreviation').type('NP1');
        cy.get('#description').type('Este es un proyecto inválido');
        cy.get('#category').select(categoryId);
        cy.get('#customer').select(customerId);
        cy.get('#project-form').submit();

        cy.get('#message').should('be.visible');
        cy.get('#message-text').should('contain', 'El nombre no puede contener cáracteres especiales');
      });
    });
  });
});

describe('Registro de Proyecto con Abreviación Inválida', () => {
  it('Debería mostrar un error por abreviación inválida', () => {
    cy.request('GET', 'http://localhost:8080/customers/active').then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body.result.length).to.be.greaterThan(0);
      const customerId = response.body.result[0].id;

      cy.request('GET', 'http://localhost:8080/projectCat/active').then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body.result.length).to.be.greaterThan(0);
        const categoryId = response.body.result[0].id;

        cy.visit('http://localhost:8081/views/projectRegister.html');
        cy.get('#name').type('nuevo proyecto dos');
        cy.get('#abbreviation').type('!!!!!');
        cy.get('#description').type('Este es un proyecto inválido');
        cy.get('#category').select(categoryId);
        cy.get('#customer').select(customerId);
        cy.get('#project-form').submit();

        cy.get('#message').should('be.visible');
        cy.get('#message-text').should('contain', 'La abreviación no puede contener cáracteres especiales');
      });
    });
  });
});

describe('Registro de Proyecto con Descripción Inválida', () => {
  it('Debería mostrar un error por descripción inválida', () => {
    cy.request('GET', 'http://localhost:8080/customers/active').then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body.result.length).to.be.greaterThan(0);
      const customerId = response.body.result[0].id;

      cy.request('GET', 'http://localhost:8080/projectCat/active').then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body.result.length).to.be.greaterThan(0);
        const categoryId = response.body.result[0].id;

        cy.visit('http://localhost:8081/views/projectRegister.html');
        cy.get('#name').type('nuevo proyecto tres');
        cy.get('#abbreviation').type('NPT');
        cy.get('#description').type('/////////////////');
        cy.get('#category').select(categoryId);
        cy.get('#customer').select(customerId);
        cy.get('#project-form').submit();

        cy.get('#message').should('be.visible');
        cy.get('#message-text').should('contain', 'La descripción no puede contener cáracteres especiales');
      });
    });
  });
});

describe('Registro de Proyecto con Categoría Faltante', () => {
  it('Debería mostrar un error por falta de categoría', () => {
    cy.request('GET', 'http://localhost:8080/customers/active').then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body.result.length).to.be.greaterThan(0);
      const customerId = response.body.result[0].id;

      cy.request('GET', 'http://localhost:8080/projectCat/active').then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body.result.length).to.be.greaterThan(0);
        const categoryId = response.body.result[0].id;

        cy.visit('http://localhost:8081/views/projectRegister.html');
        cy.get('#name').type('Nuevo Proyecto cuatro');
        cy.get('#abbreviation').type('NPC');
        cy.get('#description').type('Este es un proyecto válido');
        cy.get('#customer').select(customerId);
        cy.get('#project-form').submit();

        cy.get('#message').should('be.visible');
        cy.get('#message-text').should('contain', 'Por favor, llena todos los campos. Faltan: projectCategoryId');
      });
    });
  });
});

describe('Registro de Proyecto con Cliente Faltante', () => {
  it('Debería mostrar un error por falta de cliente', () => {
    cy.request('GET', 'http://localhost:8080/customers/active').then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body.result.length).to.be.greaterThan(0);
      const customerId = response.body.result[0].id;

      cy.request('GET', 'http://localhost:8080/projectCat/active').then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body.result.length).to.be.greaterThan(0);
        const categoryId = response.body.result[0].id;

        cy.visit('http://localhost:8081/views/projectRegister.html');
        cy.get('#name').type('Nuevo Proyecto');
        cy.get('#abbreviation').type('NP');
        cy.get('#description').type('Este es un proyecto válido');
        cy.get('#category').select(categoryId);
        cy.get('#project-form').submit();

        cy.get('#message').should('be.visible');
        cy.get('#message-text').should('contain', 'Por favor, llena todos los campos. Faltan: customerId');
      });
    });
  });
});

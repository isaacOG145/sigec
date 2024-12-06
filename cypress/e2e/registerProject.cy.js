describe('Formulario de Registro de Proyecto', () => {
  beforeEach(() => {

    cy.request('GET', 'http://localhost:8080/customers/active').then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body.result.length).to.be.greaterThan(0);
    });

    cy.request('GET', 'http://localhost:8080/projectCat/active').then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body.result.length).to.be.greaterThan(0);
    });

    cy.visit('http://127.0.0.1:8081/views/projectRegister.html');
  });

  it('debe registrar un proyecto correctamente con datos válidos', () => {
    cy.request('GET', 'http://localhost:8080/customers/active').then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body.result.length).to.be.greaterThan(0);
      const customerId = response.body.result[0].id;

      cy.request('GET', 'http://localhost:8080/projectCat/active').then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body.result.length).to.be.greaterThan(0);
        const categoryId = response.body.result[0].id;

        // Llenamos el formulario con datos válidos
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

  it('debe registrar aparecer un error de al ingresar el nombre', () => {
    cy.request('GET', 'http://localhost:8080/customers/active').then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body.result.length).to.be.greaterThan(0);
      const customerId = response.body.result[0].id;

      cy.request('GET', 'http://localhost:8080/projectCat/active').then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body.result.length).to.be.greaterThan(0);
        const categoryId = response.body.result[0].id;

        // Llenamos el formulario con datos válidos
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

  it('debe registrar aparecer un error de al ingresar la abreviación', () => {
    cy.request('GET', 'http://localhost:8080/customers/active').then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body.result.length).to.be.greaterThan(0);
      const customerId = response.body.result[0].id;

      cy.request('GET', 'http://localhost:8080/projectCat/active').then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body.result.length).to.be.greaterThan(0);
        const categoryId = response.body.result[0].id;

        // Llenamos el formulario con datos válidos
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

  it('debe registrar aparecer un error de al ingresar la descripción', () => {
    cy.request('GET', 'http://localhost:8080/customers/active').then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body.result.length).to.be.greaterThan(0);
      const customerId = response.body.result[0].id;

      cy.request('GET', 'http://localhost:8080/projectCat/active').then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body.result.length).to.be.greaterThan(0);
        const categoryId = response.body.result[0].id;

        // Llenamos el formulario con datos válidos
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

  it('debe registrar enviar un mensaje de error al no ingresar categoria', () => {
    cy.request('GET', 'http://localhost:8080/customers/active').then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body.result.length).to.be.greaterThan(0);
      const customerId = response.body.result[0].id;

      cy.request('GET', 'http://localhost:8080/projectCat/active').then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body.result.length).to.be.greaterThan(0);
        const categoryId = response.body.result[0].id;

        // Llenamos el formulario con datos válidos
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

  it('debe registrar un proyecto correctamente con datos válidos', () => {
    cy.request('GET', 'http://localhost:8080/customers/active').then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body.result.length).to.be.greaterThan(0);
      const customerId = response.body.result[0].id;

      cy.request('GET', 'http://localhost:8080/projectCat/active').then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body.result.length).to.be.greaterThan(0);
        const categoryId = response.body.result[0].id;

        // Llenamos el formulario con datos válidos
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

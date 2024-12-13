describe('Prueba de edición de categoría exitosa', () => {
  let allCategories;

  beforeEach(() => {
    cy.intercept('GET', 'http://localhost:8080/projectCat/all').as('getCategories');
    cy.visit('http://localhost:8081/views/categoryList.html');

    cy.wait('@getCategories').then((interception) => {
      allCategories = interception.response.body.result;
    });
  });

  it('Debería permitir la actualización del nombre de categoría correctamente', () => {
    cy.get('#Categoria').select('Activos');
    cy.get('#category-list tr').should('have.length.greaterThan', 0);

    // Verificamos que solo se muestren categorías activas
    allCategories.filter(category => category.status === true).forEach((activeCategory) => {
      cy.get('#category-list').contains(activeCategory.name);
      cy.get('#category-list').contains(activeCategory.description);

      // Intentamos actualizar el nombre de la categoría
      cy.get('.btn-edit').click();
      cy.get(':nth-child(1) > .form-control').clear().type('categoria test');
      cy.get(':nth-child(1) > :nth-child(4) > .btn-edit').click();

      // Verificamos que el mensaje de éxito sea visible
      cy.get('#message').should('be.visible');
      cy.get('#message-text').should('contain', 'Categoría actualizada correctamente');
    });
  });
});

describe('Prueba de edición de categoría con nombre inválido', () => {
  let allCategories;

  beforeEach(() => {
    cy.intercept('GET', 'http://localhost:8080/projectCat/all').as('getCategories');
    cy.visit('http://localhost:8081/views/categoryList.html');

    cy.wait('@getCategories').then((interception) => {
      allCategories = interception.response.body.result;
    });
  });

  it('No debería permitir la actualización con un nombre de categoría inválido', () => {
    cy.get('#Categoria').select('Activos');
    cy.get('#category-list tr').should('have.length.greaterThan', 0);

    // Verificamos que solo se muestren categorías activas
    allCategories.filter(category => category.status === true).forEach((activeCategory) => {
      cy.get('#category-list').contains(activeCategory.name);
      cy.get('#category-list').contains(activeCategory.description);

      // Intentamos editar con un nombre inválido
      cy.get('.btn-edit').click();
      cy.get(':nth-child(1) > .form-control').clear().type('&&&&&&&&&&&&&&');
      cy.get(':nth-child(1) > :nth-child(4) > .btn-edit').click();

      // Verificamos que el mensaje de error sea visible
      cy.get('#message').should('be.visible');
      cy.get('#message-text').should('contain', 'Error al guardar los cambios');
    });
  });
});

describe('Prueba de edición de categoría con descripción inválida', () => {
  let allCategories;

  beforeEach(() => {
    cy.intercept('GET', 'http://localhost:8080/projectCat/all').as('getCategories');
    cy.visit('http://localhost:8081/views/categoryList.html');

    cy.wait('@getCategories').then((interception) => {
      allCategories = interception.response.body.result;
    });
  });

  it('No debería permitir la actualización con una descripción inválida', () => {
    cy.get('#Categoria').select('Activos');
    cy.get('#category-list tr').should('have.length.greaterThan', 0);

    // Verificamos que solo se muestren categorías activas
    allCategories.filter(category => category.status === true).forEach((activeCategory) => {
      cy.get('#category-list').contains(activeCategory.name);
      cy.get('#category-list').contains(activeCategory.description);

      // Intentamos editar con una descripción inválida
      cy.get('.btn-edit').click();
      cy.get(':nth-child(2) > .form-control').clear().type('===========');
      cy.get(':nth-child(1) > :nth-child(4) > .btn-edit').click();

      // Verificamos que el mensaje de error sea visible
      cy.get('#message').should('be.visible');
      cy.get('#message-text').should('contain', 'Error al guardar los cambios');
    });
  });
});

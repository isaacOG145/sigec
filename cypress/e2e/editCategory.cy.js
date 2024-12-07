describe('Prueba de edicion de categorias', () => {

  let allCategories;

  beforeEach(() => {

    cy.intercept('GET', 'http://localhost:8080/projectCat/all').as('getCategories');
    cy.visit('http://127.0.0.1:8081/views/categoryList.html');

    cy.wait('@getCategories').then((interception) => {
      allCategories = interception.response.body.result;
    });
  });

  it('Prueba de actualizacion de nombre de categoria exitoso', () => {
    cy.get('#Categoria').select('Activos');
    cy.get('#category-list tr').should('have.length.greaterThan', 0);


    allCategories.filter(category => category.status === true).forEach((activeCategory) => {

      cy.get('#category-list').contains(activeCategory.name);
      cy.get('#category-list').contains(activeCategory.description);

      cy.get('.btn-edit').click();
      cy.get(':nth-child(1) > .form-control').clear().type('categoria test');
      cy.get(':nth-child(1) > :nth-child(4) > .btn-edit').click()

      cy.get('#message').should('be.visible');
      cy.get('#message-text').should('contain', 'Categoría actualizada correctamente');

    });
  });

  it('Prueba de actualizacion de categoria con nombre invalido', () => {
    cy.get('#Categoria').select('Activos');
    cy.get('#category-list tr').should('have.length.greaterThan', 0);


    allCategories.filter(category => category.status === true).forEach((activeCategory) => {

      cy.get('#category-list').contains(activeCategory.name);
      cy.get('#category-list').contains(activeCategory.description);

      cy.get('.btn-edit').click();
      cy.get(':nth-child(1) > .form-control').clear().type('&&&&&&&&&&&&&&');
      cy.get(':nth-child(1) > :nth-child(4) > .btn-edit').click()

      cy.get('#message').should('be.visible');
      cy.get('#message-text').should('contain', 'Error al guardar los cambios');

    });
  });

  it('Prueba de actualizacion de categoria con descripcion invalida', () => {
    cy.get('#Categoria').select('Activos');
    cy.get('#category-list tr').should('have.length.greaterThan', 0);


    allCategories.filter(category => category.status === true).forEach((activeCategory) => {

      cy.get('#category-list').contains(activeCategory.name);
      cy.get('#category-list').contains(activeCategory.description);

      cy.get('.btn-edit').click();
      cy.get(':nth-child(2) > .form-control').clear().type('===========');
      cy.get(':nth-child(1) > :nth-child(4) > .btn-edit').click()

      cy.get('#message').should('be.visible');
      cy.get('#message-text').should('contain', 'Error al guardar los cambios');

    });
  });


});

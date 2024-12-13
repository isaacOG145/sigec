describe('Prueba de cambio de estado de categorias', () => {
  let allCategories;

  beforeEach(() => {

    cy.intercept('GET', 'http://localhost:8080/projectCat/all').as('getCategories');
    cy.visit('http://localhost:8081/views/categoryList.html');

    cy.wait('@getCategories').then((interception) => {
      allCategories = interception.response.body.result;
    });
  });

  it('Prueba de cambio a inactivo', () => {
    cy.get('#Categoria').select('Activos');
    cy.get('#category-list tr').should('have.length.greaterThan', 0);


    allCategories.filter(category => category.status === true).forEach((activeCategory) => {

      cy.get('#category-list').contains(activeCategory.name);
      cy.get('#category-list').contains(activeCategory.description);

      cy.get(':nth-child(1) > :nth-child(3) > .btn-sm').click();
      cy.get('#message').should('be.visible');
      cy.get('#message-text').should('contain', 'Estado actualizado correctamente.');
    });
  });

  it('prueba de cambio a activo', () => {
    cy.get('#Categoria').select('Inactivos');
    cy.get('#category-list tr').should('have.length.greaterThan', 0);

    allCategories.filter(category => category.status === false).forEach((inactiveCategory) => {

      cy.get('#category-list').contains(inactiveCategory.name);
      cy.get('#category-list').contains(inactiveCategory.description);

      cy.get(':nth-child(1) > :nth-child(3) > .btn-sm').click();
      cy.get('#message').should('be.visible');
      cy.get('#message-text').should('contain', 'Estado actualizado correctamente.');
    });
  });
});

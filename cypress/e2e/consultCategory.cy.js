describe('Prueba de filtro de categorías de proyectos', () => {
  let allCategories;

  beforeEach(() => {

    cy.intercept('GET', 'http://localhost:8080/projectCat/all').as('getCategories');
    cy.visit('http://localhost:8081/views/categoryList.html');

    cy.wait('@getCategories').then((interception) => {
      allCategories = interception.response.body.result;
    });
  });

  it('Prueba de filtro de categorias activas', () => {
    cy.get('#Categoria').select('Activos');
    cy.get('#category-list tr').should('have.length.greaterThan', 0);


    allCategories.filter(category => category.status === true).forEach((activeCategory) => {

      cy.get('#category-list').contains(activeCategory.name);
      cy.get('#category-list').contains(activeCategory.description);
    });
  });

  it('prueba de filtro de categorias inactivas', () => {
    cy.get('#Categoria').select('Inactivos');
    cy.get('#category-list tr').should('have.length.greaterThan', 0);

    allCategories.filter(category => category.status === false).forEach((inactiveCategory) => {

      cy.get('#category-list').contains(inactiveCategory.name);
      cy.get('#category-list').contains(inactiveCategory.description);
    });
  });
});

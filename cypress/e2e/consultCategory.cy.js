describe('Prueba de filtro de categorías de proyectos', () => {
  let allCategories;

  beforeEach(() => {

    cy.intercept('GET', 'http://localhost:8080/projectCat/all').as('getCategories');
    cy.visit('http://127.0.0.1:8081/sigec/views/categoryList.html');

    cy.wait('@getCategories').then((interception) => {
      allCategories = interception.response.body.result;
    });
  });

  it('debe mostrar solo las categorías activas cuando se selecciona "Activos"', () => {
    cy.get('#Categoria').select('Activos');
    cy.get('#category-list tr').should('have.length.greaterThan', 0);


    allCategories.filter(category => category.status === true).forEach((activeCategory) => {

      cy.get('#category-list').contains(activeCategory.name);
      cy.get('#category-list').contains(activeCategory.description);
    });
  });

  it('debe mostrar solo las categorías inactivas cuando se selecciona "Inactivos"', () => {
    cy.get('#Categoria').select('Inactivos');
    cy.get('#category-list tr').should('have.length.greaterThan', 0);

    allCategories.filter(category => category.status === false).forEach((inactiveCategory) => {

      cy.get('#category-list').contains(inactiveCategory.name);
      cy.get('#category-list').contains(inactiveCategory.description);
    });
  });
});

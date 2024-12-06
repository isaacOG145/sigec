describe('Prueba de filtro de proyectos', () => {
  let allProjects;

  beforeEach(() => {

    cy.intercept('GET', 'http://localhost:8080/projects/all').as('getProjects');
    cy.visit('http://127.0.0.1:8081/sigec/views/projectList.html');

    cy.wait('@getProjects').then((interception) => {
      allProjects = interception.response.body.result;
    });
  });

  it('debe mostrar solo los proyectos activos cuando se selecciona "Activos"', () => {
    cy.get('#Categoria').select('Activos');
    cy.get('#projects-list tr').should('have.length.greaterThan', 0);

    // Filtramos los proyectos activos
    allProjects.filter(project => project.status === true).forEach((activeProject) => {
      // Verificamos que se muestren solo proyectos activos en la tabla
      cy.get('#projects-list').contains(activeProject.name);
      cy.get('#projects-list').contains(activeProject.abbreviation);
      cy.get('#projects-list').contains(activeProject.description);
      cy.get('#projects-list').contains(activeProject.customer.name);
      cy.get('#projects-list').contains(activeProject.projectCategory.name);
    });
  });

  it('debe mostrar solo los proyectos inactivos cuando se selecciona "Inactivos"', () => {
    cy.get('#Categoria').select('Inactivos'); // Seleccionamos el filtro "Inactivos"
    cy.get('#projects-list tr').should('have.length.greaterThan', 0); // Verifica que hay proyectos en la lista

    // Filtramos los proyectos inactivos
    allProjects.filter(project => project.status === false).forEach((inactiveProject) => {
      // Verificamos que se muestren solo proyectos inactivos en la tabla
      cy.get('#projects-list').contains(inactiveProject.name);
      cy.get('#projects-list').contains(inactiveProject.abbreviation);
      cy.get('#projects-list').contains(inactiveProject.description);
      cy.get('#projects-list').contains(inactiveProject.customer.name);
      cy.get('#projects-list').contains(inactiveProject.projectCategory.name);
    });
  });
});

describe('Prueba de cambio de estado', () => {
  let allProjects;

  beforeEach(() => {

    cy.intercept('GET', 'http://localhost:8080/projects/all').as('getProjects');
    cy.visit('http://127.0.0.1:8081/views/projectList.html');

    cy.wait('@getProjects').then((interception) => {
      allProjects = interception.response.body.result;
    });
  });

  it('Prueba de cambio a inactivo', () => {
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

      cy.get(':nth-child(1) > :nth-child(6) > .btn-sm').click();
      cy.get('#message').should('be.visible');
      cy.get('#message-text').should('contain', 'Estado actualizado correctamente.');
    });
  });

  it('Prueba de cambio a activo', () => {
    cy.get('#Categoria').select('Inactivos');
    cy.get('#projects-list tr').should('have.length.greaterThan', 0);

    // Filtramos los proyectos inactivos
    allProjects.filter(project => project.status === false).forEach((inactiveProject) => {
      // Verificamos que se muestren solo proyectos inactivos en la tabla
      cy.get('#projects-list').contains(inactiveProject.name);
      cy.get('#projects-list').contains(inactiveProject.abbreviation);
      cy.get('#projects-list').contains(inactiveProject.description);
      cy.get('#projects-list').contains(inactiveProject.customer.name);
      cy.get('#projects-list').contains(inactiveProject.projectCategory.name);

      cy.get(':nth-child(1) > :nth-child(6) > .btn-sm').click();
      cy.get('#message').should('be.visible');
      cy.get('#message-text').should('contain', 'Estado actualizado correctamente.');
    });
  });
});

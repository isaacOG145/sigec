describe('Prueba de edicion de proyecto', () => {
  let allProjects;

  beforeEach(() => {

    cy.intercept('GET', 'http://localhost:8080/projects/all').as('getProjects');
    cy.visit('http://127.0.0.1:8081/views/projectList.html');

    cy.wait('@getProjects').then((interception) => {
      allProjects = interception.response.body.result;
    });
  });

  it('Prueba de edicion de nombre de proyecto', () => {
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

      cy.get(':nth-child(1) > :nth-child(7) > .btn-edit').click();
      cy.get(':nth-child(1) > .form-control').clear().type('superAdmin');
      cy.get(':nth-child(1) > :nth-child(7) > .btn-edit').click()

      cy.get('#message').should('be.visible');
      cy.get('#message-text').should('contain', 'Proyecto actualizado correctamente.');
    });
  });

  it('Prueba de edicion de nombre con datos invalidos', () => {
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

      cy.get(':nth-child(1) > :nth-child(7) > .btn-edit').click();
      cy.get(':nth-child(1) > .form-control').clear().type('&&&&&&&&&&&');
      cy.get(':nth-child(1) > :nth-child(7) > .btn-edit').click()

      cy.get('#message').should('be.visible');
      cy.get('#message-text').should('contain', 'Hubo un problema al guardar los cambios.');
    });
  });

  it('Prueba de edicion de abreviacion con datos invalidos', () => {
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

      cy.get(':nth-child(1) > :nth-child(7) > .btn-edit').click();
      cy.get(':nth-child(2) > .form-control').clear().type('/////////');
      cy.get(':nth-child(1) > :nth-child(7) > .btn-edit').click()

      cy.get('#message').should('be.visible');
      cy.get('#message-text').should('contain', 'Hubo un problema al guardar los cambios.');
    });
  });

  it('Prueba de edicion de descripción con datos invalidos', () => {
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

      cy.get(':nth-child(1) > :nth-child(7) > .btn-edit').click();
      cy.get(':nth-child(3) > .form-control').clear().type('###########');
      cy.get(':nth-child(1) > :nth-child(7) > .btn-edit').click()

      cy.get('#message').should('be.visible');
      cy.get('#message-text').should('contain', 'Hubo un problema al guardar los cambios.');
    });
  });

});

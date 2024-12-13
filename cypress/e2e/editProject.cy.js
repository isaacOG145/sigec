describe('Prueba de edición de proyecto', () => {
  let allProjects;

  beforeEach(() => {
    cy.intercept('GET', 'http://localhost:8080/projects/all').as('getProjects');
    cy.visit('http://localhost:8081/views/projectList.html');

    cy.wait('@getProjects').then((interception) => {
      allProjects = interception.response.body.result;
    });
  });

  describe('Prueba de edición de nombre de proyecto', () => {
    it('Debería actualizar el nombre del proyecto correctamente', () => {
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
        cy.get(':nth-child(1) > :nth-child(7) > .btn-edit').click();

        cy.get('#message').should('be.visible');
        cy.get('#message-text').should('contain', 'Proyecto actualizado correctamente.');
      });
    });
  });

  describe('Prueba de edición de nombre con datos inválidos', () => {
    it('Debería mostrar un error al intentar guardar un nombre inválido', () => {
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
        cy.get(':nth-child(1) > :nth-child(7) > .btn-edit').click();

        cy.get('#message').should('be.visible');
        cy.get('#message-text').should('contain', 'Error al guardar los cambios');
      });
    });
  });

  describe('Prueba de edición de abreviación con datos inválidos', () => {
    it('Debería mostrar un error al intentar guardar una abreviación inválida', () => {
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
        cy.get(':nth-child(1) > :nth-child(7) > .btn-edit').click();

        cy.get('#message').should('be.visible');
        cy.get('#message-text').should('contain', 'Error al guardar los cambios');
      });
    });
  });

  describe('Prueba de edición de descripción con datos inválidos', () => {
    it('Debería mostrar un error al intentar guardar una descripción inválida', () => {
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
        cy.get(':nth-child(1) > :nth-child(7) > .btn-edit').click();

        cy.get('#message').should('be.visible');
        cy.get('#message-text').should('contain', 'Error al guardar los cambios');
      });
    });
  });
});

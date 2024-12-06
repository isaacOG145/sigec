describe('Editar perfil', () => {

  it('editar el nombre del usuario correctamente', () => {

    cy.visit('http://127.0.0.1:8081')

    cy.get('#email').type('admin@domain.com')

    cy.get('#password').type('adminPassword')

    cy.get('button[type="submit"]').click()

    cy.url().should('include', 'http://127.0.0.1:8081/views/projectList.html')

    cy.get('a.nav-link').contains('Perfil').click();

    cy.url().should('include', 'http://127.0.0.1:8081/views/profile.html')

    cy.get('#modify-profile').click();

    cy.get('#nombre').clear().type('newAdmin')

    cy.get('#modify-profile').click();

    cy.get('#message').should('be.visible');
    cy.get('#message-text').should('contain', 'Perfil actualizado correctamente');
  })

  it('Debe mostrar mensaje de error por el nombre', () => {

    cy.visit('http://127.0.0.1:8081')

    cy.get('#email').type('admin@domain.com')

    cy.get('#password').type('adminPassword')

    cy.get('button[type="submit"]').click()

    cy.url().should('include', 'http://127.0.0.1:8081/views/projectList.html')

    cy.get('a.nav-link').contains('Perfil').click();

    cy.url().should('include', 'http://127.0.0.1:8081/views/profile.html')

    cy.get('#modify-profile').click();

    cy.get('#nombre').clear().type('&&&&&&&&')

    cy.get('#modify-profile').click();

    cy.get('#message').should('be.visible');
    cy.get('#message-text').should('contain', 'El nombre no puede contener cáracteres especiales');
  })

  it('Debe mostrar mensaje de error por el apellido', () => {

    cy.visit('http://127.0.0.1:8081')

    cy.get('#email').type('admin@domain.com')

    cy.get('#password').type('adminPassword')

    cy.get('button[type="submit"]').click()

    cy.url().should('include', 'http://127.0.0.1:8081/views/projectList.html')

    cy.get('a.nav-link').contains('Perfil').click();

    cy.url().should('include', 'http://127.0.0.1:8081/views/profile.html')

    cy.get('#modify-profile').click();

    cy.get('#apellido').clear().type('&&&&&&&&')

    cy.get('#modify-profile').click();

    cy.get('#message').should('be.visible');
    cy.get('#message-text').should('contain', 'El nombre no puede contener cáracteres especiales');
  })

  it('Debe mostrar mensaje de error por el email', () => {

    cy.visit('http://127.0.0.1:8081')

    cy.get('#email').type('admin@domain.com')

    cy.get('#password').type('adminPassword')

    cy.get('button[type="submit"]').click()

    cy.url().should('include', 'http://127.0.0.1:8081/views/projectList.html')

    cy.get('a.nav-link').contains('Perfil').click();

    cy.url().should('include', 'http://127.0.0.1:8081/views/profile.html')

    cy.get('#modify-profile').click();

    cy.get('#email').clear().type('correo')

    cy.get('#modify-profile').click();

    cy.get('#message').should('be.visible');
    cy.get('#message-text').should('contain', 'El correo debe ser válido');
  })

  it('Debe mostrar mensaje de error por el telefono', () => {

    cy.visit('http://127.0.0.1:8081')

    cy.get('#email').type('admin@domain.com')

    cy.get('#password').type('adminPassword')

    cy.get('button[type="submit"]').click()

    cy.url().should('include', 'http://127.0.0.1:8081/views/projectList.html')

    cy.get('a.nav-link').contains('Perfil').click();

    cy.url().should('include', 'http://127.0.0.1:8081/views/profile.html')

    cy.get('#modify-profile').click();

    cy.get('#telefono').clear().type('qweqeqw')

    cy.get('#modify-profile').click();

    cy.get('#message').should('be.visible');
    cy.get('#message-text').should('contain', 'El teléfono debe contener solo dígitos numéricos');
  })

  it('Debe cambiar mostrar error porque no coinciden las contraseñas', () => {

    cy.visit('http://127.0.0.1:8081')

    cy.get('#email').type('admin@domain.com')

    cy.get('#password').type('adminPassword')

    cy.get('button[type="submit"]').click()

    cy.url().should('include', 'http://127.0.0.1:8081/views/projectList.html')

    cy.get('a.nav-link').contains('Perfil').click();

    cy.url().should('include', 'http://127.0.0.1:8081/views/profile.html')

    cy.get('#change-password').click();

    cy.url().should('include', 'http://127.0.0.1:8081/views/changePass.html')

    cy.get('#password').type('newAdminPassword')
    cy.get('#confirm-password').type('adminPassword')

    cy.get('.btn').click();

    cy.get('#message').should('be.visible');
    cy.get('#message-text').should('contain', 'Las contraseñas no coinciden.');
  })

  it('Debe cambiar contraseña correctamente', () => {

    cy.visit('http://127.0.0.1:8081')

    cy.get('#email').type('admin@domain.com')

    cy.get('#password').type('adminPassword')

    cy.get('button[type="submit"]').click()

    cy.url().should('include', 'http://127.0.0.1:8081/views/projectList.html')

    cy.get('a.nav-link').contains('Perfil').click();

    cy.url().should('include', 'http://127.0.0.1:8081/views/profile.html')

    cy.get('#change-password').click();

    cy.url().should('include', 'http://127.0.0.1:8081/views/changePass.html')

    cy.get('#password').type('newAdminPassword')
    cy.get('#confirm-password').type('newAdminPassword')

    cy.get('.btn').click();

    cy.get('#message').should('be.visible');
    cy.get('#message-text').should('contain', 'Cambiando la contraseña, por favor espera...');

    cy.get('#message').should('be.visible');
    cy.get('#message-text').should('contain', 'Contraseña actualizada correctamente. Ahora puedes iniciar sesión con tu nueva contraseña.');

    cy.url().should('include', 'http://127.0.0.1:8081')
  })

  it('login con la nueva contraseña', () => {

    cy.visit('http://127.0.0.1:8081')

    cy.get('#email').type('admin@domain.com')

    cy.get('#password').type('newAdminPassword')

    cy.get('button[type="submit"]').click()

    cy.url().should('include', 'http://127.0.0.1:8081/views/projectList.html')

  })

})

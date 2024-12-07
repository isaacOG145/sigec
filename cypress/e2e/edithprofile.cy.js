describe('Editar perfil', () => {

  it('Prueba de actualizacion de nombre exitosa', () => {

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

  it('Prueba de actualizacion de nombre con nombre invalido', () => {

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

  it('Prueba de actualizacion con apellido invalido', () => {

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

  it('Prueba de actualizacion con email invalido', () => {

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

  it('Prueba de actualizacion con telefono invalido', () => {

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

  it('Prueba de actualizacion con con contraseñas repetidas', () => {

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

  it('Prueba de actualizacion de contraseña exitosa', () => {

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

  it('Prueba de inicio de sesion con nueva contraseña', () => {

    cy.visit('http://127.0.0.1:8081')

    cy.get('#email').type('admin@domain.com')

    cy.get('#password').type('newAdminPassword')

    cy.get('button[type="submit"]').click()

    cy.url().should('include', 'http://127.0.0.1:8081/views/projectList.html')

  })

})

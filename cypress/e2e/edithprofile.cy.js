describe('Editar perfil', () => {

  describe('Prueba de actualización de nombre exitosa', () => {
    it('Debe actualizar el nombre correctamente', () => {
      cy.visit('http://localhost:8081')

      cy.get('#email').type('admin@domain.com')
      cy.get('#password').type('adminPassword')
      cy.get('button[type="submit"]').click()

      cy.url().should('include', 'http://localhost:8081/views/projectList.html')

      cy.get('a.nav-link').contains('Perfil').click();
      cy.url().should('include', 'http://localhost:8081/views/profile.html')

      cy.get('#modify-profile').click();
      cy.get('#nombre').clear().type('newAdmin')
      cy.get('#modify-profile').click();

      cy.get('#message').should('be.visible');
      cy.get('#message-text').should('contain', 'Perfil actualizado correctamente');
    })
  })

  describe('Prueba de actualización de nombre con nombre inválido', () => {
    it('Debe mostrar un mensaje de error cuando el nombre contiene caracteres especiales', () => {
      cy.visit('http://localhost:8081')

      cy.get('#email').type('admin@domain.com')
      cy.get('#password').type('adminPassword')
      cy.get('button[type="submit"]').click()

      cy.url().should('include', 'http://localhost:8081/views/projectList.html')

      cy.get('a.nav-link').contains('Perfil').click();
      cy.url().should('include', 'http://localhost:8081/views/profile.html')

      cy.get('#modify-profile').click();
      cy.get('#nombre').clear().type('&&&&&&&&')
      cy.get('#modify-profile').click();

      cy.get('#message').should('be.visible');
      cy.get('#message-text').should('contain', 'El nombre no puede contener caracteres especiales');
    })
  })

  describe('Prueba de actualización con apellido inválido', () => {
    it('Debe mostrar un mensaje de error cuando el apellido contiene caracteres especiales', () => {
      cy.visit('http://localhost:8081')

      cy.get('#email').type('admin@domain.com')
      cy.get('#password').type('adminPassword')
      cy.get('button[type="submit"]').click()

      cy.url().should('include', 'http://localhost:8081/views/projectList.html')

      cy.get('a.nav-link').contains('Perfil').click();
      cy.url().should('include', 'http://localhost:8081/views/profile.html')

      cy.get('#modify-profile').click();
      cy.get('#apellido').clear().type('&&&&&&&&')
      cy.get('#modify-profile').click();

      cy.get('#message').should('be.visible');
      cy.get('#message-text').should('contain', 'El apellido no puede contener caracteres especiales');
    })
  })

  describe('Prueba de actualización con email inválido', () => {
    it('Debe mostrar un mensaje de error cuando el correo no es válido', () => {
      cy.visit('http://localhost:8081')

      cy.get('#email').type('admin@domain.com')
      cy.get('#password').type('adminPassword')
      cy.get('button[type="submit"]').click()

      cy.url().should('include', 'http://localhost:8081/views/projectList.html')

      cy.get('a.nav-link').contains('Perfil').click();
      cy.url().should('include', 'http://localhost:8081/views/profile.html')

      cy.get('#modify-profile').click();
      cy.get('#email').clear().type('correo')
      cy.get('#modify-profile').click();

      cy.get('#message').should('be.visible');
      cy.get('#message-text').should('contain', 'El correo debe ser válido');
    })
  })

  describe('Prueba de actualización con teléfono inválido', () => {
    it('Debe mostrar un mensaje de error cuando el teléfono contiene caracteres no numéricos', () => {
      cy.visit('http://localhost:8081/')

      cy.get('#email').type('admin@domain.com')
      cy.get('#password').type('adminPassword')
      cy.get('button[type="submit"]').click()

      cy.url().should('include', 'http://localhost:8081/views/projectList.html')

      cy.get('a.nav-link').contains('Perfil').click();
      cy.url().should('include', 'http://localhost:8081/views/profile.html')

      cy.get('#modify-profile').click();
      cy.get('#telefono').clear().type('qweqeqw')
      cy.get('#modify-profile').click();

      cy.get('#message').should('be.visible');
      cy.get('#message-text').should('contain', 'El teléfono debe contener solo dígitos numéricos');
    })
  })

  describe('Prueba de actualización con contraseñas repetidas', () => {
    it('Debe mostrar un mensaje de error si las contraseñas no coinciden', () => {
      cy.visit('http://127.0.0.1:8081')

      cy.get('#email').type('admin@domain.com')
      cy.get('#password').type('adminPassword')
      cy.get('button[type="submit"]').click()

      cy.url().should('include', 'http://localhost:8081/views/projectList.html')

      cy.get('a.nav-link').contains('Perfil').click();
      cy.url().should('include', 'http://localhost:8081/views/profile.html')

      cy.get('#change-password').click();
      cy.url().should('include', 'http://localhost:8081/views/changePass.html')

      cy.get('#password').type('newAdminPassword')
      cy.get('#confirm-password').type('adminPassword')

      cy.get('.btn').click();

      cy.get('#message').should('be.visible');
      cy.get('#message-text').should('contain', 'Las contraseñas no coinciden.');
    })
  })

  describe('Prueba de actualización de contraseña exitosa', () => {
    it('Debe cambiar la contraseña correctamente', () => {
      cy.visit('http://localhost:8081')

      cy.get('#email').type('admin@domain.com')
      cy.get('#password').type('adminPassword')
      cy.get('button[type="submit"]').click()

      cy.url().should('include', 'http://localhost:8081/views/projectList.html')

      cy.get('a.nav-link').contains('Perfil').click();
      cy.url().should('include', 'http://localhost:8081/views/profile.html')

      cy.get('#change-password').click();
      cy.url().should('include', 'http://localhost:8081/views/changePass.html')

      cy.get('#password').type('newAdminPassword')
      cy.get('#confirm-password').type('newAdminPassword')

      cy.get('.btn').click();

      cy.get('#message').should('be.visible');
      cy.get('#message-text').should('contain', 'Cambiando la contraseña, por favor espera...');
      cy.get('#message').should('be.visible');
      cy.get('#message-text').should('contain', 'Contraseña actualizada correctamente. Ahora puedes iniciar sesión con tu nueva contraseña.');

      cy.url().should('include', 'http://localhost:8081')
    })
  })

  describe('Prueba de inicio de sesión con nueva contraseña', () => {
    it('Debe iniciar sesión con la nueva contraseña', () => {
      cy.visit('http://localhost:8081')

      cy.get('#email').type('admin@domain.com')
      cy.get('#password').type('newAdminPassword')
      cy.get('button[type="submit"]').click()

      cy.url().should('include', 'http://localhost:8081/views/projectList.html')
    })
  })

})

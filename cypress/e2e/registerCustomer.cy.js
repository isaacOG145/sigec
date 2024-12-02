describe('Prueba de registro de cliente', () => {
  it('Debe registrar un cliente correctamente', () => {
    
    cy.visit('http://127.0.0.1:8081/sigec/views/customerRegister');  

    
    cy.get('#name').type('Juan Pérez'); 
    cy.get('#email').type('juan.perez@example.com'); 
    cy.get('#phone').type('5551234567'); 

    cy.get('#customer-form').submit();

    cy.get('#message').should('be.visible');
    cy.get('#message-text').should('contain', 'Cliente guardado exitosamente'); 

  
    cy.get('#name').should('have.value', ''); 
    cy.get('#email').should('have.value', ''); 
    cy.get('#phone').should('have.value', ''); 
  });
});

describe('Prueba de registro de cliente con correo repetido', () => {
  it('Debe dar un mensaje de correo registrado', () => {
    
    cy.visit('http://127.0.0.1:8081/sigec/views/customerRegister');  

    
    cy.get('#name').type('Juan Pérez Valle'); 
    cy.get('#email').type('juan.perez@example.com'); 
    cy.get('#phone').type('5551234569'); 

    cy.get('#customer-form').submit();

    cy.get('#message').should('be.visible');
    cy.get('#message-text').should('contain', 'El correo electrónico ya está registrado'); 

  
  });
});
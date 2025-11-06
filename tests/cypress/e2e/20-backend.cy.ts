describe('Drupal Backend Tests', () => {

  beforeEach(() => {
    cy.suppressConsoleErrors()
  })

  beforeEach(() => {
    // Log in with admin credentials only once before all tests
    cy.visit('/user/login');
    cy.get('form.user-login-form').should('exist');
    cy.get('input#edit-name').type('admin');
    cy.get('input#edit-pass').type('admin');
    cy.get('input#edit-submit').click();
  });

  it('Drupal content overview accessible', () => {
    // You are already logged in, so you can directly access the content overview
    cy.visit('/en/admin/content');
    cy.contains('Content').should('be.visible');
  });

  it('Should create and delete a new page node', () => {
    cy.visit('/en/node/add/page');
    cy.get('#edit-title-0-value').type('Test Page Title');
    cy.get('#edit-submit--2--gin-edit-form').click();
    cy.contains('Test Page Title').should('be.visible');

    // Find the ul.tabs element to translate the node

    // cy.get('ul.tabs').within(() => {
    //   cy.contains('Translate').click();
    // });
    //
    // // Add Translation and save
    // cy.get('.region-content').within(() => {
    //   cy.get('a[hreflang="fr"]').contains('Add').click();
    // });
    // cy.get('#edit-title-0-value').type(' FR');
    // cy.get('#edit-submit--2--gin-edit-form').click();
    // cy.contains('Test Page Title FR').should('be.visible');
    //
    // // Find the ul.tabs element and the Delete button in it to delete the translation
    // cy.get('ul.tabs').within(() => {
    //   cy.contains('Supprimer').click();
    // });
    // cy.get('#edit-actions').within(() => {
    //   cy.get('#edit-submit').click();
    // });
    // cy.contains('has been deleted. ').should('be.visible');

    // Back on the german node, find the ul.tabs element and the Delete button in it
    cy.get('#block-tailwinded-primary-local-tasks').within(() => {
      cy.contains('Delete').click();
    });

    // Find the Delete element
    cy.get('#edit-actions').within(() => {
      cy.get('#edit-submit').click();
    });
    cy.contains('has been deleted. ').should('be.visible');
  });

  it('Should logout', () => {
    cy.visit('/user/logout');
    cy.get('body').should('have.class', 'path-frontpage');
  });
});

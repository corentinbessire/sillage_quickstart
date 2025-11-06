describe('sillage Tests', () => {
  beforeEach(() => {
    cy.suppressConsoleErrors()
  })

  it('Should load the Drupal Welcome page.', () => {
    cy.visit('/');
    cy.get('body').should('have.class', 'path-frontpage');
  });


  it("user registration should be switched", () => {
    cy.request({ url: "/user/register", failOnStatusCode: false })
      .its("status")
      .should("equal", 403)
    cy.visit("/user/register", { failOnStatusCode: false })
  })
});


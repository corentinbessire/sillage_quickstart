describe("Routing Tests", () => {
  beforeEach(() => {
    cy.suppressConsoleErrors()
  })

  it("should load home page", () => {
    cy.visit("/")
    cy.get('body').should('have.class', 'path-frontpage');
  })

  it("should return a 404 if page was not found", () => {
    cy.request({ url: "/asdfsdfasdf", failOnStatusCode: false })
      .its("status")
      .should("equal", 404)
    cy.visit("/adsasdf", { failOnStatusCode: false })
  })

  it("should return a 403 if on a protected route", () => {
    cy.request({ url: "/admin/content", failOnStatusCode: false })
      .its("status")
      .should("equal", 403)
    cy.visit("/admin/content", { failOnStatusCode: false })
  })
})

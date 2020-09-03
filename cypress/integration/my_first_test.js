describe("My First Test", () => {
  it("app start when routing to localhost:3000", () => {
    cy.visit("http://localhost:3000");
    cy.url().should("include", "login");
    cy.contains("Armut Test Tool Kit");
    cy.contains("Login").click();
    cy.contains("Create User");
  });
});

/// <reference types="cypress" />
// ***********************************************
// eslint-disable-next-line @typescript-eslint/no-namespace
declare namespace Cypress {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  interface Chainable<Subject> {
    login(email: string, password: string): void;
  }
}
Cypress.Commands.add("login", (email, password) => {
  cy.visit("/");
  cy.url().should("include", "/login");
  cy.get(":nth-child(1) > .firebaseui-idp-button").click();
  cy.get("#ui-sign-in-email-input").type(email);
  cy.get(".firebaseui-id-submit").click();
  cy.get("#ui-sign-in-password-input").type(password);
  cy.get(".firebaseui-id-submit").click();
});

/// <reference types="cypress" />

describe("should display bills table", () => {
  before(() => {
    cy.window().then((win) => {
      win.sessionStorage.clear();
      win.indexedDB.deleteDatabase("firebaseLocalStorageDb");
      cy.clearCookies();
      cy.clearLocalStorage();
    });
  });
  cy.on("uncaught:exception", () => {
    return false;
  });

  before(() => {
    cy.login("anand252825@gmail.com", "123123123");
  });

  it("should display 'Bills'", () => {
    cy.get(".MuiList-root > :nth-child(2)").click();
    cy.should("not.contain", "No rows");
  });
});

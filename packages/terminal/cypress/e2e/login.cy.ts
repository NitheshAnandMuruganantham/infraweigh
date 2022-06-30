describe("terminal login", () => {
  cy.on("uncaught:exception", () => {
    return false;
  });
  before(() => {
    cy.window().then((win) => {
      win.sessionStorage.clear();
      win.indexedDB.deleteDatabase("firebaseLocalStorageDb");
      cy.clearCookies();
      cy.clearLocalStorage();
    });
    cy.visit("/");
  });

  it("should display log in", () => {
    cy.contains("Sign in with Google");
    cy.contains("Sign in with email");
  });

  it("should log in", () => {
    cy.get(":nth-child(1) > .firebaseui-idp-button").click();
    cy.get("#ui-sign-in-email-input").type("anand252825@gmail.com");
    cy.get(".firebaseui-id-submit").click();
    cy.get("#ui-sign-in-password-input").type("123123123");
    cy.get(".firebaseui-id-submit").click();
  });

  it("should redirect if logged in terminal", () => {
    cy.visit("/login");
    cy.url().should("not.include", "/login");
  });

  after(() => {
    cy.window().then((win) => {
      win.sessionStorage.clear();
      win.indexedDB.deleteDatabase("firebaseLocalStorageDb");
      cy.clearCookies();
      cy.clearLocalStorage();
    });
  });
});

describe("users", () => {
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
  it("should display 'staffs'", () => {
    cy.get(".MuiList-root > :nth-child(4)").click();
    cy.get(".MuiDataGrid-virtualScrollerContent").should(
      "not.contain",
      "No rows"
    );
    // eslint-disable-next-line cypress/no-unnecessary-waiting
    cy.wait(1000);
  });

  it("should display 'new staff'", () => {
    cy.get(":nth-child(1) > .MuiButton-root").click();
  });
});

describe("weighbridges", () => {
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
  it("should display 'Weighbridges'", () => {
    cy.get(".MuiList-root > :nth-child(3)").click();
    cy.get(".MuiDataGrid-virtualScrollerContent").should(
      "not.contain",
      "No rows"
    );
    // eslint-disable-next-line cypress/no-unnecessary-waiting
    cy.wait(1000);
  });

  it("should display 'Add Weighbridge'", () => {
    cy.get(".css-0 > :nth-child(1) > .MuiButton-root").click();
  });

  it("shold add weighbridge", () => {
    cy.get(
      "form > .MuiBox-root > :nth-child(1) > .MuiInputBase-root > .MuiInputBase-input"
    ).type("weighbridge1");
    cy.get(
      "form > .MuiBox-root > :nth-child(2) > .MuiInputBase-root > .MuiInputBase-input"
    ).type("nithesh anand");
    cy.get(
      "form > .MuiBox-root > :nth-child(3) > .MuiInputBase-root > .MuiInputBase-input"
    ).type("000000");
    cy.get(
      "form > .MuiBox-root > :nth-child(4) > .MuiInputBase-root > .MuiInputBase-input"
    ).type("sample address");
    cy.get(
      "form > .MuiBox-root > :nth-child(5) > .MuiInputBase-root > .MuiInputBase-input"
    ).type("anand@example.com");
    cy.get(
      "form > .MuiBox-root > :nth-child(6) > .MuiInputBase-root > .MuiInputBase-input"
    ).type("0000000000");
    cy.get(".MuiDialogActions-root > :nth-child(2)").click();
    cy.contains("WeighBridge added successfully");
  });
  it("should delete weighbridge", () => {
    // eslint-disable-next-line cypress/no-unnecessary-waiting
    cy.wait(300);
    cy.get(
      '.MuiDataGrid-row--lastVisible > [data-field="delete"] > .MuiButton-root'
    ).click();
    cy.contains("Yes").click();
    cy.contains("WeighBridge deleted successfully");
  });
});

describe('terminal', () => {
  cy.on('uncaught:exception', () => {
    return false;
  });
  before(() => {
    cy.window().then((win) => {
      win.sessionStorage.clear();
      win.indexedDB.deleteDatabase('firebaseLocalStorageDb');
      cy.clearCookies();
      cy.clearLocalStorage();
    });
    cy.visit('/');
  });

  it('should display log in', () => {
    cy.contains('Sign in with Google');
    cy.contains('Sign in with email');
  });

  it('should log in', () => {
    cy.get(':nth-child(1) > .firebaseui-idp-button').click();
    cy.get('#ui-sign-in-email-input').type('anand252825@gmail.com');
    cy.get('.firebaseui-id-submit').click();
    cy.get('#ui-sign-in-password-input').type('123123123');
    cy.get('.firebaseui-id-submit').click();
  });

  it('should display home', () => {
    // cy.reload();
    // if(cy.contains('')){
    cy.contains('daily collection report');
  });

  it('should display daily collection report', () => {
    cy.get('.MuiList-root > :nth-child(2)').click();
    cy.contains('TN78AZ5263');
    cy.contains('steel');
  });

  it('should display weighbridges list', () => {
    cy.get('.MuiList-root > :nth-child(3)').click();
    cy.contains('anand weighbridge');
  });

  it('should add weighbridge', () => {
    cy.get('.css-0 > :nth-child(1) > .MuiButton-root').click();
    cy.contains('New WeighBridge');
    cy.get('#:r23:').type("anand's weighbridge");
  });
});

describe('login', () => {
  it('passes', () => {
    cy.visit('/login');
    let username = Cypress.env("testUser").username;
    let password = Cypress.env("testUser").password;

    const USERNAME: string = process.env.NEXT_CYPRESS_TEST_USERNAME || '';
    const PASSWORD: string = process.env.NEXT_CYPRESS_TEST_PASSWORD || '';
    console.log({USERNAME})
    // Enter username and password in form inputs
    cy.get("input[id=userName]").type(username);
    cy.get("input[id=password]").type(password).type("{enter}");
  })
})
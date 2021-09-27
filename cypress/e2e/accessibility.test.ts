describe('Accessibility tests', () => {
  beforeEach(() => {
    cy.visit('/').get('main').injectAxe();
  });
  it('Has no detectable accessibility violations on load', () => {
    cy.checkA11y();
  });
  it('Navigates to page 2 and checks for accessibility violations', () => {
    cy.findByText(/go to page 2/i)
      .click()
      .checkA11y();
  });
  it.skip('Focuses on the footer link and asserts its attributes', () => {
    cy.findAllByText('Gatsby').focus();
    cy.focused()
      .should('have.text', 'Gatsby')
      .should('have.attr', 'href', 'https://www.gatsbyjs.com')
      .should('not.have.css', 'outline-width', '0px');
  });

  test('The menu has no accessibility violations', () => {
    const menuButton = cy.findByText(/click to toggle menu/i);

    menuButton.focus();
    cy.focused().should('not.have.css', 'outline-width', '0px');

    menuButton.click().checkA11y();
  });
});

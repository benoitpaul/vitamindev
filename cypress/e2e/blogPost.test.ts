describe('Blog post tests', () => {
  beforeEach(() => {
    cy.visit('/javascript/console-log-vs-console-dir/').get('main').injectAxe();
  });
  it('Has no detectable accessibility violations on load', () => {
    cy.checkA11y();
  });
});

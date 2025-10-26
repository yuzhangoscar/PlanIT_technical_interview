import { URLS, PageName } from '../helpers/constants';
import { selectors } from '../helpers/selectors';

// Base class for all pages
export class BasePage {
  protected url: string;

  /**
   * Initializes a new BasePage instance
   * @param url - The URL of the page
   */
  constructor(url: string) {
    this.url = url;
  }

  /**
   * Visits the page URL
   * @returns Cypress chainable containing the application window
   */
  public visit(): Cypress.Chainable<Cypress.AUTWindow> {
    cy.log('***Visiting the URL: ', this.url);
    return cy.visit(this.url);
  }

  /**
   * Gets the page title
   * @returns Cypress chainable containing the page title as a string
   */
  public getTitle(): Cypress.Chainable<string> {
    cy.log('***Getting the title');
    return cy.title().then((title) => {
      cy.log('***Title: ', title);
      return cy.wrap(title);
    });
  }

  /**
   * Navigates to a specific page using the navigation menu
   * @param page - The page identifier (e.g., 'Shop', 'Contact', 'Cart')
   * @returns Cypress chainable containing true if navigation was successful
   */
  public navigateToPage(page: PageName): Cypress.Chainable<boolean> {
    cy.log('***Navigating to the page: ', page);
    cy.get(selectors.NavigationMenu[page]).first().click();
    return cy.url().should('eq', URLS[page]).then(() => {
      return cy.wrap(true);
    });
  }
}

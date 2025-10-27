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

  /**
   * Dynamically polls and waits for an element to become visible
   * Handles arbitrary delays with intelligent retry logic
   * @param selector - CSS selector for the element to wait for
   * @param timeout - Maximum time to wait in milliseconds (default: 10000ms)
   * @returns Cypress chainable containing the visible element
   */
  public waitForElementVisibility(
    selector: string,
    timeout: number = 10000
  ): Cypress.Chainable<JQuery<HTMLElement>> {
    cy.log(`***Polling for element to be visible: ${selector} (timeout: ${timeout}ms)`);

    return cy.get(selector, { timeout })
      .should('exist')
      .should('be.visible', { timeout });
  }

  /**
   * Polls for element visibility and retrieves its text
   * @param selector - CSS selector for the element
   * @param timeout - Maximum time to wait in milliseconds (default: 10000ms)
   * @returns Cypress chainable containing the element's text
   */
  public waitForElementAndGetText(
    selector: string,
    timeout: number = 10000
  ): Cypress.Chainable<string> {
    cy.log(`***Polling for element text: ${selector}`);

    return this.waitForElementVisibility(selector, timeout)
      .invoke('text')
      .then((text) => {
        cy.log(`***Element text retrieved: "${text}"`);
        return cy.wrap(text);
      });
  }

  /**
   * Polls for element visibility and verifies it contains specific text
   * @param selector - CSS selector for the element
   * @param expectedText - Text that should be contained in the element
   * @param timeout - Maximum time to wait in milliseconds (default: 10000ms)
   * @returns Cypress chainable containing true if text is found
   */
  public waitForElementWithText(
    selector: string,
    expectedText: string,
    timeout: number = 10000
  ): Cypress.Chainable<boolean> {
    cy.log(`***Polling for element with text: "${expectedText}" in ${selector}`);

    return this.waitForElementVisibility(selector, timeout)
      .should('contain.text', expectedText)
      .then(() => {
        cy.log(`***Element with text "${expectedText}" is visible`);
        return cy.wrap(true);
      });
  }
}

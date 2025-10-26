import { BasePage } from './base.page';
import { selectors } from '../helpers/selectors';
import { TIMEOUTS, URLS } from '../helpers/constants';

export class ContactPage extends BasePage {
  /**
   * Initializes a new ContactPage instance
   */
  constructor() {
    super(URLS.Contact);
  }

  /**
   * Clicks the Submit button on the contact form
   * @returns Cypress chainable containing the submit button element
   */
  public clickSubmitButton(): Cypress.Chainable<JQuery<HTMLElement>> {
    return cy.log('***Clicking the Submit button')
      .get(selectors.ContactPage.Submit)
      .click();
  }

  /**
   * Checks if a specific message is displayed on the page
   * @param message - The message text to check for
   * @returns Cypress chainable containing true if the message is displayed, false otherwise
   */
  public messageIsDisplayed(message: string): Cypress.Chainable<boolean> {
    return cy.log('***Checking if the message is displayed: ', message)
      .get(selectors.ContactPage.Message, { timeout: TIMEOUTS.LONG })
      .then(($el) => {
        const result = $el.text().includes(message);
        return cy.wrap(result);
      });
  }

  /**
   * Fills the Forename field in the contact form
   * @param forename - The forename value to enter
   * @returns Cypress chainable containing the forename input element
   */
  public fillForename(forename: string): Cypress.Chainable<JQuery<HTMLElement>> {
    return cy.log('***Filling the Forename field with value: ', forename)
      .get(selectors.ContactPage.Forename)
      .type(forename);
  }

  /**
   * Fills the Email field in the contact form
   * @param email - The email value to enter
   * @returns Cypress chainable containing the email input element
   */
  public fillEmail(email: string): Cypress.Chainable<JQuery<HTMLElement>> {
    return cy.log('***Filling the Email field with value: ', email)
      .get(selectors.ContactPage.Email)
      .type(email);
  }

  /**
   * Fills the Message field in the contact form
   * @param message - The message text to enter
   * @returns Cypress chainable containing the message input element
   */
  public fillMessage(message: string): Cypress.Chainable<JQuery<HTMLElement>> {
    return cy.log('***Filling the Message field with value: ', message)
      .get(selectors.ContactPage.Message)
      .type(message);
  }
}

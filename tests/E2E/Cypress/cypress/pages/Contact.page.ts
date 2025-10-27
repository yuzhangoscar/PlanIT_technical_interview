import { BasePage } from './base.page';
import { selectors } from '../helpers/selectors';
import { URLS } from '../helpers/constants';

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
}

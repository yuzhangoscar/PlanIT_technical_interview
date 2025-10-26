import { BasePage } from './base.page';
import { selectors } from '../helpers/selectors';
import { URLS } from '../helpers/constants';

export class ContactPage extends BasePage {
  constructor() {
    super(URLS.contact_page);
  }

  public clickSubmitButton(): Cypress.Chainable<JQuery<HTMLElement>> {
    return cy.log('***Clicking the Submit button')
      .get(selectors.contact_page.submit)
      .click();
  }

  public fillForename(forename: string): Cypress.Chainable<JQuery<HTMLElement>> {
    return cy.log('***Filling the Forename field with value: ', forename)
      .get(selectors.contact_page.Forename)
      .type(forename);
  }

  public fillEmail(email: string): Cypress.Chainable<JQuery<HTMLElement>> {
    return cy.log('***Filling the Email field with value: ', email)
      .get(selectors.contact_page.Email)
      .type(email);
  }

  public fillMessage(message: string): Cypress.Chainable<JQuery<HTMLElement>> {
    return cy.log('***Filling the Message field with value: ', message)
      .get(selectors.contact_page.Message)
      .type(message);
  }
}

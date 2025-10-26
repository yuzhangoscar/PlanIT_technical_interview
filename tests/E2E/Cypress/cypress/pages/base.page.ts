import { URLS } from '../helpers/constants';
import { selectors } from '../helpers/selectors';

// Base class for all pages
export class BasePage {
  protected url: string;

  constructor(url: string) {
    this.url = url;
  }

  public visit(): Cypress.Chainable<Cypress.AUTWindow> {
    return cy.log('***Visiting the URL: ', this.url)
      .visit(this.url);
  }

  public getTitle(): Cypress.Chainable<string> {
    return cy.log('***Getting the title')
      .title()
      .then((title) => {
        cy.log('***Title: ', title);
        return cy.wrap(title);
      });
  }

  public messageIsDisplayed(message: string): Cypress.Chainable<boolean> {
    return cy.log('***Checking if the message is displayed: ', message)
      .get(selectors.contact_page.Message, { timeout: 10000 })
      .then(($el) => {
        const result = $el.text().includes(message);
        return cy.wrap(result);
      });
  }

  public navigateToHomePage(): Cypress.Chainable<boolean> {
    cy.log('***Navigating to the Home page');
    cy.get(selectors.navigation_menu.home_page).click();
    return cy.url().should('eq', URLS.base_url).then(() => {
      return cy.wrap(true);
    });
  }

  public navigateToShopPage(): Cypress.Chainable<boolean> {
    cy.log('***Navigating to the Shop page');
    cy.get(selectors.navigation_menu.shop_page).first().click();
    return cy.url().should('eq', URLS.shop_page).then(() => {
      return cy.wrap(true);
    });
  }

  public navigateToContactPage(): Cypress.Chainable<boolean> {
    cy.log('***Navigating to the Contact page');
    cy.get(selectors.navigation_menu.contact_page).click();
    return cy.url().should('eq', URLS.contact_page).then(() => {
      return cy.wrap(true);
    });
  }

  public navigateToCartPage(): Cypress.Chainable<boolean> {
    cy.log('***Navigating to the Cart page');
    cy.get(selectors.navigation_menu.cart_page).click();
    return cy.url().should('eq', URLS.cart_page).then(() => {
      return cy.wrap(true);
    });
  }
}

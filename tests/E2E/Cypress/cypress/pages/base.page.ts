import { URLS } from "../helpers/constants";
import { selectors } from "../helpers/selectors";

// Base class for all pages
export class BasePage {
    protected url: string;

    constructor(url: string) {
        this.url = url;
    }

    public visit(): Cypress.Chainable<Cypress.AUTWindow> {
        cy.log('***Visiting the URL: ', this.url);
        return cy.visit(this.url);
    }

    public getTitle(): Cypress.Chainable<string> {
        cy.log('***Getting the title');
        const title = cy.title();
        cy.log('***Title: ', title);
        return title;
    }

    public messageIsDisplayed(message: string): Cypress.Chainable<boolean> {
        cy.log('***Checking if the message is displayed: ', message);
        return cy.get(selectors.contact_page.Message, { timeout: 10000 })
            .then(($el) => {
                return $el.text().includes(message) ? true : false;
            });
    }

    public navigateToHomePage(): Cypress.Chainable<boolean> {
        cy.log('***Navigating to the Home page');
        return cy.get(selectors.navigation_menu.home_page).click().then(() => {
            return cy.url().should('eq', URLS.base_url);
        })
        .then(() => {
            return true;
        });
    }

    public navigateToShopPage(): Cypress.Chainable<boolean> {
        cy.log('***Navigating to the Shop page');
        return cy.get(selectors.navigation_menu.shop_page).click()
            .then(() => {
                return cy.url().should('eq', URLS.shop_page);
            })
            .then(() => {
                return true;
            });
    }

    public navigateToContactPage(): Cypress.Chainable<boolean> {
        cy.log('***Navigating to the Contact page');
        return cy.get(selectors.navigation_menu.contact_page).click()
        .then(() => {
            return cy.url().should('eq', URLS.contact_page);
        })
        .then(() => {
            return true;
        });
    }
}

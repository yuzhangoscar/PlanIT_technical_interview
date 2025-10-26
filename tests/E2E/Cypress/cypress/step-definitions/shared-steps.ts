import { DataTable, Given, Then } from '@badeball/cypress-cucumber-preprocessor';
import { SuccessMessages, URLS } from '../helpers/constants';
import { BasePage } from '../pages/base.page';
import { ContactPage } from '../pages/Contact.page';
import { getContactFieldSelector, getContactErrorFieldSelector } from '../helpers/selector-helpers';

/**
 * Shared step definitions that can be used across multiple feature files
 */

/**
 * Cucumber step: Navigates to the home page
 * @input None
 * @output Visits the home page URL
 */
Given('I am on the home page', () => {
  const basePage: BasePage = new BasePage(URLS.Home);
  basePage.visit();
});

/**
 * Cucumber step: Navigates to the Contact page from the home page
 * @input None
 * @output Navigates to the Contact page using the navigation menu
 */
Given('I navigate to the Contact page', () => {
  const basePage: BasePage = new BasePage(URLS.Contact);
  basePage.navigateToPage('Contact');
});

/**
 * Cucumber step: Navigates to the Shop page from the home page
 * @input None
 * @output Navigates to the Shop page using the navigation menu
 */
Given('I navigate to the Shop page', () => {
  const basePage: BasePage = new BasePage(URLS.Shop);
  basePage.navigateToPage('Shop');
});

/**
 * Cucumber step: Navigates to the Cart page from the home page
 * @input None
 * @output Navigates to the Cart page using the navigation menu
 */
Given('I navigate to the Cart page', () => {
  const basePage: BasePage = new BasePage(URLS.Cart);
  basePage.navigateToPage('Cart');
});

/**
 * Cucumber step: Fills in the mandatory contact form fields with valid data
 * @input dataTable - DataTable containing field names and values to enter
 * @output Populates each form field with the specified value
 */
Then('I fill in the mandatory fields with valid data', (dataTable: DataTable) => {
  const data = dataTable.hashes();
  data.forEach((row: Record<string, string>) => {
    const field = row['Field Name'];
    const value = row['Value'];
    cy.log(`***Filling the field: ${field} with value: ${value}`);
    cy.get(getContactFieldSelector(field)).type(value);
  });
});

/**
 * Cucumber step: Verifies that no error messages are visible for specified fields
 * @input dataTable - DataTable containing field names to check
 * @output Asserts that error messages for specified fields do not exist in the DOM
 */
Then('No error messages should be visible', (dataTable: DataTable) => {
  const data = dataTable.rows(); // Use .rows() to skip header row
  data.forEach((row: string[]) => {
    const field = row[0];
    cy.log(`***Checking if the error message for the field: ${field} is not found`);
    cy.get(getContactErrorFieldSelector(field)).should('not.exist');
  });
});

/**
 * Cucumber step: Verifies that the form submission was successful
 * @input None
 * @output Asserts that the success message is displayed on the page
 */
Then('the form submission should be successful', () => {
  cy.log('***Checking if the form submission was successful');
  const contactPage: ContactPage = new ContactPage();
  contactPage.messageIsDisplayed(SuccessMessages.submit);
});

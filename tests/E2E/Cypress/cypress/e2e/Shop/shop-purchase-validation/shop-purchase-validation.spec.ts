import { selectors } from '../../../helpers/selectors';
import { success_messages, URLS } from '../../../helpers/constants';
import { BasePage } from '../../../pages/base.page';
import { Given, When, Then, DataTable } from '@badeball/cypress-cucumber-preprocessor';
import '../../../step-definitions/shared-steps';
import { ShopPage } from '../../../pages/Shop.page';
import { CartPage } from '../../../pages/Cart.page';

const shopPage = new ShopPage();
const cartPage = new CartPage();
const basePage = new BasePage(URLS.base_url);
let productPrices: Cypress.Chainable<Record<string, number>>;
let calculatedItemQuantitiesAndSubtotals: Cypress.Chainable<Record<string, { price: number; quantity: number; subtotal: number }>>;

Then('I extract all product prices', () => {
  productPrices = shopPage.extractAllProductPrices().then((prices) => {
    return cy.wrap(prices);
  });
});

When('I buy "<Quantity>" of the "<Product Name>"', (dataTable: DataTable) => {
  const data = dataTable.hashes();

  data.forEach((row: Record<string, string>) => {
    const productName = row['Product Name'];
    const quantity = parseInt(row['Quantity']);
    shopPage.purchaseGivenQuantityOfGivenItem(productName, quantity);
  });
});

Then('I should be able to verify the prices, the quantities and the subtotals are correct', () => {
  calculatedItemQuantitiesAndSubtotals = shopPage.calculateItemQuantitiesAndSubtotals(productPrices, cartPage);

  calculatedItemQuantitiesAndSubtotals.then((calculatedItems) => {
    cy.log('***Calculated item quantities and subtotals: ', calculatedItems);

    // Get displayed items and compare
    cartPage.extractCartItems().then((displayedItems) => {
      cy.log('***Displayed item quantities and subtotals: ', displayedItems);

      // Compare the objects (ignoring property order)
      expect(JSON.stringify(calculatedItems)).to.equal(JSON.stringify(displayedItems));
    });
  });
});

Given('I navigate to the Cart page', () => {
  shopPage.navigateToCartPage();
});

Then('I fill in the mandatory fields with valid data', (dataTable: DataTable) => {
  const data = dataTable.hashes();
  data.forEach((row: Record<string, string>) => {
    const field = row['Field Name'];
    const value = row['Value'];
    cy.log(`***Filling the field: ${field} with value: ${value}`);
    cy.get(selectors.contact_page[`${field}` as keyof typeof selectors.contact_page]).type(value);
  });
});

Then('No error messages should be visible', (dataTable: DataTable) => {
  const data = dataTable.raw();
  data.forEach((row: string[]) => {
    const field = row[0];
    cy.log(`***Checking if the error message for the field: ${field} is not found`);
    cy.get(selectors.contact_page[`${field}_error_field` as keyof typeof selectors.contact_page]).should('not.exist');
  });
});

Then('the form submission should be successful', () => {
  cy.log('***Checking if the form submission was successful');
  basePage.messageIsDisplayed(success_messages.submit);
});

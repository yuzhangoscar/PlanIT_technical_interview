import { When, Then, DataTable, Before } from '@badeball/cypress-cucumber-preprocessor';
import '../../../step-definitions/shared-steps';
import { ShopPage } from '../../../pages/Shop.page';
import { CartPage } from '../../../pages/Cart.page';

let shopPage: ShopPage;
let cartPage: CartPage;

Before(() => {
  shopPage = new ShopPage();
  cartPage = new CartPage();
});

/**
 * Cucumber step: Extracts all product prices from the shop catalog
 * @input None
 * @output Stores product prices as a Cypress alias for later use
 */
Then('I extract all product prices', () => {
  shopPage.extractAllProductPrices().then((prices) => {
    cy.wrap(prices).as('productPrices');
  });
});

/**
 * Cucumber step: Purchases specified quantities of products
 * @input dataTable - DataTable containing product names and quantities to purchase
 * @output Adds the specified products to the cart
 */
When('I buy "<Quantity>" of the "<Product Name>"', (dataTable: DataTable) => {
  const data = dataTable.hashes();

  data.forEach((row: Record<string, string>) => {
    const productName = row['Product Name'];
    const quantity = parseInt(row['Quantity']);
    shopPage.purchaseGivenQuantityOfGivenItem(productName, quantity);
  });
});

/**
 * Cucumber step: Verifies that cart prices, quantities, and subtotals match expected values
 * @input None (uses previously extracted productPrices alias)
 * @output Asserts that calculated values match displayed cart values
 */
Then('I should be able to verify the prices, the quantities and the subtotals are correct', () => {
  cy.get<Record<string, number>>('@productPrices').then((productPrices) => {
    shopPage.calculateItemQuantitiesAndSubtotals(cy.wrap(productPrices), cartPage).then((calculatedItems) => {
      cy.log('***Calculated item quantities and subtotals: ', calculatedItems);

      // Get displayed items and compare
      cartPage.extractCartItems().then((displayedItems) => {
        cy.log('***Displayed item quantities and subtotals: ', displayedItems);

        // Compare the objects (ignoring property order)
        expect(JSON.stringify(calculatedItems)).to.equal(JSON.stringify(displayedItems));
      });
    });
  });
});

import { BasePage } from './base.page';
import { selectors } from '../helpers/selectors';
import { URLS, CartSummary, ValidProducts, CURRENCY_SYMBOL } from '../helpers/constants';

export class CartPage extends BasePage {
  /**
   * Initializes a new CartPage instance
   */
  constructor() {
    super(URLS.Cart);
  }

  /**
   * Extracts all cart items with their details from the cart table
   * @returns Cypress chainable containing an object with product names as keys and cart item details (price, quantity, subtotal) as values
   */
  public extractCartItems(): Cypress.Chainable<CartSummary> {
    const cartSummary: CartSummary = {};

    cy.log('***Starting cart data extraction');

    // Start the Cypress chain by locating the cart table
    return cy.get(selectors.CartPage.CartTable).then(($table) => {
      cy.wrap($table).within(() => {
        cy.get(selectors.CartPage.CartRow).each(($row) => {
          this.extractRowData($row, cartSummary);
        });
      });
    }).then(() => {
      // Return the final, populated object as the subject of the Chainable
      cy.log('***Cart summary: ', JSON.stringify(cartSummary, null, 2));
      return cy.wrap(cartSummary);
    });
  }

  /**
   * Extracts data from a single cart row and adds it to the cart summary
   * @param $row - jQuery element representing the cart row
   * @param cartSummary - Object to populate with extracted cart data
   */
  private extractRowData($row: JQuery<HTMLElement>, cartSummary: CartSummary): void {
    // Use .within() to scope all commands to the current <tr> element
    cy.wrap($row).within(() => {
      // Extract all data using Cypress aliases to avoid nested callbacks
      cy.get(selectors.CartPage.ProductName).invoke('text').as('productName');
      cy.get(selectors.CartPage.Price).invoke('text').as('price');
      cy.get(selectors.CartPage.Quantity).invoke('val').as('quantity');
      cy.get(selectors.CartPage.Subtotal).invoke('text').as('subtotal');
    });

    // Process all extracted data in a single then() callback
    cy.then(function() {
      const productName = String(this.productName).trim();

      // Filter: Only proceed if the product name is in the valid list
      if (!ValidProducts.includes(productName)) {
        cy.log(`***Skipping unknown product: ${productName}`);
        return;
      }

      // Parse all values
      const price = parseFloat(String(this.price).replace(CURRENCY_SYMBOL, ''));
      const quantity = parseInt(String(this.quantity), 10);
      const subtotal = parseFloat(String(this.subtotal).replace(CURRENCY_SYMBOL, ''));

      if (isNaN(price) || isNaN(quantity) || isNaN(subtotal)) {
        throw new Error(`Invalid numeric values for ${productName}`);
      }

      if (price <= 0 || quantity <= 0 || subtotal <= 0) {
        throw new Error(`Non-positive values detected for ${productName}: price=${price}, quantity=${quantity}, subtotal=${subtotal}`);
      }

      // Build the final object
      cartSummary[productName] = { price, quantity, subtotal };
      cy.log(`Extracted: ${productName}, Price: ${price}, Quantity: ${quantity}, Subtotal: ${subtotal}`);
    });
  }
}

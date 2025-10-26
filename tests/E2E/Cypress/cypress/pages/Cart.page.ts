import { BasePage } from './base.page';
import { selectors } from '../helpers/selectors';
import { URLS, cart_summary, valid_products } from '../helpers/constants';

export class CartPage extends BasePage {
  private readonly selectors = selectors.cart_page;
  private readonly valid_products = valid_products;

  constructor() {
    super(URLS.cart_page);
  }

  public extractCartItems(): Cypress.Chainable<cart_summary> {
    const cartSummary: cart_summary = {};

    cy.log('***Starting cart data extraction');

    // Start the Cypress chain by locating the cart table
    // eslint-disable-next-line cypress/unsafe-to-chain-command
    return cy.get(this.selectors.cart_table)
      .find(this.selectors.cart_row)
      .each(($row) => {
      // Use .within() to scope all commands to the current <tr> element
        cy.wrap($row).within(() => {
          let productName: string = '';

          // 1. Extract Product Name (Text of the first <td>)
          cy.get(this.selectors.product_name)
            .invoke('text')
            .then((nameText: string) => {
              productName = nameText.trim();

              // Filter: Only proceed if the product name is in the valid list
              if (!this.valid_products.includes(productName)) {
                cy.log(`Skipping unknown product: ${productName}`);
                return; // Skip this item
              }

              // 2. Extract Price (Text of the price <td>)
              cy.get(this.selectors.price)
                .invoke('text')
                .then((priceText: string) => {
                // Remove '$' and convert to number
                  const price = parseFloat(priceText.replace('$', ''));

                  // 3. Extract Quantity (Value attribute of the quantity input)
                  cy.get(this.selectors.quantity)
                    .invoke('val')
                    .then((quantityValue: string | number | string[] | undefined) => {
                      const quantity = parseInt(String(quantityValue));

                      // 4. Extract Subtotal (Text of the subtotal <td>)
                      cy.get(this.selectors.subtotal)
                        .invoke('text')
                        .then((subtotalText: string) => {
                        // Remove '$' and convert to number
                          const subtotal = parseFloat(subtotalText.replace('$', ''));

                          // 5. Build the final object synchronously
                          cartSummary[productName] = { price, quantity, subtotal };
                          cy.log(`Extracted: ${productName}, Price: ${price}, Quantity: ${quantity}, Subtotal: ${subtotal}`);
                        });
                    });
                });
            });
        });
      })
      .then(() => {
        // Return the final, populated object as the subject of the Chainable
        cy.log('***Cart summary: ', JSON.stringify(cartSummary, null, 2));
        return cy.wrap(cartSummary);
      });
  }
}

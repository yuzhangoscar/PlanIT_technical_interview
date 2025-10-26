import { BasePage } from './base.page';
import { selectors } from '../helpers/selectors';
import { URLS } from '../helpers/constants';
import { CartPage } from './Cart.page';

export class ShopPage extends BasePage {
  constructor() {
    super(URLS.shop_page);
  }

  private returnCartCounterValue(): Cypress.Chainable<number> {
    return cy.log('***Returning the cart counter value')
      .get(selectors.shop_page.cart_counter)
      .invoke('text')
      .then((text) => {
        return cy.wrap(parseInt(text));
      });
  }

  private purchaseOneGivenItem(productName: string): Cypress.Chainable<boolean> {
    let cart_counter_before_purchase: number;

    return cy.log(`***Purchasing one item: ${productName}`)
      .then(() => this.returnCartCounterValue())
      .then((counterBefore) => {
        cart_counter_before_purchase = counterBefore;
        return cy.contains(selectors.shop_page.product_title, productName)
          .parent(selectors.shop_page.parent_element_of_product_title)
          .find(selectors.shop_page.buy_button_for_product)
          .first()
          .click();
      })
      .then(() => {
        return this.returnCartCounterValue();
      })
      .then((cart_counter_after_purchase) => {
        return cy.log(`***Purchase successful, purchased one ${productName}`)
          .wrap(cart_counter_after_purchase - cart_counter_before_purchase === 1);
      });
  }

  public purchaseGivenQuantityOfGivenItem(productName: string, quantity: number): Cypress.Chainable<boolean> {
    let cart_counter_before_purchase: number;

    return cy.log(`***Purchasing ${quantity} items: ${productName}`)
      .then(() => this.returnCartCounterValue())
      .then((counterBefore) => {
        cart_counter_before_purchase = counterBefore;

        // Build the purchase chain
        const purchasePromises: Cypress.Chainable<boolean>[] = [];
        for (let i = 0; i < quantity; i++) {
          purchasePromises.push(this.purchaseOneGivenItem(productName));
        }

        // Chain them sequentially
        return purchasePromises.reduce((chain, purchasePromise) => {
          return chain.then(() => purchasePromise);
        }, cy.wrap(true));
      })
      .then(() => {
        return this.returnCartCounterValue();
      })
      .then((cart_counter_after_purchase) => {
        return cy.log(`***Purchase successful, purchased ${quantity} items: ${productName}`)
          .wrap(cart_counter_after_purchase - cart_counter_before_purchase === quantity);
      });
  }

  public extractAllProductPrices(): Cypress.Chainable<Record<string, number>> {
    const productPrices: Record<string, number> = {};

    cy.log('***Extracting all product prices from catalog');
    // eslint-disable-next-line cypress/unsafe-to-chain-command
    return cy.get(selectors.shop_page.product_title)
      .each(($productTitle) => {
        const productName = $productTitle.text().trim();

        // Get the price element for this product
        cy.wrap($productTitle)
          .parent(selectors.shop_page.parent_element_of_product_title)
          .find(selectors.shop_page.price)
          .invoke('text')
          .then((priceText: string) => {
          // Remove '$' and convert to number
            const price = parseFloat(priceText.replace('$', ''));
            productPrices[productName] = price;
            cy.log(`Extracted price for ${productName}: $${price}`);
          });
      }).then(() => {
        cy.log('***All product prices extracted: ', JSON.stringify(productPrices, null, 2));
        return cy.wrap(productPrices);
      });
  }

  /**
     * Cross-compares catalog prices with cart items and creates a new object with calculated subtotals
     * @param catalogPrices - Object with product names as keys and catalog prices as values
     * @returns Object with product names as keys and calculated cart details as values
     *
     * Example of returned object entry:
     * {
     *   "Stuffed Frog": {
     *     price: 10.99,        // from catalogPrices input
     *     quantity: 2,         // from extractCartItems output
     *     subtotal: 21.98      // calculated: price * quantity
     *   }
     * }
     */
  public calculateItemQuantitiesAndSubtotals(catalogPrices: Cypress.Chainable<Record<string, number>>, cartPage: CartPage): Cypress.Chainable<Record<string, { price: number; quantity: number; subtotal: number }>> {
    return catalogPrices.then((prices) => {
      return cartPage.extractCartItems().then((cartItems) => {
        const calculatedItemQuantitiesAndSubtotals: Record<string, { price: number; quantity: number; subtotal: number }> = {};

        // Iterate through cart items and cross-reference with catalog prices
        Object.keys(cartItems).forEach((itemName) => {
          if (prices[itemName] !== undefined) {
            const catalogPrice = prices[itemName];
            const cartItem = cartItems[itemName];

            calculatedItemQuantitiesAndSubtotals[itemName] = {
              price: catalogPrice,                    // from catalogPrices input
              quantity: cartItem.quantity,            // from extractCartItems output
              subtotal: catalogPrice * cartItem.quantity  // calculated: price * quantity
            };

            cy.log(`***Calculated subtotal for ${itemName}: Price=${catalogPrice}, Quantity=${cartItem.quantity}, Subtotal=${catalogPrice * cartItem.quantity}`);
          }
        });

        cy.log('***Calculated subtotals for all items: ', JSON.stringify(calculatedItemQuantitiesAndSubtotals, null, 2));
        return cy.wrap(calculatedItemQuantitiesAndSubtotals);
      });
    });
  }
}

import { BasePage } from './base.page';
import { selectors } from '../helpers/selectors';
import { URLS, CURRENCY_SYMBOL } from '../helpers/constants';
import { CartPage } from './Cart.page';

export class ShopPage extends BasePage {
  /**
   * Initializes a new ShopPage instance
   */
  constructor() {
    super(URLS.Shop);
  }

  /**
   * Gets the current cart counter value
   * @returns Cypress chainable containing the cart counter as a number
   */
  private returnCartCounterValue(): Cypress.Chainable<number> {
    return cy.log('***Returning the cart counter value')
      .get(selectors.ShopPage.CartCounter)
      .invoke('text')
      .then((text) => {
        const value = parseInt(text.trim());
        if (isNaN(value)) {
          throw new Error(`Invalid cart counter value: ${text}`);
        }
        return cy.wrap(value);
      });
  }

  /**
   * Purchases one unit of a specified product
   * @param productName - The name of the product to purchase
   * @returns Cypress chainable containing void after successful purchase
   */
  private purchaseOneGivenItem(productName: string): Cypress.Chainable<void> {
    let cartCounterBeforePurchase: number = 0;

    cy.log(`***Purchasing one item: ${productName}`);

    // @ts-expect-error - TypeScript incorrectly infers return type from chain start; runtime returns void correctly
    return this.returnCartCounterValue()
      .then((counterBefore) => {
        cartCounterBeforePurchase = counterBefore;
        return cy.contains(selectors.ShopPage.ProductTitle, productName)
          .parent(selectors.ShopPage.ParentElementOfProductTitle)
          .find(selectors.ShopPage.BuyButtonForProduct)
          .first()
          .click();
      })
      .then(() => this.returnCartCounterValue())
      .then((cartCounterAfterPurchase) => {
        expect(cartCounterAfterPurchase - cartCounterBeforePurchase).to.equal(1);
        cy.log(`***Purchase successful, purchased one ${productName}`);
      })
      .then(() => {});
  }

  /**
   * Purchases a specified quantity of a given product
   * @param productName - The name of the product to purchase
   * @param quantity - The number of items to purchase
   * @returns Cypress chainable containing void after successful purchase
   */
  public purchaseGivenQuantityOfGivenItem(productName: string, quantity: number): Cypress.Chainable<void> {
    let cartCounterBeforePurchase: number = 0;

    cy.log(`***Purchasing ${quantity} items: ${productName}`);

    // @ts-expect-error - TypeScript incorrectly infers return type from chain start; runtime returns void correctly
    return this.returnCartCounterValue()
      .then((counterBefore) => {
        cartCounterBeforePurchase = counterBefore;

        // Build proper chain sequentially
        cy.wrap(null);
        for (let i = 0; i < quantity; i++) {
          cy.then(() => this.purchaseOneGivenItem(productName));
        }
      })
      .then(() => this.returnCartCounterValue())
      .then((cartCounterAfterPurchase) => {
        expect(cartCounterAfterPurchase - cartCounterBeforePurchase).to.equal(quantity);
        cy.log(`***Purchase successful, purchased ${quantity} items: ${productName}`);
      })
      .then(() => {});
  }

  /**
   * Extracts all product prices from the shop catalog
   * @returns Cypress chainable containing an object with product names as keys and prices as values
   */
  public extractAllProductPrices(): Cypress.Chainable<Record<string, number>> {
    const productPrices: Record<string, number> = {};

    cy.log('***Extracting all product prices from catalog');
    cy.get(selectors.ShopPage.ProductTitle)
      .each(($productTitle) => {
        const productName = $productTitle.text().trim();

        // Get the price element for this product
        cy.wrap($productTitle)
          .parent(selectors.ShopPage.ParentElementOfProductTitle)
          .find(selectors.ShopPage.Price)
          .invoke('text')
          .then((priceText: string) => {
          // Remove '$' and convert to number
            const price = parseFloat(priceText.replace(CURRENCY_SYMBOL, ''));

            if (isNaN(price) || price <= 0) {
              throw new Error(`Invalid price for ${productName}: ${priceText}`);
            }

            productPrices[productName] = price;
            cy.log(`Extracted price for ${productName}: $${price}`);
          });
      });

    return cy.then(() => {
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
    return catalogPrices.then((prices: Record<string, number>) => {
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
          } else {
            cy.log(`***Catalog price not found for item: ${itemName}`);
          }
        });

        cy.log('***Calculated subtotals for all items: ', JSON.stringify(calculatedItemQuantitiesAndSubtotals, null, 2));
        return cy.wrap(calculatedItemQuantitiesAndSubtotals);
      });
    });
  }
}

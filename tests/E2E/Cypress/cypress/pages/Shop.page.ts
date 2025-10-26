import { BasePage } from "./base.page";
import { selectors } from "../helpers/selectors";
import { URLS } from "../helpers/constants";

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
                let purchaseChain: Cypress.Chainable<boolean> = cy.wrap(true);

                for (let i = 0; i < quantity; i++) {
                    purchaseChain = purchaseChain.then(() => this.purchaseOneGivenItem(productName));
                }

                return purchaseChain;
            })
            .then(() => {
                return this.returnCartCounterValue();
            })
            .then((cart_counter_after_purchase) => {
                return cy.log(`***Purchase successful, purchased ${quantity} items: ${productName}`)
                    .wrap(cart_counter_after_purchase - cart_counter_before_purchase === quantity);
            });
    }
}

import { BasePage } from "./base.page";
import { selectors } from "../helpers/selectors";
import { URLS } from "../helpers/constants";

export class CartPage extends BasePage {
    constructor() {
        super(URLS.cart_page);
    }

    public verifyQuantityOfGivenItemInCart(productName: string, quantity: number): Cypress.Chainable<boolean> {
        return cy.log(`***Verifying if the quantity of the item: ${productName} in the cart is ${quantity}`)
            .get(selectors.cart_page.product_title, productName)
            .should('be.visible')
            .and('contain', quantity);
    }
}

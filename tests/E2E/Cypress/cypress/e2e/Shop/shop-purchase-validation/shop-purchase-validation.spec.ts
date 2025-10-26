import { selectors } from "../../../helpers/selectors";
import { error_messages, success_messages, URLS } from "../../../helpers/constants";
import { BasePage } from "../../../pages/base.page";
import { Given, When, Then, DataTable } from '@badeball/cypress-cucumber-preprocessor';
import "../../../step-definitions/shared-steps";
import { ShopPage } from "../../../pages/Shop.page";
import { CartPage } from "../../../pages/Cart.page";

const shopPage = new ShopPage();
const cartPage = new CartPage();
const basePage = new BasePage(URLS.base_url);

When('I buy "<Quantity>" of the "<Product Name>"', (dataTable: DataTable) => {
    const data = dataTable.hashes();
    data.forEach((row: Record<string, string>) => {
        const productName = row['Product Name'];
        const quantity = parseInt(row['Quantity']);
        shopPage.purchaseGivenQuantityOfGivenItem(productName, quantity);
    });
});

Then('I should see "<Quantity>" of the "<Product Name>" in the cart', (dataTable: DataTable) => {
    const data = dataTable.hashes();
    data.forEach((row: Record<string, string>) => {
        const productName = row['Product Name'];
        const quantity = parseInt(row['Quantity']);
        cartPage.verifyQuantityOfGivenItemInCart(productName, quantity);
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

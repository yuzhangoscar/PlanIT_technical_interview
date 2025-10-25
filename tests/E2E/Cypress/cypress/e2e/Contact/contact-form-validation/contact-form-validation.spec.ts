import { selectors } from "../../../helpers/selectors";
import { error_messages, success_messages, URLS } from "../../../helpers/constants";
import { ContactPage } from "../../../pages/Contact.page";
import { BasePage } from "../../../pages/base.page";
import { Given, When, Then, DataTable } from '@badeball/cypress-cucumber-preprocessor';

const contactPage = new ContactPage();
const basePage = new BasePage(URLS.base_url);

Given('I am on the home page', () => {
    basePage.visit();
});

Given('I navigate to the Contact page', () => {
    basePage.navigateToContactPage();
});

When('I click the Submit button', () => {
    contactPage.clickSubmitButton();
});

Then('I should see error messages for all mandatory fields', (dataTable: DataTable) => {
    const expectedErrors = dataTable.hashes();

    expectedErrors.forEach((row: Record<string, string>) => {
        const field = row['Field Name'];
        const message = row['Error Message'];

        cy.log(`***Checking if the error message for the field: ${field} is visible and contains the message: ${message}`);
        cy.get(selectors.contact_page[`${field}_error_field` as keyof typeof selectors.contact_page])
            .should('be.visible')
            .and('contain', message);
    });
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

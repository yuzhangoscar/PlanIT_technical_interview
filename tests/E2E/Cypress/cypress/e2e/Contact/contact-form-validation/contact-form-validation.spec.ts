import { ContactPage } from '../../../pages/Contact.page';
import { When, Then, DataTable, Before } from '@badeball/cypress-cucumber-preprocessor';
import { getContactErrorFieldSelector } from '../../../helpers/selector-helpers';
import '../../../step-definitions/shared-steps';

let contactPage: ContactPage;

Before(() => {
  contactPage = new ContactPage();
});

/**
 * Cucumber step: Clicks the Submit button on the contact form
 * @input None
 * @output Triggers the submit button click action
 */
When('I click the Submit button', () => {
  contactPage.clickSubmitButton();
});

/**
 * Cucumber step: Verifies that error messages are displayed for all mandatory fields
 * @input dataTable - DataTable containing field names and expected error messages
 * @output Asserts that each error message is visible and contains the expected text
 */
Then('I should see error messages for all mandatory fields', (dataTable: DataTable) => {
  const expectedErrors = dataTable.hashes();

  expectedErrors.forEach((row: Record<string, string>) => {
    const field = row['Field Name'];
    const message = row['Error Message'];

    cy.log(`***Checking if the error message for the field: ${field} is visible and contains the message: ${message}`);
    cy.get(getContactErrorFieldSelector(field))
      .should('be.visible')
      .and('contain', message);
  });
});

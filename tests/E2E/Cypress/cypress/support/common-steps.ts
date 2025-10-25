import { Given } from '@badeball/cypress-cucumber-preprocessor';
import { URLS } from '../helpers/constants';
import { BasePage } from '../pages/base.page';

/**
 * Given I am on the home page
 * Navigates to the base URL defined in cypress.config.js
 */
Given('I am on the home page', () => {
    const basePage = new BasePage(URLS.base_url);
    basePage.visit();
});

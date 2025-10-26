import { Given } from '@badeball/cypress-cucumber-preprocessor';
import { URLS } from '../helpers/constants';
import { BasePage } from '../pages/base.page';

/**
 * Shared step definitions that can be used across multiple feature files
 */

Given('I am on the home page', () => {
  const basePage: BasePage = new BasePage(URLS.base_url);
  basePage.visit();
});

Given('I navigate to the Contact page', () => {
  const basePage: BasePage = new BasePage(URLS.base_url);
  basePage.navigateToContactPage();
});

Given('I navigate to the Shop page', () => {
  const basePage: BasePage = new BasePage(URLS.base_url);
  basePage.navigateToShopPage();
});

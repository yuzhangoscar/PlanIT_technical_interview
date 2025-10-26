@shop @smoke
Feature: Shopping Cart Price Verification
    As a customer on the shopping site
    I want to verify that product prices, subtotals, and the total price are correctly calculated
    So that I can trust the final bill

    Background:
    Given I am on the home page

    @must-pass @happy-path
    Scenario: Add multiple items to the cart and verify price calculations
        Given I navigate to the Shop page
        Then I extract all product prices
        When I buy "<Quantity>" of the "<Product Name>"
            | Product Name    | Quantity |
            | Stuffed Frog    | 2        |
            | Fluffy Bunny    | 5        |
            | Valentine Bear  | 3        |
        And I navigate to the Cart page
        Then I should be able to verify the prices, the quantities and the subtotals are correct

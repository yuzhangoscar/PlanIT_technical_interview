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
        When I buy "<Quantity>" of the "<Product Name>"
            | Product Name    | Quantity |
            | Stuffed Frog    | 2        |
            | Fluffy Bunny    | 5        |
            | Valentine Bear  | 3        |
        And I navigate to the Cart page
        Then I should see "<Quantity>" of the "<Product Name>" in the cart

    
    # @must-pass @happy-path
    # Scenario: Verify all cart totals and subtotals
    #     # NOTE: This scenario relies on the previous 'Scenario Outline' having been run
    #     # if run independently, the steps below would need to be added to the Outline
        
    #     Given I navigate to the Shop page
    #     When I navigate to the Cart page
    #     Then I verify the following product details:
    #         | Product Name    | Price | Subtotal |
    #         | Stuffed Frog    | $10.99| $21.98   | 
    #         | Fluffy Bunny    | $9.99 | $49.95   |
    #         | Valentine Bear  | $14.99| $44.97   |
    #     And I verify the total price is the sum of all subtotals
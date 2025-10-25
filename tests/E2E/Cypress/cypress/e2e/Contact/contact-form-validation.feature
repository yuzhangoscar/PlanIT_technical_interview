@contact @smoke
Feature: Contact Form - Mandatory Field Validation
    As a user visiting the website
    I want to be informed when I submit the form with missing required fields
    So that I can correct my input and successfully submit the form

    Background:
        Given I am on the home page

    @must-pass @error-messages
    Scenario: Submit empty contact form and verify error messages
        When I navigate to the Contact page
        And I click the Submit button
        Then I should see error messages for all mandatory fields
            | Field Name       | Error Message           |
            | Forename         | Forename is required    |
            | Email            | Email is required       |
            | Message          | Message is required     |

    @must-pass @happy-path
    Scenario: Fill mandatory fields and verify errors disappear
        When I navigate to the Contact page
        Then I fill in the mandatory fields with valid data
            | Field Name        | Value                  |
            | Forename          | Yu Zhang               |
            | Email             | yuzhang2002@gmail.com  |
            | Message           | Test message from SDET |
        And I click the Submit button
        Then No error messages should be visible
            | Field Name       |
            | Forename         |
            | Email            |
            | Message          |
        Then the form submission should be successful

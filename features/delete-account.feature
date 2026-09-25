@delete-account @regression
Feature: Delete Account
  As a logged-in BStackBank user
  I want to delete my account
  So that my data is permanently removed

  @delete-account-flow
  Scenario: Go to profile and delete the account
    When I navigate to the Profile tab
    And I scroll down to find the Delete Account button
    And I tap the Delete Account button
    And I confirm account deletion
    Then I should be redirected to the login screen

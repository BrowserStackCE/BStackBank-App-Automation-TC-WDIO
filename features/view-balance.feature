@view-balance @regression
Feature: View Balance
  As a logged-in BStackBank user
  I want to view my account balance
  So that I can see my total funds

  @view-balance-flow
  Scenario: Signup, view balance, then delete account
    Given the BStackBank app is launched and I am on the signup screen
    When I fill in the signup form with valid details
    And I tap the Create Account button
    Then I should be on the home dashboard after signup
    When I tap the balance eye icon
    Then I should see the balance revealed
    When I navigate to the Profile tab
    And I scroll down to find the Delete Account button
    And I tap the Delete Account button
    And I confirm account deletion
    Then I should be redirected to the login screen

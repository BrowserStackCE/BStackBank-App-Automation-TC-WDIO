@signup @regression
Feature: User Signup
  As a new BStackBank user
  I want to create an account
  So that I can access banking features

  @signup-flow
  Scenario: Signup with auto-credentials and land on home dashboard
    Given the BStackBank app is launched and I am on the signup screen
    When I fill in the signup form with valid details
    And I tap the Create Account button
    Then I should be on the home dashboard after signup

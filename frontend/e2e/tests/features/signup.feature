Feature: User Signup
  As a new user
  I want to create an account
  So that I can access the application

  Background:
    Given I am on the signup page

  Scenario: Successful signup with valid credentials
    When I enter name "John Doe"
    And I enter email "john.doe@example.com"
    And I enter password "password123"
    And I enter confirm password "password123"
    And I click the signup button
    Then I should be redirected to the home page
    And I should see the home page content

  Scenario: Failed signup with empty name
    When I enter name ""
    And I enter email "john.doe@example.com"
    And I enter password "password123"
    And I enter confirm password "password123"
    And I click the signup button
    Then I should see name validation error "Please input your name!"

  Scenario: Failed signup with invalid email
    When I enter name "John Doe"
    And I enter email "invalid-email"
    And I enter password "password123"
    And I enter confirm password "password123"
    And I click the signup button
    Then I should see email validation error "Please enter a valid email!"

  Scenario: Failed signup with empty email
    When I enter name "John Doe"
    And I enter email ""
    And I enter password "password123"
    And I enter confirm password "password123"
    And I click the signup button
    Then I should see email validation error "Please input your email!"

  Scenario: Failed signup with short password
    When I enter name "John Doe"
    And I enter email "john.doe@example.com"
    And I enter password "12345"
    And I enter confirm password "12345"
    And I click the signup button
    Then I should see password validation error "Password must be at least 6 characters!"

  Scenario: Failed signup with empty password
    When I enter name "John Doe"
    And I enter email "john.doe@example.com"
    And I enter password ""
    And I enter confirm password ""
    And I click the signup button
    Then I should see password validation error "Please input your password!"

  Scenario: Failed signup with password mismatch
    When I enter name "John Doe"
    And I enter email "john.doe@example.com"
    And I enter password "password123"
    And I enter confirm password "password456"
    And I click the signup button
    Then I should see confirm password validation error "The two passwords do not match!"

  Scenario: Failed signup with empty confirm password
    When I enter name "John Doe"
    And I enter email "john.doe@example.com"
    And I enter password "password123"
    And I enter confirm password ""
    And I click the signup button
    Then I should see confirm password validation error "Please confirm your password!"

  Scenario: Navigate to login page from signup
    When I click the login link
    Then I should be redirected to the login page

  Scenario: Signup with existing email
    When I enter name "John Doe"
    And I enter email "admin@example.com"
    And I enter password "password123"
    And I enter confirm password "password123"
    And I click the signup button
    Then I should see an error message
    And I should remain on the signup page


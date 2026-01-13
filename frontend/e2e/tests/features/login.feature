Feature: User Login
  As a user
  I want to login to the application
  So that I can access my account

  Background:
    Given I am on the login page

  Scenario: Successful login with valid credentials
    When I enter email "admin@example.com"
    And I enter password "admin123"
    And I click the login button
    Then I should be redirected to the home page
    And I should see the home page content

  Scenario: Failed login with invalid email
    When I enter email "invalid-email"
    And I enter password "admin123"
    And I click the login button
    Then I should see email validation error "Please enter a valid email!"

  Scenario: Failed login with empty email
    When I enter email ""
    And I enter password "admin123"
    And I click the login button
    Then I should see email validation error "Please input your email!"

  Scenario: Failed login with empty password
    When I enter email "admin@example.com"
    And I enter password ""
    And I click the login button
    Then I should see password validation error "Please input your password!"

  Scenario: Failed login with incorrect credentials
    When I enter email "wrong@example.com"
    And I enter password "wrongpassword"
    And I click the login button
    Then I should see an error message
    And I should remain on the login page

  Scenario: Navigate to signup page from login
    When I click the signup link
    Then I should be redirected to the signup page

  Scenario: Navigate to forget password page from login
    When I click the forget password link
    Then I should be redirected to the forget password page

  Scenario: Login with demo admin credentials
    When I enter email "admin@example.com"
    And I enter password "admin123"
    And I click the login button
    Then I should be redirected to the home page

  Scenario: Login with demo user credentials
    When I enter email "user@example.com"
    And I enter password "user123"
    And I click the login button
    Then I should be redirected to the home page


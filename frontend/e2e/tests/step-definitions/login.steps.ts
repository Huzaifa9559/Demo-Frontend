import { Given, When, Then } from '@cucumber/cucumber';
import { expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { CustomWorld } from '../utils/hooks';

let loginPage: LoginPage;

Given('I am on the login page', async function (this: CustomWorld) {
  if (!this.page) {
    throw new Error('Page is not initialized');
  }
  loginPage = new LoginPage(this.page);
  await loginPage.goto();
  await expect(loginPage.formTitle).toBeVisible();
});

When('I enter email {string}', async function (email: string) {
  await loginPage.fillEmail(email);
});

When('I enter password {string}', async function (password: string) {
  await loginPage.fillPassword(password);
});

When('I click the login button', async function () {
  await loginPage.clickLoginButton();
});

When('I click the signup link', async function () {
  await loginPage.clickSignupLink();
});

When('I click the forget password link', async function () {
  await loginPage.clickForgetPasswordLink();
});

Then('I should be redirected to the home page', async function (this: CustomWorld) {
  if (!this.page) {
    throw new Error('Page is not initialized');
  }
  await expect(this.page).toHaveURL(/.*\/home/);
});

Then('I should see the home page content', async function (this: CustomWorld) {
  if (!this.page) {
    throw new Error('Page is not initialized');
  }
  // Wait for home page to load - adjust selector based on your home page
  await this.page.waitForLoadState('networkidle');
  // You can add more specific assertions here based on your home page structure
});

Then('I should see email validation error {string}', async function (expectedError: string) {
  const error = await loginPage.getEmailValidationError();
  expect(error).toContain(expectedError);
});

Then('I should see password validation error {string}', async function (expectedError: string) {
  const error = await loginPage.getPasswordValidationError();
  expect(error).toContain(expectedError);
});

Then('I should see an error message', async function () {
  const isVisible = await loginPage.isErrorMessageVisible();
  expect(isVisible).toBe(true);
});

Then('I should remain on the login page', async function (this: CustomWorld) {
  if (!this.page) {
    throw new Error('Page is not initialized');
  }
  await expect(this.page).toHaveURL(/.*\/login/);
});

Then('I should be redirected to the signup page', async function (this: CustomWorld) {
  if (!this.page) {
    throw new Error('Page is not initialized');
  }
  await expect(this.page).toHaveURL(/.*\/signup/);
});

Then('I should be redirected to the forget password page', async function (this: CustomWorld) {
  if (!this.page) {
    throw new Error('Page is not initialized');
  }
  await expect(this.page).toHaveURL(/.*\/forget-password/);
});


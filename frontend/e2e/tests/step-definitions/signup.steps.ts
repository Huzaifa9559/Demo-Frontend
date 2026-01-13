import { Given, When, Then } from '@cucumber/cucumber';
import { expect } from '@playwright/test';
import { SignupPage } from '../pages/SignupPage';
import { CustomWorld } from '../utils/hooks';

let signupPage: SignupPage;

Given('I am on the signup page', async function (this: CustomWorld) {
  if (!this.page) {
    throw new Error('Page is not initialized');
  }
  signupPage = new SignupPage(this.page);
  await signupPage.goto();
  await expect(signupPage.formTitle).toBeVisible();
});

When('I enter name {string}', async function (name: string) {
  await signupPage.fillName(name);
});

When('I enter email {string}', async function (email: string) {
  await signupPage.fillEmail(email);
});

When('I enter password {string}', async function (password: string) {
  await signupPage.fillPassword(password);
});

When('I enter confirm password {string}', async function (confirmPassword: string) {
  await signupPage.fillConfirmPassword(confirmPassword);
});

When('I click the signup button', async function () {
  await signupPage.clickSignupButton();
});

When('I click the login link', async function () {
  await signupPage.clickLoginLink();
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

Then('I should see name validation error {string}', async function (expectedError: string) {
  const error = await signupPage.getNameValidationError();
  expect(error).toContain(expectedError);
});

Then('I should see email validation error {string}', async function (expectedError: string) {
  const error = await signupPage.getEmailValidationError();
  expect(error).toContain(expectedError);
});

Then('I should see password validation error {string}', async function (expectedError: string) {
  const error = await signupPage.getPasswordValidationError();
  expect(error).toContain(expectedError);
});

Then('I should see confirm password validation error {string}', async function (expectedError: string) {
  const error = await signupPage.getConfirmPasswordValidationError();
  expect(error).toContain(expectedError);
});

Then('I should see an error message', async function () {
  const isVisible = await signupPage.isErrorMessageVisible();
  expect(isVisible).toBe(true);
});

Then('I should remain on the signup page', async function (this: CustomWorld) {
  if (!this.page) {
    throw new Error('Page is not initialized');
  }
  await expect(this.page).toHaveURL(/.*\/signup/);
});

Then('I should be redirected to the login page', async function (this: CustomWorld) {
  if (!this.page) {
    throw new Error('Page is not initialized');
  }
  await expect(this.page).toHaveURL(/.*\/login/);
});


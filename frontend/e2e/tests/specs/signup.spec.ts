import { test, expect } from '@playwright/test';
import { SignupPage } from '../pages/SignupPage';

test.describe('Signup Feature', () => {
  let signupPage: SignupPage;

  test.beforeEach(async ({ page }) => {
    signupPage = new SignupPage(page);
    await signupPage.goto();
  });

  test('should display signup form', async () => {
    await expect(signupPage.formTitle).toBeVisible();
    await expect(signupPage.nameInput).toBeVisible();
    await expect(signupPage.emailInput).toBeVisible();
    await expect(signupPage.passwordInput).toBeVisible();
    await expect(signupPage.confirmPasswordInput).toBeVisible();
    await expect(signupPage.signupButton).toBeVisible();
  });

  test('should show validation error for empty name', async () => {
    await signupPage.fillEmail('test@example.com');
    await signupPage.fillPassword('password123');
    await signupPage.fillConfirmPassword('password123');
    await signupPage.clickSignupButton();
    const error = await signupPage.getNameValidationError();
    expect(error).toContain('Please input your name!');
  });

  test('should show validation error for invalid email', async () => {
    await signupPage.fillName('John Doe');
    await signupPage.fillEmail('invalid-email');
    await signupPage.fillPassword('password123');
    await signupPage.fillConfirmPassword('password123');
    await signupPage.clickSignupButton();
    const error = await signupPage.getEmailValidationError();
    expect(error).toContain('Please enter a valid email!');
  });

  test('should show validation error for short password', async () => {
    await signupPage.fillName('John Doe');
    await signupPage.fillEmail('test@example.com');
    await signupPage.fillPassword('12345');
    await signupPage.fillConfirmPassword('12345');
    await signupPage.clickSignupButton();
    const error = await signupPage.getPasswordValidationError();
    expect(error).toContain('Password must be at least 6 characters!');
  });

  test('should show validation error for password mismatch', async () => {
    await signupPage.fillName('John Doe');
    await signupPage.fillEmail('test@example.com');
    await signupPage.fillPassword('password123');
    await signupPage.fillConfirmPassword('password456');
    await signupPage.clickSignupButton();
    const error = await signupPage.getConfirmPasswordValidationError();
    expect(error).toContain('The two passwords do not match!');
  });

  test('should navigate to login page', async ({ page }) => {
    await signupPage.clickLoginLink();
    await expect(page).toHaveURL(/.*\/login/);
  });
});


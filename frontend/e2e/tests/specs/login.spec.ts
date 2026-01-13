import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';

test.describe('Login Feature', () => {
  let loginPage: LoginPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    await loginPage.goto();
  });

  test('should display login form', async () => {
    await expect(loginPage.formTitle).toBeVisible();
    await expect(loginPage.emailInput).toBeVisible();
    await expect(loginPage.passwordInput).toBeVisible();
    await expect(loginPage.loginButton).toBeVisible();
  });

  test('should show validation error for empty email', async () => {
    await loginPage.fillPassword('admin123');
    await loginPage.clickLoginButton();
    const error = await loginPage.getEmailValidationError();
    expect(error).toContain('Please input your email!');
  });

  test('should show validation error for invalid email', async () => {
    await loginPage.fillEmail('invalid-email');
    await loginPage.fillPassword('admin123');
    await loginPage.clickLoginButton();
    const error = await loginPage.getEmailValidationError();
    expect(error).toContain('Please enter a valid email!');
  });

  test('should show validation error for empty password', async () => {
    await loginPage.fillEmail('admin@example.com');
    await loginPage.clickLoginButton();
    const error = await loginPage.getPasswordValidationError();
    expect(error).toContain('Please input your password!');
  });

  test('should navigate to signup page', async ({ page }) => {
    await loginPage.clickSignupLink();
    await expect(page).toHaveURL(/.*\/signup/);
  });

  test('should navigate to forget password page', async ({ page }) => {
    await loginPage.clickForgetPasswordLink();
    await expect(page).toHaveURL(/.*\/forget-password/);
  });
});


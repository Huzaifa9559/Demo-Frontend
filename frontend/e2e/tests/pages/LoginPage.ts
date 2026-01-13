import { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage';

/**
 * Login Page Object Model
 * Contains all selectors and methods for the Login page
 */
export class LoginPage extends BasePage {
  // Selectors
  readonly emailInput: Locator;
  readonly passwordInput: Locator;
  readonly loginButton: Locator;
  readonly signupLink: Locator;
  readonly forgetPasswordLink: Locator;
  readonly errorMessage: Locator;
  readonly formTitle: Locator;

  constructor(page: Page) {
    super(page);
    
    // Initialize locators
    this.emailInput = page.locator('input[name="email"]');
    this.passwordInput = page.locator('input[name="password"]');
    this.loginButton = page.locator('button[type="submit"]');
    this.signupLink = page.locator('a[href="/signup"]');
    this.forgetPasswordLink = page.locator('a[href="/forget-password"]');
    this.errorMessage = page.locator('.text-red-600');
    this.formTitle = page.locator('h1:has-text("Login")');
  }

  /**
   * Navigate to login page
   */
  async goto(): Promise<void> {
    await this.page.goto('/login');
    await this.waitForLoad();
  }

  /**
   * Fill email input
   */
  async fillEmail(email: string): Promise<void> {
    await this.emailInput.fill(email);
  }

  /**
   * Fill password input
   */
  async fillPassword(password: string): Promise<void> {
    await this.passwordInput.fill(password);
  }

  /**
   * Click login button
   */
  async clickLoginButton(): Promise<void> {
    await this.loginButton.click();
  }

  /**
   * Perform login with credentials
   */
  async login(email: string, password: string): Promise<void> {
    await this.fillEmail(email);
    await this.fillPassword(password);
    await this.clickLoginButton();
  }

  /**
   * Click signup link
   */
  async clickSignupLink(): Promise<void> {
    await this.signupLink.click();
  }

  /**
   * Click forget password link
   */
  async clickForgetPasswordLink(): Promise<void> {
    await this.forgetPasswordLink.click();
  }

  /**
   * Get error message text
   */
  async getErrorMessage(): Promise<string | null> {
    return await this.errorMessage.textContent();
  }

  /**
   * Check if error message is visible
   */
  async isErrorMessageVisible(): Promise<boolean> {
    return await this.errorMessage.isVisible();
  }

  /**
   * Check if login button is loading
   */
  async isLoginButtonLoading(): Promise<boolean> {
    const button = this.loginButton;
    const loadingState = await button.getAttribute('aria-busy');
    return loadingState === 'true';
  }

  /**
   * Wait for login to complete (redirect to home)
   */
  async waitForLoginSuccess(): Promise<void> {
    await this.page.waitForURL('**/home', { timeout: 10000 });
  }

  /**
   * Get validation error for email field
   */
  async getEmailValidationError(): Promise<string | null> {
    // Ant Design form validation errors
    const emailField = this.emailInput.locator('..').locator('..'); // Go up to form-item
    const errorLocator = emailField.locator('.ant-form-item-explain-error');
    if (await errorLocator.isVisible().catch(() => false)) {
      return await errorLocator.textContent();
    }
    // Fallback: check for any validation error near email field
    const allErrors = this.page.locator('.ant-form-item-explain-error');
    const count = await allErrors.count();
    if (count > 0) {
      return await allErrors.first().textContent();
    }
    return null;
  }

  /**
   * Get validation error for password field
   */
  async getPasswordValidationError(): Promise<string | null> {
    // Ant Design form validation errors
    const passwordField = this.passwordInput.locator('..').locator('..'); // Go up to form-item
    const errorLocator = passwordField.locator('.ant-form-item-explain-error');
    if (await errorLocator.isVisible().catch(() => false)) {
      return await errorLocator.textContent();
    }
    // Fallback: check for any validation error near password field
    const allErrors = this.page.locator('.ant-form-item-explain-error');
    const count = await allErrors.count();
    if (count > 1) {
      return await allErrors.nth(1).textContent();
    } else if (count === 1) {
      // If only one error, it might be for password
      return await allErrors.first().textContent();
    }
    return null;
  }
}


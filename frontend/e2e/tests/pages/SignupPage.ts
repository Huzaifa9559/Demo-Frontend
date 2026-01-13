import { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage';

/**
 * Signup Page Object Model
 * Contains all selectors and methods for the Signup page
 */
export class SignupPage extends BasePage {
  // Selectors
  readonly nameInput: Locator;
  readonly emailInput: Locator;
  readonly passwordInput: Locator;
  readonly confirmPasswordInput: Locator;
  readonly signupButton: Locator;
  readonly loginLink: Locator;
  readonly errorMessage: Locator;
  readonly formTitle: Locator;

  constructor(page: Page) {
    super(page);
    
    // Initialize locators
    this.nameInput = page.locator('input[name="name"]');
    this.emailInput = page.locator('input[name="email"]');
    this.passwordInput = page.locator('input[name="password"]');
    this.confirmPasswordInput = page.locator('input[name="confirmPassword"]');
    this.signupButton = page.locator('button[type="submit"]');
    this.loginLink = page.locator('a[href="/login"]');
    this.errorMessage = page.locator('.text-red-600');
    this.formTitle = page.locator('h1:has-text("Sign Up")');
  }

  /**
   * Navigate to signup page
   */
  async goto(): Promise<void> {
    await this.page.goto('/signup');
    await this.waitForLoad();
  }

  /**
   * Fill name input
   */
  async fillName(name: string): Promise<void> {
    await this.nameInput.fill(name);
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
   * Fill confirm password input
   */
  async fillConfirmPassword(password: string): Promise<void> {
    await this.confirmPasswordInput.fill(password);
  }

  /**
   * Click signup button
   */
  async clickSignupButton(): Promise<void> {
    await this.signupButton.click();
  }

  /**
   * Perform signup with user details
   */
  async signup(name: string, email: string, password: string, confirmPassword?: string): Promise<void> {
    await this.fillName(name);
    await this.fillEmail(email);
    await this.fillPassword(password);
    await this.fillConfirmPassword(confirmPassword || password);
    await this.clickSignupButton();
  }

  /**
   * Click login link
   */
  async clickLoginLink(): Promise<void> {
    await this.loginLink.click();
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
   * Check if signup button is loading
   */
  async isSignupButtonLoading(): Promise<boolean> {
    const button = this.signupButton;
    const loadingState = await button.getAttribute('aria-busy');
    return loadingState === 'true';
  }

  /**
   * Wait for signup to complete (redirect to home)
   */
  async waitForSignupSuccess(): Promise<void> {
    await this.page.waitForURL('**/home', { timeout: 10000 });
  }

  /**
   * Get validation error for name field
   */
  async getNameValidationError(): Promise<string | null> {
    const nameField = this.nameInput.locator('..').locator('..'); // Go up to form-item
    const errorLocator = nameField.locator('.ant-form-item-explain-error');
    if (await errorLocator.isVisible().catch(() => false)) {
      return await errorLocator.textContent();
    }
    const allErrors = this.page.locator('.ant-form-item-explain-error');
    const count = await allErrors.count();
    if (count > 0) {
      return await allErrors.first().textContent();
    }
    return null;
  }

  /**
   * Get validation error for email field
   */
  async getEmailValidationError(): Promise<string | null> {
    const emailField = this.emailInput.locator('..').locator('..'); // Go up to form-item
    const errorLocator = emailField.locator('.ant-form-item-explain-error');
    if (await errorLocator.isVisible().catch(() => false)) {
      return await errorLocator.textContent();
    }
    const allErrors = this.page.locator('.ant-form-item-explain-error');
    const count = await allErrors.count();
    if (count > 1) {
      return await allErrors.nth(1).textContent();
    }
    return null;
  }

  /**
   * Get validation error for password field
   */
  async getPasswordValidationError(): Promise<string | null> {
    const passwordField = this.passwordInput.locator('..').locator('..'); // Go up to form-item
    const errorLocator = passwordField.locator('.ant-form-item-explain-error');
    if (await errorLocator.isVisible().catch(() => false)) {
      return await errorLocator.textContent();
    }
    const allErrors = this.page.locator('.ant-form-item-explain-error');
    const count = await allErrors.count();
    if (count > 2) {
      return await allErrors.nth(2).textContent();
    }
    return null;
  }

  /**
   * Get validation error for confirm password field
   */
  async getConfirmPasswordValidationError(): Promise<string | null> {
    const confirmPasswordField = this.confirmPasswordInput.locator('..').locator('..'); // Go up to form-item
    const errorLocator = confirmPasswordField.locator('.ant-form-item-explain-error');
    if (await errorLocator.isVisible().catch(() => false)) {
      return await errorLocator.textContent();
    }
    const allErrors = this.page.locator('.ant-form-item-explain-error');
    const count = await allErrors.count();
    if (count > 3) {
      return await allErrors.nth(3).textContent();
    }
    return null;
  }
}


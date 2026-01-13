import { Page } from '@playwright/test';
import { BasePage } from './BasePage';
import { LoginLocators } from '../locators/login.locators';

/**
 * Login Page Object Model
 * Contains all selectors and methods for the Login page
 */
export class LoginPage extends BasePage {
  readonly locators: LoginLocators;

  // Expose locators for easy access
  get emailInput() { return this.locators.emailInput; }
  get passwordInput() { return this.locators.passwordInput; }
  get loginButton() { return this.locators.loginButton; }
  get signupLink() { return this.locators.signupLink; }
  get forgetPasswordLink() { return this.locators.forgetPasswordLink; }
  get errorMessage() { return this.locators.errorMessage; }
  get formTitle() { return this.locators.formTitle; }

  constructor(page: Page) {
    super(page);
    this.locators = new LoginLocators(page);
  }

  /**
   * Navigate to login page
   */
  async goto(): Promise<void> {
    await this.page.goto('/login', { waitUntil: 'networkidle' });
    // Wait for the form to be ready
    await this.formTitle.waitFor({ state: 'visible', timeout: 15000 });
    // Wait for at least one input to be visible (Ant Design might take time to render)
    await this.page.waitForSelector('input.ant-input, #login_email, input[type="email"]', { state: 'visible', timeout: 15000 });
  }

  /**
   * Fill email input
   */
  async fillEmail(email: string): Promise<void> {
    await this.fillInput(this.emailInput, email);
  }

  /**
   * Fill password input
   */
  async fillPassword(password: string): Promise<void> {
    await this.fillInput(this.passwordInput, password);
  }

  /**
   * Click login button
   */
  async clickLoginButton(): Promise<void> {
    await this.clickAndWaitForResponse(this.loginButton);
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
    return await super.isErrorMessageVisible();
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
   * Get validation error for email field (first field, index 0)
   */
  async getEmailValidationError(): Promise<string | null> {
    return await this.getFormFieldValidationError(0);
  }

  /**
   * Get validation error for password field (second field, index 1)
   */
  async getPasswordValidationError(): Promise<string | null> {
    return await this.getFormFieldValidationError(1);
  }
}


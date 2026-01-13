import { Page } from '@playwright/test';
import { BasePage } from './BasePage';
import { SignupLocators } from '../locators/signup.locators';

/**
 * Signup Page Object Model
 * Contains all selectors and methods for the Signup page
 */
export class SignupPage extends BasePage {
  readonly locators: SignupLocators;

  // Expose locators for easy access
  get nameInput() { return this.locators.nameInput; }
  get emailInput() { return this.locators.emailInput; }
  get passwordInput() { return this.locators.passwordInput; }
  get confirmPasswordInput() { return this.locators.confirmPasswordInput; }
  get signupButton() { return this.locators.signupButton; }
  get loginLink() { return this.locators.loginLink; }
  get errorMessage() { return this.locators.errorMessage; }
  get formTitle() { return this.locators.formTitle; }

  constructor(page: Page) {
    super(page);
    this.locators = new SignupLocators(page);
  }

  /**
   * Navigate to signup page
   */
  async goto(): Promise<void> {
    await this.page.goto('/signup', { waitUntil: 'networkidle' });
    // Wait for the form to be ready
    await this.formTitle.waitFor({ state: 'visible', timeout: 15000 });
    // Wait for at least one input to be visible (Ant Design might take time to render)
    await this.page.waitForSelector('input.ant-input, #signup_name, input[type="text"]', { state: 'visible', timeout: 15000 });
  }

  /**
   * Fill name input
   */
  async fillName(name: string): Promise<void> {
    await this.fillInput(this.nameInput, name);
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
   * Fill confirm password input
   */
  async fillConfirmPassword(password: string): Promise<void> {
    await this.fillInput(this.confirmPasswordInput, password);
  }

  /**
   * Click signup button
   */
  async clickSignupButton(): Promise<void> {
    await this.clickAndWaitForResponse(this.signupButton);
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
    return await super.isErrorMessageVisible();
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
   * Get validation error for name field (first field, index 0)
   */
  async getNameValidationError(): Promise<string | null> {
    return await this.getFormFieldValidationError(0);
  }

  /**
   * Get validation error for email field (second field, index 1)
   */
  async getEmailValidationError(): Promise<string | null> {
    return await this.getFormFieldValidationError(1);
  }

  /**
   * Get validation error for password field (third field, index 2)
   */
  async getPasswordValidationError(): Promise<string | null> {
    return await this.getFormFieldValidationError(2);
  }

  /**
   * Get validation error for confirm password field (fourth field, index 3)
   */
  async getConfirmPasswordValidationError(): Promise<string | null> {
    return await this.getFormFieldValidationError(3);
  }
}


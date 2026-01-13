import { Page, Locator } from '@playwright/test';
import { CommonLocators } from './common.locators';

/**
 * Signup page specific selectors
 */
export class SignupLocators extends CommonLocators {
  constructor(page: Page) {
    super(page);
  }

  get nameInput(): Locator {
    return this.antInput.first();
  }

  get emailInput(): Locator {
    return this.antInput.nth(1);
  }

  get passwordInput(): Locator {
    return this.antPasswordInput.first();
  }

  get confirmPasswordInput(): Locator {
    return this.antPasswordInput.nth(1);
  }

  get signupButton(): Locator {
    return this.submitButton;
  }

  get loginLink(): Locator {
    return this.getLink('/login');
  }

  get formTitle(): Locator {
    return this.page.locator('h1:has-text("Sign Up")');
  }
}

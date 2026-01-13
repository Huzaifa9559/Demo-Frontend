import { Page, Locator } from '@playwright/test';
import { CommonLocators } from './common.locators';

/**
 * Login page specific selectors
 */
export class LoginLocators extends CommonLocators {
  constructor(page: Page) {
    super(page);
  }

  get emailInput(): Locator {
    return this.antInput.first();
  }

  get passwordInput(): Locator {
    return this.antPasswordInput
      .or(this.page.locator('input[type="password"]'))
      .or(this.page.locator('span.ant-input-password + input'));
  }

  get loginButton(): Locator {
    return this.submitButton;
  }

  get signupLink(): Locator {
    return this.getLink('/signup');
  }

  get forgetPasswordLink(): Locator {
    return this.getLink('/forget-password');
  }

  get formTitle(): Locator {
    return this.page.locator('h1:has-text("Login")');
  }
}

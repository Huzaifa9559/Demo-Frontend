import { Page, Locator } from '@playwright/test';

/**
 * Common selectors used across multiple pages
 */
export class CommonLocators {
  protected readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  // Ant Design form selectors
  get antInput(): Locator {
    return this.page.locator('input.ant-input');
  }

  get antPasswordInput(): Locator {
    return this.page.locator('.ant-input-password input');
  }

  get submitButton(): Locator {
    return this.page.locator('button[type="submit"]');
  }

  // Error message selectors
  get errorMessage(): Locator {
    return this.page.locator('.bg-red-50 .text-red-600').or(this.page.locator('.text-red-600'));
  }

  get sonnerToast(): Locator {
    return this.page.locator('[data-sonner-toast]');
  }

  get validationError(): Locator {
    return this.page.locator('.ant-form-item-explain-error');
  }

  // Link selectors
  getLink(href: string): Locator {
    return this.page.locator(`a[href="${href}"]`);
  }
}

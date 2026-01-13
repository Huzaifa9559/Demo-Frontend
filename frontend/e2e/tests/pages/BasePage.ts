import { Page, Locator } from '@playwright/test';

/**
 * Base Page Object Model class
 * All page objects should extend this class
 */
export class BasePage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  /**
   * Navigate to a specific URL
   */
  async goto(url: string): Promise<void> {
    await this.page.goto(url);
  }

  /**
   * Wait for page to load
   */
  async waitForLoad(): Promise<void> {
    await this.page.waitForLoadState('networkidle');
  }

  /**
   * Get page title
   */
  async getTitle(): Promise<string> {
    return await this.page.title();
  }

  /**
   * Take a screenshot
   */
  async takeScreenshot(name: string): Promise<void> {
    await this.page.screenshot({ path: `test-results/screenshots/${name}.png` });
  }

  /**
   * Wait for element to be visible
   */
  async waitForElement(selector: string): Promise<void> {
    await this.page.waitForSelector(selector, { state: 'visible' });
  }

  /**
   * Check if element is visible
   */
  async isElementVisible(selector: string): Promise<boolean> {
    return await this.page.locator(selector).isVisible();
  }

  /**
   * Get text content of an element
   */
  async getText(selector: string): Promise<string | null> {
    return await this.page.locator(selector).textContent();
  }

  /**
   * Wait for GraphQL response after form submission
   */
  protected async waitForGraphQLResponse(): Promise<void> {
    await this.page.waitForResponse(
      (response) => response.url().includes('/graphql') && response.request().method() === 'POST',
      { timeout: 10000 }
    ).catch(() => null);
  }

  /**
   * Check if error toast/message is visible (Sonner toasts or inline errors)
   */
  async isErrorMessageVisible(): Promise<boolean> {
    // Wait for toast container to appear
    await this.page.waitForSelector('[data-sonner-toast], [data-sonner-toaster]', { 
      state: 'attached', 
      timeout: 3000 
    }).catch(() => {});
    
    await this.page.waitForTimeout(1500);
    
    // Check for Sonner error toasts
    const toast = this.page.locator('[data-sonner-toast]').first();
    if (await toast.isVisible().catch(() => false)) {
      const text = (await toast.textContent().catch(() => '') || '').toLowerCase();
      const hasError = text.includes('error') || text.includes('invalid') || 
                      text.includes('failed') || text.includes('already exists');
      if (hasError) return true;
    }
    
    // Check for inline error messages
    const inlineError = this.page.locator('.bg-red-50 .text-red-600, .text-red-600, .ant-message-error, .ant-alert-error').first();
    return await inlineError.isVisible().catch(() => false);
  }

  /**
   * Get validation error for a form field by index (0-based)
   * Ant Design shows errors in .ant-form-item-explain-error
   */
  protected async getFormFieldValidationError(fieldIndex: number): Promise<string | null> {
    // Wait for validation errors to appear (Ant Design shows them on form submit)
    try {
      await this.page.waitForSelector('.ant-form-item-explain-error', { 
        state: 'visible', 
        timeout: 3000 
      });
    } catch (e) {
      // Validation error might not appear yet
    }
    
    await this.page.waitForTimeout(500);
    
    // Try to find error in the specific form item
    const formItem = this.page.locator('.ant-form-item').nth(fieldIndex);
    const errorInItem = formItem.locator('.ant-form-item-explain-error');
    
    if (await errorInItem.isVisible().catch(() => false)) {
      const text = await errorInItem.textContent();
      return text;
    }
    
    // Fallback: get error by index from all errors
    const allErrors = this.page.locator('.ant-form-item-explain-error');
    const count = await allErrors.count();
    
    if (count > fieldIndex) {
      const error = allErrors.nth(fieldIndex);
      if (await error.isVisible().catch(() => false)) {
        const text = await error.textContent();
        return text;
      }
    }
    
    // Try alternative: look for error in form item with has-error class
    const errorFormItem = this.page.locator('.ant-form-item-has-error').nth(fieldIndex);
    const errorInErrorItem = errorFormItem.locator('.ant-form-item-explain-error');
    if (await errorInErrorItem.isVisible().catch(() => false)) {
      const text = await errorInErrorItem.textContent();
      return text;
    }
    
    return null;
  }

  /**
   * Wait for element and fill it
   */
  protected async fillInput(locator: Locator, value: string, timeout = 10000): Promise<void> {
    await locator.waitFor({ state: 'visible', timeout });
    await locator.fill(value);
  }

  /**
   * Wait for element and click it, then wait for GraphQL response
   */
  protected async clickAndWaitForResponse(locator: Locator, timeout = 5000): Promise<void> {
    await locator.waitFor({ state: 'visible', timeout });
    const responsePromise = this.waitForGraphQLResponse();
    await locator.click();
    await responsePromise;
    await this.page.waitForTimeout(1000); // Wait for UI updates
  }
}


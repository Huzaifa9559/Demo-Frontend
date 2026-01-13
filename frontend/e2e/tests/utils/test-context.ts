import { Page, BrowserContext } from '@playwright/test';

/**
 * Test context utility to manage page instances
 * This helps share page instances between step definitions
 */
export interface TestContext {
  page?: Page;
  context?: BrowserContext;
}

/**
 * Get the current page from test context
 */
export function getPage(context: TestContext): Page {
  if (!context.page) {
    throw new Error('Page is not initialized. Make sure you are using Playwright test runner.');
  }
  return context.page;
}

/**
 * Get the current browser context from test context
 */
export function getContext(context: TestContext): BrowserContext {
  if (!context.context) {
    throw new Error('Browser context is not initialized. Make sure you are using Playwright test runner.');
  }
  return context.context;
}


import { Before, After, BeforeAll, AfterAll, setWorldConstructor, IWorldOptions } from '@cucumber/cucumber';
import { chromium, Browser, BrowserContext, Page } from '@playwright/test';

let browser: Browser;
let context: BrowserContext;
let page: Page;

/**
 * Custom World class to hold test context
 */
export class CustomWorld {
  page?: Page;
  context?: BrowserContext;
  browser?: Browser;
  
  constructor(options: IWorldOptions) {
    // Initialize world with options if needed
  }
}

setWorldConstructor(CustomWorld);

BeforeAll(async function () {
  // Launch browser before all tests
  browser = await chromium.launch({
    headless: process.env.CI === 'true' || process.env.HEADLESS === 'true',
    slowMo: process.env.SLOW_MO ? parseInt(process.env.SLOW_MO) : 0,
  });
});

Before(async function (this: CustomWorld) {
  // Create a new context and page for each scenario
  context = await browser.newContext({
    viewport: { width: 1280, height: 720 },
    recordVideo: {
      dir: 'test-results/videos/',
    },
  });
  page = await context.newPage();
  
  // Set base URL
  const baseURL = process.env.BASE_URL || 'http://localhost:5173';
  
  // Attach page to world context
  this.page = page;
  this.context = context;
  this.browser = browser;
});

After(async function (this: CustomWorld) {
  // Take screenshot on failure
  if (this.page) {
    const screenshot = await this.page.screenshot({ path: `test-results/screenshots/${Date.now()}.png` }).catch(() => null);
  }
  
  // Close page and context after each scenario
  if (this.page) {
    await this.page.close();
  }
  if (this.context) {
    await this.context.close();
  }
});

AfterAll(async function () {
  // Close browser after all tests
  if (browser) {
    await browser.close();
  }
});


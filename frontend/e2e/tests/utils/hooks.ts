import { Before, After, BeforeAll, AfterAll, setWorldConstructor, IWorldOptions, setDefaultTimeout } from '@cucumber/cucumber';
import { chromium, Browser, BrowserContext, Page } from '@playwright/test';

// Set default timeout for steps (30 seconds)
setDefaultTimeout(30 * 1000);

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
  // Default to headless mode (browser runs in background, no visible window)
  // Set HEADLESS=false to see the browser (useful for debugging)
  
  // Determine headless mode:
  // - If HEADLESS is explicitly set to 'false', run in headed mode (visible)
  // - Otherwise, run in headless mode (hidden)
  const isHeadless = process.env.HEADLESS !== 'false';
  
  browser = await chromium.launch({
    headless: isHeadless,
    slowMo: process.env.SLOW_MO ? parseInt(process.env.SLOW_MO) : 0,
  });
  
  if (!isHeadless) {
    console.log('🌐 Browser is running in headed mode (visible). Tests will run automatically - no manual interaction needed!');
  } else {
    console.log('🔇 Browser is running in headless mode (hidden). Use "npm run test:headed" to see the browser.');
  }
});

Before(async function (this: CustomWorld) {
  // Set base URL
  const baseURL = process.env.BASE_URL || 'http://localhost:5173';
  
  // Create a new context and page for each scenario
  context = await browser.newContext({
    baseURL: baseURL,
    viewport: { width: 1280, height: 720 },
    recordVideo: {
      dir: 'test-results/videos/',
    },
  });
  page = await context.newPage();
  
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


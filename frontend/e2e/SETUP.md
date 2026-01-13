# E2E Testing Setup Guide

## Quick Start

### 1. Install Dependencies

```bash
# From project root
cd frontend
npm install

# Install E2E test dependencies
cd e2e
npm install
```

### 2. Start the Development Server

In a separate terminal, start your frontend application:

```bash
cd frontend
npm run dev
```

The server should be running on `http://localhost:5173`

### 3. Run BDD Tests

From the `e2e` directory:

```bash
# Run all tests
npm test

# Run in headed mode (see browser)
npm run test:headed
```

## Test Structure

### BDD Feature Files

Feature files are written in Gherkin syntax and located in `tests/features/`:

- `login.feature` - Login scenarios
- `signup.feature` - Signup scenarios

### Page Object Model

Page Objects encapsulate page logic and are located in `tests/pages/`:

- `BasePage.ts` - Base class with common methods
- `LoginPage.ts` - Login page selectors and methods
- `SignupPage.ts` - Signup page selectors and methods

### Step Definitions

Step definitions map Gherkin steps to code in `tests/step-definitions/`:

- `login.steps.ts` - Login step implementations
- `signup.steps.ts` - Signup step implementations

## Writing New Tests

### 1. Add a Feature File

Create a new `.feature` file in `tests/features/`:

```gherkin
Feature: My Feature
  Scenario: My scenario
    Given I am on the page
    When I perform an action
    Then I should see a result
```

### 2. Create Page Object (if needed)

Create a new page object in `tests/pages/`:

```typescript
import { Page } from '@playwright/test';
import { BasePage } from './BasePage';

export class MyPage extends BasePage {
  readonly myElement: Locator;

  constructor(page: Page) {
    super(page);
    this.myElement = page.locator('#my-element');
  }

  async doSomething(): Promise<void> {
    await this.myElement.click();
  }
}
```

### 3. Implement Step Definitions

Create step definitions in `tests/step-definitions/`:

```typescript
import { Given, When, Then } from '@cucumber/cucumber';
import { expect } from '@playwright/test';
import { MyPage } from '../pages/MyPage';
import { CustomWorld } from '../utils/hooks';

Given('I am on the page', async function (this: CustomWorld) {
  // Implementation
});
```

## Troubleshooting

### Tests fail to find elements

- Check that the development server is running
- Verify selectors in Page Objects match the actual DOM
- Use Playwright's codegen to generate selectors: `npx playwright codegen http://localhost:5173`

### TypeScript errors

- Ensure `ts-node` is installed: `npm install -D ts-node`
- Check `tsconfig.json` configuration

### Browser doesn't launch

- Install Playwright browsers: `npx playwright install`
- Check environment variables (HEADLESS, BASE_URL)

## Environment Variables

Create a `.env` file in the `e2e` directory:

```env
BASE_URL=http://localhost:5173
HEADLESS=true
SLOW_MO=0
CI=false
```


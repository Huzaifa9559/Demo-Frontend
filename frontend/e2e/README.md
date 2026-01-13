# E2E Testing with BDD and Page Object Model

This directory contains end-to-end tests using Behavior-Driven Development (BDD) with Cucumber and Page Object Model (POM) pattern.

## Structure

```
e2e/
├── playwright.config.ts          # Playwright configuration
├── run-tests.ts                  # TypeScript test runner
├── tsconfig.json                 # TypeScript configuration
├── package.json                  # E2E test dependencies
├── tests/
│   ├── features/                 # Gherkin feature files
│   │   ├── login.feature
│   │   └── signup.feature
│   ├── pages/                    # Page Object Model classes
│   │   ├── BasePage.ts
│   │   ├── LoginPage.ts
│   │   └── SignupPage.ts
│   ├── step-definitions/        # Cucumber step definitions
│   │   ├── login.steps.ts
│   │   └── signup.steps.ts
│   ├── specs/                    # Playwright test specs (alternative)
│   │   ├── login.spec.ts
│   │   └── signup.spec.ts
│   └── utils/                    # Test utilities
│       ├── test-context.ts
│       └── hooks.ts
└── README.md
```

## IDE Setup for Navigation (Ctrl+Click)

To enable **Ctrl+Click** navigation from feature files to step definitions (like in pytest):

### 1. Install VS Code Extensions

Install the recommended extensions when prompted, or manually install:
- **Cucumber (Gherkin) Full Support** (`cucumber.cucumber-official`)
- **Cucumber Auto Complete** (`alexkrechik.cucumberautocomplete`)

### 2. Reload VS Code

After installing extensions:
- Press `Ctrl+Shift+P` (or `Cmd+Shift+P` on Mac)
- Type "Reload Window" and select it

### 3. Test Navigation

1. Open a `.feature` file (e.g., `tests/features/login.feature`)
2. **Ctrl+Click** (or **Cmd+Click** on Mac) on any step like:
   - `Given I am on the login page`
   - `When I enter email "admin@example.com"`
   - `Then I should be redirected to the home page`
3. It should navigate to the corresponding step definition in `tests/step-definitions/`

## Running Tests

### Install Dependencies

First, install dependencies in the frontend directory:
```bash
cd frontend
npm install
```

Then, install E2E test dependencies:
```bash
cd e2e
npm install
```

### Run BDD Tests with Cucumber

From the `e2e` directory:
```bash
# Run all BDD tests
npm test

# Run tests in headed mode (see browser)
npm run test:headed

# Run specific feature
npm exec -- cucumber-js tests/features/login.feature
```

### Run Playwright Tests (Alternative)

From the `frontend` directory:
```bash
# Run all E2E tests
npm run test:e2e

# Run tests in UI mode
npm run test:e2e:ui

# Run tests in headed mode (see browser)
npm run test:e2e:headed

# Run tests in debug mode
npm run test:e2e:debug

# Run specific test file
npx playwright test tests/specs/login.spec.ts
```

## Page Object Model (POM)

The POM pattern is used to encapsulate page-specific logic and selectors:

- **BasePage**: Base class with common page methods
- **LoginPage**: Contains all login page selectors and methods
- **SignupPage**: Contains all signup page selectors and methods

## BDD with Cucumber

Tests are written in Gherkin syntax (`.feature` files) and implemented using step definitions:

- **Features**: Business-readable scenarios in `.feature` files
- **Step Definitions**: Implementation of Gherkin steps in TypeScript

## Configuration

### Environment Variables

- `BASE_URL`: Base URL for the application (default: http://localhost:5173)
- `CI`: Set to `true` for CI environments
- `HEADLESS`: Set to `true` to run in headless mode
- `SLOW_MO`: Add delay between actions (milliseconds)

### Playwright Config

The `playwright.config.ts` file configures:
- Test directory
- Browsers (Chromium, Firefox, WebKit)
- Base URL
- Screenshots and videos on failure
- Local dev server startup

## Test Reports

Test results are generated in:
- `test-results/`: Screenshots, videos, and JSON reports
- `playwright-report/`: HTML test report
- `test-results/cucumber-report.html`: Cucumber HTML report

## Troubleshooting

### Ctrl+Click Not Working

1. **Check Extensions**: Ensure both Cucumber extensions are installed
2. **Reload Window**: Press `Ctrl+Shift+P` → "Reload Window"
3. **Check Settings**: Verify `.vscode/settings.json` has correct paths
4. **File Association**: Ensure `.feature` files are recognized as Gherkin
5. **Restart VS Code**: Sometimes a full restart is needed

### Tests Not Running

1. **Install Dependencies**: Run `npm install` in the `e2e` directory
2. **Check Node Version**: Ensure Node.js 16+ is installed
3. **Check Paths**: Verify feature and step definition paths are correct

## Best Practices

1. **Page Objects**: Keep all page-specific logic in Page Object classes
2. **Step Definitions**: Keep step definitions focused and reusable
3. **Selectors**: Use stable, semantic selectors (data-testid, name attributes)
4. **Wait Strategies**: Use appropriate waits (waitForLoadState, waitForSelector)
5. **Error Handling**: Handle errors gracefully and provide meaningful messages

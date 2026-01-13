# Frontend Application

React application with E2E testing using BDD (Cucumber) and Playwright.

## Quick Start

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Start development server:**
   ```bash
   npm run dev
   ```

3. **Run E2E tests:**
   ```bash
   npm run test:e2e          # Headless mode
   npm run test:e2e:headed    # Visible browser
   ```

## E2E Testing

This project uses Behavior-Driven Development (BDD) with Cucumber and Page Object Model (POM) pattern.

### Test Structure

```
e2e/
├── tests/
│   ├── features/         # Gherkin feature files
│   ├── step-definitions/ # Step definitions (auth.steps.ts)
│   ├── pages/            # Page Object Model classes
│   ├── locators/         # Reusable selectors
│   └── utils/            # Test utilities and hooks
├── run-tests.ts          # Test runner
└── tsconfig.json         # TypeScript config
```

### Running Tests

From the `frontend` directory:

```bash
# Run all tests (headless)
npm run test:e2e

# Run tests with visible browser
npm run test:e2e:headed
```

From the `e2e` directory:

```bash
# Run specific feature
npm exec -- cucumber-js tests/features/login.feature
```

### IDE Setup (VS Code/Cursor)

The project root `.vscode` folder is configured for:
- **Ctrl+Click navigation** from feature files to step definitions
- **Cucumber language support** for `.feature` files
- **Auto-completion** for step definitions
- **Debug configuration** for Cucumber tests

Required extensions:
- **Cucumber (Gherkin) Full Support** (`cucumber.cucumber-official`)

### Configuration

**Environment Variables:**
- `BASE_URL`: Base URL for the application (default: http://localhost:5173)
- `HEADLESS`: Set to `false` to see the browser
- `SLOW_MO`: Add delay between actions (milliseconds)

### Test Reports

Test results are generated in:
- `e2e/test-results/`: Screenshots, videos, and JSON reports
- `e2e/playwright-report/`: HTML test report
- `e2e/test-results/cucumber-report.html`: Cucumber HTML report

### Page Object Model (POM)

The POM pattern is used to encapsulate page-specific logic:
- **BasePage**: Common methods and helpers
- **LoginPage**: Login page selectors and methods
- **SignupPage**: Signup page selectors and methods

### Locators

Reusable selectors are organized in `e2e/tests/locators/`:
- **CommonLocators**: Shared selectors (Ant Design inputs, buttons)
- **LoginLocators**: Login page specific selectors
- **SignupLocators**: Signup page specific selectors

### BDD with Cucumber

Tests are written in Gherkin syntax (`.feature` files) and implemented using step definitions:
- **Features**: Business-readable scenarios
- **Step Definitions**: Implementation in TypeScript (`auth.steps.ts`)

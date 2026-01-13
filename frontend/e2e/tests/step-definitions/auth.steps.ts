import { Given, When, Then } from '@cucumber/cucumber';
import { expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { SignupPage } from '../pages/SignupPage';
import { CustomWorld } from '../utils/hooks';

let loginPage: LoginPage;
let signupPage: SignupPage;

// Login-specific steps
Given('I am on the login page', async function (this: CustomWorld) {
  if (!this.page) {
    throw new Error('Page is not initialized');
  }
  loginPage = new LoginPage(this.page);
  await loginPage.goto();
  await expect(loginPage.formTitle).toBeVisible();
});

When('I click the login button', async function (this: CustomWorld) {
  if (!this.page) {
    throw new Error('Page is not initialized');
  }
  if (!loginPage) {
    loginPage = new LoginPage(this.page);
  }
  await loginPage.clickLoginButton();
  // Wait for React state updates and potential navigation
  // The redirect happens via useEffect after Redux state updates
  await this.page.waitForTimeout(2000);
});

When('I click the signup link', async function (this: CustomWorld) {
  if (!this.page) {
    throw new Error('Page is not initialized');
  }
  if (!loginPage) {
    loginPage = new LoginPage(this.page);
  }
  await loginPage.clickSignupLink();
});

When('I click the forget password link', async function (this: CustomWorld) {
  if (!this.page) {
    throw new Error('Page is not initialized');
  }
  if (!loginPage) {
    loginPage = new LoginPage(this.page);
  }
  await loginPage.clickForgetPasswordLink();
});

Then('I should remain on the login page', async function (this: CustomWorld) {
  if (!this.page) {
    throw new Error('Page is not initialized');
  }
  await expect(this.page).toHaveURL(/.*\/login/);
});

Then('I should be redirected to the signup page', async function (this: CustomWorld) {
  if (!this.page) {
    throw new Error('Page is not initialized');
  }
  await expect(this.page).toHaveURL(/.*\/signup/);
});

Then('I should be redirected to the forget password page', async function (this: CustomWorld) {
  if (!this.page) {
    throw new Error('Page is not initialized');
  }
  await expect(this.page).toHaveURL(/.*\/forget-password/);
});

// Signup-specific steps
Given('I am on the signup page', async function (this: CustomWorld) {
  if (!this.page) {
    throw new Error('Page is not initialized');
  }
  signupPage = new SignupPage(this.page);
  await signupPage.goto();
  await expect(signupPage.formTitle).toBeVisible();
});

When('I enter name {string}', async function (this: CustomWorld, name: string) {
  if (!this.page) {
    throw new Error('Page is not initialized');
  }
  if (!signupPage) {
    signupPage = new SignupPage(this.page);
  }
  await signupPage.fillName(name);
});

When('I enter confirm password {string}', async function (this: CustomWorld, confirmPassword: string) {
  if (!this.page) {
    throw new Error('Page is not initialized');
  }
  if (!signupPage) {
    signupPage = new SignupPage(this.page);
  }
  await signupPage.fillConfirmPassword(confirmPassword);
});

When('I click the signup button', async function (this: CustomWorld) {
  if (!this.page) {
    throw new Error('Page is not initialized');
  }
  if (!signupPage) {
    signupPage = new SignupPage(this.page);
  }
  await signupPage.clickSignupButton();
  // Wait for React state updates and potential navigation
  // The redirect happens via useEffect after Redux state updates
  await this.page.waitForTimeout(2000);
});

When('I click the login link', async function (this: CustomWorld) {
  if (!this.page) {
    throw new Error('Page is not initialized');
  }
  if (!signupPage) {
    signupPage = new SignupPage(this.page);
  }
  await signupPage.clickLoginLink();
});

Then('I should see name validation error {string}', async function (this: CustomWorld, expectedError: string) {
  if (!this.page) {
    throw new Error('Page is not initialized');
  }
  if (!signupPage) {
    signupPage = new SignupPage(this.page);
  }
  const error = await signupPage.getNameValidationError();
  expect(error).toContain(expectedError);
});

Then('I should see confirm password validation error {string}', async function (this: CustomWorld, expectedError: string) {
  if (!this.page) {
    throw new Error('Page is not initialized');
  }
  if (!signupPage) {
    signupPage = new SignupPage(this.page);
  }
  const error = await signupPage.getConfirmPasswordValidationError();
  expect(error).toContain(expectedError);
});

Then('I should remain on the signup page', async function (this: CustomWorld) {
  if (!this.page) {
    throw new Error('Page is not initialized');
  }
  await expect(this.page).toHaveURL(/.*\/signup/);
});

Then('I should be redirected to the login page', async function (this: CustomWorld) {
  if (!this.page) {
    throw new Error('Page is not initialized');
  }
  await expect(this.page).toHaveURL(/.*\/login/);
});

// Shared steps (work for both login and signup)
When('I enter email {string}', async function (this: CustomWorld, email: string) {
  if (!this.page) {
    throw new Error('Page is not initialized');
  }
  const url = this.page.url();
  if (url.includes('/signup')) {
    if (!signupPage) {
      signupPage = new SignupPage(this.page);
    }
    await signupPage.fillEmail(email);
  } else {
    if (!loginPage) {
      loginPage = new LoginPage(this.page);
    }
    await loginPage.fillEmail(email);
  }
});

When('I enter password {string}', async function (this: CustomWorld, password: string) {
  if (!this.page) {
    throw new Error('Page is not initialized');
  }
  const url = this.page.url();
  if (url.includes('/signup')) {
    if (!signupPage) {
      signupPage = new SignupPage(this.page);
    }
    await signupPage.fillPassword(password);
  } else {
    if (!loginPage) {
      loginPage = new LoginPage(this.page);
    }
    await loginPage.fillPassword(password);
  }
});

Then('I should see email validation error {string}', async function (this: CustomWorld, expectedError: string) {
  if (!this.page) {
    throw new Error('Page is not initialized');
  }
  const url = this.page.url();
  let error: string | null;
  if (url.includes('/signup')) {
    if (!signupPage) {
      signupPage = new SignupPage(this.page);
    }
    error = await signupPage.getEmailValidationError();
  } else {
    if (!loginPage) {
      loginPage = new LoginPage(this.page);
    }
    error = await loginPage.getEmailValidationError();
  }
  
  if (!error) {
    // Take a screenshot for debugging
    await this.page.screenshot({ path: `test-results/screenshots/validation-error-${Date.now()}.png` }).catch(() => {});
    throw new Error(`Expected email validation error "${expectedError}" but no error was found. Check screenshot for current page state.`);
  }
  
  expect(error).toContain(expectedError);
});

Then('I should see password validation error {string}', async function (this: CustomWorld, expectedError: string) {
  if (!this.page) {
    throw new Error('Page is not initialized');
  }
  const url = this.page.url();
  let error: string | null;
  if (url.includes('/signup')) {
    if (!signupPage) {
      signupPage = new SignupPage(this.page);
    }
    error = await signupPage.getPasswordValidationError();
  } else {
    if (!loginPage) {
      loginPage = new LoginPage(this.page);
    }
    error = await loginPage.getPasswordValidationError();
  }
  expect(error).toContain(expectedError);
});

Then('I should see an error message', async function (this: CustomWorld) {
  if (!this.page) {
    throw new Error('Page is not initialized');
  }
  const url = this.page.url();
  let isVisible: boolean;
  if (url.includes('/signup')) {
    if (!signupPage) {
      signupPage = new SignupPage(this.page);
    }
    isVisible = await signupPage.isErrorMessageVisible();
  } else {
    if (!loginPage) {
      loginPage = new LoginPage(this.page);
    }
    isVisible = await loginPage.isErrorMessageVisible();
  }
  expect(isVisible).toBe(true);
});

Then('I should be redirected to the home page', async function (this: CustomWorld) {
  if (!this.page) {
    throw new Error('Page is not initialized');
  }
  
  // Wait for navigation to home page (React Router redirect after auth state update)
  await this.page.waitForURL(/.*\/home/, { timeout: 15000, waitUntil: 'networkidle' });
});

Then('I should see the home page content', async function (this: CustomWorld) {
  if (!this.page) {
    throw new Error('Page is not initialized');
  }
  await this.page.waitForLoadState('networkidle');
});

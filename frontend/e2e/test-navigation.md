# Testing Navigation - Step by Step

Let's verify if the extension is working at all:

## Test 1: Check Extension Status

1. Open VS Code
2. Press `Ctrl+Shift+P`
3. Type "Cucumber" and see what commands are available
4. Look for:
   - "Cucumber: Restart Language Server"
   - "Cucumber: Show Step Definitions"

## Test 2: Check Output Panel

1. Open `tests/features/login.feature`
2. Press `Ctrl+Shift+U` (View → Output)
3. In the dropdown, select "Cucumber Language Server"
4. Look for any errors or messages
5. Share what you see

## Test 3: Verify File Recognition

1. Open `tests/features/login.feature`
2. Look at the bottom-right corner of VS Code
3. What language does it show? (Should be "Gherkin")
4. If it shows "Plain Text", click it and select "Gherkin"

## Test 4: Check Step Definition Format

The step definition must match EXACTLY:

**Feature file:**
```gherkin
When I enter email "admin@example.com"
```

**Step definition (login.steps.ts line 17):**
```typescript
When('I enter email {string}', async function (email: string) {
```

The text "I enter email" must match, and `{string}` is a parameter.

## Test 5: Try Manual Search

1. In `login.feature`, select the text: `I enter email`
2. Press `Ctrl+Shift+F` (Search in Files)
3. Does it find the step definition in `login.steps.ts`?
4. If yes, click the result - does it navigate?

## What to Report Back

Please tell me:
1. What language shows in bottom-right when feature file is open?
2. What appears in "Cucumber Language Server" output panel?
3. Does `Ctrl+Shift+F` find the step definitions?
4. Are there any red squiggles/errors in the feature file?

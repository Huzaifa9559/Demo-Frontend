# Troubleshooting Ctrl+Click Navigation

If Ctrl+Click navigation from feature files to step definitions is not working, try these steps:

## Step 1: Verify Extensions Are Installed

1. Open VS Code Extensions (`Ctrl+Shift+X`)
2. Search for and verify these are installed and **enabled**:
   - ✅ **Cucumber (Gherkin) Full Support** (`cucumber.cucumber-official`)
   - ✅ **Cucumber Auto Complete** (`alexkrechik.cucumberautocomplete`)

## Step 2: Check Language Server Status

1. Open a `.feature` file
2. Press `Ctrl+Shift+P` and type "Output: Show Output Channels"
3. Select **"Cucumber Language Server"** from the dropdown
4. Look for any errors or warnings

Common errors:
- "Cannot find step definitions" - Paths might be wrong
- "TypeScript not found" - TypeScript might not be installed

## Step 3: Verify File Association

1. Open a `.feature` file
2. Check the language mode in the bottom-right corner of VS Code
3. It should say **"Gherkin"** (not "Plain Text")

If it says "Plain Text":
- Click on it
- Type "Gherkin" and select it
- Or add to settings: `"files.associations": { "*.feature": "gherkin" }`

## Step 4: Check Settings Paths

Verify the paths in `.vscode/settings.json` are correct:

```json
{
  "cucumber.glue": [
    "frontend/e2e/tests/step-definitions/**/*.ts"
  ],
  "cucumber.stepDefinitions": [
    "frontend/e2e/tests/step-definitions/**/*.ts"
  ]
}
```

**Important**: Paths are relative to the **workspace root**, not the e2e directory.

## Step 5: Restart Language Server

1. Press `Ctrl+Shift+P`
2. Type "Cucumber: Restart Language Server"
3. Select it and wait a few seconds

## Step 6: Check TypeScript Support

The Cucumber extension might need TypeScript to be properly configured:

1. Verify TypeScript is installed: `npm list typescript` in the e2e directory
2. Check if `tsconfig.json` exists in `frontend/e2e/`
3. Try restarting VS Code completely

## Step 7: Alternative - Use "Go to Definition" Command

If Ctrl+Click doesn't work, try:

1. Place cursor on a step (e.g., `Given I am on the login page`)
2. Press `F12` (Go to Definition)
3. Or right-click → "Go to Definition"
4. Or `Ctrl+Shift+P` → "Go to Definition"

## Step 8: Manual Verification

Verify step definitions match exactly:

**Feature file:**
```gherkin
When I enter email "admin@example.com"
```

**Step definition must match:**
```typescript
When('I enter email {string}', async function (email: string) {
  // ...
});
```

The step text must match exactly (parameters like `{string}` are allowed).

## Step 9: Check for Syntax Errors

1. Open `tests/step-definitions/login.steps.ts`
2. Check for any TypeScript errors (red squiggles)
3. Fix any errors - the extension won't parse files with syntax errors

## Step 10: Try Workspace Settings

If project-level settings don't work, try adding to your User Settings:

1. Press `Ctrl+,` to open Settings
2. Search for "cucumber"
3. Add the paths manually:
   - `cucumber.glue`: `frontend/e2e/tests/step-definitions/**/*.ts`
   - `cucumber.stepDefinitions`: `frontend/e2e/tests/step-definitions/**/*.ts`

## Still Not Working?

If none of the above works:

1. **Check Extension Version**: Make sure you have the latest version of the Cucumber extension
2. **Check VS Code Version**: Update VS Code to the latest version
3. **Try Different Extension**: Some users report better results with just "Cucumber (Gherkin) Full Support" without the autocomplete extension
4. **Check Extension Logs**: 
   - `Ctrl+Shift+P` → "Developer: Show Logs"
   - Select "Extension Host" and look for Cucumber-related errors

## Alternative: Use Search

If navigation doesn't work, you can still find step definitions:

1. Press `Ctrl+Shift+F` (Search in Files)
2. Search for the step text (e.g., "I enter email")
3. Look in `tests/step-definitions/` folder

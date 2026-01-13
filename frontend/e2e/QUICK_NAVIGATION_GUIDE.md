# Quick Navigation Guide - Alternative Methods

Since Ctrl+Click might not work with TypeScript step definitions, here are **reliable alternatives**:

## Method 1: Use F12 (Recommended) ⭐

**This should work immediately:**

1. Open `tests/features/login.feature`
2. Place your cursor on any step line, for example:
   ```gherkin
   When I enter email "admin@example.com"
   ```
3. Press **F12** (Go to Definition)
4. VS Code will navigate to the step definition in `login.steps.ts`

**Why this works:**
- Uses VS Code's built-in TypeScript language server
- Doesn't rely on Cucumber extension parsing
- Works with any TypeScript file

## Method 2: Right-Click Menu

1. Right-click on a step in the feature file
2. Select **"Go to Definition"** or **"Go to Type Definition"**
3. Same result as F12

## Method 3: Search in Files (Ctrl+Shift+F)

1. Select the step text (e.g., `I enter email`)
2. Press **Ctrl+Shift+F** (Search in Files)
3. The selected text is automatically searched
4. Results show in `tests/step-definitions/login.steps.ts`
5. Click the result to navigate

## Method 4: Go to Symbol (Ctrl+Shift+O)

1. Open `tests/step-definitions/login.steps.ts`
2. Press **Ctrl+Shift+O** (Go to Symbol in File)
3. Type part of the step text (e.g., "enter email")
4. Select the function to jump to it

## Method 5: Find All References (Shift+F12)

1. Place cursor on a step in feature file
2. Press **Shift+F12** (Find All References)
3. Shows all places where the step is used
4. Includes the step definition

## Method 6: Peek Definition (Alt+F12)

1. Place cursor on a step
2. Press **Alt+F12** (Peek Definition)
3. Shows the step definition in a popup window
4. Can navigate from there

## Quick Test

Try this right now:

1. Open `tests/features/login.feature`
2. Go to line 10: `When I enter email "admin@example.com"`
3. Place cursor anywhere on that line
4. Press **F12**
5. Should jump to `login.steps.ts` line 17

## Why F12 Works But Ctrl+Click Doesn't

- **F12**: Uses VS Code's TypeScript language server (works with .ts files)
- **Ctrl+Click**: Relies on Cucumber extension's language server (may not parse TypeScript well)

## Pro Tip: Keyboard Shortcuts

Create a custom keyboard shortcut for faster navigation:

1. Press `Ctrl+K Ctrl+S` (Keyboard Shortcuts)
2. Search for "Go to Definition"
3. Add a custom shortcut like `Ctrl+D` if you prefer

## Summary

**Use F12** - It's the most reliable method and works immediately with TypeScript step definitions!

# Fix for Ctrl+Click Navigation Issue

The Cucumber extension's Language Server has limited TypeScript support. Here are several solutions:

## Solution 1: Use F12 (Go to Definition) Instead

**This should work immediately:**

1. Open `tests/features/login.feature`
2. Place cursor on any step (e.g., `When I enter email "admin@example.com"`)
3. Press **F12** (Go to Definition)
4. It should navigate to the step definition

**Alternative shortcuts:**
- Right-click → "Go to Definition"
- `Ctrl+F12` (Go to Implementation)
- `Alt+F12` (Peek Definition)

## Solution 2: Use VS Code's Built-in Search

1. Place cursor on a step
2. Press `Ctrl+Shift+F` (Search in Files)
3. The step text is already selected
4. Press Enter to search
5. Results will show in `tests/step-definitions/`

## Solution 3: Install Alternative Extension

Try the **"Gherkin Step Definition"** extension which has better TypeScript support:

1. Open Extensions (`Ctrl+Shift+X`)
2. Search for "Gherkin Step Definition"
3. Install it
4. It might work better with TypeScript

## Solution 4: Create Symbol Links (Workaround)

Create a simple JavaScript wrapper that the extension can parse:

1. The extension might parse JS files better
2. But this requires maintaining duplicate files (not recommended)

## Solution 5: Use CodeLens (If Available)

Some Cucumber extensions add CodeLens above steps showing:
- "0 references" or "1 reference"
- Clicking it navigates to the definition

Check if your extension supports this feature.

## Why Ctrl+Click Might Not Work

The Cucumber Language Server:
- May not fully support TypeScript parsing
- Needs to compile/transpile TypeScript to understand it
- Might have issues with async/await syntax
- May not recognize `@cucumber/cucumber` imports

## Recommended Workaround

**Use F12** - It's the most reliable method and works with TypeScript:

1. It uses VS Code's built-in TypeScript language server
2. Doesn't rely on Cucumber extension parsing
3. Works with any TypeScript file
4. More reliable than Ctrl+Click

## Verify It Works

Test with this step in `login.feature`:
```gherkin
When I enter email "admin@example.com"
```

1. Place cursor on the line
2. Press **F12**
3. Should navigate to `login.steps.ts` line 17

If F12 works, you have navigation - just use a different shortcut!

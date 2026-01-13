# Fix: Feature File Shows as "Plain Text"

## The Problem
Your `.feature` files are showing as "Plain Text" instead of "Gherkin", which means the Cucumber extension isn't recognizing them.

## Quick Fix (Do This Now!)

### Method 1: Manually Set Language Mode

1. Open `tests/features/login.feature`
2. Look at the **bottom-right corner** of VS Code
3. Click where it says **"Plain Text"**
4. Type **"gherkin"** in the search box
5. Select **"Gherkin"** from the list
6. The file should now show syntax highlighting
7. Try Ctrl+Click on a step - it should work now!

### Method 2: Reload VS Code

After I've updated the settings:

1. Press `Ctrl+Shift+P`
2. Type "Reload Window"
3. Select "Developer: Reload Window"
4. Open the feature file again
5. Check if it now shows "Gherkin" in bottom-right

### Method 3: Check Extension

1. Press `Ctrl+Shift+X` (Extensions)
2. Search for "Cucumber"
3. Make sure **"Cucumber (Gherkin) Full Support"** is:
   - ✅ Installed
   - ✅ Enabled (not grayed out)
4. If it's disabled, click "Enable"
5. Reload VS Code

## Why This Happens

The file association wasn't properly configured. I've now updated `.vscode/settings.json` to:
- Associate all `.feature` files with "gherkin" language
- Configure the Cucumber extension properly

## After Fixing

Once the file shows as "Gherkin":
1. Wait 5-10 seconds for the language server to initialize
2. Try **Ctrl+Click** on a step
3. It should now navigate to the step definition!

## Still Not Working?

If it still shows "Plain Text" after reloading:

1. Close VS Code completely
2. Reopen VS Code
3. Open the feature file
4. Manually set it to "Gherkin" (Method 1 above)
5. The setting should stick now

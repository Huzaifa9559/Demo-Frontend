#!/usr/bin/env node

import { setDefaultTimeout } from '@cucumber/cucumber';
import { execSync } from 'child_process';
import * as path from 'path';

// Set default timeout for steps (30 seconds)
setDefaultTimeout(30 * 1000);

// Build command arguments
const args = [
  '--require-module', 'ts-node/register',
  '--require', path.join(__dirname, 'tests/utils/hooks.ts'),
  '--require', path.join(__dirname, 'tests/step-definitions/**/*.ts'),
  '--format', 'progress-bar',
  '--format', 'json:test-results/cucumber-report.json',
  '--format', 'html:test-results/cucumber-report.html',
  '--format', 'message:test-results/cucumber-messages.ndjson',
  '--format-options', JSON.stringify({ snippetInterface: 'async-await' }),
  path.join(__dirname, 'tests/features/**/*.feature'),
];

try {
  const command = ['npx', 'cucumber-js', ...args].join(' ');
  execSync(command, {
    stdio: 'inherit',
    cwd: __dirname,
  });
  process.exit(0);
} catch (error) {
  process.exit(1);
}

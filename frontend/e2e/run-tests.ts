#!/usr/bin/env node

import { spawnSync } from 'child_process';
import * as path from 'path';

// Build command arguments
const formatOptions = JSON.stringify({ snippetInterface: 'async-await' });
const args = [
  'cucumber-js',
  '--require-module', 'ts-node/register',
  '--require', path.join(__dirname, 'tests/utils/hooks.ts'),
  '--require', path.join(__dirname, 'tests/step-definitions/**/*.ts'),
  '--format', 'progress-bar',
  '--format', 'json:test-results/cucumber-report.json',
  '--format', 'html:test-results/cucumber-report.html',
  '--format', 'message:test-results/cucumber-messages.ndjson',
  '--format-options', formatOptions,
  path.join(__dirname, 'tests/features/**/*.feature'),
];

try {
  const result = spawnSync('npx', args, {
    stdio: 'inherit',
    cwd: __dirname,
    shell: false,
  });
  process.exit(result.status || 0);
} catch {
  process.exit(1);
}

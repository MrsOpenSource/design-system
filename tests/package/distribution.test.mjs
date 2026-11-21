import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { execSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '../..');
const pkgPath = path.join(rootDir, 'package.json');
const buildScriptPath = path.join(rootDir, 'scripts', 'build-package.mjs');

test('Phase 8 — Package Configuration & Export Maps', () => {
  assert.ok(fs.existsSync(pkgPath), 'package.json must exist');
  const pkg = JSON.parse(fs.readFileSync(pkgPath, 'utf8'));

  // Exports map validation
  assert.ok(pkg.exports, 'package.json must define exports map');
  assert.ok(pkg.exports['.'], 'Must define root "." export');
  assert.ok(pkg.exports['./css'], 'Must define "./css" export');
  assert.ok(pkg.exports['./tokens'], 'Must define "./tokens" export');
  assert.ok(pkg.exports['./cva'], 'Must define "./cva" export');
  assert.ok(pkg.exports['./transforms'], 'Must define "./transforms" export');
});

test('Phase 8 — Build Distribution Packaging Script', () => {
  assert.ok(fs.existsSync(buildScriptPath), 'scripts/build-package.mjs must exist');

  // Run build-package script
  execSync(`node "${buildScriptPath}"`, { cwd: rootDir, encoding: 'utf8' });

  // Verify generated artifacts in dist/
  const distEsm = path.join(rootDir, 'dist', 'esm', 'index.js');
  const distCjs = path.join(rootDir, 'dist', 'cjs', 'index.cjs');
  const distTypes = path.join(rootDir, 'dist', 'types', 'index.d.ts');

  assert.ok(fs.existsSync(distEsm), 'dist/esm/index.js must be generated');
  assert.ok(fs.existsSync(distCjs), 'dist/cjs/index.cjs must be generated');
  assert.ok(fs.existsSync(distTypes), 'dist/types/index.d.ts must be generated');
});


import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { execSync } from 'node:child_process';

const CLI_PATH = path.resolve(process.cwd(), 'bin', 'cli.js');
const FIXTURES_DIR = path.resolve(process.cwd(), 'tests', 'fixtures', 'migration-temp');

function setupFixtures() {
  cleanup();
  fs.mkdirSync(FIXTURES_DIR, { recursive: true });
}

function cleanup() {
  if (fs.existsSync(FIXTURES_DIR)) {
    fs.rmSync(FIXTURES_DIR, { recursive: true, force: true });
  }
}

test('CLI map --migrate — Migrates a single file in-place', (t) => {
  setupFixtures();
  t.after(cleanup);

  const testFile = path.join(FIXTURES_DIR, 'LegacyCheckout.tsx');
  const initialCode = `
import React from 'react';

export function LegacyCheckout() {
  return (
    <div>
      <h1>Checkout</h1>
      <button onClick={() => alert('pay')} className="btn-pay">Pay Now</button>
      <input type="checkbox" checked={true} />
    </div>
  );
}
`.trim();

  fs.writeFileSync(testFile, initialCode, 'utf8');

  const output = execSync(
    `node "${CLI_PATH}" map "${testFile}" --migrate`,
    { encoding: 'utf8' }
  );

  assert.ok(output.includes('Migrated') || output.includes('Migration Complete'), 'Should announce migration');

  const modifiedCode = fs.readFileSync(testFile, 'utf8');
  assert.ok(modifiedCode.includes('<Button onClick={() => alert(\'pay\')} className="btn-pay">Pay Now</Button>'));
  assert.ok(modifiedCode.includes('<Checkbox checked={true} />'));
  assert.ok(modifiedCode.includes("from '@hsb_design/design-system'"));
});

test('CLI map --migrate --dry-run — Previews migration without modifying file', (t) => {
  setupFixtures();
  t.after(cleanup);

  const testFile = path.join(FIXTURES_DIR, 'PreviewPage.tsx');
  const initialCode = `
export function PreviewPage() {
  return <button>Click me</button>;
}
`.trim();

  fs.writeFileSync(testFile, initialCode, 'utf8');

  const output = execSync(
    `node "${CLI_PATH}" map "${testFile}" --migrate --dry-run`,
    { encoding: 'utf8' }
  );

  assert.ok(output.includes('DRY RUN') || output.includes('dry-run') || output.includes('Preview'), 'Should indicate dry-run mode');

  const fileOnDisk = fs.readFileSync(testFile, 'utf8');
  assert.equal(fileOnDisk, initialCode, 'File content must not be modified in dry-run mode');
});

test('CLI map --migrate — Recursively migrates a directory', (t) => {
  setupFixtures();
  t.after(cleanup);

  const fileA = path.join(FIXTURES_DIR, 'PageA.tsx');
  const fileB = path.join(FIXTURES_DIR, 'PageB.tsx');

  fs.writeFileSync(fileA, 'export const A = () => <button>A</button>;', 'utf8');
  fs.writeFileSync(fileB, 'export const B = () => <textarea rows={3} />;', 'utf8');

  const output = execSync(
    `node "${CLI_PATH}" map "${FIXTURES_DIR}" --migrate`,
    { encoding: 'utf8' }
  );

  assert.ok(output.includes('Migration Complete') || output.includes('Migrated'));

  const contentA = fs.readFileSync(fileA, 'utf8');
  const contentB = fs.readFileSync(fileB, 'utf8');

  assert.ok(contentA.includes('<Button>A</Button>'));
  assert.ok(contentB.includes('<Textarea rows={3} />'));
});

test('CLI map --migrate --import-source — Respects custom import source', (t) => {
  setupFixtures();
  t.after(cleanup);

  const testFile = path.join(FIXTURES_DIR, 'CustomImportPage.tsx');
  fs.writeFileSync(testFile, 'export const C = () => <button>C</button>;', 'utf8');

  execSync(
    `node "${CLI_PATH}" map "${testFile}" --migrate --import-source "@/components/ui"`,
    { encoding: 'utf8' }
  );

  const content = fs.readFileSync(testFile, 'utf8');
  assert.ok(content.includes('<Button>C</Button>'));
  assert.ok(content.includes("from '@/components/ui'"));
});


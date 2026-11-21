import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { execSync } from 'node:child_process';

const CLI_PATH = path.resolve(process.cwd(), 'bin', 'cli.js');
const TEST_SCAFFOLD_DIR = path.resolve(process.cwd(), 'tests', 'fixtures', 'test-scaffold');

function cleanup() {
  if (fs.existsSync(TEST_SCAFFOLD_DIR)) {
    fs.rmSync(TEST_SCAFFOLD_DIR, { recursive: true, force: true });
  }
}

test('CLI add — Scaffolds Button component with --dir and resolves CVA & types dependencies', (t) => {
  cleanup();
  t.after(cleanup);

  const output = execSync(
    `node "${CLI_PATH}" add button --dir "${TEST_SCAFFOLD_DIR}"`,
    { encoding: 'utf8' }
  );

  assert.ok(output.includes('Scaffold complete') || output.includes('Scaffolded'), 'Output should indicate success');
  
  // Verify files exist
  const buttonTs = path.join(TEST_SCAFFOLD_DIR, 'Button.ts');
  const buttonTsx = path.join(TEST_SCAFFOLD_DIR, 'Button.tsx');
  const typesTs = path.join(TEST_SCAFFOLD_DIR, 'types.ts');
  const cvaTs = path.join(TEST_SCAFFOLD_DIR, 'cva.ts');

  assert.ok(fs.existsSync(buttonTs), 'Button.ts must be scaffolded');
  assert.ok(fs.existsSync(buttonTsx), 'Button.tsx must be scaffolded');
  assert.ok(fs.existsSync(typesTs), 'types.ts must be scaffolded');
  assert.ok(fs.existsSync(cvaTs), 'cva.ts must be automatically resolved and scaffolded');

  // Verify import paths are rewritten for standalone ingestion
  const buttonTsContent = fs.readFileSync(buttonTs, 'utf8');
  assert.ok(
    !buttonTsContent.includes('../../core/cva'),
    'Relative path to core/cva must be rewritten to ./cva'
  );
  assert.ok(
    buttonTsContent.includes('./cva'),
    'Must import cva from local ./cva'
  );
});

test('CLI add — Scaffolds Card component with --target flag', (t) => {
  cleanup();
  t.after(cleanup);

  execSync(
    `node "${CLI_PATH}" add card --target "${TEST_SCAFFOLD_DIR}"`,
    { encoding: 'utf8' }
  );

  const cardTs = path.join(TEST_SCAFFOLD_DIR, 'Card.ts');
  const cardTsx = path.join(TEST_SCAFFOLD_DIR, 'Card.tsx');
  const cvaTs = path.join(TEST_SCAFFOLD_DIR, 'cva.ts');

  assert.ok(fs.existsSync(cardTs), 'Card.ts must exist');
  assert.ok(fs.existsSync(cardTsx), 'Card.tsx must exist');
  assert.ok(fs.existsSync(cvaTs), 'cva.ts must exist');

  const cardTsContent = fs.readFileSync(cardTs, 'utf8');
  assert.ok(!cardTsContent.includes('../../core/cva'), 'Must not have relative core/cva import');
  assert.ok(cardTsContent.includes('./cva'), 'Must import cva from ./cva');
});

test('CLI add — Scaffolds component group with rewritten sister imports', (t) => {
  cleanup();
  t.after(cleanup);

  execSync(
    `node "${CLI_PATH}" add feedback --dir "${TEST_SCAFFOLD_DIR}"`,
    { encoding: 'utf8' }
  );

  const dialogTsx = path.join(TEST_SCAFFOLD_DIR, 'AdaptiveDialog.tsx');
  const modalTsx = path.join(TEST_SCAFFOLD_DIR, 'Modal.tsx');
  const sheetTsx = path.join(TEST_SCAFFOLD_DIR, 'BottomSheet.tsx');

  assert.ok(fs.existsSync(dialogTsx), 'AdaptiveDialog.tsx must exist');
  assert.ok(fs.existsSync(modalTsx), 'Modal.tsx must exist');
  assert.ok(fs.existsSync(sheetTsx), 'BottomSheet.tsx must exist');

  const dialogContent = fs.readFileSync(dialogTsx, 'utf8');
  assert.ok(!dialogContent.includes('../molecules/Modal'), 'Sister import to Modal must be rewritten');
  assert.ok(!dialogContent.includes('../feedback/BottomSheet'), 'Sister import to BottomSheet must be rewritten');
});

test('CLI add — Rejects unknown component gracefully', () => {
  cleanup();

  const output = execSync(
    `node "${CLI_PATH}" add non-existent-widget --dir "${TEST_SCAFFOLD_DIR}"`,
    { encoding: 'utf8' }
  );

  assert.ok(
    output.includes('Unknown component: non-existent-widget'),
    'Should display clear error message for unknown component'
  );
});


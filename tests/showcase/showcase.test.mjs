import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '../..');
const indexPath = path.join(rootDir, 'index.html');
const showcasePath = path.join(rootDir, 'showcase', 'index.html');

test('Phase 9 — Showcase Files Exist', () => {
  assert.ok(fs.existsSync(indexPath), 'Root index.html must exist');
  assert.ok(fs.existsSync(showcasePath), 'showcase/index.html must exist');
});

test('Phase 9 — Showcase Contains Interactive Primitives Demos', () => {
  const html = fs.readFileSync(indexPath, 'utf8');

  // Verify Primitives & New Additions
  assert.match(html, /accordion/i, 'Must contain Accordion demo or reference');
  assert.match(html, /divider/i, 'Must contain Divider demo or reference');
  assert.match(html, /skeleton/i, 'Must contain Skeleton demo or reference');
  assert.match(html, /pagination/i, 'Must contain Pagination demo or reference');
  assert.match(html, /select/i, 'Must contain Select demo or reference');
});

test('Phase 9 — Showcase Contains Form & CommandPalette Demos', () => {
  const html = fs.readFileSync(indexPath, 'utf8');

  // Verify Form Validation & CommandPalette Playground
  assert.match(html, /data-showcase="form"|id="demo-form"|eds-form|Form Validation/i, 'Must feature Form validation playground');
  assert.match(html, /data-showcase="command-palette"|id="demo-command-palette"|eds-command-palette|Command Palette/i, 'Must feature CommandPalette playground');
});

test('Phase 9 — Showcase Contains Zero-JS Theme Toggler & CSS Inspector', () => {
  const html = fs.readFileSync(indexPath, 'utf8');

  // Theme Toggler Attributes & Presets
  assert.match(html, /data-theme="emerald"|theme.*emerald/i, 'Must feature Emerald theme toggle');
  assert.match(html, /data-theme="slate"|theme.*slate/i, 'Must feature Slate theme toggle');
  assert.match(html, /data-theme="genai-neon"|theme.*genai-neon/i, 'Must feature GenAI Neon theme toggle');
});

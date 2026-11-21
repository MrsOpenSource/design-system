import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '../..');
const cssPath = path.join(rootDir, 'dist', 'css', 'design-system.css');

test('Phase 5 — Semantic Utility Classes (.ds-btn, .ds-card, .ds-input, .ds-badge)', () => {
  assert.ok(fs.existsSync(cssPath), 'dist/css/design-system.css must exist');
  const css = fs.readFileSync(cssPath, 'utf8');

  // 1. Button Semantic Classes
  assert.match(css, /\.ds-btn\s*\{/, 'Must define base .ds-btn utility class');
  assert.match(css, /\.ds-btn--(primary|secondary|outline|danger)|.ds-btn-(primary|secondary|outline|danger)/, 'Must define .ds-btn variants');
  assert.match(css, /\.ds-btn--sm/, 'Must define .ds-btn--sm size modifier');
  assert.match(css, /\.ds-btn--lg/, 'Must define .ds-btn--lg size modifier');

  // 2. Card Semantic Classes
  assert.match(css, /\.ds-card\s*\{/, 'Must define base .ds-card utility class');
  assert.match(css, /\.ds-card--(elevated|outlined|filled)/, 'Must define .ds-card variants');
  assert.match(css, /\.ds-card-header|\.ds-card__header/, 'Must define card header slot class');
  assert.match(css, /\.ds-card-body|\.ds-card__body/, 'Must define card body slot class');
  assert.match(css, /\.ds-card-footer|\.ds-card__footer/, 'Must define card footer slot class');

  // 3. Input Semantic Classes
  assert.match(css, /\.ds-input\s*\{/, 'Must define base .ds-input utility class');
  assert.match(css, /\.ds-input--(filled|error|sm|lg)/, 'Must define .ds-input modifiers');

  // 4. Badge Semantic Classes
  assert.match(css, /\.ds-badge\s*\{/, 'Must define base .ds-badge utility class');
  assert.match(css, /\.ds-badge--(primary|success|warning|danger|outline)/, 'Must define .ds-badge variants');
});

test('Phase 5 — Pure CSS Theme Attributes ([data-theme="emerald"], [data-theme="slate"])', () => {
  const css = fs.readFileSync(cssPath, 'utf8');

  // Emerald theme
  assert.match(css, /\[data-theme=["']emerald["']\]/, 'Must define [data-theme="emerald"] selector');
  assert.match(css, /#059669/, 'Emerald theme must define primary color #059669');

  // Slate theme
  assert.match(css, /\[data-theme=["']slate["']\]|\[data-theme=["']enterprise-slate["']\]/, 'Must define slate theme selector');
  assert.match(css, /#334155/, 'Slate theme must define primary color #334155');

  // GenAI Neon theme
  assert.match(css, /\[data-theme=["']genai-neon["']\]/, 'Must define genai-neon theme selector');
  assert.match(css, /#7C3AED/, 'GenAI theme must define violet accent #7C3AED');
});


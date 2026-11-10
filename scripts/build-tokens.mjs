import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

// 1. Load all token files
const primitivesPath = path.join(rootDir, 'tokens', 'primitives.json');
const semanticPath = path.join(rootDir, 'tokens', 'semantic.json');
const responsivePath = path.join(rootDir, 'tokens', 'responsive.json');
const componentsDir = path.join(rootDir, 'tokens', 'components');

const primitives = JSON.parse(fs.readFileSync(primitivesPath, 'utf8'));
const semantic = JSON.parse(fs.readFileSync(semanticPath, 'utf8'));
const responsive = JSON.parse(fs.readFileSync(responsivePath, 'utf8'));

const componentFiles = fs.readdirSync(componentsDir).filter(f => f.endsWith('.json'));
const components = {};
for (const file of componentFiles) {
  const compData = JSON.parse(fs.readFileSync(path.join(componentsDir, file), 'utf8'));
  Object.assign(components, compData.component || compData);
}

// Master dictionary for alias resolution
const masterDict = {
  ...primitives,
  ...semantic,
  ...responsive,
  component: components
};

// Helper: resolve reference string "{path.to.token}"
function resolveValue(val, dict) {
  if (typeof val !== 'string') return val;
  const match = val.match(/^\{([^}]+)\}$/);
  if (!match) return val;
  const parts = match[1].split('.');
  let curr = dict;
  for (const part of parts) {
    if (curr && typeof curr === 'object' && part in curr) {
      curr = curr[part];
    } else {
      return val; // Fallback if not found
    }
  }
  if (curr && typeof curr === 'object' && '$value' in curr) {
    return resolveValue(curr.$value, dict);
  }
  return curr;
}

// Helper: flatten tree to key-value pairs
function flattenTokens(obj, prefix = '', result = {}) {
  for (const [key, val] of Object.entries(obj)) {
    if (key.startsWith('$')) continue;
    const newPrefix = prefix ? `${prefix}-${key}` : key;
    if (val && typeof val === 'object') {
      if ('$value' in val) {
        result[newPrefix] = resolveValue(val.$value, masterDict);
      } else {
        flattenTokens(val, newPrefix, result);
      }
    }
  }
  return result;
}

const flatPrimitives = flattenTokens(primitives);
const flatSemantic = flattenTokens(semantic);
const flatResponsive = flattenTokens(responsive);
const flatComponents = flattenTokens({ component: components });

console.log(`Tokens parsed:
- Primitives: ${Object.keys(flatPrimitives).length}
- Semantic: ${Object.keys(flatSemantic).length}
- Responsive: ${Object.keys(flatResponsive).length}
- Components: ${Object.keys(flatComponents).length}`);

// 2. Generate CSS Custom Properties
let cssContent = `/**
 * Enterprise Design System - Generated CSS Tokens
 * Specification: W3C Design Tokens Community Group (DTCG)
 */

:root {
  /* ==========================================================================
     Tier 1: Primitives (Palettes, Typography Scales, Spacing, Radii, Shadows)
     ========================================================================== */
`;

for (const [k, v] of Object.entries(flatPrimitives)) {
  cssContent += `  --${k}: ${v};\n`;
}

cssContent += `\n  /* ==========================================================================
     Tier 2: Semantic System Tokens (Light Mode Default)
     ========================================================================== */\n`;

for (const [k, v] of Object.entries(flatSemantic)) {
  cssContent += `  --${k}: ${v};\n`;
}

cssContent += `\n  /* ==========================================================================
     Tier 3: Component-Scoped Tokens & Defaults
     ========================================================================== */\n`;

for (const [k, v] of Object.entries(flatComponents)) {
  cssContent += `  --${k}: ${v};\n`;
}

cssContent += `\n  /* ==========================================================================
     Density Preset Defaults (Comfortable)
     ========================================================================== */
  --table-row-height: var(--responsive-density-comfortable-tableRowHeight, 44px);
  --table-cell-padding-x: var(--responsive-density-comfortable-tableCellPaddingX, 16px);
  --table-cell-padding-y: var(--responsive-density-comfortable-tableCellPaddingY, 10px);
  --input-height: var(--responsive-density-comfortable-inputHeight, 40px);
  --button-height: var(--responsive-density-comfortable-buttonHeight, 40px);
  --kpi-padding: var(--responsive-density-comfortable-kpiPadding, 20px);
}

/* ==========================================================================
   Dark Theme Token Overrides
   ========================================================================== */
[data-theme="dark"] {
  --sys-color-surface-canvas: var(--color-neutral-900, #0F172A);
  --sys-color-surface-card: var(--color-neutral-800, #1E293B);
  --sys-color-surface-elevated: var(--color-neutral-800, #1E293B);
  --sys-color-surface-sunken: var(--color-neutral-950, #020617);
  --sys-color-surface-ai-subtle: rgba(124, 58, 237, 0.12);
  --sys-color-surface-ai-highlight: rgba(124, 58, 237, 0.22);

  --sys-color-text-primary: var(--color-neutral-50, #F8FAFC);
  --sys-color-text-secondary: var(--color-neutral-400, #94A3B8);
  --sys-color-text-tertiary: var(--color-neutral-500, #64748B);
  --sys-color-text-inverse: var(--color-neutral-900, #0F172A);
  --sys-color-text-code: var(--color-neutral-200, #E2E8F0);

  --sys-color-border-subtle: var(--color-neutral-700, #334155);
  --sys-color-border-default: var(--color-neutral-600, #475569);
  --sys-color-border-strong: var(--color-neutral-500, #64748B);

  --component-kpiCard-surface: var(--sys-color-surface-card);
  --component-kpiCard-border-color: var(--sys-color-border-subtle);
  --component-dataTable-surface-header: var(--color-neutral-900, #0F172A);
  --component-dataTable-surface-row: var(--color-neutral-800, #1E293B);
  --component-dataTable-surface-rowHover: var(--color-neutral-700, #334155);
  --component-dataTable-surface-rowSelected: rgba(59, 130, 246, 0.15);
  --component-genAi-composer-surface: var(--color-neutral-800, #1E293B);
  --component-genAi-chatBubble-user-surface: var(--color-neutral-700, #334155);
  --component-genAi-chatBubble-assistant-surface: var(--color-neutral-800, #1E293B);
  --component-genAi-reasoningAccordion-surface: var(--color-neutral-900, #0F172A);
}

/* ==========================================================================
   Density Mode Overrides
   ========================================================================== */
[data-density="compact"] {
  --table-row-height: var(--responsive-density-compact-tableRowHeight, 32px);
  --table-cell-padding-x: var(--responsive-density-compact-tableCellPaddingX, 8px);
  --table-cell-padding-y: var(--responsive-density-compact-tableCellPaddingY, 4px);
  --input-height: var(--responsive-density-compact-inputHeight, 32px);
  --button-height: var(--responsive-density-compact-buttonHeight, 32px);
  --kpi-padding: var(--responsive-density-compact-kpiPadding, 12px);
}

[data-density="spacious"] {
  --table-row-height: var(--responsive-density-spacious-tableRowHeight, 56px);
  --table-cell-padding-x: var(--responsive-density-spacious-tableCellPaddingX, 20px);
  --table-cell-padding-y: var(--responsive-density-spacious-tableCellPaddingY, 16px);
  --input-height: var(--responsive-density-spacious-inputHeight, 48px);
  --button-height: var(--responsive-density-spacious-buttonHeight, 48px);
  --kpi-padding: var(--responsive-density-spacious-kpiPadding, 24px);
}
`;

// Add base classes & utilities
cssContent += `
/* ==========================================================================
   Base Utilities & Standard Classes
   ========================================================================== */
.tabular-nums {
  font-variant-numeric: tabular-nums;
  font-feature-settings: "tnum" on;
}

@keyframes ai-cursor-blink {
  0%, 100% { opacity: 1; }
  50% { opacity: 0; }
}

@keyframes ai-shimmer {
  0% { background-position: -200% 0; }
  100% { background-position: 200% 0; }
}

.ai-cursor-pulse {
  display: inline-block;
  width: var(--component-genAi-streamingCursor-width, 8px);
  height: var(--component-genAi-streamingCursor-height, 15px);
  background: var(--component-genAi-streamingCursor-color, #7C3AED);
  border-radius: var(--component-genAi-streamingCursor-radius, 2px);
  animation: ai-cursor-blink 0.8s infinite;
  vertical-align: middle;
  margin-left: 3px;
}

.ai-shimmer-border {
  background: linear-gradient(90deg, #7C3AED, #06B6D4, #EC4899, #7C3AED);
  background-size: 300% 100%;
  animation: ai-shimmer 3s linear infinite;
}
`;

fs.writeFileSync(path.join(rootDir, 'dist', 'css', 'design-system.css'), cssContent, 'utf8');
fs.writeFileSync(path.join(rootDir, 'dist', 'css', 'tokens.css'), cssContent, 'utf8');

// 3. Generate Tailwind Preset
const tailwindPreset = `/**
 * Enterprise Design System - Tailwind CSS Preset
 * Automatically mapped from W3C DTCG tokens
 */

module.exports = {
  theme: {
    extend: {
      colors: {
        brand: {
          50: 'var(--color-brand-placeholder-primary-50)',
          100: 'var(--color-brand-placeholder-primary-100)',
          200: 'var(--color-brand-placeholder-primary-200)',
          300: 'var(--color-brand-placeholder-primary-300)',
          400: 'var(--color-brand-placeholder-primary-400)',
          500: 'var(--color-brand-placeholder-primary-500)',
          600: 'var(--color-brand-placeholder-primary-600)',
          700: 'var(--color-brand-placeholder-primary-700)',
          800: 'var(--color-brand-placeholder-primary-800)',
          900: 'var(--color-brand-placeholder-primary-900)',
          950: 'var(--color-brand-placeholder-primary-950)',
        },
        surface: {
          canvas: 'var(--sys-color-surface-canvas)',
          card: 'var(--sys-color-surface-card)',
          elevated: 'var(--sys-color-surface-elevated)',
          sunken: 'var(--sys-color-surface-sunken)',
          ai: 'var(--sys-color-surface-ai-subtle)',
        },
        content: {
          primary: 'var(--sys-color-text-primary)',
          secondary: 'var(--sys-color-text-secondary)',
          tertiary: 'var(--sys-color-text-tertiary)',
          brand: 'var(--sys-color-text-brand)',
          ai: 'var(--sys-color-text-ai-accent)',
        },
        ai: {
          accent: 'var(--color-ai-special-accent-primary)',
          secondary: 'var(--color-ai-special-accent-secondary)',
          cyan: 'var(--color-ai-special-accent-cyan)',
        }
      },
      fontFamily: {
        sans: 'var(--typography-font-family-sans)',
        display: 'var(--typography-font-family-display)',
        mono: 'var(--typography-font-family-mono)',
      },
      boxShadow: {
        'ai-glow': 'var(--shadow-ai-glow-subtle)',
        'ai-focus': 'var(--shadow-ai-glow-focused)',
      }
    }
  }
};
`;
fs.writeFileSync(path.join(rootDir, 'dist', 'tailwind', 'tailwind.preset.js'), tailwindPreset, 'utf8');

// 4. Generate TypeScript Definitions
let tsContent = `/**
 * Enterprise Design System - TypeScript Token Definitions
 */

export const DesignTokens = ${JSON.stringify(masterDict, null, 2)} as const;

export type TokenDictionary = typeof DesignTokens;
export type ColorPalette = keyof typeof DesignTokens.color;
export type SpacingScale = keyof typeof DesignTokens.spacing;
export type TypographyScale = keyof typeof DesignTokens.typography.fontSize;
`;
fs.writeFileSync(path.join(rootDir, 'dist', 'ts', 'tokens.ts'), tsContent, 'utf8');

console.log('Build completed successfully!');
console.log('Artifacts generated:');
console.log(' - dist/css/design-system.css');
console.log(' - dist/tailwind/tailwind.preset.js');
console.log(' - dist/ts/tokens.ts');


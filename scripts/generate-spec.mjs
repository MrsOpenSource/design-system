import fs from 'fs';
import path from 'path';
import { ALL_112_COMPONENTS } from './build-master-catalog.mjs';

/**
 * Generates an exhaustive, production-grade living specification HTML file
 * covering Brad Frost's complete Atomic Design hierarchy for ANY brand.
 * 
 * Hierarchy:
 * 1. Tokens (Primitives, Semantics, Typography, Radii, Shadows)
 * 2. Atoms (Typography scale, Buttons, Inputs, Badges, Avatars, Switches, Sliders)
 * 3. Molecules (Alerts, Search+⌘K, Tabs, Breadcrumbs, Prompt Composer)
 * 4. Organisms (184px KPI cards, Header Anomaly Charts, Data Tables, Multimodal AI compound cards)
 * 5. Brand Archetype Switcher (Neobrutalist, Corporate, Modern SaaS, AI-Native)
 */
export function generateLivingSpec(brandName = 'Enterprise', brandPrimary = '#0ea5e9', brandSecondary = '#8b5cf6') {
  
  const specTableRows = ALL_112_COMPONENTS.map(c => `
    <tr class="spec-matrix-row" data-cat="${c.cat}" data-name="${c.name.toLowerCase()}">
      <td style="padding: 10px 12px; font-weight: 700; color: var(--color-brand-primary-600); font-family: var(--font-mono);">${c.num}</td>
      <td style="padding: 10px 12px;">
        <div style="font-weight: 700; font-size: 13px;">${c.name}</div>
        <div style="font-size: 11px; color: var(--sys-color-text-secondary); margin-top: 2px;">${c.desc}</div>
      </td>
      <td style="padding: 10px 12px;">
        <span class="ds-badge" style="background: var(--sys-color-surface-sunken); border: 1px solid var(--sys-color-border-subtle); font-size: 10px;">${c.cat}</span>
      </td>
      <td style="padding: 10px 12px;">
        <code style="font-family: var(--font-mono); font-size: 11px; background: rgba(37,99,235,0.08); color: var(--color-brand-primary-600); padding: 3px 6px; border-radius: 4px; display: inline-block;">${c.api.replace(/</g, '&lt;').replace(/>/g, '&gt;')}</code>
      </td>
      <td style="padding: 10px 12px; font-size: 11px; color: var(--sys-color-text-secondary);">${c.device}</td>
      <td style="padding: 10px 12px; text-align: right;">
        <span class="ds-badge ds-badge-ai" style="font-size: 10px;">✓ In Package</span>
      </td>
    </tr>
  `).join('');

  return `<!DOCTYPE html>
<html lang="en" class="scroll-smooth">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>${brandName} Design System — Living Specification & Atomic Component Library</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=Montserrat:wght@600;700;800&family=Roboto+Mono:wght@400;500;600;700&display=swap" rel="stylesheet">
  <script src="https://unpkg.com/lucide@latest"></script>
  
  <style>
    /* ==========================================================================
       ${brandName} Design System: 3-Tier W3C DTCG Token Foundation
       ========================================================================== */
    :root {
      /* Tier 1: Brand & Primitive Tokens */
      --color-brand-primary-50: #f0f9ff;
      --color-brand-primary-100: #e0f2fe;
      --color-brand-primary-200: #bae6fd;
      --color-brand-primary-300: #7dd3fc;
      --color-brand-primary-400: #38bdf8;
      --color-brand-primary-500: ${brandPrimary};
      --color-brand-primary-600: #0284c7;
      --color-brand-primary-700: #0369a1;
      --color-brand-primary-800: #075985;
      --color-brand-primary-900: #0c4a6e;
      --color-brand-primary-950: #082f49;

      --color-brand-secondary-500: ${brandSecondary};
      --color-brand-secondary-600: #7c3aed;
      --color-ai-accent: #7c3aed;
      --color-ai-cyan: #06b6d4;
      --color-ai-glow: rgba(124, 58, 237, 0.16);

      --color-slate-50: #f8fafc;
      --color-slate-100: #f1f5f9;
      --color-slate-200: #e2e8f0;
      --color-slate-300: #cbd5e1;
      --color-slate-400: #94a3b8;
      --color-slate-500: #64748b;
      --color-slate-600: #475569;
      --color-slate-700: #334155;
      --color-slate-800: #1e293b;
      --color-slate-900: #0f172a;
      --color-slate-950: #020617;

      --color-success-base: #10b981;
      --color-success-bg: #ecfdf5;
      --color-success-text: #065f46;
      --color-danger-base: #ef4444;
      --color-danger-bg: #fef2f2;
      --color-danger-text: #991b1b;
      --color-warning-base: #f59e0b;
      --color-warning-bg: #fffbeb;
      --color-warning-text: #92400e;
      --color-info-base: #3b82f6;
      --color-info-bg: #eff6ff;
      --color-info-text: #1e40af;

      /* Typography */
      --font-sans: 'Inter', system-ui, -apple-system, sans-serif;
      --font-display: 'Montserrat', system-ui, -apple-system, sans-serif;
      --font-mono: 'Roboto Mono', monospace;

      /* Radius & Elevation Systems (Default Modern / Dynamic Archetype) */
      --brand-radius-xs: 4px;
      --brand-radius-sm: 8px;
      --brand-radius-md: 12px;
      --brand-radius-lg: 16px;
      --brand-radius-card: 20px;
      --brand-radius-full: 9999px;

      --brand-border-width: 1.5px;
      --brand-shadow-default: 0 4px 6px -1px rgba(0, 0, 0, 0.05), 0 2px 4px -2px rgba(0, 0, 0, 0.05);
      --brand-shadow-elevated: 0 10px 15px -3px rgba(0, 0, 0, 0.08), 0 4px 6px -4px rgba(0, 0, 0, 0.04);
      --brand-shadow-hard: 4px 4px 0px var(--sys-color-border-strong);

      /* Tier 2: System Semantics (Light Canvas Default) */
      --sys-color-canvas: #f8fafc;
      --sys-color-surface-card: #ffffff;
      --sys-color-surface-sunken: #f1f5f9;
      --sys-color-surface-elevated: #ffffff;
      --sys-color-surface-ai-subtle: #f5f3ff;
      --sys-color-border-subtle: #e2e8f0;
      --sys-color-border-default: #cbd5e1;
      --sys-color-border-strong: #0f172a;
      --sys-color-text-primary: #0f172a;
      --sys-color-text-secondary: #475569;
      --sys-color-text-tertiary: #94a3b8;
      --sys-color-brand: var(--color-brand-primary-500);

      /* Tier 3: Component Standard Rhythms */
      --kpi-card-min-height: 184px;
      --kpi-viz-height: 48px;
      --table-density-row-height: 44px;
      --table-cell-padding-y: 10px;
    }

    /* Archetype 1: Neobrutalist (Taqnik / Playful) */
    [data-archetype="neobrutalist"] {
      --brand-radius-sm: 8px;
      --brand-radius-md: 14px;
      --brand-radius-card: 24px;
      --brand-border-width: 2px;
      --brand-shadow-default: 4px 4px 0px var(--sys-color-border-strong);
      --brand-shadow-elevated: 6px 6px 0px var(--sys-color-border-strong);
    }

    /* Archetype 2: Corporate Enterprise (Clean, Subtle) */
    [data-archetype="corporate"] {
      --brand-radius-sm: 4px;
      --brand-radius-md: 6px;
      --brand-radius-card: 8px;
      --brand-border-width: 1px;
      --brand-shadow-default: 0 1px 3px rgba(0, 0, 0, 0.08);
      --brand-shadow-elevated: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
    }

    /* Archetype 3: AI-Native Dark Glow (Futuristic) */
    [data-archetype="ai-native"] {
      --sys-color-canvas: #090d16;
      --sys-color-surface-card: #0f172a;
      --sys-color-surface-sunken: #070b12;
      --sys-color-surface-elevated: #1e293b;
      --sys-color-border-subtle: #1e293b;
      --sys-color-border-default: #334155;
      --sys-color-border-strong: #7c3aed;
      --sys-color-text-primary: #f8fafc;
      --sys-color-text-secondary: #94a3b8;
      --sys-color-text-tertiary: #64748b;
      --brand-radius-card: 16px;
      --brand-shadow-default: 0 0 20px rgba(124, 58, 237, 0.2);
    }

    /* Dark Mode (Canvas Inversion) */
    .dark:not([data-archetype="ai-native"]) {
      --sys-color-canvas: #090d16;
      --sys-color-surface-card: #0f172a;
      --sys-color-surface-sunken: #070b12;
      --sys-color-surface-elevated: #1e293b;
      --sys-color-surface-ai-subtle: #19142b;
      --sys-color-border-subtle: #1e293b;
      --sys-color-border-default: #334155;
      --sys-color-border-strong: #cbd5e1;
      --sys-color-text-primary: #f8fafc;
      --sys-color-text-secondary: #94a3b8;
      --sys-color-text-tertiary: #64748b;
      --color-success-bg: #064e3b;
      --color-success-text: #a7f3d0;
      --color-danger-bg: #450a0a;
      --color-danger-text: #fecaca;
      --color-warning-bg: #451a03;
      --color-warning-text: #fde68a;
    }

    /* Density Mode: Compact */
    .density-compact {
      --table-density-row-height: 32px;
      --table-cell-padding-y: 4px;
    }

    /* Reset & Base Elements */
    * { box-sizing: border-box; margin: 0; padding: 0; transition: background-color 0.2s ease, border-color 0.2s ease, color 0.2s ease; }
    body { background-color: var(--sys-color-canvas); color: var(--sys-color-text-primary); font-family: var(--font-sans); line-height: 1.5; -webkit-font-smoothing: antialiased; }
    
    .container { max-width: 1400px; margin: 0 auto; padding: 0 24px; }
    .tabular-nums, .num-value { font-variant-numeric: tabular-nums; font-feature-settings: "tnum" 1; font-family: var(--font-mono); letter-spacing: -0.02em; }

    /* Surface Cards & Elements */
    .ds-card {
      background: var(--sys-color-surface-card);
      border: var(--brand-border-width) solid var(--sys-color-border-default);
      border-radius: var(--brand-radius-card);
      box-shadow: var(--brand-shadow-default);
      padding: 24px;
    }
    .ds-card-sm {
      background: var(--sys-color-surface-card);
      border: var(--brand-border-width) solid var(--sys-color-border-default);
      border-radius: var(--brand-radius-md);
      padding: 16px;
    }

    /* Buttons */
    .ds-btn {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      gap: 8px;
      padding: 9px 18px;
      border-radius: var(--brand-radius-md);
      font-family: var(--font-sans);
      font-weight: 600;
      font-size: 14px;
      cursor: pointer;
      border: var(--brand-border-width) solid transparent;
      box-shadow: var(--brand-shadow-default);
      transition: all 0.15s ease;
      text-decoration: none;
      user-select: none;
    }
    .ds-btn:hover { transform: translateY(-1px); }
    .ds-btn:active { transform: translateY(1px); }
    .ds-btn-primary { background: var(--color-brand-primary-500); color: #fff; border-color: var(--color-brand-primary-600); }
    .ds-btn-secondary { background: var(--sys-color-surface-card); color: var(--sys-color-text-primary); border-color: var(--sys-color-border-default); }
    .ds-btn-outline { background: transparent; color: var(--color-brand-primary-500); border-color: var(--color-brand-primary-500); }
    .ds-btn-ghost { background: transparent; color: var(--sys-color-text-secondary); border-color: transparent; box-shadow: none; }
    .ds-btn-ghost:hover { background: var(--sys-color-surface-sunken); color: var(--sys-color-text-primary); }
    .ds-btn-danger { background: var(--color-danger-bg); color: var(--color-danger-text); border-color: var(--color-danger-base); }
    .ds-btn-ai { background: linear-gradient(135deg, var(--color-brand-primary-500), var(--color-brand-secondary-500)); color: #fff; border-color: transparent; box-shadow: 0 0 16px var(--color-ai-glow); }
    .ds-btn-sm { padding: 6px 12px; font-size: 12px; border-radius: var(--brand-radius-sm); }
    .ds-btn-lg { padding: 12px 24px; font-size: 16px; border-radius: var(--brand-radius-lg); }
    .ds-btn:disabled { opacity: 0.5; cursor: not-allowed; transform: none; }

    /* Inputs */
    .ds-input {
      width: 100%;
      height: 40px;
      padding: 0 14px;
      border-radius: var(--brand-radius-md);
      border: var(--brand-border-width) solid var(--sys-color-border-default);
      background: var(--sys-color-surface-card);
      color: var(--sys-color-text-primary);
      font-size: 14px;
      font-family: var(--font-sans);
      outline: none;
      transition: border-color 0.15s ease, box-shadow 0.15s ease;
    }
    .ds-input:focus { border-color: var(--color-brand-primary-500); box-shadow: 0 0 0 3px rgba(14, 165, 233, 0.15); }

    /* Badges */
    .ds-badge {
      display: inline-flex;
      align-items: center;
      gap: 5px;
      padding: 3px 10px;
      border-radius: var(--brand-radius-full);
      font-size: 12px;
      font-weight: 700;
      line-height: 1.2;
    }
    .ds-badge-success { background: var(--color-success-bg); color: var(--color-success-text); border: 1px solid var(--color-success-base); }
    .ds-badge-warning { background: var(--color-warning-bg); color: var(--color-warning-text); border: 1px solid var(--color-warning-base); }
    .ds-badge-danger { background: var(--color-danger-bg); color: var(--color-danger-text); border: 1px solid var(--color-danger-base); }
    .ds-badge-info { background: var(--color-info-bg); color: var(--color-info-text); border: 1px solid var(--color-info-base); }
    .ds-badge-ai { background: rgba(124, 58, 237, 0.12); color: var(--color-brand-secondary-500); border: 1px solid rgba(124, 58, 237, 0.3); }

    /* Navigation Tabs */
    .ds-tab-nav {
      display: flex;
      gap: 24px;
      border-bottom: 2px solid var(--sys-color-border-subtle);
      margin-bottom: 32px;
    }
    .ds-tab-item {
      padding: 12px 4px;
      font-size: 14px;
      font-weight: 600;
      color: var(--sys-color-text-secondary);
      border-bottom: 2px solid transparent;
      margin-bottom: -2px;
      cursor: pointer;
      text-decoration: none;
      display: inline-flex;
      align-items: center;
      gap: 8px;
    }
    .ds-tab-item.active, .ds-tab-item:hover { color: var(--color-brand-primary-500); border-bottom-color: var(--color-brand-primary-500); }

    /* Modal Overlay */
    .modal-overlay {
      display: none; position: fixed; inset: 0; background: rgba(15, 23, 42, 0.65);
      backdrop-filter: blur(4px); z-index: 1000; align-items: center; justify-content: center; padding: 20px;
    }
    .modal-overlay.active { display: flex; }
  </style>
</head>
<body>

  <!-- Top Global Header -->
  <header style="background: var(--sys-color-surface-card); border-bottom: var(--brand-border-width) solid var(--sys-color-border-default); position: sticky; top: 0; z-index: 100; backdrop-filter: blur(8px);">
    <div class="container" style="display: flex; align-items: center; justify-content: space-between; height: 72px;">
      <div style="display: flex; align-items: center; gap: 14px;">
        <div style="width: 42px; height: 42px; background: linear-gradient(135deg, var(--color-brand-primary-500), var(--color-brand-secondary-500)); border-radius: 12px; display: flex; align-items: center; justify-content: center; color: white; font-weight: 800; font-size: 20px; box-shadow: var(--brand-shadow-default);">
          ${brandName.charAt(0)}
        </div>
        <div>
          <div style="font-family: var(--font-display); font-weight: 800; font-size: 18px; display: flex; align-items: center; gap: 8px;">
            <span>${brandName}</span>
            <span class="ds-badge ds-badge-info" style="font-size: 10px; padding: 1px 6px;">ATOMIC LIVING SPEC</span>
          </div>
          <div style="font-size: 12px; color: var(--sys-color-text-secondary);">Brad Frost Atomic Hierarchy • Tokens $\\to$ Atoms $\\to$ Molecules $\\to$ Organisms</div>
        </div>
      </div>

      <!-- Archetype & Theme Controls -->
      <div style="display: flex; align-items: center; gap: 10px;">
        <!-- Brand Archetype Selector -->
        <select id="archetypeSelect" class="ds-input" style="width: 175px; height: 36px; font-size: 12px; font-weight: 600;">
          <option value="neobrutalist">Neobrutalist (Bold 24px)</option>
          <option value="corporate">Corporate (Clean 6px)</option>
          <option value="ai-native">AI-Native (Dark Glow)</option>
        </select>

        <!-- Density Toggle -->
        <button id="densityBtn" class="ds-btn ds-btn-secondary ds-btn-sm">
          <span>Density: Comfortable</span>
        </button>

        <!-- Dark Mode Toggle -->
        <button id="themeBtn" class="ds-btn ds-btn-secondary ds-btn-sm">
          <span id="themeIcon">🌙</span> <span id="themeLabel">Dark</span>
        </button>
      </div>
    </div>
  </header>

  <!-- Hero Summary -->
  <section style="padding: 36px 0 20px; background: var(--sys-color-surface-sunken); border-bottom: 1px solid var(--sys-color-border-subtle);">
    <div class="container">
      <h1 style="font-family: var(--font-display); font-size: 32px; font-weight: 800; letter-spacing: -0.02em; margin-bottom: 10px;">
        Complete Atomic Component Specification
      </h1>
      <p style="font-size: 15px; color: var(--sys-color-text-secondary); max-width: 820px; margin-bottom: 20px;">
        This library provides complete atomic granularity: base typography and buttons (Atoms), composite search and navigation (Molecules), standardized 184px KPI cards and multimodal AI response units (Organisms) that adapt to any corporate brand.
      </p>

      <!-- Atomic Navigation Bar -->
      <nav class="ds-tab-nav">
        <a href="#tokens" class="ds-tab-item active">Tier 1 & 2 Tokens</a>
        <a href="#atoms" class="ds-tab-item">Atoms (Buttons, Inputs, Badges)</a>
        <a href="#molecules" class="ds-tab-item">Molecules (Alerts, Tabs, Search)</a>
        <a href="#organisms-kpi" class="ds-tab-item">Organisms (184px KPIs & Charts)</a>
        <a href="#organisms-table" class="ds-tab-item">Organisms (Data Tables)</a>
        <a href="#organisms-ai" class="ds-tab-item">Organisms (Multimodal Gen AI)</a>
        <a href="#component-matrix" class="ds-tab-item" style="font-weight: 700; color: var(--color-brand-primary-600);">7. 112-Component Directory Matrix</a>
      </nav>
    </div>
  </section>

  <!-- ==========================================================================
       SECTION 1: TOKENS & TABULAR PROOF
       ========================================================================== -->
  <section id="tokens" style="padding: 48px 0; border-bottom: 1px solid var(--sys-color-border-subtle);">
    <div class="container">
      <h2 style="font-family: var(--font-display); font-size: 24px; font-weight: 800; margin-bottom: 6px;">1. Design Tokens & Tabular Alignment</h2>
      <p style="color: var(--sys-color-text-secondary); font-size: 14px; margin-bottom: 24px;">CSS custom properties driving global color harmony and monospace digit alignment.</p>

      <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 16px; margin-bottom: 32px;">
        <div class="ds-card-sm">
          <div style="height: 48px; background: var(--color-brand-primary-500); border-radius: 8px; margin-bottom: 10px;"></div>
          <div style="font-weight: 700; font-size: 14px;">Primary Brand</div>
          <div class="tabular-nums" style="font-size: 12px; color: var(--sys-color-text-secondary);">${brandPrimary}</div>
        </div>
        <div class="ds-card-sm">
          <div style="height: 48px; background: var(--color-brand-secondary-500); border-radius: 8px; margin-bottom: 10px;"></div>
          <div style="font-weight: 700; font-size: 14px;">Secondary / AI</div>
          <div class="tabular-nums" style="font-size: 12px; color: var(--sys-color-text-secondary);">${brandSecondary}</div>
        </div>
        <div class="ds-card-sm">
          <div style="height: 48px; background: var(--color-success-base); border-radius: 8px; margin-bottom: 10px;"></div>
          <div style="font-weight: 700; font-size: 14px;">Success Status</div>
          <div class="tabular-nums" style="font-size: 12px; color: var(--sys-color-text-secondary);">#10B981</div>
        </div>
        <div class="ds-card-sm">
          <div style="height: 48px; background: var(--color-danger-base); border-radius: 8px; margin-bottom: 10px;"></div>
          <div style="font-weight: 700; font-size: 14px;">Danger Status</div>
          <div class="tabular-nums" style="font-size: 12px; color: var(--sys-color-text-secondary);">#EF4444</div>
        </div>
      </div>

      <!-- Tabular Numeral Live Counter Proof -->
      <div class="ds-card" style="background: var(--sys-color-surface-sunken);">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 16px;">
          <h3 style="font-size: 16px; font-weight: 700;">Live Tabular Numeral Stability Guarantee</h3>
          <span class="tabular-nums ds-badge ds-badge-info" id="liveTicker">0.00s</span>
        </div>
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px;">
          <div style="padding: 16px; background: var(--sys-color-surface-card); border-radius: 8px; border: 1px dashed var(--color-danger-base);">
            <div style="font-size: 11px; font-weight: 700; color: var(--color-danger-base); margin-bottom: 6px;">❌ Standard Proportional (Unstable Baseline)</div>
            <div id="propNum" style="font-size: 24px; font-weight: 700; font-family: var(--font-sans);">$4,892,150.00</div>
          </div>
          <div style="padding: 16px; background: var(--sys-color-surface-card); border-radius: 8px; border: 2px solid var(--color-success-base);">
            <div style="font-size: 11px; font-weight: 700; color: var(--color-success-base); margin-bottom: 6px;">✅ Tabular Enforced (font-variant-numeric: tabular-nums)</div>
            <div id="tabNum" class="tabular-nums" style="font-size: 24px; font-weight: 700;">$4,892,150.00</div>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- ==========================================================================
       SECTION 2: ATOMS (BUTTONS, INPUTS, BADGES, AVATARS, SWITCHES)
       ========================================================================== -->
  <section id="atoms" style="padding: 48px 0; border-bottom: 1px solid var(--sys-color-border-subtle);">
    <div class="container">
      <h2 style="font-family: var(--font-display); font-size: 24px; font-weight: 800; margin-bottom: 6px;">2. Atoms (Fundamental Building Blocks)</h2>
      <p style="color: var(--sys-color-text-secondary); font-size: 14px; margin-bottom: 28px;">Individual controls and elements styled with brand tokens.</p>

      <!-- 2.1 Buttons Matrix -->
      <div class="ds-card" style="margin-bottom: 24px;">
        <h3 style="font-size: 16px; font-weight: 700; margin-bottom: 16px;">2.1 Button Variants & States</h3>
        <div style="display: flex; flex-wrap: wrap; gap: 12px; align-items: center; margin-bottom: 20px;">
          <button class="ds-btn ds-btn-primary">Primary Action</button>
          <button class="ds-btn ds-btn-secondary">Secondary Action</button>
          <button class="ds-btn ds-btn-outline">Outline Button</button>
          <button class="ds-btn ds-btn-ghost">Ghost Button</button>
          <button class="ds-btn ds-btn-danger">Destructive Action</button>
          <button class="ds-btn ds-btn-ai">✨ AI Copilot Action</button>
          <button class="ds-btn ds-btn-primary" disabled>Disabled State</button>
        </div>
        <div style="display: flex; flex-wrap: wrap; gap: 12px; align-items: center;">
          <button class="ds-btn ds-btn-primary ds-btn-sm">Small (32px)</button>
          <button class="ds-btn ds-btn-primary">Medium (40px)</button>
          <button class="ds-btn ds-btn-primary ds-btn-lg">Large (48px)</button>
          <button class="ds-btn ds-btn-secondary" style="width: 40px; height: 40px; padding: 0; border-radius: 50%;">⚙️</button>
        </div>
      </div>

      <!-- 2.2 Form Inputs & Controls -->
      <div class="ds-card" style="margin-bottom: 24px;">
        <h3 style="font-size: 16px; font-weight: 700; margin-bottom: 16px;">2.2 Form Controls & Inputs</h3>
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 20px;">
          <div>
            <label style="font-size: 13px; font-weight: 600; display: block; margin-bottom: 6px;">Standard Text Input</label>
            <input type="text" class="ds-input" placeholder="e.g. Acme Global Logistics" value="Acme Global">
          </div>
          <div>
            <label style="font-size: 13px; font-weight: 600; display: block; margin-bottom: 6px;">Search with Shortcut</label>
            <div style="position: relative; display: flex; align-items: center;">
              <input type="text" class="ds-input" placeholder="Search resources..." style="padding-right: 60px;">
              <span style="position: absolute; right: 10px; font-size: 11px; padding: 2px 6px; background: var(--sys-color-surface-sunken); border: 1px solid var(--sys-color-border-default); border-radius: 4px; color: var(--sys-color-text-secondary); font-family: var(--font-mono);">⌘K</span>
            </div>
          </div>
          <div>
            <label style="font-size: 13px; font-weight: 600; display: block; margin-bottom: 6px;">Select Dropdown</label>
            <select class="ds-input">
              <option>Production Cluster (AWS us-east-1)</option>
              <option>Staging Environment (GCP europe-west)</option>
              <option>Development Local</option>
            </select>
          </div>
          <div>
            <label style="font-size: 13px; font-weight: 600; display: block; margin-bottom: 6px;">Toggle Switch</label>
            <div style="display: flex; align-items: center; gap: 10px; height: 40px;">
              <input type="checkbox" id="demoSwitch" checked style="width: 20px; height: 20px; accent-color: var(--color-brand-primary-500); cursor: pointer;">
              <label for="demoSwitch" style="font-size: 14px; cursor: pointer;">Enable Real-time Telemetry Sync</label>
            </div>
          </div>
        </div>
      </div>

      <!-- 2.3 Badges, Tags & Avatars -->
      <div class="ds-card">
        <h3 style="font-size: 16px; font-weight: 700; margin-bottom: 16px;">2.3 Badges, Status Pills & Profile Avatars</h3>
        <div style="display: flex; flex-wrap: wrap; gap: 12px; align-items: center; margin-bottom: 20px;">
          <span class="ds-badge ds-badge-success">● Active (99.8%)</span>
          <span class="ds-badge ds-badge-warning">▲ Under Review</span>
          <span class="ds-badge ds-badge-danger">✕ SLA Breach</span>
          <span class="ds-badge ds-badge-info">ℹ Staging v2.4</span>
          <span class="ds-badge ds-badge-ai">✨ AI Anomaly Spike</span>
        </div>
        <div style="display: flex; align-items: center; gap: 16px;">
          <!-- User Avatar -->
          <div style="width: 40px; height: 40px; border-radius: 50%; background: var(--sys-color-surface-sunken); display: flex; align-items: center; justify-content: center; font-weight: 700; border: 1.5px solid var(--sys-color-border-default);">
            JD
          </div>
          <!-- AI Glowing Avatar -->
          <div style="width: 40px; height: 40px; border-radius: 12px; background: linear-gradient(135deg, var(--color-brand-secondary-500), var(--color-brand-primary-500)); display: flex; align-items: center; justify-content: center; color: white; font-weight: 800; box-shadow: 0 0 16px var(--color-ai-glow);">
            ✨
          </div>
          <div style="font-size: 13px; color: var(--sys-color-text-secondary);">Distinct user vs AI Copilot profile avatars</div>
        </div>
      </div>
    </div>
  </section>

  <!-- ==========================================================================
       SECTION 3: MOLECULES (ALERTS, TABS, SEARCH BAR)
       ========================================================================== -->
  <section id="molecules" style="padding: 48px 0; border-bottom: 1px solid var(--sys-color-border-subtle);">
    <div class="container">
      <h2 style="font-family: var(--font-display); font-size: 24px; font-weight: 800; margin-bottom: 6px;">3. Molecules (Composite UI Modules)</h2>
      <p style="color: var(--sys-color-text-secondary); font-size: 14px; margin-bottom: 28px;">Combinations of multiple atoms into functional units.</p>

      <div style="display: flex; flex-direction: column; gap: 16px; margin-bottom: 28px;">
        <!-- Alert 1: Info -->
        <div style="display: flex; align-items: center; gap: 12px; padding: 14px 18px; border-radius: var(--brand-radius-md); background: var(--color-info-bg); border: 1px solid var(--color-info-base); color: var(--color-info-text);">
          <span style="font-size: 18px;">ℹ️</span>
          <div style="flex: 1; font-size: 14px;"><strong>System Notice:</strong> Automated nightly database indexing is scheduled for 02:00 UTC.</div>
          <button style="background: none; border: none; font-size: 18px; cursor: pointer; color: inherit;">&times;</button>
        </div>

        <!-- Alert 2: Success -->
        <div style="display: flex; align-items: center; gap: 12px; padding: 14px 18px; border-radius: var(--brand-radius-md); background: var(--color-success-bg); border: 1px solid var(--color-success-base); color: var(--color-success-text);">
          <span style="font-size: 18px;">✓</span>
          <div style="flex: 1; font-size: 14px;"><strong>Deployment Succeeded:</strong> Revision v1.0.4 deployed across all 14 edge clusters with 0 downtime.</div>
        </div>
      </div>

      <!-- Segmented Control Tabs Molecule -->
      <div class="ds-card-sm" style="display: inline-flex; align-items: center; gap: 6px; background: var(--sys-color-surface-sunken); border-radius: var(--brand-radius-full); padding: 4px;">
        <button class="ds-btn ds-btn-sm" style="background: var(--sys-color-surface-card); border-radius: var(--brand-radius-full); color: var(--sys-color-text-primary); box-shadow: 0 1px 3px rgba(0,0,0,0.1);">Overview</button>
        <button class="ds-btn ds-btn-sm ds-btn-ghost" style="border-radius: var(--brand-radius-full);">Real-time Telemetry</button>
        <button class="ds-btn ds-btn-sm ds-btn-ghost" style="border-radius: var(--brand-radius-full);">Access Policies</button>
      </div>
    </div>
  </section>

  <!-- ==========================================================================
       SECTION 4: ORGANISMS — 184px KPI CARDS & CHARTS
       ========================================================================== -->
  <section id="organisms-kpi" style="padding: 48px 0; border-bottom: 1px solid var(--sys-color-border-subtle);">
    <div class="container">
      <div style="display: flex; justify-content: space-between; align-items: flex-end; margin-bottom: 24px;">
        <div>
          <h2 style="font-family: var(--font-display); font-size: 24px; font-weight: 800; margin-bottom: 6px;">4. Organisms: Standardized 184px KPI Cards & Charts</h2>
          <p style="color: var(--sys-color-text-secondary); font-size: 14px;">Uniform 3-zone flexbox geometry (min-height: 184px) with 48px interchangeable slots.</p>
        </div>
        <div style="font-family: var(--font-mono); font-size: 12px; color: var(--sys-color-text-tertiary);">min-height: 184px • viz: 48px</div>
      </div>

      <!-- KPI Grid -->
      <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 20px; margin-bottom: 32px;">
        <!-- Card 1: Revenue -->
        <div class="ds-card" style="min-height: 184px; display: flex; flex-direction: column; justify-content: space-between;">
          <div style="display: flex; justify-content: space-between; align-items: center;">
            <span style="font-size: 12px; font-weight: 700; color: var(--sys-color-text-secondary); text-transform: uppercase;">Total Net Revenue</span>
            <span style="cursor: pointer; color: var(--sys-color-text-tertiary);">ℹ️</span>
          </div>
          <div style="display: flex; align-items: baseline; justify-content: space-between;">
            <div class="tabular-nums" style="font-size: 32px; font-weight: 800;">$4,892,150</div>
            <span class="ds-badge ds-badge-success tabular-nums">▲ +14.2%</span>
          </div>
          <div style="height: 48px; width: 100%;">
            <svg viewBox="0 0 200 48" preserveAspectRatio="none" style="width: 100%; height: 48px;">
              <path d="M0,40 Q40,30 80,35 T140,15 T200,6 L200,48 L0,48 Z" fill="rgba(14, 165, 233, 0.15)"/>
              <path d="M0,40 Q40,30 80,35 T140,15 T200,6" fill="none" stroke="var(--color-brand-primary-500)" stroke-width="2.5"/>
            </svg>
          </div>
        </div>

        <!-- Card 2: SLA Target -->
        <div class="ds-card" style="min-height: 184px; display: flex; flex-direction: column; justify-content: space-between;">
          <div style="display: flex; justify-content: space-between; align-items: center;">
            <span style="font-size: 12px; font-weight: 700; color: var(--sys-color-text-secondary); text-transform: uppercase;">System SLA (Uptime)</span>
            <span style="cursor: pointer; color: var(--sys-color-text-tertiary);">ℹ️</span>
          </div>
          <div style="display: flex; align-items: baseline; justify-content: space-between;">
            <div class="tabular-nums" style="font-size: 32px; font-weight: 800;">99.98%</div>
            <span class="ds-badge ds-badge-success tabular-nums">● Operational</span>
          </div>
          <div style="height: 48px; display: flex; flex-direction: column; justify-content: center; gap: 6px;">
            <div style="display: flex; justify-content: space-between; font-size: 11px; font-weight: 600;">
              <span>SLA Target: 99.95%</span>
              <span class="tabular-nums" style="color: #10b981;">0 Breaches</span>
            </div>
            <div style="width: 100%; height: 8px; background: var(--sys-color-surface-sunken); border-radius: 9999px; overflow: hidden;">
              <div style="width: 99.98%; height: 100%; background: #10b981;"></div>
            </div>
          </div>
        </div>
      </div>

      <!-- Chart with AI Anomaly Header Trigger -->
      <div class="ds-card">
        <div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 14px; margin-bottom: 20px; border-bottom: 1px solid var(--sys-color-border-subtle); padding-bottom: 16px;">
          <div>
            <h3 style="font-size: 18px; font-weight: 700;">Gross Revenue & Operational Forecast</h3>
            <div style="font-size: 13px; color: var(--sys-color-text-secondary);">Historical actuals vs confidence corridor</div>
          </div>
          <!-- Anomaly Button Positioned BEFORE Time Range Filter -->
          <div style="display: flex; align-items: center; gap: 10px;">
            <button id="openAnomalyBtn" class="ds-btn ds-btn-danger ds-btn-sm">
              <span>⚡ 1 Anomaly Spike (+42k)</span>
            </button>
            <div style="display: inline-flex; background: var(--sys-color-surface-sunken); padding: 3px; border-radius: var(--brand-radius-full); border: 1px solid var(--sys-color-border-default);">
              <button class="ds-btn ds-btn-sm ds-btn-ghost" style="padding: 3px 10px; border-radius: var(--brand-radius-full);">1M</button>
              <button class="ds-btn ds-btn-sm" style="padding: 3px 10px; border-radius: var(--brand-radius-full); background: var(--sys-color-surface-card);">3M</button>
              <button class="ds-btn ds-btn-sm ds-btn-ghost" style="padding: 3px 10px; border-radius: var(--brand-radius-full);">YTD</button>
            </div>
          </div>
        </div>
        <div style="height: 240px; width: 100%;">
          <svg viewBox="0 0 1000 240" preserveAspectRatio="none" style="width: 100%; height: 240px;">
            <line x1="20" y1="60" x2="980" y2="60" stroke="var(--sys-color-border-subtle)" stroke-dasharray="4"/>
            <line x1="20" y1="120" x2="980" y2="120" stroke="var(--sys-color-border-subtle)" stroke-dasharray="4"/>
            <line x1="20" y1="180" x2="980" y2="180" stroke="var(--sys-color-border-subtle)" stroke-dasharray="4"/>
            <path d="M20,180 Q250,160 500,120 T750,40 T980,100" fill="none" stroke="var(--color-brand-primary-500)" stroke-width="3"/>
            <circle cx="750" cy="40" r="6" fill="#ef4444" stroke="#ffffff" stroke-width="2"/>
          </svg>
        </div>
      </div>
    </div>
  </section>

  <!-- ==========================================================================
       SECTION 5: ORGANISMS — DATA TABLES
       ========================================================================== -->
  <section id="organisms-table" style="padding: 48px 0; border-bottom: 1px solid var(--sys-color-border-subtle);">
    <div class="container">
      <div style="display: flex; justify-content: space-between; align-items: flex-end; margin-bottom: 24px;">
        <div>
          <h2 style="font-family: var(--font-display); font-size: 24px; font-weight: 800; margin-bottom: 6px;">5. Organisms: High-Density Data Tables</h2>
          <p style="color: var(--sys-color-text-secondary); font-size: 14px;">Sticky headers, density scaling, and automatic mobile card-list degradation.</p>
        </div>
        <button id="mobileViewToggle" class="ds-btn ds-btn-secondary ds-btn-sm">
          <span>📱 Toggle Mobile View</span>
        </button>
      </div>

      <div id="desktopTableContainer" class="ds-card" style="padding: 0; overflow-x: auto;">
        <table style="width: 100%; border-collapse: collapse; text-align: left; font-size: 14px;">
          <thead style="background: var(--sys-color-surface-sunken); border-bottom: 1.5px solid var(--sys-color-border-default);">
            <tr style="height: var(--table-density-row-height);">
              <th style="padding: 0 16px; font-weight: 700; font-size: 12px; color: var(--sys-color-text-secondary); text-transform: uppercase;">Account</th>
              <th style="padding: 0 16px; font-weight: 700; font-size: 12px; color: var(--sys-color-text-secondary); text-transform: uppercase;">Status</th>
              <th style="padding: 0 16px; font-weight: 700; font-size: 12px; color: var(--sys-color-text-secondary); text-transform: uppercase; text-align: right;">MRR</th>
              <th style="padding: 0 16px; font-weight: 700; font-size: 12px; color: var(--sys-color-text-secondary); text-transform: uppercase; text-align: right;">Health</th>
            </tr>
          </thead>
          <tbody>
            <tr style="height: var(--table-density-row-height); border-bottom: 1px solid var(--sys-color-border-subtle);">
              <td style="padding: var(--table-cell-padding-y) 16px; font-weight: 600;">Acme Global</td>
              <td style="padding: var(--table-cell-padding-y) 16px;"><span class="ds-badge ds-badge-success">● Active</span></td>
              <td class="tabular-nums" style="padding: var(--table-cell-padding-y) 16px; text-align: right; font-weight: 600;">$42,500.00</td>
              <td class="tabular-nums" style="padding: var(--table-cell-padding-y) 16px; text-align: right; color: #10b981;">92%</td>
            </tr>
            <tr style="height: var(--table-density-row-height); border-bottom: 1px solid var(--sys-color-border-subtle);">
              <td style="padding: var(--table-cell-padding-y) 16px; font-weight: 600;">Globex Logistics</td>
              <td style="padding: var(--table-cell-padding-y) 16px;"><span class="ds-badge ds-badge-warning">▲ Review</span></td>
              <td class="tabular-nums" style="padding: var(--table-cell-padding-y) 16px; text-align: right; font-weight: 600;">$18,200.00</td>
              <td class="tabular-nums" style="padding: var(--table-cell-padding-y) 16px; text-align: right; color: #f59e0b;">64%</td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- Mobile Degradation Card List -->
      <div id="mobileCardContainer" style="display: none; flex-direction: column; gap: 14px;">
        <div class="ds-card-sm">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 6px;">
            <strong style="font-size: 15px;">Acme Global</strong>
            <span class="ds-badge ds-badge-success">● Active</span>
          </div>
          <div style="display: flex; justify-content: space-between; font-size: 13px;" class="tabular-nums">
            <span>MRR: $42,500.00</span>
            <span style="color: #10b981;">Health: 92%</span>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- ==========================================================================
       SECTION 6: ORGANISMS — MULTIMODAL GEN AI COMPOUND RESPONSE
       ========================================================================== -->
  <section id="organisms-ai" style="padding: 48px 0; border-bottom: 1px solid var(--sys-color-border-subtle); background: var(--sys-color-surface-sunken);">
    <div class="container">
      <h2 style="font-family: var(--font-display); font-size: 24px; font-weight: 800; margin-bottom: 6px;">6. Organisms: Multimodal Gen AI Compound Response</h2>
      <p style="color: var(--sys-color-text-secondary); font-size: 14px; margin-bottom: 28px;">Narrative text, citations, inline chart, structured table, formula diff, and reject feedback taxonomy inside one container.</p>

      <div class="ds-card" style="max-width: 900px; margin: 0 auto; border-color: var(--color-brand-secondary-500); box-shadow: 0 0 24px var(--color-ai-glow), var(--brand-shadow-default);">
        <div style="display: flex; gap: 16px; margin-bottom: 16px;">
          <div style="width: 40px; height: 40px; border-radius: 12px; background: linear-gradient(135deg, var(--color-brand-secondary-500), var(--color-brand-primary-500)); display: flex; align-items: center; justify-content: center; color: white; font-weight: 800; box-shadow: 0 0 16px var(--color-ai-glow); flex-shrink: 0;">
            ✨
          </div>
          <div style="flex: 1;">
            <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 8px;">
              <span style="font-weight: 700; font-size: 15px;">${brandName} Copilot</span>
              <span class="ds-badge ds-badge-ai">Autonomous Synthesis</span>
            </div>

            <!-- Borderless Reasoning Trace ("Thought for 3.4s") -->
            <div style="background: var(--sys-color-canvas); border-radius: var(--brand-radius-sm); padding: 10px 14px; margin-bottom: 16px;">
              <details>
                <summary style="font-size: 12px; color: var(--sys-color-text-secondary); cursor: pointer; font-weight: 600;">
                  🧠 Thought for <span class="tabular-nums">3.4</span> seconds across 4 data partitions
                </summary>
                <div style="margin-top: 8px; font-size: 12px; color: var(--sys-color-text-tertiary); font-family: var(--font-mono); border-top: 1px dashed var(--sys-color-border-subtle); padding-top: 6px;">
                  &gt; Correlated EMEA gross margin contraction with emergency transatlantic shipping tariffs
                </div>
              </details>
            </div>

            <!-- Modality A: Narrative Synthesis with Citations -->
            <div style="font-size: 14px; line-height: 1.6; margin-bottom: 16px;">
              The <span class="tabular-nums">3.2%</span> gross margin contraction in EMEA was driven primarily by emergency transatlantic shipping tariffs<sup style="color: var(--color-brand-secondary-500); font-weight: 700; cursor: pointer; margin-left: 2px;">[1]</sup> combined with delayed returns allowance amortization<sup style="color: var(--color-brand-secondary-500); font-weight: 700; cursor: pointer; margin-left: 2px;">[2]</sup>.
            </div>

            <!-- Modality B: Embedded Mini Comparison Chart -->
            <div style="background: var(--sys-color-canvas); padding: 14px; border-radius: var(--brand-radius-md); border: 1px solid var(--sys-color-border-subtle); margin-bottom: 16px;">
              <div style="font-size: 11px; font-weight: 700; text-transform: uppercase; color: var(--sys-color-text-secondary); margin-bottom: 10px;">
                Modality B: Regional Margin Impact (% Variance)
              </div>
              <div style="display: flex; flex-direction: column; gap: 8px;">
                <div>
                  <div style="display: flex; justify-content: space-between; font-size: 12px; font-weight: 600; margin-bottom: 3px;">
                    <span>EMEA Outlier</span>
                    <span class="tabular-nums" style="color: #ef4444;">-3.2%</span>
                  </div>
                  <div style="height: 8px; background: var(--sys-color-surface-sunken); border-radius: 9999px; overflow: hidden;">
                    <div style="width: 32%; height: 100%; background: #ef4444;"></div>
                  </div>
                </div>
              </div>
            </div>

            <!-- Modality C: Embedded Structured Data Table -->
            <div style="margin-bottom: 16px; overflow-x: auto;">
              <div style="font-size: 11px; font-weight: 700; text-transform: uppercase; color: var(--sys-color-text-secondary); margin-bottom: 6px;">
                Modality C: Cost Center Variance Breakdown
              </div>
              <table style="width: 100%; font-size: 13px; border-collapse: collapse;">
                <thead>
                  <tr style="border-bottom: 1.5px solid var(--sys-color-border-default); text-align: left;">
                    <th style="padding: 6px; color: var(--sys-color-text-secondary);">Cost Driver</th>
                    <th style="padding: 6px; color: var(--sys-color-text-secondary); text-align: right;">Impact</th>
                    <th style="padding: 6px; color: var(--sys-color-text-secondary); text-align: right;">Grounding</th>
                  </tr>
                </thead>
                <tbody>
                  <tr style="border-bottom: 1px solid var(--sys-color-border-subtle);">
                    <td style="padding: 8px 6px; font-weight: 600;">Transatlantic Shipping Surcharge</td>
                    <td class="tabular-nums" style="padding: 8px 6px; text-align: right; color: #ef4444;">-$42,100</td>
                    <td style="padding: 8px 6px; text-align: right; color: var(--color-brand-secondary-500); font-weight: 700;">[1]</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <!-- Modality D: Formula Diff Viewer with Reject Trigger -->
            <div style="background: var(--sys-color-canvas); padding: 14px; border-radius: var(--brand-radius-md); border: 1px solid var(--sys-color-border-default); margin-bottom: 16px;">
              <div style="font-size: 11px; font-weight: 700; text-transform: uppercase; color: var(--sys-color-text-secondary); margin-bottom: 8px;">
                Modality D: Proposed Revised Formula Diff
              </div>
              <div style="font-family: var(--font-mono); font-size: 12px; background: var(--sys-color-surface-sunken); padding: 10px; border-radius: 6px; line-height: 1.6; margin-bottom: 12px;">
                <div style="background: rgba(239, 68, 68, 0.12); color: #991b1b; padding: 2px 8px; border-radius: 4px; margin-bottom: 2px;">
                  - net_margin = (gross_revenue - standard_cogs) / gross_revenue;
                </div>
                <div style="background: rgba(16, 185, 129, 0.12); color: #065f46; padding: 2px 8px; border-radius: 4px;">
                  + net_margin = (gross_revenue - standard_cogs - returns_allowance) / gross_revenue;
                </div>
              </div>
              <div style="display: flex; justify-content: flex-end; gap: 8px;">
                <button id="openRejectModalBtn" class="ds-btn ds-btn-secondary ds-btn-sm">✕ Reject with Feedback</button>
                <button class="ds-btn ds-btn-primary ds-btn-sm">✓ Accept Changes</button>
              </div>
            </div>

          </div>
        </div>

        <!-- Prompt Composer with Circular Icon-Only Send Button -->
        <div style="border-top: 1px solid var(--sys-color-border-subtle); padding-top: 16px; display: flex; align-items: center; gap: 10px;">
          <input type="text" class="ds-input" placeholder="Ask ${brandName} Copilot a question or explore telemetry..." style="height: 44px; border-radius: var(--brand-radius-full);">
          <button style="width: 44px; height: 44px; border-radius: 50%; background: var(--color-brand-primary-500); color: white; border: none; display: flex; align-items: center; justify-content: center; cursor: pointer; flex-shrink: 0; box-shadow: var(--brand-shadow-default);">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="12" y1="19" x2="12" y2="5"></line><polyline points="5 12 12 5 19 12"></polyline></svg>
          </button>
        </div>
      </div>
    </div>
  </section>

  <!-- Modals -->
  <div id="anomalyModal" class="modal-overlay">
    <div class="ds-card" style="max-width: 480px; width: 100%;">
      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 14px;">
        <h3 style="font-size: 18px; font-weight: 700;">Root-Cause Diagnostic</h3>
        <button id="closeAnomalyBtn" style="background: none; border: none; font-size: 20px; cursor: pointer;">&times;</button>
      </div>
      <p style="font-size: 14px; color: var(--sys-color-text-secondary); line-height: 1.6; margin-bottom: 18px;">
        Anomaly spike of <strong>+14,200 RPM</strong> was detected on Nov 01 at 14:32 UTC. Rate limit saturation observed on edge node.
      </p>
      <div style="display: flex; justify-content: flex-end; gap: 8px;">
        <button id="closeAnomalyBtn2" class="ds-btn ds-btn-secondary ds-btn-sm">Dismiss</button>
        <button class="ds-btn ds-btn-primary ds-btn-sm">Investigate Telemetry</button>
      </div>
    </div>
  </div>

  <div id="rejectModal" class="modal-overlay">
    <div class="ds-card" style="max-width: 480px; width: 100%;">
      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 14px;">
        <h3 style="font-size: 18px; font-weight: 700;">Capture Rejection Feedback</h3>
        <button id="closeRejectBtn" style="background: none; border: none; font-size: 20px; cursor: pointer;">&times;</button>
      </div>
      <p style="font-size: 13px; color: var(--sys-color-text-secondary); margin-bottom: 12px;">Select reason for rejecting this AI recommendation:</p>
      <div style="display: flex; flex-direction: column; gap: 8px; margin-bottom: 16px; font-size: 13px;">
        <label><input type="radio" name="r" checked> Calculation or syntax inaccuracy</label>
        <label><input type="radio" name="r"> Hallucinated telemetry or entity data</label>
        <label><input type="radio" name="r"> Conflicts with deployment policy</label>
      </div>
      <textarea class="ds-input" style="height: 60px; margin-bottom: 16px; padding: 8px;" placeholder="Optional notes for the engineering team..."></textarea>
      <div style="display: flex; justify-content: flex-end; gap: 8px;">
        <button id="closeRejectBtn2" class="ds-btn ds-btn-secondary ds-btn-sm">Cancel</button>
        <button id="submitRejectBtn" class="ds-btn ds-btn-danger ds-btn-sm">Submit Feedback</button>
      </div>
    </div>
  </div>

    <!-- ==========================================================================
       SECTION 7: COMPLETE 112-COMPONENT DIRECTORY MATRIX
       ========================================================================== -->
  <section id="component-matrix" style="padding: 48px 0; border-bottom: 1px solid var(--sys-color-border-subtle);">
    <div class="container">
      <div style="display: flex; justify-content: space-between; align-items: flex-end; flex-wrap: wrap; gap: 16px; margin-bottom: 24px;">
        <div>
          <div style="display: inline-flex; align-items: center; gap: 6px; padding: 4px 10px; border-radius: 9999px; background: rgba(37,99,235,0.1); color: var(--color-brand-primary-600); font-size: 11px; font-weight: 700; margin-bottom: 8px;">
            MATERIAL-LEVEL COMPONENT INVENTORY • 112 SPECIFIED COMPONENTS
          </div>
          <h2 style="font-family: var(--font-display); font-size: 24px; font-weight: 800; margin: 0 0 6px 0;">7. Complete 112-Component Directory Matrix & Implementation Registry</h2>
          <p style="color: var(--sys-color-text-secondary); font-size: 14px; margin: 0;">
            Exhaustive 1:1 mapping from Material Design 3 atomic patterns into @hsb_design/design-system polymorphic React components.
          </p>
        </div>
        <span id="spec-matrix-badge" class="ds-badge ds-badge-primary" style="font-family: var(--font-mono); font-size: 13px; font-weight: 700;">112 / 112</span>
      </div>

      <!-- Search & Filters -->
      <div style="background: var(--sys-color-surface-sunken); padding: 16px; border-radius: var(--brand-radius-md); border: 1px solid var(--sys-color-border-subtle); margin-bottom: 20px; display: flex; flex-direction: column; gap: 12px;">
        <input type="text" id="spec-matrix-search" class="ds-input" placeholder="Search 112 components (e.g. elevated button, modal bottom sheet, date picker)..." oninput="filterSpecMatrix()" style="max-width: 480px;">
        
        <div style="display: flex; gap: 6px; flex-wrap: wrap;" id="spec-cat-buttons">
          <button class="ds-btn ds-btn-primary ds-btn-sm spec-pill active" onclick="filterSpecCat('All', this)">All (112)</button>
          <button class="ds-btn ds-btn-secondary ds-btn-sm spec-pill" onclick="filterSpecCat('Actions & Buttons', this)">Actions & Buttons (17)</button>
          <button class="ds-btn ds-btn-secondary ds-btn-sm spec-pill" onclick="filterSpecCat('Communication & Feedback', this)">Feedback (12)</button>
          <button class="ds-btn ds-btn-secondary ds-btn-sm spec-pill" onclick="filterSpecCat('Containment & Surfaces', this)">Surfaces (13)</button>
          <button class="ds-btn ds-btn-secondary ds-btn-sm spec-pill" onclick="filterSpecCat('Navigation Systems', this)">Navigation (17)</button>
          <button class="ds-btn ds-btn-secondary ds-btn-sm spec-pill" onclick="filterSpecCat('Selection & Form Controls', this)">Selection & Forms (22)</button>
          <button class="ds-btn ds-btn-secondary ds-btn-sm spec-pill" onclick="filterSpecCat('Text Inputs & Search', this)">Inputs (8)</button>
          <button class="ds-btn ds-btn-secondary ds-btn-sm spec-pill" onclick="filterSpecCat('Data Display & Lists', this)">Data Display (11)</button>
          <button class="ds-btn ds-btn-secondary ds-btn-sm spec-pill" onclick="filterSpecCat('Dashboard Organisms', this)">Dashboards (7)</button>
          <button class="ds-btn ds-btn-secondary ds-btn-sm spec-pill" onclick="filterSpecCat('Gen AI Interfaces', this)">Gen AI (5)</button>
        </div>
      </div>

      <!-- Matrix Table -->
      <div style="border: 1px solid var(--sys-color-border-subtle); border-radius: var(--brand-radius-md); overflow-x: auto; max-height: 600px; overflow-y: auto;">
        <table style="width: 100%; border-collapse: collapse; font-size: 12px; text-align: left;">
          <thead style="position: sticky; top: 0; background: var(--sys-color-surface-card); z-index: 10; box-shadow: 0 1px 2px rgba(0,0,0,0.06);">
            <tr style="border-bottom: 2px solid var(--sys-color-border-subtle); color: var(--sys-color-text-secondary);">
              <th style="padding: 10px 12px; width: 48px;">#</th>
              <th style="padding: 10px 12px;">Component Name & Anatomy</th>
              <th style="padding: 10px 12px; width: 180px;">Category</th>
              <th style="padding: 10px 12px;">React Implementation in Package</th>
              <th style="padding: 10px 12px; width: 180px;">Responsive Form Factor</th>
              <th style="padding: 10px 12px; text-align: right; width: 100px;">Status</th>
            </tr>
          </thead>
          <tbody id="spec-matrix-tbody">
            ${specTableRows}
          </tbody>
        </table>
      </div>
    </div>
  </section>

<footer style="padding: 32px 0; border-top: 1px solid var(--sys-color-border-subtle); background: var(--sys-color-surface-card); text-align: center; font-size: 13px; color: var(--sys-color-text-secondary);">
    © 2026 ${brandName} Technologies • Complete Enterprise Design System with Atomic Granularity
  </footer>

  <script>
    // Theme Toggle
    const themeBtn = document.getElementById('themeBtn');
    const themeLabel = document.getElementById('themeLabel');
    const themeIcon = document.getElementById('themeIcon');
    themeBtn.addEventListener('click', () => {
      document.documentElement.classList.toggle('dark');
      const isDark = document.documentElement.classList.contains('dark');
      themeLabel.textContent = isDark ? 'Light' : 'Dark';
      themeIcon.textContent = isDark ? '☀️' : '🌙';
    });

    // Archetype Switcher (Neobrutalist, Corporate, AI-Native)
    const archetypeSelect = document.getElementById('archetypeSelect');
    archetypeSelect.addEventListener('change', (e) => {
      document.documentElement.setAttribute('data-archetype', e.target.value);
    });

    // Density Toggle
    const densityBtn = document.getElementById('densityBtn');
    densityBtn.addEventListener('click', () => {
      document.body.classList.toggle('density-compact');
      const isCompact = document.body.classList.contains('density-compact');
      densityBtn.textContent = isCompact ? 'Density: Compact' : 'Density: Comfortable';
    });

    // Live Tabular Ticker Proof
    let count = 0;
    const liveTicker = document.getElementById('liveTicker');
    const propNum = document.getElementById('propNum');
    const tabNum = document.getElementById('tabNum');
    setInterval(() => {
      count = (count + 0.08);
      liveTicker.textContent = (count % 100).toFixed(2) + 's';
      if (Math.random() > 0.6) {
        const val = '$' + (Math.floor(Math.random() * 9000000) + 1000000).toLocaleString() + '.' + (Math.floor(Math.random() * 90) + 10);
        propNum.textContent = val;
        tabNum.textContent = val;
      }
    }, 200);

    // Modals
    const anomModal = document.getElementById('anomalyModal');
    document.getElementById('openAnomalyBtn').addEventListener('click', () => anomModal.classList.add('active'));
    document.getElementById('closeAnomalyBtn').addEventListener('click', () => anomModal.classList.remove('active'));
    document.getElementById('closeAnomalyBtn2').addEventListener('click', () => anomModal.classList.remove('active'));

    const rejModal = document.getElementById('rejectModal');
    document.getElementById('openRejectModalBtn').addEventListener('click', () => rejModal.classList.add('active'));
    document.getElementById('closeRejectBtn').addEventListener('click', () => rejModal.classList.remove('active'));
    document.getElementById('closeRejectBtn2').addEventListener('click', () => rejModal.classList.remove('active'));
    document.getElementById('submitRejectBtn').addEventListener('click', () => {
      alert('Feedback captured according to design system taxonomy!');
      rejModal.classList.remove('active');
    });

    // Mobile View Toggle
    const mobToggle = document.getElementById('mobileViewToggle');
    const deskTable = document.getElementById('desktopTableContainer');
    const mobCards = document.getElementById('mobileCardContainer');
    let isMob = false;
    mobToggle.addEventListener('click', () => {
      isMob = !isMob;
      deskTable.style.display = isMob ? 'none' : 'block';
      mobCards.style.display = isMob ? 'flex' : 'none';
      mobToggle.textContent = isMob ? '💻 Switch to Desktop Table' : '📱 Toggle Mobile View';
    });
  </script>
</body>
</html>`;
}

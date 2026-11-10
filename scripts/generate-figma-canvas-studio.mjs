import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { generateCatalogCode } from './generate-all-112-catalog.mjs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

const htmlContent = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Figma Canvas Studio - @hsb_design/design-system</title>
  <link rel="stylesheet" href="dist/css/design-system.css">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Plus+Jakarta+Sans:wght@500;600;700&family=JetBrains+Mono:wght@400;500;600&display=swap" rel="stylesheet">
  <script src="https://unpkg.com/lucide@latest"></script>
  <style>
    /* ==========================================================================
       FIGMA LIGHT THEME VARIABLES & FOUNDATION
       ========================================================================== */
    :root {
      /* Figma UI Palette (Light Mode Default) */
      --figma-bg-canvas: #E5E7EB;
      --figma-bg-panel: #FFFFFF;
      --figma-bg-subtle: #F8FAFC;
      --figma-bg-hover: #F1F5F9;
      --figma-bg-active: #E2E8F0;
      --figma-border: #E2E8F0;
      --figma-border-dark: #CBD5E1;
      --figma-text-main: #0F172A;
      --figma-text-muted: #64748B;
      --figma-text-subtle: #94A3B8;
      --figma-blue: #2563EB;
      --figma-blue-hover: #1D4ED8;
      --figma-blue-subtle: #EFF6FF;
      --figma-purple: #7C3AED;
      --figma-purple-subtle: #F5F3FF;
      --figma-green: #10B981;
      --figma-red: #EF4444;

      /* Dynamic Brand Tokens (Overridable via Brand Customizer) */
      --brand-primary: #2563EB;
      --brand-primary-hover: #1D4ED8;
      --brand-secondary: #7C3AED;
      --brand-accent: #06B6D4;
      --brand-radius-base: 8px;
      --brand-font-family: 'Inter', sans-serif;
    }

    * {
      box-sizing: border-box;
      margin: 0;
      padding: 0;
    }

    body {
      font-family: var(--brand-font-family);
      background: var(--figma-bg-canvas);
      color: var(--figma-text-main);
      height: 100vh;
      overflow: hidden;
      display: flex;
      flex-direction: column;
      user-select: none;
    }

    /* ==========================================================================
       TOP FIGMA TOOLBAR
       ========================================================================== */
    header.figma-topbar {
      height: 48px;
      background: var(--figma-bg-panel);
      border-bottom: 1px solid var(--figma-border);
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 0 16px;
      z-index: 50;
      flex-shrink: 0;
    }

    .figma-brand-group {
      display: flex;
      align-items: center;
      gap: 12px;
    }

    .figma-logo-badge {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      width: 28px;
      height: 28px;
      background: linear-gradient(135deg, var(--brand-primary), var(--brand-secondary));
      color: white;
      border-radius: 6px;
      box-shadow: 0 2px 4px rgba(37,99,235,0.25);
    }

    .figma-file-title {
      display: flex;
      align-items: center;
      gap: 6px;
      font-size: 13px;
      font-weight: 600;
      color: var(--figma-text-main);
    }

    .figma-file-title input {
      border: 1px solid transparent;
      background: transparent;
      font-size: 13px;
      font-weight: 600;
      color: var(--figma-text-main);
      padding: 2px 6px;
      border-radius: 4px;
      outline: none;
      width: 140px;
    }

    .figma-file-title input:hover {
      border-color: var(--figma-border);
      background: var(--figma-bg-subtle);
    }

    .figma-file-title input:focus {
      border-color: var(--figma-blue);
      background: white;
    }

    .package-tag {
      font-size: 10px;
      font-family: 'JetBrains Mono', monospace;
      color: var(--figma-text-muted);
      background: var(--figma-bg-subtle);
      border: 1px solid var(--figma-border);
      padding: 2px 6px;
      border-radius: 4px;
    }

    /* Viewport / Frame Selector */
    .figma-center-tools {
      display: flex;
      align-items: center;
      background: var(--figma-bg-subtle);
      border: 1px solid var(--figma-border);
      border-radius: 6px;
      padding: 2px;
      gap: 2px;
    }

    .tool-btn {
      background: transparent;
      border: none;
      color: var(--figma-text-muted);
      font-size: 11px;
      font-weight: 500;
      padding: 4px 10px;
      border-radius: 4px;
      cursor: pointer;
      display: inline-flex;
      align-items: center;
      gap: 5px;
      transition: all 0.15s ease;
    }

    .tool-btn:hover {
      color: var(--figma-text-main);
    }

    .tool-btn.active {
      background: white;
      color: var(--figma-blue);
      font-weight: 600;
      box-shadow: 0 1px 2px rgba(0,0,0,0.06);
    }

    /* Top Right Actions */
    .figma-right-actions {
      display: flex;
      align-items: center;
      gap: 8px;
    }

    .btn-topbar {
      height: 30px;
      background: white;
      border: 1px solid var(--figma-border);
      color: var(--figma-text-main);
      font-size: 12px;
      font-weight: 500;
      padding: 0 12px;
      border-radius: 6px;
      cursor: pointer;
      display: inline-flex;
      align-items: center;
      gap: 6px;
      transition: all 0.15s ease;
    }

    .btn-topbar:hover {
      background: var(--figma-bg-subtle);
      border-color: var(--figma-border-dark);
    }

    .btn-topbar.primary {
      background: var(--brand-primary);
      border-color: var(--brand-primary);
      color: white;
      font-weight: 600;
    }

    .btn-topbar.primary:hover {
      background: var(--brand-primary-hover);
      border-color: var(--brand-primary-hover);
    }

    /* ==========================================================================
       THREE-PANEL FIGMA WORKSPACE
       ========================================================================== */
    .figma-workspace {
      display: flex;
      flex: 1;
      height: calc(100vh - 48px);
      overflow: hidden;
    }

    /* --------------------------------------------------------------------------
       LEFT PANEL: ASSETS & LAYERS
       -------------------------------------------------------------------------- */
    .figma-left-panel {
      width: 280px;
      background: var(--figma-bg-panel);
      border-right: 1px solid var(--figma-border);
      display: flex;
      flex-direction: column;
      flex-shrink: 0;
      z-index: 20;
      transition: width 0.22s cubic-bezier(0.16, 1, 0.3, 1), min-width 0.22s, max-width 0.22s, opacity 0.15s;
    }

    .figma-left-panel.collapsed {
      width: 0 !important;
      min-width: 0 !important;
      max-width: 0 !important;
      padding: 0 !important;
      border-right: none !important;
      overflow: hidden !important;
      pointer-events: none !important;
      opacity: 0 !important;
    }

    .panel-tabs {
      display: flex;
      align-items: center;
      border-bottom: 1px solid var(--figma-border);
      background: var(--figma-bg-subtle);
    }

    .panel-collapse-btn {
      width: 28px;
      height: 28px;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      border: none;
      background: transparent;
      color: var(--figma-text-muted);
      cursor: pointer;
      border-radius: 4px;
      margin: 2px 4px;
      flex-shrink: 0;
      transition: all 0.15s ease;
    }

    .panel-collapse-btn:hover {
      background: var(--figma-bg-active);
      color: var(--figma-text-main);
    }

    .panel-tab {
      flex: 1;
      padding: 9px 0;
      text-align: center;
      font-size: 11px;
      font-weight: 600;
      color: var(--figma-text-muted);
      border: none;
      background: transparent;
      cursor: pointer;
      border-bottom: 2px solid transparent;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      gap: 6px;
    }

    .panel-tab.active {
      color: var(--figma-blue);
      border-bottom-color: var(--figma-blue);
      background: white;
    }

    .panel-search-box {
      padding: 10px 12px;
      border-bottom: 1px solid var(--figma-border);
    }

    .panel-search-input {
      width: 100%;
      background: var(--figma-bg-subtle);
      border: 1px solid var(--figma-border);
      border-radius: 6px;
      color: var(--figma-text-main);
      font-size: 11px;
      padding: 6px 10px 6px 28px;
      outline: none;
      transition: all 0.15s;
    }

    .panel-search-input:focus {
      background: white;
      border-color: var(--figma-blue);
      box-shadow: 0 0 0 2px rgba(37,99,235,0.1);
    }

    .left-panel-content {
      flex: 1;
      overflow-y: auto;
      padding: 10px;
    }

    /* Component Palette Cards */
    .component-category {
      margin-bottom: 14px;
    }

    .category-title {
      font-size: 10px;
      font-weight: 700;
      color: var(--figma-text-muted);
      text-transform: uppercase;
      letter-spacing: 0.5px;
      margin-bottom: 6px;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    .palette-item {
      background: white;
      border: 1px solid var(--figma-border);
      border-radius: 6px;
      padding: 7px 10px;
      margin-bottom: 5px;
      cursor: grab;
      display: flex;
      align-items: center;
      justify-content: space-between;
      transition: all 0.15s ease;
      font-size: 12px;
      font-weight: 500;
    }

    .palette-item:hover {
      border-color: var(--figma-blue);
      box-shadow: 0 2px 4px rgba(37,99,235,0.08);
      background: var(--figma-blue-subtle);
    }

    .palette-item-left {
      display: flex;
      align-items: center;
      gap: 8px;
      overflow: hidden;
      min-width: 0;
      flex: 1;
      padding-right: 6px;
    }

    .palette-item-left span {
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    .palette-item-left i {
      color: var(--brand-primary);
      flex-shrink: 0;
    }

    .palette-add-btn {
      background: white;
      border: 1px solid var(--figma-border);
      color: var(--figma-text-muted);
      font-size: 10px;
      font-weight: 600;
      padding: 2px 6px;
      border-radius: 4px;
      cursor: pointer;
      display: inline-flex;
      align-items: center;
      gap: 2px;
      transition: all 0.15s;
    }

    .palette-add-btn:hover {
      background: var(--figma-blue);
      border-color: var(--figma-blue);
      color: white;
    }

    /* Layers Tree View */
    .layer-row {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 6px 10px;
      border-radius: 4px;
      font-size: 11px;
      font-weight: 500;
      color: var(--figma-text-main);
      cursor: pointer;
      margin-bottom: 2px;
    }

    .layer-row:hover {
      background: var(--figma-bg-hover);
    }

    .layer-row.selected {
      background: var(--figma-blue-subtle);
      color: var(--figma-blue);
      font-weight: 600;
    }

    .layer-meta {
      display: flex;
      align-items: center;
      gap: 6px;
    }

    /* --------------------------------------------------------------------------
       CENTER CANVAS: FIGMA ARTBOARD
       -------------------------------------------------------------------------- */
    .figma-canvas-area {
      flex: 1;
      height: 100%;
      display: flex;
      flex-direction: column;
      overflow: hidden;
      position: relative;
      background: var(--figma-bg-canvas);
      padding: 0;
      margin: 0;
    }

    /* Floating edge tabs when sidebars are collapsed */
    .canvas-edge-tab {
      position: absolute;
      top: 50px;
      z-index: 45;
      display: none;
      align-items: center;
      gap: 6px;
      padding: 6px 12px;
      background: #FFFFFF;
      border: 1px solid var(--figma-border);
      box-shadow: 0 4px 14px rgba(0, 0, 0, 0.1);
      border-radius: 20px;
      font-size: 11px;
      font-weight: 600;
      color: var(--figma-text-main);
      cursor: pointer;
      transition: all 0.15s ease;
      user-select: none;
    }

    .canvas-edge-tab:hover {
      background: var(--figma-blue-subtle);
      border-color: var(--figma-blue);
      color: var(--figma-blue);
      transform: translateY(-1px);
      box-shadow: 0 6px 18px rgba(37, 99, 235, 0.18);
    }

    .canvas-edge-tab.edge-tab-left {
      left: 14px;
    }

    .canvas-edge-tab.edge-tab-right {
      right: 14px;
    }

    .artboard-viewport {
      flex: 1;
      height: 100%;
      overflow: auto;
      padding: 40px;
      display: flex;
      justify-content: center;
      align-items: flex-start;
      position: relative;
      background-image: radial-gradient(#CBD5E1 1.2px, transparent 1.2px);
      background-size: 20px 20px;
      box-sizing: border-box;
    }

    .figma-artboard {
      width: 100%;
      max-width: 1120px;
      min-height: 720px;
      background: #FFFFFF;
      border-radius: 8px;
      box-shadow: 0 10px 25px -5px rgba(0,0,0,0.1), 0 8px 10px -6px rgba(0,0,0,0.05);
      border: 1px solid rgba(0,0,0,0.06);
      display: flex;
      flex-direction: column;
      position: relative;
      transition: max-width 0.25s cubic-bezier(0.16, 1, 0.3, 1);
    }

    .figma-artboard.vp-wide    { max-width: 1440px; }
    .figma-artboard.vp-desktop { max-width: 1120px; }
    .figma-artboard.vp-tablet  { max-width: 768px; }
    .figma-artboard.vp-mobile  { max-width: 375px; }

    .artboard-header {
      height: 36px;
      border-bottom: 1px solid var(--figma-border);
      padding: 0 16px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      font-size: 11px;
      color: var(--figma-text-muted);
      background: var(--figma-bg-subtle);
      border-radius: 8px 8px 0 0;
    }

    .artboard-dimension {
      font-family: 'JetBrains Mono', monospace;
      font-size: 10px;
      color: var(--figma-text-subtle);
    }

    /* Artboard Flow Canvas (Multi-Column Flex-Wrap Flow) */
    .artboard-body {
      min-height: calc(100vh - 220px);
      padding: 24px;
      background: var(--canvas-bg-color, #ffffff);
      display: flex;
      flex-direction: row;
      flex-wrap: wrap;
      align-content: flex-start;
      align-items: flex-start;
      gap: 16px;
      box-sizing: border-box;
      position: relative;
      transition: background 0.2s ease, gap 0.2s ease;
    }

    .artboard-body.mode-stack {
      flex-direction: column;
      flex-wrap: nowrap;
    }

    .artboard-body.mode-grid-2 > .figma-element-box {
      box-sizing: border-box;
      border: 1px solid transparent;
      border-radius: 6px;
      position: relative;
      transition: border-color 0.15s ease, box-shadow 0.15s ease;
      cursor: pointer;
      min-width: 0;
      word-break: break-word;
    }

    .element-content-wrapper {
      box-sizing: border-box;
      width: 100%;
      height: 100%;
      pointer-events: none;
      user-select: none;
    }

    .artboard-body.mode-grid-3 > .figma-element-box {
      width: calc(33.333% - 11px) !important;
      flex: 0 0 calc(33.333% - 11px) !important;
      max-width: calc(33.333% - 11px) !important;
    }

    .artboard-body.layout-stack {
      flex-direction: column !important;
      flex-wrap: nowrap !important;
    }

    .artboard-body.layout-grid-2 {
      display: grid !important;
      grid-template-columns: repeat(2, 1fr) !important;
    }

    .artboard-body.layout-grid-3 {
      display: grid !important;
      grid-template-columns: repeat(3, 1fr) !important;
    }

    /* Segmented Control Bar for Alignment & Placement */
    .segmented-control-bar {
      display: flex;
      background: var(--figma-bg-subtle);
      border: 1px solid var(--figma-border);
      border-radius: 6px;
      padding: 2px;
      gap: 2px;
      width: 100%;
    }

    .seg-btn {
      flex: 1;
      background: transparent;
      border: none;
      border-radius: 4px;
      padding: 6px 4px;
      font-size: 11px;
      font-weight: 500;
      color: var(--figma-text-muted);
      cursor: pointer;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      gap: 4px;
      transition: all 0.1s ease;
      font-family: inherit;
    }

    .seg-btn:hover {
      color: var(--figma-text-main);
      background: rgba(0,0,0,0.04);
    }

    .seg-btn.active {
      background: white;
      color: var(--brand-primary);
      font-weight: 600;
      box-shadow: 0 1px 2px rgba(0,0,0,0.08);
    }

    .artboard-body.drag-over {
      outline: 2px dashed var(--figma-blue);
      outline-offset: -8px;
      background: rgba(37,99,235,0.02);
    }

    /* Empty Canvas Placeholder */
    .canvas-empty-state {
      margin: auto 0;
      padding: 60px 20px;
      text-align: center;
      display: flex;
      flex-direction: column;
      align-items: center;
      border: 2px dashed var(--figma-border-dark);
      border-radius: 8px;
      background: var(--figma-bg-subtle);
    }

    .canvas-empty-state i {
      color: var(--figma-blue);
      margin-bottom: 12px;
    }

    .canvas-empty-state h3 {
      font-size: 15px;
      font-weight: 600;
      color: var(--figma-text-main);
      margin-bottom: 6px;
    }

    .canvas-empty-state p {
      font-size: 12px;
      color: var(--figma-text-muted);
      max-width: 360px;
      line-height: 1.5;
      margin-bottom: 16px;
    }

    .preset-chip-group {
      display: flex;
      gap: 8px;
      flex-wrap: wrap;
      justify-content: center;
    }

    .preset-chip {
      background: white;
      border: 1px solid var(--figma-border);
      font-size: 11px;
      font-weight: 500;
      color: var(--figma-text-main);
      padding: 5px 12px;
      border-radius: 6px;
      cursor: pointer;
      display: inline-flex;
      align-items: center;
      gap: 6px;
      transition: all 0.15s;
    }

    .preset-chip:hover {
      border-color: var(--figma-blue);
      color: var(--figma-blue);
      box-shadow: 0 1px 3px rgba(37,99,235,0.1);
    }

    /* Studio Workspace Mode Switcher in Header */
    .studio-mode-switcher {
      display: flex;
      background: var(--figma-bg-hover);
      border: 1px solid var(--figma-border);
      border-radius: 8px;
      padding: 3px;
      gap: 3px;
    }

    .mode-tab-btn {
      background: transparent;
      border: none;
      color: var(--figma-text-muted);
      font-size: 12px;
      font-weight: 600;
      padding: 5px 12px;
      border-radius: 6px;
      cursor: pointer;
      display: inline-flex;
      align-items: center;
      gap: 6px;
      transition: all 0.15s ease;
      font-family: inherit;
    }

    .mode-tab-btn:hover {
      color: var(--figma-text-main);
      background: rgba(255, 255, 255, 0.6);
    }

    .mode-tab-btn.active {
      background: #FFFFFF;
      color: var(--brand-primary);
      box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
    }

    /* Canvas Sub-Toolbar (Rulers, Grid, Snap, Coordinates) */
    .canvas-subtoolbar {
      width: 100%;
      height: 38px;
      background: var(--figma-bg-panel);
      border-bottom: 1px solid var(--figma-border);
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 0 14px;
      flex-shrink: 0;
      z-index: 25;
      font-size: 11px;
      box-sizing: border-box;
    }

    .canvas-subtoolbar-group {
      display: flex;
      align-items: center;
      gap: 8px;
    }

    .canvas-tool-pill {
      background: var(--figma-bg-subtle);
      border: 1px solid var(--figma-border);
      color: var(--figma-text-main);
      font-size: 11px;
      font-weight: 500;
      padding: 4px 10px;
      border-radius: 5px;
      cursor: pointer;
      display: inline-flex;
      align-items: center;
      gap: 5px;
      transition: all 0.12s;
    }

    .canvas-tool-pill:hover {
      border-color: var(--figma-border-dark);
      background: white;
    }

    .canvas-tool-pill.active {
      background: var(--figma-blue-subtle, #EFF6FF);
      border-color: var(--figma-blue, #2563EB);
      color: var(--figma-blue, #2563EB);
      font-weight: 600;
    }

    /* Coordinates HUD in Subtoolbar */
    .coords-hud-badge {
      font-family: 'JetBrains Mono', monospace;
      font-size: 11px;
      font-weight: 600;
      color: var(--figma-text-muted);
      background: var(--figma-bg-hover);
      padding: 3px 8px;
      border-radius: 4px;
      border: 1px solid var(--figma-border);
    }

    /* --------------------------------------------------------------------------
       FIGMA RULERS & CANVAS GRID
       -------------------------------------------------------------------------- */
    .ruler-canvas-container {
      position: relative;
      flex: 1;
      height: calc(100% - 38px);
      width: 100%;
      display: flex;
      flex-direction: column;
      overflow: hidden;
      background: var(--figma-bg-canvas);
    }

    .ruler-top-row {
      display: flex;
      height: 20px;
      background: #F1F5F9;
      border-bottom: 1px solid #CBD5E1;
      z-index: 20;
      flex-shrink: 0;
    }

    .ruler-corner-box {
      width: 20px;
      height: 20px;
      background: #E2E8F0;
      border-right: 1px solid #CBD5E1;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 8px;
      font-family: monospace;
      font-weight: 700;
      color: #64748B;
      flex-shrink: 0;
      user-select: none;
    }

    .ruler-h-track {
      flex: 1;
      position: relative;
      height: 20px;
      overflow: hidden;
      user-select: none;
    }

    .ruler-main-row {
      display: flex;
      flex: 1;
      height: calc(100% - 20px);
      position: relative;
      overflow: hidden;
    }

    .ruler-v-track {
      width: 20px;
      background: #F1F5F9;
      border-right: 1px solid #CBD5E1;
      position: relative;
      overflow: hidden;
      flex-shrink: 0;
      z-index: 20;
      user-select: none;
    }

    /* Ruler live tracker lines */
    .ruler-guide-x {
      position: absolute;
      top: 0;
      bottom: 0;
      width: 1px;
      background: #EF4444;
      pointer-events: none;
      z-index: 30;
      display: none;
    }

    .ruler-guide-y {
      position: absolute;
      left: 0;
      right: 0;
      height: 1px;
      background: #EF4444;
      pointer-events: none;
      z-index: 30;
      display: none;
    }

    .ruler-tick-num {
      position: absolute;
      font-size: 9px;
      font-family: 'JetBrains Mono', monospace;
      color: #64748B;
      line-height: 1;
    }

    /* Artboard dot grid pattern */
    .artboard-body.has-dot-grid {
      background-image: radial-gradient(#94A3B8 1.2px, transparent 1.2px) !important;
      background-size: 16px 16px !important;
      background-position: 0 0 !important;
    }

    /* Freeform Canvas vs Flow Canvas */
    .artboard-body.mode-freeform {
      position: relative !important;
      display: block !important;
      min-height: 900px !important;
      width: 100% !important;
    }

    .artboard-body.mode-freeform > .figma-element-box {
      position: absolute !important;
      margin: 0 !important;
    }

    /* Placed Component Bounding Box (CLEAN FIGMA - NO CLUMSY FLOATING OVERLAY) */
    .figma-element-box {
      box-sizing: border-box;
      border: 1.5px solid transparent;
      border-radius: 6px;
      position: relative;
      transition: border-color 0.1s ease, box-shadow 0.1s ease;
      cursor: grab;
      min-width: 0;
      word-break: break-word;
      user-select: none;
    }

    .figma-element-box:active {
      cursor: grabbing;
    }

    .figma-element-box:hover {
      border: 1.5px dashed var(--figma-blue);
    }

    .figma-element-box.selected {
      border: 2px solid var(--figma-blue) !important;
      box-shadow: 0 0 0 1px rgba(37,99,235,0.25);
    }

    .figma-element-box.is-freeform-moving {
      opacity: 0.85 !important;
      cursor: grabbing !important;
      box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.2) !important;
      z-index: 100 !important;
    }

    /* Selected Element Badge Header - Off-canvas above component */
    .element-select-badge {
      position: absolute;
      top: -24px;
      left: 0;
      background: var(--figma-blue);
      color: white;
      font-size: 10px;
      font-weight: 600;
      letter-spacing: 0.3px;
      padding: 2px 8px;
      border-radius: 4px;
      display: none;
      align-items: center;
      gap: 6px;
      z-index: 35;
      cursor: grab;
      box-shadow: 0 2px 4px rgba(0,0,0,0.15);
      user-select: none;
      white-space: nowrap;
    }

    .figma-element-box.selected .element-select-badge {
      display: inline-flex;
    }

    .element-select-badge .dim-badge {
      background: rgba(0,0,0,0.25);
      padding: 1px 5px;
      border-radius: 3px;
      font-size: 9px;
      font-family: monospace;
      font-weight: 500;
      color: #93C5FD;
    }

    /* --------------------------------------------------------------------------
       FIGMA 8 RESIZE HANDLES
       -------------------------------------------------------------------------- */
    .figma-resize-handle {
      position: absolute;
      width: 8px;
      height: 8px;
      background: #FFFFFF;
      border: 1.5px solid var(--figma-blue);
      border-radius: 2px;
      box-sizing: border-box;
      z-index: 45;
      display: none;
      pointer-events: auto;
      transition: transform 0.08s ease, background 0.08s ease;
    }

    .figma-element-box.selected .figma-resize-handle {
      display: block;
    }

    .figma-resize-handle:hover {
      transform: scale(1.35);
      background: var(--figma-blue);
    }

    /* Corner handles */
    .handle-nw { top: -5px; left: -5px; cursor: nwse-resize; }
    .handle-ne { top: -5px; right: -5px; cursor: nesw-resize; }
    .handle-se { bottom: -5px; right: -5px; cursor: nwse-resize; }
    .handle-sw { bottom: -5px; left: -5px; cursor: nesw-resize; }

    /* Edge handles */
    .handle-n { top: -5px; left: 50%; transform: translateX(-50%); cursor: ns-resize; }
    .handle-n:hover { transform: translateX(-50%) scale(1.35); }
    .handle-s { bottom: -5px; left: 50%; transform: translateX(-50%); cursor: ns-resize; }
    .handle-s:hover { transform: translateX(-50%) scale(1.35); }
    .handle-e { right: -5px; top: 50%; transform: translateY(-50%); cursor: ew-resize; }
    .handle-e:hover { transform: translateY(-50%) scale(1.35); }
    .handle-w { left: -5px; top: 50%; transform: translateY(-50%); cursor: ew-resize; }
    .handle-w:hover { transform: translateY(-50%) scale(1.35); }

    /* Floating Real-Time Dimension & Coordinate HUD */
    .figma-dimension-hud {
      position: fixed;
      background: #0F172A;
      color: #38BDF8;
      font-size: 11px;
      font-weight: 600;
      font-family: 'JetBrains Mono', monospace;
      padding: 4px 10px;
      border-radius: 4px;
      pointer-events: none;
      z-index: 1000;
      box-shadow: 0 4px 12px rgba(0,0,0,0.3);
      display: none;
      transform: translateX(-50%);
      white-space: nowrap;
      border: 1px solid rgba(56,189,248,0.3);
    }

    /* Body lock during drag / resize */
    body.is-resizing, body.is-dragging-element {
      user-select: none !important;
      -webkit-user-select: none !important;
    }

    /* --------------------------------------------------------------------------
       COMPONENT STUDIO (DEDICATED FIGMA COMPONENT CANVAS & WORKBENCH)
       -------------------------------------------------------------------------- */
    #component-studio-view {
      display: none;
      flex: 1;
      height: 100%;
      overflow: hidden;
      flex-direction: column;
      position: relative;
    }

    .comp-studio-workbench {
      flex: 1;
      height: 100%;
      background: var(--figma-bg-canvas);
      display: flex;
      flex-direction: column;
      overflow: hidden;
      box-sizing: border-box;
    }

    .comp-studio-header {
      background: white;
      border-bottom: 1px solid var(--figma-border);
      padding: 12px 20px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      flex-shrink: 0;
      box-shadow: 0 1px 2px rgba(0,0,0,0.03);
    }

    .comp-studio-info h2 {
      font-size: 16px;
      font-weight: 700;
      color: var(--figma-text-main);
      display: flex;
      align-items: center;
      gap: 8px;
      margin: 0 0 2px 0;
    }

    .comp-studio-info p {
      margin: 0;
      font-size: 11px;
      color: var(--figma-text-muted);
    }

    .comp-canvas-subtoolbar {
      width: 100%;
      height: 38px;
      background: var(--figma-bg-panel);
      border-bottom: 1px solid var(--figma-border);
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 0 14px;
      flex-shrink: 0;
      z-index: 25;
      font-size: 11px;
      box-sizing: border-box;
    }

    .comp-canvas-viewport {
      flex: 1;
      overflow: auto;
      padding: 40px;
      display: flex;
      justify-content: center;
      align-items: center;
      position: relative;
      background-image: radial-gradient(#CBD5E1 1.2px, transparent 1.2px);
      background-size: 20px 20px;
      box-sizing: border-box;
    }

    .master-component-stage {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 100%;
      min-height: 480px;
    }

    .master-canvas-frame {
      max-width: 1040px;
      width: 100%;
      background: white;
      border-radius: 10px;
      box-shadow: 0 10px 30px rgba(0,0,0,0.08), 0 1px 3px rgba(0,0,0,0.05);
      border: 1.5px solid #8B5CF6;
      display: flex;
      flex-direction: column;
      position: relative;
      transition: transform 0.15s ease;
    }

    .master-component-badge {
      height: 36px;
      background: #F5F3FF;
      border-bottom: 1px solid #DDD6FE;
      color: #7C3AED;
      font-size: 12px;
      font-weight: 700;
      padding: 0 16px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      border-radius: 9px 9px 0 0;
    }

    .master-pos-badge {
      font-size: 10px;
      font-family: monospace;
      background: rgba(124, 58, 237, 0.15);
      color: #7C3AED;
      padding: 2px 6px;
      border-radius: 4px;
      font-weight: 600;
    }

    .active-state-indicator {
      font-size: 11px;
      font-family: monospace;
      background: #EDE9FE;
      color: #6D28D9;
      padding: 2px 8px;
      border-radius: 4px;
    }

    .master-stage-inner {
      min-height: 480px;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 56px 40px;
      position: relative;
      background: #FFFFFF;
      border-radius: 0 0 9px 9px;
      transition: background 0.2s;
      overflow: hidden;
    }

    .master-stage-inner.is-custom-placed {
      display: block;
    }

    .master-stage-inner.bg-dark {
      background: #0F172A;
    }

    .master-stage-inner.bg-dot-grid {
      background-image: radial-gradient(#94A3B8 1.2px, transparent 1.2px);
      background-size: 16px 16px;
      background-color: #F8FAFC;
    }

    .master-element-box {
      border: 2px solid #7C3AED;
      border-radius: 6px;
      position: relative;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      padding: 6px;
      box-sizing: border-box;
      user-select: none;
      cursor: grab;
      min-width: 80px;
      min-height: 36px;
      box-shadow: 0 0 0 1px rgba(124, 58, 237, 0.25);
    }

    .master-element-box:active {
      cursor: grabbing;
    }

    .master-element-box.is-freeform-moving {
      opacity: 0.9 !important;
      cursor: grabbing !important;
      box-shadow: 0 10px 25px -5px rgba(124, 58, 237, 0.35) !important;
      z-index: 100 !important;
    }

    #master-rendered-content {
      pointer-events: none;
      user-select: none;
      width: 100%;
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .master-element-box .figma-resize-handle {
      display: block !important;
      border-color: #7C3AED !important;
    }

    .master-element-box .figma-resize-handle:hover {
      background: #7C3AED !important;
      transform: scale(1.35) !important;
    }

    .master-canvas-quick-bar {
      position: absolute;
      top: -42px;
      left: 50%;
      transform: translateX(-50%);
      display: flex;
      gap: 6px;
      background: #0F172A;
      padding: 4px 8px;
      border-radius: 6px;
      box-shadow: 0 4px 12px rgba(0,0,0,0.25);
      z-index: 50;
      white-space: nowrap;
    }

    .quick-pill {
      background: #1E293B;
      color: #E2E8F0;
      border: 1px solid #334155;
      font-size: 11px;
      font-weight: 500;
      padding: 3px 8px;
      border-radius: 4px;
      cursor: pointer;
      display: inline-flex;
      align-items: center;
      gap: 4px;
      transition: all 0.12s;
    }

    .quick-pill:hover {
      background: #7C3AED;
      color: white;
      border-color: #7C3AED;
    }

    /* Collapsible Bottom Drawer for 6-State Matrix */
    .comp-states-drawer {
      border-top: 1px solid var(--figma-border);
      background: white;
      flex-shrink: 0;
      transition: max-height 0.25s ease;
      max-height: 40px;
      overflow: hidden;
    }

    .comp-states-drawer.expanded {
      max-height: 240px;
      overflow-y: auto;
    }

    .comp-states-drawer-header {
      padding: 10px 18px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      cursor: pointer;
      background: #F8FAFC;
      border-bottom: 1px solid var(--figma-border);
      user-select: none;
    }

    .comp-states-drawer-header:hover {
      background: #F1F5F9;
    }

    .comp-states-grid {
      display: grid;
      grid-template-columns: repeat(6, 1fr);
      gap: 12px;
      padding: 14px 18px;
    }

    .state-card {
      background: #F8FAFC;
      border: 1px solid var(--figma-border);
      border-radius: 6px;
      padding: 10px;
      display: flex;
      flex-direction: column;
      cursor: pointer;
      transition: all 0.12s ease;
    }

    .state-card:hover, .state-card.active {
      border-color: #7C3AED;
      background: #F5F3FF;
      box-shadow: 0 2px 8px rgba(124,58,237,0.15);
    }

    .state-card-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 8px;
      font-size: 11px;
    }

    .state-title {
      font-weight: 600;
      color: var(--figma-text-main);
    }

    .state-preview-box {
      min-height: 60px;
      display: flex;
      align-items: center;
      justify-content: center;
      background: white;
      border: 1px dashed var(--figma-border);
      border-radius: 4px;
      padding: 8px;
      overflow: hidden;
    }

    .quick-icon-popover {
      position: absolute;
      top: -120px;
      left: 50%;
      transform: translateX(-50%);
      background: white;
      border: 1px solid var(--figma-border);
      border-radius: 8px;
      padding: 8px;
      box-shadow: 0 10px 25px -5px rgba(0,0,0,0.2);
      display: grid;
      grid-template-columns: repeat(6, 1fr);
      gap: 6px;
      z-index: 60;
    }

    .icon-opt-btn {
      width: 28px;
      height: 28px;
      border: 1px solid var(--figma-border);
      border-radius: 4px;
      background: white;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      color: var(--figma-text-main);
      transition: all 0.1s;
    }

    .icon-opt-btn:hover {
      background: #EFF6FF;
      border-color: #2563EB;
      color: #2563EB;
    }

    .atomic-pill-badge {
      display: inline-flex;
      align-items: center;
      gap: 4px;
      font-size: 10px;
      font-weight: 600;
      padding: 2px 6px;
      border-radius: 4px;
      background: #EFF6FF;
      color: #2563EB;
    }

    /* --------------------------------------------------------------------------
       RIGHT PANEL: FIGMA PROPERTY INSPECTOR & BRAND CUSTOMIZER
       -------------------------------------------------------------------------- */
    .figma-right-panel {
      width: 320px;
      background: var(--figma-bg-panel);
      border-left: 1px solid var(--figma-border);
      display: flex;
      flex-direction: column;
      flex-shrink: 0;
      z-index: 20;
      transition: width 0.22s cubic-bezier(0.16, 1, 0.3, 1), min-width 0.22s, max-width 0.22s, opacity 0.15s;
    }

    .figma-right-panel.collapsed {
      width: 0 !important;
      min-width: 0 !important;
      max-width: 0 !important;
      padding: 0 !important;
      border-left: none !important;
      overflow: hidden !important;
      pointer-events: none !important;
      opacity: 0 !important;
    }

    .inspector-tabs {
      display: flex;
      align-items: center;
      border-bottom: 1px solid var(--figma-border);
      background: var(--figma-bg-subtle);
    }

    .inspector-tab {
      flex: 1;
      padding: 9px 0;
      text-align: center;
      font-size: 11px;
      font-weight: 600;
      color: var(--figma-text-muted);
      border: none;
      background: transparent;
      cursor: pointer;
      border-bottom: 2px solid transparent;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      gap: 5px;
    }

    .inspector-tab.active {
      color: var(--figma-blue);
      border-bottom-color: var(--figma-blue);
      background: white;
    }

    .inspector-content-area {
      flex: 1;
      overflow-y: auto;
      padding: 16px;
    }

    .inspector-section {
      margin-bottom: 18px;
    }

    .inspector-section-title {
      font-size: 11px;
      font-weight: 700;
      color: var(--figma-text-muted);
      text-transform: uppercase;
      letter-spacing: 0.5px;
      margin-bottom: 10px;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    .control-row {
      margin-bottom: 10px;
    }

    .control-label {
      display: flex;
      justify-content: space-between;
      align-items: center;
      font-size: 11px;
      font-weight: 600;
      color: var(--figma-text-main);
      margin-bottom: 4px;
    }

    .control-label span.desc {
      font-size: 10px;
      font-weight: 400;
      color: var(--figma-text-muted);
      font-family: 'JetBrains Mono', monospace;
    }

    .text-field {
      width: 100%;
      background: var(--figma-bg-subtle);
      border: 1px solid var(--figma-border);
      border-radius: 6px;
      color: var(--figma-text-main);
      font-size: 12px;
      padding: 6px 10px;
      outline: none;
      transition: all 0.15s;
    }

    .text-field:focus {
      background: white;
      border-color: var(--figma-blue);
      box-shadow: 0 0 0 2px rgba(37,99,235,0.1);
    }

    .select-dropdown {
      width: 100%;
      background: var(--figma-bg-subtle);
      border: 1px solid var(--figma-border);
      border-radius: 6px;
      color: var(--figma-text-main);
      font-size: 12px;
      padding: 6px 10px;
      outline: none;
      cursor: pointer;
    }

    .select-dropdown:focus {
      border-color: var(--figma-blue);
      background: white;
    }

    .range-slider-row {
      display: flex;
      align-items: center;
      gap: 10px;
    }

    .range-slider-row input[type="range"] {
      flex: 1;
      accent-color: var(--brand-primary);
    }

    .range-val-badge {
      font-family: 'JetBrains Mono', monospace;
      font-size: 11px;
      color: var(--figma-text-muted);
      min-width: 36px;
      text-align: right;
    }

    .color-picker-group {
      display: flex;
      align-items: center;
      gap: 8px;
    }

    .color-swatch-input {
      width: 28px;
      height: 28px;
      border: 1px solid var(--figma-border);
      border-radius: 6px;
      padding: 0;
      cursor: pointer;
      background: none;
    }

    /* Code Export Modal */
    .export-modal-backdrop {
      display: none;
      position: fixed;
      top: 0; left: 0; width: 100%; height: 100%;
      background: rgba(15,23,42,0.6);
      backdrop-filter: blur(4px);
      z-index: 100;
      align-items: center;
      justify-content: center;
    }

    .export-modal-window {
      width: 90%;
      max-width: 820px;
      max-height: 85vh;
      background: white;
      border: 1px solid var(--figma-border);
      border-radius: 10px;
      display: flex;
      flex-direction: column;
      box-shadow: 0 20px 40px -15px rgba(0,0,0,0.25);
    }

    .export-modal-header {
      padding: 12px 18px;
      border-bottom: 1px solid var(--figma-border);
      display: flex;
      align-items: center;
      justify-content: space-between;
    }

    .export-modal-body {
      flex: 1;
      padding: 16px 18px;
      overflow-y: auto;
    }

    .code-editor-box {
      background: #090D14;
      border: 1px solid #1E293B;
      border-radius: 6px;
      padding: 16px;
      font-family: 'JetBrains Mono', monospace;
      font-size: 12px;
      line-height: 1.6;
      color: #E2E8F0;
      overflow-x: auto;
      white-space: pre;
    }

    .export-modal-footer {
      padding: 12px 18px;
      border-top: 1px solid var(--figma-border);
      display: flex;
      align-items: center;
      justify-content: flex-end;
      gap: 10px;
    }

    /* Toast */
    .figma-toast {
      position: fixed;
      bottom: 24px;
      right: 24px;
      background: #0F172A;
      color: white;
      font-size: 12px;
      font-weight: 500;
      padding: 8px 16px;
      border-radius: 6px;
      box-shadow: 0 10px 15px -3px rgba(0,0,0,0.3);
      display: none;
      align-items: center;
      gap: 6px;
      z-index: 200;
    }
  </style>
</head>
<body>

  <!-- Top Figma Bar -->
  <header class="figma-topbar">
    <div class="figma-brand-group">
      <div class="figma-logo-badge">
        <i data-lucide="layers" style="width:16px;height:16px;"></i>
      </div>
      <div class="figma-file-title">
        <input type="text" id="page-name-input" value="Untitled Page" title="Click to rename page">
        <span class="package-tag">@hsb_design/design-system</span>
      </div>
    </div>

    <!-- Workspace Mode Switcher (Page Studio vs Component Studio) -->
    <div class="studio-mode-switcher">
      <button class="mode-tab-btn active" id="btn-mode-page" onclick="switchStudioWorkspace('page')">
        <i data-lucide="layout" style="width:13px;height:13px;"></i>
        <span>Page Studio</span>
      </button>
      <button class="mode-tab-btn" id="btn-mode-component" onclick="switchStudioWorkspace('component')">
        <i data-lucide="box" style="width:13px;height:13px;"></i>
        <span>Component Studio (112)</span>
      </button>
    </div>

    <!-- Right Header Actions -->
    <div class="figma-right-actions">
      <button class="btn-topbar" onclick="clearCanvas()" id="btn-topbar-clear">
        <i data-lucide="trash-2" style="width:13px;height:13px;"></i>
        <span>Clear</span>
      </button>
      <button class="btn-topbar primary" onclick="openPageExportModal()" id="btn-topbar-export">
        <i data-lucide="code" style="width:13px;height:13px;"></i>
        <span>Export Page Code</span>
      </button>
    </div>
  </header>

  <!-- Main Three-Panel Workspace -->
  <div class="figma-workspace">

    <!-- LEFT PANEL: Component Assets & Page Layers -->
    <aside class="figma-left-panel" id="figma-left-panel">
      <div class="panel-tabs">
        <button class="panel-tab active" id="tab-assets" onclick="switchLeftTab('assets')">
          <i data-lucide="component" style="width:13px;height:13px;"></i>
          <span id="assets-count-label">Components (112)</span>
        </button>
        <button class="panel-tab" id="tab-layers" onclick="switchLeftTab('layers')">
          <i data-lucide="layers" style="width:13px;height:13px;"></i>
          <span id="layers-count-label">Layers (0)</span>
        </button>
        <button class="panel-collapse-btn" id="btn-collapse-left" onclick="toggleLeftPanel()" title="Collapse Left Sidebar (Ctrl+\)">
          <i data-lucide="chevron-left" style="width:14px;height:14px;"></i>
        </button>
      </div>

      <!-- Assets Search & New Component Button -->
      <div class="panel-search-box" id="assets-search-wrap">
        <div style="display:flex; gap:6px; margin-bottom:6px;">
          <input type="text" class="panel-search-input" id="palette-search-input" placeholder="Search 112 components..." oninput="filterPalette()">
          <button class="palette-add-btn" style="padding:4px 8px; flex-shrink:0; font-size:11px;" onclick="openNewComponentModal()" title="Add New Custom Component to Library">
            <i data-lucide="plus" style="width:11px;height:11px;"></i> New
          </button>
        </div>
      </div>

      <!-- Assets Content -->
      <div class="left-panel-content" id="left-panel-content">
        <!-- Rendered by JS -->
      </div>
    </aside>

    <!-- CENTER CANVAS: Interactive Artboard -->
    <main class="figma-canvas-area" id="page-canvas-area">
      <!-- Floating Edge Expand Buttons (visible when sidebars are collapsed) -->
      <button class="canvas-edge-tab edge-tab-left" id="btn-expand-left" onclick="toggleLeftPanel()" title="Show Components Library (Left Sidebar)">
        <i data-lucide="panel-left-open" style="width:13px;height:13px;"></i>
        <span>Components (112)</span>
      </button>
      <button class="canvas-edge-tab edge-tab-right" id="btn-expand-right" onclick="toggleRightPanel()" title="Show Inspector (Right Panel)">
        <i data-lucide="panel-right-open" style="width:13px;height:13px;"></i>
        <span>Inspector</span>
      </button>

      <!-- Canvas Sub-Toolbar: Placement Mode, Rulers, Grid, Snap, Coordinates -->
      <div class="canvas-subtoolbar" id="canvas-subtoolbar">
        <div class="canvas-subtoolbar-group">
          <!-- Sidebar Toggles -->
          <button class="canvas-tool-pill active" id="btn-toggle-left-panel" onclick="toggleLeftPanel()" title="Toggle Left Sidebar (Ctrl+\)">
            <i data-lucide="panel-left" style="width:12px;height:12px;"></i>
          </button>

          <!-- Placement Mode Switcher -->
          <div class="segmented-control-bar" style="width:auto; padding:2px;">
            <button class="seg-btn active" id="btn-mode-freeform" onclick="setCanvasPlacementMode('freeform')" title="Figma Freeform Canvas (Absolute X/Y Dragging)">
              <i data-lucide="move" style="width:12px;height:12px;"></i> Freeform X/Y
            </button>
            <button class="seg-btn" id="btn-mode-flow" onclick="setCanvasPlacementMode('flow')" title="Auto-Flow Canvas (Flex Wrap Multi-Column)">
              <i data-lucide="grid" style="width:12px;height:12px;"></i> Auto Flow
            </button>
          </div>

          <!-- Rulers Toggle -->
          <button class="canvas-tool-pill active" id="btn-toggle-rulers" onclick="toggleRulers()" title="Toggle Canvas Rulers (Shift+R)">
            <i data-lucide="ruler" style="width:12px;height:12px;"></i> Rulers
          </button>

          <!-- Dot Grid Toggle -->
          <button class="canvas-tool-pill active" id="btn-toggle-grid" onclick="toggleGrid()" title="Toggle Dot Grid (8px/16px)">
            <i data-lucide="hash" style="width:12px;height:12px;"></i> Grid
          </button>

          <!-- Snap to Grid Toggle -->
          <button class="canvas-tool-pill active" id="btn-toggle-snap" onclick="toggleSnap()" title="Snap to 8px Grid">
            <i data-lucide="magnet" style="width:12px;height:12px;"></i> Snap (8px)
          </button>
        </div>

        <div class="canvas-subtoolbar-group">
          <!-- Real-Time Coordinate HUD -->
          <span class="coords-hud-badge" id="canvas-coords-hud">X: 0px  Y: 0px</span>

          <!-- Viewports -->
          <button class="tool-btn" id="btn-vp-wide" onclick="setViewportMode('wide')" title="Widescreen Canvas (1440px)">
            <i data-lucide="maximize" style="width:12px;height:12px;"></i> Wide (1440)
          </button>
          <button class="tool-btn active" id="btn-vp-desktop" onclick="setViewportMode('desktop')">
            <i data-lucide="monitor" style="width:12px;height:12px;"></i> Desktop (1120)
          </button>
          <button class="tool-btn" id="btn-vp-tablet" onclick="setViewportMode('tablet')">
            <i data-lucide="tablet" style="width:12px;height:12px;"></i> Tablet (768)
          </button>
          <button class="tool-btn" id="btn-vp-mobile" onclick="setViewportMode('mobile')">
            <i data-lucide="smartphone" style="width:12px;height:12px;"></i> Mobile (375)
          </button>

          <!-- Inspector Sidebar Toggle -->
          <button class="canvas-tool-pill active" id="btn-toggle-right-panel" onclick="toggleRightPanel()" title="Toggle Right Inspector">
            <i data-lucide="panel-right" style="width:12px;height:12px;"></i>
          </button>
        </div>
      </div>

      <!-- Ruler & Artboard Viewport Container -->
      <div class="ruler-canvas-container" id="ruler-canvas-container"
           onmousemove="handleCanvasMouseMove(event)"
           onclick="handleCanvasBgClick(event)"
           ondragover="handleCanvasDragOver(event)"
           ondragleave="handleCanvasDragLeave(event)"
           ondrop="handleCanvasDrop(event)">
        
        <!-- Top Horizontal Ruler Row -->
        <div class="ruler-top-row" id="ruler-top-row">
          <div class="ruler-corner-box">px</div>
          <div class="ruler-h-track" id="ruler-h-track">
            <div class="ruler-guide-x" id="ruler-guide-x"></div>
            <svg id="ruler-h-svg" style="width:2400px; height:20px;"></svg>
          </div>
        </div>

        <!-- Vertical Ruler & Canvas Area Row -->
        <div class="ruler-main-row" id="ruler-main-row">
          <div class="ruler-v-track" id="ruler-v-track">
            <div class="ruler-guide-y" id="ruler-guide-y"></div>
            <svg id="ruler-v-svg" style="width:20px; height:2400px;"></svg>
          </div>

          <!-- Artboard Scroll Container -->
          <div class="artboard-viewport" id="artboard-viewport"
               ondragover="handleCanvasDragOver(event)"
               ondrop="handleCanvasDrop(event)">
            <div class="figma-artboard vp-desktop" id="artboard-frame" onclick="event.stopPropagation()">
              
              <div class="artboard-header">
                <span style="font-weight:600; color:var(--figma-text-main);" id="artboard-label-text">Untitled Page</span>
                <span class="artboard-dimension" id="artboard-dim-text">1120 × Auto</span>
              </div>

              <div class="artboard-body mode-freeform has-dot-grid" id="artboard-body"
                   ondragover="handleCanvasDragOver(event)"
                   ondragleave="handleCanvasDragLeave(event)"
                   ondrop="handleCanvasDrop(event)">
                
                <!-- Empty Canvas Callout -->
                <div class="canvas-empty-state" id="canvas-empty-state">
                  <i data-lucide="plus-circle" style="width:36px;height:36px;"></i>
                  <h3>Figma Freeform Canvas</h3>
                  <p>Click any component from the 112 library to place it freely anywhere on the canvas, or drag with rulers & 8px grid snapping:</p>
                  <div class="preset-chip-group">
                    <button class="preset-chip" onclick="loadCanvasTemplate('genai')">
                      <i data-lucide="sparkles" style="width:12px;height:12px;color:var(--brand-secondary);"></i>
                      <span>Gen AI Chat Assistant</span>
                    </button>
                    <button class="preset-chip" onclick="loadCanvasTemplate('form')">
                      <i data-lucide="check-square" style="width:12px;height:12px;color:var(--brand-primary);"></i>
                      <span>Configuration Form</span>
                    </button>
                    <button class="preset-chip" onclick="loadCanvasTemplate('dashboard')">
                      <i data-lucide="bar-chart-2" style="width:12px;height:12px;color:var(--figma-blue);"></i>
                      <span>Analytics Dashboard</span>
                    </button>
                  </div>
                </div>

              </div>
            </div>
          </div>
        </div>

      </div>
    </main>

    <!-- COMPONENT STUDIO VIEW (DEDICATED 112 COMPONENT FIGMA CANVAS) -->
    <div id="component-studio-view">
      <main class="comp-studio-workbench" id="comp-studio-workbench">
        <!-- 1. Header with Component Title & Top Action Bar -->
        <div class="comp-studio-header" id="comp-studio-header">
          <!-- Injected by renderComponentStudio() -->
        </div>

        <!-- 2. Interactive Component Canvas Sub-Toolbar -->
        <div class="comp-canvas-subtoolbar" id="comp-canvas-subtoolbar">
          <div class="canvas-subtoolbar-group">
            <span style="font-size:11px; font-weight:700; color:var(--figma-text-muted); text-transform:uppercase; letter-spacing:0.5px; margin-right:4px;">Live State:</span>
            <div class="segmented-control-bar" style="width:auto; padding:2px;" id="comp-state-pills">
              <button class="seg-btn active" data-state="default" onclick="setMasterComponentState('default')">● Default</button>
              <button class="seg-btn" data-state="hover" onclick="setMasterComponentState('hover')">Hover</button>
              <button class="seg-btn" data-state="active" onclick="setMasterComponentState('active')">Active</button>
              <button class="seg-btn" data-state="focus" onclick="setMasterComponentState('focus')">Focus</button>
              <button class="seg-btn" data-state="disabled" onclick="setMasterComponentState('disabled')">Disabled</button>
              <button class="seg-btn" data-state="loading" onclick="setMasterComponentState('loading')">Loading</button>
            </div>
          </div>

          <div class="canvas-subtoolbar-group">
            <!-- Zoom Controls -->
            <button class="canvas-tool-pill active" onclick="setCompStudioZoom(1)" id="btn-comp-zoom-100">100%</button>
            <button class="canvas-tool-pill" onclick="setCompStudioZoom(1.5)" id="btn-comp-zoom-150">150%</button>
            <button class="canvas-tool-pill" onclick="setCompStudioZoom(2)" id="btn-comp-zoom-200">200%</button>

            <!-- Background Theme -->
            <button class="canvas-tool-pill" onclick="toggleCompStudioBg()" id="btn-comp-bg" title="Toggle Canvas Background (Light / Dark / Grid)">
              <i data-lucide="sun-moon" style="width:12px;height:12px;"></i> Background
            </button>

            <!-- Toggle Matrix Comparison Strip -->
            <button class="canvas-tool-pill" onclick="toggleCompStatesMatrixStrip()" id="btn-toggle-matrix" title="Toggle 6-State Matrix Strip">
              <i data-lucide="layers" style="width:12px;height:12px;"></i> All 6 States
            </button>
          </div>
        </div>

        <!-- 3. Central Master Component Canvas Viewport -->
        <div class="comp-canvas-viewport" id="comp-canvas-viewport" onclick="closeQuickIconPicker()">
          <div class="master-component-stage" id="master-component-stage">
            <!-- Rendered by renderMasterComponentStage() -->
          </div>
        </div>

        <!-- 4. Collapsible Bottom 6-States Comparison Matrix Strip -->
        <div class="comp-states-drawer" id="comp-states-drawer">
          <div class="comp-states-drawer-header" onclick="toggleCompStatesMatrixStrip()">
            <div style="display:flex; align-items:center; gap:6px; font-size:12px; font-weight:700; color:var(--figma-text-main);">
              <i data-lucide="layout-grid" style="width:14px;height:14px;color:var(--brand-primary);"></i>
              <span>Figma Master State Matrix (All 6 States Preview)</span>
            </div>
            <i data-lucide="chevron-down" id="drawer-chevron-icon" style="width:14px;height:14px;"></i>
          </div>
          <div class="comp-states-grid" id="comp-states-grid">
            <!-- 6 states rendered by JS -->
          </div>
        </div>

      </main>
    </div>

    <!-- RIGHT PANEL: Figma Inspector & Brand Customizer -->
    <aside class="figma-right-panel" id="figma-right-panel">
      <div class="inspector-tabs">
        <button class="inspector-tab active" id="tab-design" onclick="switchRightTab('design')">
          <i data-lucide="sliders" style="width:13px;height:13px;"></i>
          <span>Inspector</span>
        </button>
        <button class="inspector-tab" id="tab-brand" onclick="switchRightTab('brand')">
          <i data-lucide="palette" style="width:13px;height:13px;"></i>
          <span>Brand & Tokens</span>
        </button>
        <button class="panel-collapse-btn" id="btn-collapse-right" onclick="toggleRightPanel()" title="Collapse Inspector">
          <i data-lucide="chevron-right" style="width:14px;height:14px;"></i>
        </button>
      </div>

      <div class="inspector-content-area" id="inspector-content">
        <!-- Rendered by JS based on selection and tab -->
      </div>
    </aside>

  </div>

  <!-- Create & Register New Component Modal -->
  <div class="export-modal-backdrop" id="new-comp-modal" onclick="closeNewCompModalBackdrop(event)">
    <div class="export-modal-window" style="max-width: 600px;">
      <div class="export-modal-header">
        <div style="display:flex; align-items:center; gap:8px; font-size:13px; font-weight:600;">
          <i data-lucide="plus-circle" style="width:16px;height:16px;color:var(--brand-primary);"></i>
          <span>Create & Register New Component</span>
        </div>
        <button class="tool-btn" onclick="closeNewComponentModal()">
          <i data-lucide="x" style="width:14px;height:14px;"></i>
        </button>
      </div>
      <div class="export-modal-body" style="display:flex; flex-direction:column; gap:12px;">
        <div>
          <label class="control-label">Component Display Name</label>
          <input type="text" class="text-field" id="new-comp-name" placeholder="e.g. DecileBar Progress">
        </div>
        <div style="display:flex; gap:10px;">
          <div style="flex:1;">
            <label class="control-label">Category</label>
            <select class="select-dropdown" id="new-comp-category">
              <option value="Actions & Buttons">Actions & Buttons</option>
              <option value="Communication & Feedback">Communication & Feedback</option>
              <option value="Containment & Surfaces">Containment & Surfaces</option>
              <option value="Navigation Systems">Navigation Systems</option>
              <option value="Selection & Form Controls">Selection & Form Controls</option>
              <option value="Text Inputs & Search">Text Inputs & Search</option>
              <option value="Data Display & Lists">Data Display & Lists</option>
              <option value="Dashboard Organisms">Dashboard Organisms</option>
              <option value="Gen AI Interfaces">Gen AI Interfaces</option>
            </select>
          </div>
          <div style="flex:1;">
            <label class="control-label">Lucide Icon Name</label>
            <input type="text" class="text-field" id="new-comp-icon" value="bar-chart-2" placeholder="e.g. bar-chart-2, shield, zap">
          </div>
        </div>
        <div>
          <label class="control-label">React Export Identifier</label>
          <input type="text" class="text-field" id="new-comp-import" placeholder="e.g. DecileBar">
        </div>
        <div>
          <label class="control-label">JSX Code Template</label>
          <input type="text" class="text-field" id="new-comp-jsx" placeholder="e.g. <DecileBar score={9.4} max={10} label='Target Score' />">
        </div>
        <div>
          <label class="control-label">Live HTML/CSS Preview Template</label>
          <textarea class="text-field" id="new-comp-preview" rows="3" style="font-family:'JetBrains Mono',monospace; font-size:11px;" placeholder="<div style='background:white; border:1px solid #E2E8F0; padding:12px; border-radius:8px;'>...</div>"></textarea>
        </div>
      </div>
      <div class="export-modal-footer">
        <button class="btn-topbar" onclick="closeNewComponentModal()">Cancel</button>
        <button class="btn-topbar primary" onclick="saveNewComponent()">
          <i data-lucide="check" style="width:13px;height:13px;"></i>
          <span>Save & Add to Canvas</span>
        </button>
      </div>
    </div>
  </div>

  <!-- Page Export Code Modal -->
  <div class="export-modal-backdrop" id="page-export-modal" onclick="closeExportModalBackdrop(event)">
    <div class="export-modal-window">
      <div class="export-modal-header">
        <div style="display:flex; align-items:center; gap:8px; font-size:13px; font-weight:600;">
          <i data-lucide="file-code" style="width:16px;height:16px;color:var(--brand-primary);"></i>
          <span>Production React JSX Component</span>
        </div>
        <button class="tool-btn" onclick="closePageExportModal()">
          <i data-lucide="x" style="width:14px;height:14px;"></i>
        </button>
      </div>
      <div class="export-modal-body">
        <pre class="code-editor-box" id="page-code-output">// Assembled Code</pre>
      </div>
      <div class="export-modal-footer">
        <button class="btn-topbar" onclick="closePageExportModal()">Close</button>
        <button class="btn-topbar primary" onclick="copyFullPageCode()">
          <i data-lucide="copy" style="width:13px;height:13px;"></i>
          <span>Copy JSX Code</span>
        </button>
      </div>
    </div>
  </div>

  <!-- Sync Info / Server Offline Fallback Modal -->
  <div class="export-modal-backdrop" id="sync-info-modal" onclick="closeSyncInfoModalBackdrop(event)">
    <div class="export-modal-window" style="max-width: 580px;">
      <div class="export-modal-header">
        <div style="display:flex; align-items:center; gap:8px; font-size:13px; font-weight:600;">
          <i data-lucide="server" style="width:16px;height:16px;color:var(--brand-primary);"></i>
          <span>Direct Codebase Sync Bridge</span>
        </div>
        <button class="tool-btn" onclick="closeSyncInfoModal()">
          <i data-lucide="x" style="width:14px;height:14px;"></i>
        </button>
      </div>
      <div class="export-modal-body" style="padding: 20px;">
        <div style="display:flex; gap:12px; margin-bottom:16px;">
          <div style="width:40px; height:40px; border-radius:8px; background:#EFF6FF; color:#2563EB; display:flex; align-items:center; justify-content:center; flex-shrink:0;">
            <i data-lucide="terminal" style="width:20px;height:20px;"></i>
          </div>
          <div>
            <h4 style="margin:0 0 4px 0; font-size:14px; font-weight:700; color:#0F172A;">Dev Server Required for Direct Disk Writes</h4>
            <p style="margin:0; font-size:12px; color:#64748B; line-height:1.5;">
              Because web browsers restrict direct file system writes from <code>file:///</code> URLs, running the built-in CLI server enables seamless 1-click updates to your repository.
            </p>
          </div>
        </div>

        <div style="background:#0F172A; color:#F8FAFC; padding:12px 14px; border-radius:6px; font-family:monospace; font-size:12px; margin-bottom:14px; display:flex; align-items:center; justify-content:space-between;">
          <span>npm run ui</span>
          <button class="btn-topbar" style="background:#334155; color:white; border:none; padding:4px 8px; font-size:11px;" onclick="navigator.clipboard.writeText('npm run ui'); showToast('Copied npm run ui to clipboard!');">Copy</button>
        </div>

        <div style="font-size:12px; color:#475569; margin-bottom:16px; line-height:1.5;">
          1. Run <code style="background:#F1F5F9; padding:2px 4px; border-radius:3px;">npm run ui</code> in your project terminal.<br>
          2. Open <a href="http://localhost:3000" target="_blank" style="color:var(--brand-primary); font-weight:600; text-decoration:underline;">http://localhost:3000</a>.<br>
          3. Clicking <b>Sync to Source Code</b> will now instantly write to disk and rebuild!
        </div>

        <div style="border-top:1px solid var(--figma-border); padding-top:14px;">
          <div style="font-size:11px; font-weight:600; color:#64748B; text-transform:uppercase; margin-bottom:8px;">Zero-Server Alternatives</div>
          <div style="display:flex; gap:8px;">
            <button class="btn-topbar" style="flex:1; justify-content:center;" onclick="downloadActiveComponentPatch()">
              <i data-lucide="download" style="width:13px;height:13px;"></i> Download JSON Patch
            </button>
            <button class="btn-topbar" style="flex:1; justify-content:center;" onclick="directWorkspaceFolderWrite()">
              <i data-lucide="folder-check" style="width:13px;height:13px;"></i> Direct Folder Write
            </button>
          </div>
        </div>
      </div>
      <div class="export-modal-footer">
        <button class="btn-topbar primary" onclick="closeSyncInfoModal()">Done</button>
      </div>
    </div>
  </div>

  <!-- Toast -->
  <div class="figma-toast" id="figma-toast">
    <i data-lucide="check" style="width:14px;height:14px;color:#10B981;"></i>
    <span id="toast-message">Copied to clipboard!</span>
  </div>

  <!-- FIGMA STUDIO INTERACTIVE LOGIC -->
  <script>
    // =========================================================================
    // MASTER COMPONENT CATALOG DEFINITIONS (ALL 112 COMPONENTS)
    // =========================================================================
    /* __CATALOG_DEFINITIONS_PLACEHOLDER__ */

    // =========================================================================
    // STATE ENGINE
    // =========================================================================
    let placedElements = [];
    let selectedElementId = null;
    let activeLeftTab = 'assets';
    let activeRightTab = 'design';
    let activeStudioWorkspace = 'page'; // 'page' or 'component'
    let canvasPlacementMode = 'freeform'; // 'freeform' (Figma Absolute X/Y) or 'flow'
    let showRulers = true;
    let showGrid = true;
    let snapToGrid = true; // 8px grid snap
    let canvasGap = '16px';
    let canvasBgColor = '#FFFFFF';

    // Component Studio State (Dedicated Master 112 Component Editor)
    let activeMasterComponentId = 'button';
    let activeMasterComponentVariant = 'filled';
    let activeMasterComponentState = 'default';
    let activeMasterComponentAtoms = {};
    let activeMasterComponentZoom = 1;
    let activeMasterComponentBg = 'white';
    let activeMasterComponentCustomWidth = '';
    let activeMasterComponentCustomHeight = '';
    let activeMasterComponentX = null;
    let activeMasterComponentY = null;
    let isMasterMoving = false;
    let masterMoveStartX = 0;
    let masterMoveStartY = 0;
    let masterMoveInitialLeft = 0;
    let masterMoveInitialTop = 0;
    let isStatesMatrixOpen = false;
    let isMasterResizing = false;
    let masterResizeHandle = null;
    let masterResizeStartX = 0;
    let masterResizeStartY = 0;
    let masterResizeStartRect = null;
    let activeAtomTab = 'border'; // 'border' | 'icon' | 'typography'

    // =========================================================================
    // ATOMIC ENGINE (Sub-Component Molecule / Atom Styler)
    // =========================================================================
    function applyAtomicStyles(html, atoms = {}) {
      if (!atoms || Object.keys(atoms).length === 0) return html;
      let res = html;

      // 1. Icon replacement
      if (atoms.icon) {
        if (res.includes('data-lucide=')) {
          res = res.replace(/data-lucide="[^"]*"/g, 'data-lucide="' + atoms.icon + '"');
        }
      }

      // 2. Icon color / size
      if (atoms.iconColor || atoms.iconSize) {
        res = res.replace(/<i\s+data-lucide="[^"]*"\s+style="([^"]*)"/g, function(match, curStyle) {
          let s = curStyle;
          if (atoms.iconColor) s += '; color: ' + atoms.iconColor + ';';
          if (atoms.iconSize) s += '; width: ' + atoms.iconSize + '; height: ' + atoms.iconSize + ';';
          return '<i data-lucide="' + (atoms.icon || 'box') + '" style="' + s + '"';
        });
      }

      // 3. Border, Radius, Background, Shadow on root element
      let rootStyles = [];
      if (atoms.borderWidth) rootStyles.push('border-width: ' + atoms.borderWidth + ' !important; border-style: ' + (atoms.borderStyle || 'solid') + ' !important;');
      if (atoms.borderColor) rootStyles.push('border-color: ' + atoms.borderColor + ' !important;');
      if (atoms.borderRadius) rootStyles.push('border-radius: ' + atoms.borderRadius + ' !important;');
      if (atoms.bgColor) rootStyles.push('background: ' + atoms.bgColor + ' !important;');
      if (atoms.textColor) rootStyles.push('color: ' + atoms.textColor + ' !important;');
      if (atoms.fontSize) rootStyles.push('font-size: ' + atoms.fontSize + ' !important;');
      if (atoms.fontWeight) rootStyles.push('font-weight: ' + atoms.fontWeight + ' !important;');

      if (atoms.boxShadow) {
        const shadowMap = {
          none: 'none',
          sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
          md: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
          lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
          xl: '0 20px 25px -5px rgba(0, 0, 0, 0.1)',
          glow: '0 0 15px rgba(37, 99, 235, 0.5)'
        };
        rootStyles.push('box-shadow: ' + (shadowMap[atoms.boxShadow] || atoms.boxShadow) + ' !important;');
      }

      if (rootStyles.length > 0) {
        const rootStyleStr = rootStyles.join(' ');
        if (res.includes('style="')) {
          res = res.replace('style="', 'style="' + rootStyleStr + ' ');
        } else {
          res = res.replace(/^<([a-z0-9-]+)/i, '<$1 style="' + rootStyleStr + '"');
        }
      }

      return res;
    }

    // =========================================================================
    // INITIALIZATION & CUSTOM COMPONENT STORAGE
    // =========================================================================
    function loadSavedCustomComponents() {
      try {
        const saved = JSON.parse(localStorage.getItem('hsb_custom_canvas_components') || '[]');
        saved.forEach(c => {
          if (!CATALOG.some(existing => existing.id === c.id)) {
            CATALOG.push({
              id: c.id,
              num: 'CUSTOM',
              name: c.name,
              category: c.category || 'Custom Elements',
              icon: c.icon || 'star',
              aliases: [],
              importName: c.name.replace(/[^a-zA-Z0-9]/g, ''),
              desc: c.desc || 'Custom canvas element',
              device: 'All Devices',
              api: '<' + c.name.replace(/[^a-zA-Z0-9]/g, '') + ' />',
              defaultProps: { label: c.name },
              render: () => '<div style="padding:12px; background:white; border:1.5px solid var(--brand-primary); border-radius:8px; box-shadow:0 1px 3px rgba(0,0,0,0.08); font-size:13px; font-weight:600;">' + c.name + '</div>',
              toJsx: () => '<' + c.name.replace(/[^a-zA-Z0-9]/g, '') + ' />'
            });
          }
        });
      } catch (e) {
        console.warn('Could not load custom components', e);
      }
    }

    async function checkServerSyncStatus() {
      try {
        const res = await fetch('/api/customizations');
        if (res.ok) {
          const data = await res.json();
          if (data.customizations) {
            Object.keys(data.customizations).forEach(id => {
              const cust = data.customizations[id];
              const def = CATALOG.find(c => c.id === id || c.num === cust.num);
              if (def) {
                def.defaultAtoms = { ...(def.defaultAtoms || {}), ...cust.atoms };
              }
            });
            renderPalette();
          }
        }
      } catch (e) {
        // file:/// mode or dev server offline
      }
    }

    window.addEventListener('DOMContentLoaded', () => {
      loadSavedCustomComponents();
      checkServerSyncStatus();
      renderPalette();
      renderRulers();
      loadCanvasTemplate('dashboard');
      if (window.lucide && typeof lucide.createIcons === 'function') {
        lucide.createIcons();
      }
    });

    // =========================================================================
    // WORKSPACE SWITCHER (PAGE STUDIO vs COMPONENT STUDIO)
    // =========================================================================
    function switchStudioWorkspace(mode) {
      activeStudioWorkspace = mode;
      const pageArea = document.getElementById('page-canvas-area');
      const compView = document.getElementById('component-studio-view');
      const btnPage = document.getElementById('btn-mode-page');
      const btnComp = document.getElementById('btn-mode-component');
      const btnExport = document.getElementById('btn-topbar-export');
      const btnClear = document.getElementById('btn-topbar-clear');

      if (mode === 'component') {
        if (pageArea) pageArea.style.display = 'none';
        if (compView) compView.style.display = 'flex';
        if (btnPage) btnPage.classList.remove('active');
        if (btnComp) btnComp.classList.add('active');
        if (btnExport) btnExport.style.display = 'none';
        if (btnClear) btnClear.style.display = 'none';
        renderComponentStudio();
      } else {
        if (compView) compView.style.display = 'none';
        if (pageArea) pageArea.style.display = 'flex';
        if (btnComp) btnComp.classList.remove('active');
        if (btnPage) btnPage.classList.add('active');
        if (btnExport) btnExport.style.display = 'inline-flex';
        if (btnClear) btnClear.style.display = 'inline-flex';
        renderArtboard();
      }
      renderInspector();
      if (window.lucide && typeof lucide.createIcons === 'function') {
        lucide.createIcons();
      }
    }

    // =========================================================================
    // RULERS & CANVAS GRID ENGINE
    // =========================================================================
    function renderRulers() {
      const hSvg = document.getElementById('ruler-h-svg');
      const vSvg = document.getElementById('ruler-v-svg');
      if (!hSvg || !vSvg) return;

      let hTicks = '';
      for (let x = 0; x <= 2400; x += 10) {
        const isMajor = (x % 100 === 0);
        const isMedium = (x % 50 === 0);
        const height = isMajor ? 12 : (isMedium ? 8 : 4);
        hTicks += '<line x1="' + x + '" y1="' + (20 - height) + '" x2="' + x + '" y2="20" stroke="#94A3B8" stroke-width="1"/>';
        if (isMajor && x > 0) {
          hTicks += '<text x="' + (x + 2) + '" y="10" font-size="8" fill="#64748B" font-family="monospace">' + x + '</text>';
        }
      }
      hSvg.innerHTML = hTicks;

      let vTicks = '';
      for (let y = 0; y <= 2400; y += 10) {
        const isMajor = (y % 100 === 0);
        const isMedium = (y % 50 === 0);
        const width = isMajor ? 12 : (isMedium ? 8 : 4);
        vTicks += '<line x1="' + (20 - width) + '" y1="' + y + '" x2="20" y2="' + y + '" stroke="#94A3B8" stroke-width="1"/>';
        if (isMajor && y > 0) {
          vTicks += '<text x="2" y="' + (y - 3) + '" font-size="8" fill="#64748B" font-family="monospace">' + y + '</text>';
        }
      }
      vSvg.innerHTML = vTicks;
    }

    function handleCanvasMouseMove(e) {
      const container = document.getElementById('ruler-canvas-container');
      if (!container) return;
      const rect = container.getBoundingClientRect();
      const mouseX = Math.round(e.clientX - rect.left - 20);
      const mouseY = Math.round(e.clientY - rect.top - 20);

      const guideX = document.getElementById('ruler-guide-x');
      const guideY = document.getElementById('ruler-guide-y');
      if (guideX && showRulers) {
        guideX.style.display = 'block';
        guideX.style.left = (mouseX + 20) + 'px';
      }
      if (guideY && showRulers) {
        guideY.style.display = 'block';
        guideY.style.top = mouseY + 'px';
      }

      if (!isFreeformMoving) {
        const hud = document.getElementById('canvas-coords-hud');
        if (hud) {
          hud.textContent = 'X: ' + Math.max(0, mouseX) + 'px  Y: ' + Math.max(0, mouseY) + 'px';
        }
      }
    }

    function toggleRulers() {
      showRulers = !showRulers;
      const topRow = document.getElementById('ruler-top-row');
      const vTrack = document.getElementById('ruler-v-track');
      const btn = document.getElementById('btn-toggle-rulers');

      if (topRow) topRow.style.display = showRulers ? 'flex' : 'none';
      if (vTrack) vTrack.style.display = showRulers ? 'block' : 'none';
      if (btn) btn.classList.toggle('active', showRulers);
    }

    function toggleGrid() {
      showGrid = !showGrid;
      const body = document.getElementById('artboard-body');
      const btn = document.getElementById('btn-toggle-grid');
      if (body) body.classList.toggle('has-dot-grid', showGrid);
      if (btn) btn.classList.toggle('active', showGrid);
    }

    function toggleSnap() {
      snapToGrid = !snapToGrid;
      const btn = document.getElementById('btn-toggle-snap');
      if (btn) btn.classList.toggle('active', snapToGrid);
      showToast(snapToGrid ? 'Snap to 8px Grid ON' : 'Snap to Grid OFF');
    }

    function setCanvasPlacementMode(mode) {
      canvasPlacementMode = mode;
      const btnFree = document.getElementById('btn-mode-freeform');
      const btnFlow = document.getElementById('btn-mode-flow');
      if (btnFree) btnFree.classList.toggle('active', mode === 'freeform');
      if (btnFlow) btnFlow.classList.toggle('active', mode === 'flow');

      renderArtboard();
      renderInspector();
      showToast('Switched to ' + (mode === 'freeform' ? 'Freeform X/Y Canvas' : 'Auto Flow Canvas'));
    }

    // =========================================================================
    // COLLAPSIBLE SIDEBARS (MAX WORKSPACE CANVAS)
    // =========================================================================
    let isLeftPanelCollapsed = false;
    let isRightPanelCollapsed = false;

    function toggleLeftPanel(forceState) {
      const panel = document.getElementById('figma-left-panel');
      const expandBtn = document.getElementById('btn-expand-left');
      const toolBtn = document.getElementById('btn-toggle-left-panel');
      if (!panel) return;

      if (typeof forceState === 'boolean') {
        isLeftPanelCollapsed = forceState;
      } else {
        isLeftPanelCollapsed = !isLeftPanelCollapsed;
      }

      panel.classList.toggle('collapsed', isLeftPanelCollapsed);
      if (expandBtn) expandBtn.style.display = isLeftPanelCollapsed ? 'inline-flex' : 'none';
      if (toolBtn) toolBtn.classList.toggle('active', !isLeftPanelCollapsed);

      if (window.lucide && typeof lucide.createIcons === 'function') {
        lucide.createIcons();
      }
    }

    function toggleRightPanel(forceState) {
      const panel = document.getElementById('figma-right-panel');
      const expandBtn = document.getElementById('btn-expand-right');
      const toolBtn = document.getElementById('btn-toggle-right-panel');
      if (!panel) return;

      if (typeof forceState === 'boolean') {
        isRightPanelCollapsed = forceState;
      } else {
        isRightPanelCollapsed = !isRightPanelCollapsed;
      }

      panel.classList.toggle('collapsed', isRightPanelCollapsed);
      if (expandBtn) expandBtn.style.display = isRightPanelCollapsed ? 'inline-flex' : 'none';
      if (toolBtn) toolBtn.classList.toggle('active', !isRightPanelCollapsed);

      if (window.lucide && typeof lucide.createIcons === 'function') {
        lucide.createIcons();
      }
    }

    // =========================================================================
    // LEFT PALETTE & LAYERS
    // =========================================================================
    function switchLeftTab(tab) {
      activeLeftTab = tab;
      document.getElementById('tab-assets').classList.toggle('active', tab === 'assets');
      document.getElementById('tab-layers').classList.toggle('active', tab === 'layers');
      document.getElementById('assets-search-wrap').style.display = tab === 'assets' ? 'block' : 'none';

      if (tab === 'assets') {
        renderPalette();
      } else {
        renderLayersTree();
      }
    }

    function renderPalette() {
      const container = document.getElementById('left-panel-content');
      container.innerHTML = '';

      const query = (document.getElementById('palette-search-input')?.value || '').toLowerCase().trim();

      const categories = [
        'Actions & Buttons',
        'Content & Data Display',
        'Layout & Surface',
        'Navigation & Wayfinding',
        'Feedback & Indicators',
        'Forms & Inputs',
        'Dashboard Organisms'
      ];

      categories.forEach(cat => {
        const items = CATALOG.filter(c => {
          const matchCat = (c.category === cat);
          const matchQ = !query || c.name.toLowerCase().includes(query) || (c.desc && c.desc.toLowerCase().includes(query));
          return matchCat && matchQ;
        });

        if (items.length === 0) return;

        const catHead = document.createElement('div');
        catHead.className = 'palette-category-title';
        catHead.textContent = cat + ' (' + items.length + ')';
        container.appendChild(catHead);

        const grid = document.createElement('div');
        grid.className = 'palette-grid';

        items.forEach(c => {
          const itemEl = document.createElement('div');
          itemEl.className = 'palette-item';
          itemEl.draggable = true;
          itemEl.ondragstart = (e) => {
            e.dataTransfer.setData('text/plain', c.id);
            e.dataTransfer.setData('application/x-component-id', c.id);
            try { e.dataTransfer.effectAllowed = 'copyMove'; } catch (err) {}
          };
          itemEl.onclick = (e) => {
            if (activeStudioWorkspace === 'component') {
              selectMasterComponent(c.id);
            } else {
              addElementToCanvas(c.id);
              showToast('Added ' + c.name + ' to Canvas');
            }
          };

          itemEl.innerHTML = '<div class="palette-item-icon">' +
              '<i data-lucide="' + ((c.defaultAtoms && c.defaultAtoms.icon) || c.icon || 'box') + '" style="width:14px;height:14px;"></i>' +
            '</div>' +
            '<div class="palette-item-text">' +
              '<div class="palette-item-name">' + c.name + '</div>' +
              '<div class="palette-item-sub">' + (c.desc ? c.desc.slice(0, 32) + '...' : c.num) + '</div>' +
            '</div>' +
            '<button class="palette-add-btn" title="Add to Canvas" data-id="' + c.id + '" onclick="event.stopPropagation(); handlePaletteAddClick(this.dataset.id)">' +
              '<i data-lucide="plus" style="width:10px;height:10px;"></i>' +
            '</button>';

          grid.appendChild(itemEl);
        });

        container.appendChild(grid);
      });

      if (window.lucide && typeof lucide.createIcons === 'function') {
        lucide.createIcons();
      }
    }

    function filterPalette() {
      renderPalette();
    }

    function handlePaletteAddClick(id) {
      if (activeStudioWorkspace === 'component') {
        selectMasterComponent(id);
      } else {
        addElementToCanvas(id);
        const def = CATALOG.find(c => c.id === id);
        if (def) showToast('Added ' + def.name + ' to Canvas');
      }
    }

    function renderLayersTree() {
      const container = document.getElementById('left-panel-content');
      container.innerHTML = '';

      if (placedElements.length === 0) {
        container.innerHTML = '<div style="padding: 24px; text-align: center; color: var(--figma-text-muted); font-size: 12px;">' +
          'No layers placed on canvas yet.' +
        '</div>';
        return;
      }

      placedElements.forEach((el, index) => {
        const row = document.createElement('div');
        row.className = 'layer-row' + (el.id === selectedElementId ? ' selected' : '');
        row.onclick = () => selectElement(el.id);

        const l = el.layout || {};
        const widthBadge = l.customWidth || l.width || 'auto';

        row.innerHTML = '<div class="layer-item-left">' +
            '<i data-lucide="' + (el.definition.icon || 'box') + '" class="layer-item-icon"></i>' +
            '<span class="layer-item-name">' + el.definition.name + '</span>' +
            '<span style="font-size:9px; background:var(--figma-bg-active); padding:1px 4px; border-radius:3px; color:var(--figma-text-muted); font-family:monospace;">' + widthBadge + '</span>' +
          '</div>' +
          '<div style="display:flex; gap:2px;">' +
            '<button class="tool-btn" style="width:20px;height:20px;padding:0;" onclick="event.stopPropagation(); moveLayerOrder(' + index + ', -1)" title="Move Layer Up">' +
              '<i data-lucide="chevron-up" style="width:11px;height:11px;"></i>' +
            '</button>' +
            '<button class="tool-btn" style="width:20px;height:20px;padding:0;" onclick="event.stopPropagation(); moveLayerOrder(' + index + ', 1)" title="Move Layer Down">' +
              '<i data-lucide="chevron-down" style="width:11px;height:11px;"></i>' +
            '</button>' +
          '</div>';

        container.appendChild(row);
      });

      if (window.lucide && typeof lucide.createIcons === 'function') {
        lucide.createIcons();
      }
    }

    // =========================================================================
    // ADD ELEMENT TO CANVAS (WITH FREEFORM COORDINATES & ATOMS)
    // =========================================================================
    function addElementToCanvas(catalogId, customLayout = {}, insertIndex = null, customAtoms = {}) {
      const def = CATALOG.find(c => c.id === catalogId || (c.aliases && c.aliases.includes(catalogId)));
      if (!def) return;

      let defaultWidth = 'auto';
      let defaultAlign = 'left';
      const id = def.id.toLowerCase();
      const cat = def.category || '';

      if (id.includes('search') || id.includes('input') || id.includes('select') || id.includes('picker')) {
        defaultWidth = '340px';
      } else if (id.includes('kpi') || id.includes('card') || id.includes('stat') || id.includes('metric')) {
        defaultWidth = '320px';
      } else if (id.includes('table') || id.includes('hero') || id.includes('banner') || cat === 'Dashboard Organisms') {
        defaultWidth = '720px';
      } else if (cat === 'Actions & Buttons') {
        defaultWidth = 'auto';
      }

      // Freeform coordinate defaults
      const offsetCount = placedElements.length;
      const defaultX = 40 + (offsetCount % 5) * 60;
      const defaultY = 40 + Math.floor(offsetCount / 5) * 90;

      const newId = 'elem_' + Date.now() + '_' + Math.random().toString(36).substr(2, 4);
      const newElement = {
        id: newId,
        definition: def,
        props: JSON.parse(JSON.stringify(def.defaultProps)),
        layout: {
          x: defaultX,
          y: defaultY,
          width: defaultWidth,
          customWidth: defaultWidth.includes('px') ? defaultWidth : '',
          height: 'auto',
          customHeight: '',
          alignment: defaultAlign,
          marginTop: 0,
          marginBottom: 0,
          zIndex: offsetCount + 1,
          ...customLayout
        },
        atoms: { ...(def.defaultAtoms || {}), ...customAtoms }
      };

      if (typeof insertIndex === 'number' && insertIndex >= 0 && insertIndex <= placedElements.length) {
        placedElements.splice(insertIndex, 0, newElement);
      } else {
        placedElements.push(newElement);
      }
      selectedElementId = newId;

      renderArtboard();
      if (activeLeftTab === 'layers') {
        renderLayersTree();
      }
      renderInspector();
    }

    function selectElement(id) {
      if (selectedElementId === id) return;
      selectedElementId = id;
      const allBoxes = document.querySelectorAll('.figma-element-box');
      allBoxes.forEach(b => {
        if (b.id === id) {
          b.classList.add('selected');
        } else {
          b.classList.remove('selected');
        }
      });
      renderInspector();
      if (activeLeftTab === 'layers') {
        renderLayersTree();
      }
    }

    function handleCanvasBgClick(e) {
      if (!e.target) return;
      const tag = e.target.id;
      if (tag === 'artboard-body' || tag === 'artboard-viewport' || tag === 'ruler-canvas-container' || tag === 'artboard-frame' || (e.target.classList && e.target.classList.contains('ruler-main-row'))) {
        selectedElementId = null;
        document.querySelectorAll('.figma-element-box.selected').forEach(b => b.classList.remove('selected'));
        renderInspector();
        if (activeLeftTab === 'layers') {
          renderLayersTree();
        }
      }
    }

    // =========================================================================
    // ARTBOARD RENDERER (FREEFORM X/Y & ATOMIC SUB-LAYERS)
    // =========================================================================
    function renderArtboard() {
      const body = document.getElementById('artboard-body');
      const emptyState = document.getElementById('canvas-empty-state');

      // Update layers count
      const layersCountLabel = document.getElementById('layers-count-label');
      if (layersCountLabel) {
        layersCountLabel.textContent = 'Layers (' + placedElements.length + ')';
      }

      // Update canvas background and gap
      body.style.backgroundColor = canvasBgColor || '#FFFFFF';
      body.style.gap = canvasGap || '16px';

      // Placement mode classes
      if (canvasPlacementMode === 'freeform') {
        body.classList.add('mode-freeform');
        body.classList.remove('mode-flex-wrap', 'mode-stack', 'mode-grid-2', 'mode-grid-3');
      } else {
        body.classList.remove('mode-freeform');
        body.classList.add('mode-' + canvasLayoutMode);
      }

      if (placedElements.length === 0) {
        if (emptyState) emptyState.style.display = 'flex';
        const existingBoxes = body.querySelectorAll('.figma-element-box');
        for (let i = 0; i < existingBoxes.length; i++) existingBoxes[i].remove();
        return;
      }

      if (emptyState) emptyState.style.display = 'none';

      // Remove existing boxes
      const existingBoxes = body.querySelectorAll('.figma-element-box');
      for (let i = 0; i < existingBoxes.length; i++) existingBoxes[i].remove();

      placedElements.forEach(el => {
        const isSelected = (el.id === selectedElementId);
        const box = document.createElement('div');
        box.className = 'figma-element-box' + (isSelected ? ' selected' : '') + (canvasPlacementMode === 'freeform' ? ' is-freeform' : '');
        box.id = el.id;
        box.dataset.id = el.id;

        const l = el.layout || {};
        let width = l.width || 'auto';
        let height = l.height || 'auto';

        // Freeform placement positioning
        if (canvasPlacementMode === 'freeform') {
          box.style.position = 'absolute';
          box.style.left = (l.x !== undefined ? l.x : 40) + 'px';
          box.style.top = (l.y !== undefined ? l.y : 40) + 'px';
          box.style.zIndex = l.zIndex || 1;

          // Freeform pointer drag
          box.onpointerdown = function(e) { handleFreeformPointerDown(e, el.id); };
        } else {
          box.style.position = 'relative';
          box.style.left = 'auto';
          box.style.top = 'auto';
          box.style.marginTop = (l.marginTop || 0) + 'px';
          box.style.marginBottom = (l.marginBottom || 0) + 'px';
        }

        // Width
        if (width === '100%') {
          box.style.width = '100%';
          box.style.flex = '0 0 100%';
          box.style.maxWidth = '100%';
        } else if (width === '50%') {
          box.style.width = 'calc(50% - 8px)';
          box.style.flex = '0 0 calc(50% - 8px)';
        } else if (width === '33.3%') {
          box.style.width = 'calc(33.333% - 11px)';
          box.style.flex = '0 0 calc(33.333% - 11px)';
        } else if (width === '25%') {
          box.style.width = 'calc(25% - 12px)';
          box.style.flex = '0 0 calc(25% - 12px)';
        } else if (width === 'custom' || width.includes('px')) {
          const cw = l.customWidth || width;
          box.style.width = cw;
          box.style.flex = '0 0 ' + cw;
          box.style.maxWidth = cw;
        } else {
          box.style.width = 'auto';
          box.style.flex = '0 1 auto';
          box.style.maxWidth = '100%';
        }

        // Height
        if (height === 'compact') {
          box.style.minHeight = '36px';
        } else if (height === 'default') {
          box.style.minHeight = '48px';
        } else if (height === 'large') {
          box.style.minHeight = '72px';
        } else if (height === 'custom' && l.customHeight) {
          box.style.minHeight = l.customHeight;
          box.style.height = l.customHeight;
        } else {
          box.style.minHeight = 'auto';
          box.style.height = 'auto';
        }

        box.onclick = function(e) {
          e.stopPropagation();
          selectElement(el.id);
        };

        let innerHtml = '';

        // Clean Figma Top-Left Badge (NO CLUMSY FLOATING OVERLAY BAR)
        const dimLabel = canvasPlacementMode === 'freeform'
          ? ('X:' + (l.x || 0) + ' Y:' + (l.y || 0))
          : (l.customWidth || (width === 'auto' ? 'Auto' : width));

        innerHtml += '<div class="element-select-badge" data-id="' + el.id + '" title="Drag to move component on canvas" onpointerdown="handleFreeformPointerDown(event, this.dataset.id)">' +
          '<i data-lucide="grip-vertical" style="width:11px;height:11px;opacity:0.8;"></i>' +
          '<span>' + el.definition.name + '</span>' +
          '<span class="dim-badge" id="hud-badge-' + el.id + '">' + dimLabel + '</span>' +
        '</div>';

        // 8 Figma Resize Handles
        innerHtml += '<div class="figma-resize-handle handle-nw" data-handle="nw" onpointerdown="handleResizePointerDown(event, this)"></div>' +
          '<div class="figma-resize-handle handle-n" data-handle="n" onpointerdown="handleResizePointerDown(event, this)"></div>' +
          '<div class="figma-resize-handle handle-ne" data-handle="ne" onpointerdown="handleResizePointerDown(event, this)"></div>' +
          '<div class="figma-resize-handle handle-e" data-handle="e" onpointerdown="handleResizePointerDown(event, this)"></div>' +
          '<div class="figma-resize-handle handle-se" data-handle="se" onpointerdown="handleResizePointerDown(event, this)"></div>' +
          '<div class="figma-resize-handle handle-s" data-handle="s" onpointerdown="handleResizePointerDown(event, this)"></div>' +
          '<div class="figma-resize-handle handle-sw" data-handle="sw" onpointerdown="handleResizePointerDown(event, this)"></div>' +
          '<div class="figma-resize-handle handle-w" data-handle="w" onpointerdown="handleResizePointerDown(event, this)"></div>';

        // Render component with atomic overrides applied!
        const baseRender = el.definition.render(el.props);
        const atomicRender = applyAtomicStyles(baseRender, el.atoms);

        innerHtml += '<div class="element-content-wrapper">' + atomicRender + '</div>';

        box.innerHTML = innerHtml;
        body.appendChild(box);
      });

      if (window.lucide && typeof lucide.createIcons === 'function') {
        lucide.createIcons();
      }
    }

    // =========================================================================
    // FIGMA FREEFORM DRAGGING ENGINE (ABSOLUTE X/Y PLACEMENT)
    // =========================================================================
    let isFreeformMoving = false;
    let freeformElementId = null;
    let freeformStartX = 0;
    let freeformStartY = 0;
    let freeformInitialLeft = 0;
    let freeformInitialTop = 0;

    function handleFreeformPointerDown(e, elId) {
      if (e.target.classList.contains('figma-resize-handle')) return;
      e.stopPropagation();

      selectElement(elId);

      if (canvasPlacementMode !== 'freeform') return;

      const el = placedElements.find(item => item.id === elId);
      if (!el) return;

      const box = document.getElementById(elId);
      if (!box) return;

      e.preventDefault();

      isFreeformMoving = true;
      freeformElementId = elId;
      freeformStartX = e.clientX;
      freeformStartY = e.clientY;
      freeformInitialLeft = (el.layout && el.layout.x !== undefined) ? el.layout.x : box.offsetLeft;
      freeformInitialTop = (el.layout && el.layout.y !== undefined) ? el.layout.y : box.offsetTop;

      box.classList.add('is-freeform-moving');
      document.body.classList.add('is-dragging-element');
      box.style.zIndex = '999';

      try {
        box.setPointerCapture(e.pointerId);
      } catch (err) {}

      window.addEventListener('pointermove', handleFreeformPointerMove, { passive: false });
      window.addEventListener('pointerup', handleFreeformPointerUp);
      window.addEventListener('pointercancel', handleFreeformPointerUp);
    }

    function handleFreeformPointerMove(e) {
      if (!isFreeformMoving || !freeformElementId) return;
      e.preventDefault();

      const deltaX = e.clientX - freeformStartX;
      const deltaY = e.clientY - freeformStartY;

      let newLeft = freeformInitialLeft + deltaX;
      let newTop = freeformInitialTop + deltaY;

      if (snapToGrid) {
        newLeft = Math.round(newLeft / 8) * 8;
        newTop = Math.round(newTop / 8) * 8;
      }

      newLeft = Math.max(0, newLeft);
      newTop = Math.max(0, newTop);

      const box = document.getElementById(freeformElementId);
      if (box) {
        box.style.left = newLeft + 'px';
        box.style.top = newTop + 'px';
      }

      const artboardBody = document.getElementById('artboard-body');
      if (artboardBody && box) {
        const neededHeight = newTop + box.offsetHeight + 80;
        if (neededHeight > artboardBody.clientHeight) {
          artboardBody.style.minHeight = neededHeight + 'px';
        }
      }

      const coordsHud = document.getElementById('canvas-coords-hud');
      if (coordsHud) {
        coordsHud.textContent = 'X: ' + newLeft + 'px  Y: ' + newTop + 'px';
      }

      const hudBadge = document.getElementById('hud-badge-' + freeformElementId);
      if (hudBadge) {
        hudBadge.textContent = 'X:' + newLeft + ' Y:' + newTop;
      }

      const inpX = document.getElementById('prop-x-input');
      const inpY = document.getElementById('prop-y-input');
      if (inpX) inpX.value = newLeft;
      if (inpY) inpY.value = newTop;
    }

    function handleFreeformPointerUp(e) {
      if (!isFreeformMoving) return;
      isFreeformMoving = false;

      window.removeEventListener('pointermove', handleFreeformPointerMove);
      window.removeEventListener('pointerup', handleFreeformPointerUp);
      window.removeEventListener('pointercancel', handleFreeformPointerUp);
      document.body.classList.remove('is-dragging-element');

      const el = placedElements.find(item => item.id === freeformElementId);
      const box = document.getElementById(freeformElementId);

      if (box) {
        box.classList.remove('is-freeform-moving');
        try {
          box.releasePointerCapture(e.pointerId);
        } catch (err) {}
      }

      if (el && box) {
        box.style.zIndex = (el.layout && el.layout.zIndex) ? el.layout.zIndex : '1';

        const finalX = parseInt(box.style.left, 10) || 0;
        const finalY = parseInt(box.style.top, 10) || 0;

        if (!el.layout) el.layout = {};
        el.layout.x = finalX;
        el.layout.y = finalY;

        renderInspector();
      }
      freeformElementId = null;
    }

    // =========================================================================
    // FIGMA-STYLE ON-CANVAS RESIZE ENGINE
    // =========================================================================
    let isResizing = false;
    let resizeHandleType = null;
    let resizeStartRect = null;
    let resizeStartX = 0;
    let resizeStartY = 0;
    let resizeElementId = null;

    function handleResizePointerDown(e, handleEl) {
      e.preventDefault();
      e.stopPropagation();

      const elId = selectedElementId;
      if (!elId) return;

      const box = document.getElementById(elId);
      if (!box) return;

      isResizing = true;
      resizeElementId = elId;
      resizeHandleType = handleEl.dataset.handle || 'se';
      resizeStartRect = box.getBoundingClientRect();
      resizeStartX = e.clientX;
      resizeStartY = e.clientY;

      document.body.classList.add('is-resizing');

      let hud = document.getElementById('figma-dimension-hud');
      if (!hud) {
        hud = document.createElement('div');
        hud.id = 'figma-dimension-hud';
        hud.className = 'figma-dimension-hud';
        document.body.appendChild(hud);
      }
      hud.textContent = Math.round(resizeStartRect.width) + ' × ' + Math.round(resizeStartRect.height) + ' px';
      hud.style.left = (resizeStartRect.left + resizeStartRect.width / 2) + 'px';
      hud.style.top = (resizeStartRect.bottom + 12) + 'px';
      hud.style.display = 'block';

      window.addEventListener('pointermove', handleResizePointerMove);
      window.addEventListener('pointerup', handleResizePointerUp);
    }

    function handleResizePointerMove(e) {
      if (!isResizing || !resizeElementId) return;

      const box = document.getElementById(resizeElementId);
      if (!box) return;

      const deltaX = e.clientX - resizeStartX;
      const deltaY = e.clientY - resizeStartY;

      let newWidth = resizeStartRect.width;
      let newHeight = resizeStartRect.height;

      if (resizeHandleType.includes('e')) {
        newWidth = resizeStartRect.width + deltaX;
      } else if (resizeHandleType.includes('w')) {
        newWidth = resizeStartRect.width - deltaX;
      }

      if (resizeHandleType.includes('s')) {
        newHeight = resizeStartRect.height + deltaY;
      } else if (resizeHandleType.includes('n')) {
        newHeight = resizeStartRect.height - deltaY;
      }

      if (snapToGrid) {
        newWidth = Math.round(newWidth / 8) * 8;
        newHeight = Math.round(newHeight / 8) * 8;
      }

      newWidth = Math.max(48, newWidth);
      newHeight = Math.max(28, newHeight);

      if (resizeHandleType.includes('e') || resizeHandleType.includes('w')) {
        box.style.width = Math.round(newWidth) + 'px';
        box.style.flex = '0 0 ' + Math.round(newWidth) + 'px';
        box.style.maxWidth = Math.round(newWidth) + 'px';
      }

      if (resizeHandleType.includes('s') || resizeHandleType.includes('n')) {
        box.style.minHeight = Math.round(newHeight) + 'px';
        box.style.height = Math.round(newHeight) + 'px';
      }

      const hud = document.getElementById('figma-dimension-hud');
      if (hud) {
        hud.textContent = Math.round(newWidth) + ' × ' + Math.round(newHeight) + ' px';
        const curBoxRect = box.getBoundingClientRect();
        hud.style.left = (curBoxRect.left + curBoxRect.width / 2) + 'px';
        hud.style.top = (curBoxRect.bottom + 12) + 'px';
      }
    }

    function handleResizePointerUp(e) {
      if (!isResizing) return;
      isResizing = false;

      window.removeEventListener('pointermove', handleResizePointerMove);
      window.removeEventListener('pointerup', handleResizePointerUp);
      document.body.classList.remove('is-resizing');

      const hud = document.getElementById('figma-dimension-hud');
      if (hud) hud.style.display = 'none';

      const el = placedElements.find(item => item.id === resizeElementId);
      const box = document.getElementById(resizeElementId);

      if (el && box) {
        const finalRect = box.getBoundingClientRect();
        const finalW = Math.round(finalRect.width);
        const finalH = Math.round(finalRect.height);

        if (!el.layout) el.layout = {};

        if (resizeHandleType.includes('e') || resizeHandleType.includes('w')) {
          el.layout.width = 'custom';
          el.layout.customWidth = finalW + 'px';
        }

        if (resizeHandleType.includes('s') || resizeHandleType.includes('n')) {
          el.layout.height = 'custom';
          el.layout.customHeight = finalH + 'px';
        }

        renderArtboard();
        renderInspector();
        showToast('Resized to ' + finalW + 'px × ' + finalH + 'px');
      }
    }

    function handleCanvasDragOver(e) {
      e.preventDefault();
      e.stopPropagation();
      try { e.dataTransfer.dropEffect = 'copy'; } catch (err) {}
      const body = document.getElementById('artboard-body');
      if (body) body.classList.add('drag-over');
    }

    function handleCanvasDragLeave(e) {
      const body = document.getElementById('artboard-body');
      if (body && (!e.relatedTarget || !body.contains(e.relatedTarget))) {
        body.classList.remove('drag-over');
      }
    }

    function handleCanvasDrop(e) {
      e.preventDefault();
      e.stopPropagation();
      const body = document.getElementById('artboard-body');
      if (body) body.classList.remove('drag-over');
      const catId = e.dataTransfer.getData('application/x-component-id') || e.dataTransfer.getData('text/plain');
      if (catId) {
        const rect = body ? body.getBoundingClientRect() : { left: 0, top: 0, width: 1120 };
        let dropX = Math.round(e.clientX - rect.left - 40);
        let dropY = Math.round(e.clientY - rect.top - 20);
        if (snapToGrid) {
          dropX = Math.round(dropX / 8) * 8;
          dropY = Math.round(dropY / 8) * 8;
        }
        dropX = Math.max(0, Math.min(Math.round(rect.width - 60), dropX));
        dropY = Math.max(0, dropY);
        addElementToCanvas(catId, { x: dropX, y: dropY });
        const def = CATALOG.find(c => c.id === catId);
        if (def) showToast('Placed ' + def.name + ' on Canvas at X:' + dropX + ' Y:' + dropY);
      }
    }

    function clearCanvas() {
      placedElements = [];
      selectedElementId = null;
      renderArtboard();
      renderInspector();
      if (activeLeftTab === 'layers') renderLayersTree();
      showToast('Canvas cleared');
    }

    // Viewports
    function setViewportMode(mode) {
      const board = document.getElementById('artboard-frame');
      const dim = document.getElementById('artboard-dim-text');
      document.querySelectorAll('.tool-btn').forEach(b => b.classList.remove('active'));

      if (board) board.className = 'figma-artboard vp-' + mode;

      if (mode === 'wide') {
        const btnW = document.getElementById('btn-vp-wide');
        if (btnW) btnW.classList.add('active');
        if (dim) dim.textContent = '1440 × Auto';
      } else if (mode === 'desktop') {
        const btnD = document.getElementById('btn-vp-desktop');
        if (btnD) btnD.classList.add('active');
        if (dim) dim.textContent = '1120 × Auto';
      } else if (mode === 'tablet') {
        const btnT = document.getElementById('btn-vp-tablet');
        if (btnT) btnT.classList.add('active');
        if (dim) dim.textContent = '768 × Auto';
      } else if (mode === 'mobile') {
        const btnM = document.getElementById('btn-vp-mobile');
        if (btnM) btnM.classList.add('active');
        if (dim) dim.textContent = '375 × Auto';
      }
    }

    function loadCanvasTemplate(type) {
      clearCanvas();
      if (type === 'genai') {
        addElementToCanvas('alert', { x: 40, y: 40, width: '720px' });
        addElementToCanvas('reasoning-accordion', { x: 40, y: 130, width: '720px' });
        addElementToCanvas('prompt-composer', { x: 40, y: 320, width: '720px' });
        addElementToCanvas('button', { x: 40, y: 470, width: 'auto' });
        addElementToCanvas('button', { x: 220, y: 470, width: 'auto' });
      } else if (type === 'form') {
        addElementToCanvas('breadcrumbs', { x: 40, y: 40, width: '720px' });
        addElementToCanvas('text-input', { x: 40, y: 110, width: '340px' });
        addElementToCanvas('text-input', { x: 420, y: 110, width: '340px' });
        addElementToCanvas('select', { x: 40, y: 200, width: '340px' });
        addElementToCanvas('text-input', { x: 420, y: 200, width: '340px' });
        addElementToCanvas('toggle', { x: 40, y: 290, width: '340px' });
        addElementToCanvas('button', { x: 40, y: 360, width: 'auto' });
        addElementToCanvas('button', { x: 200, y: 360, width: 'auto' });
      } else if (type === 'dashboard') {
        addElementToCanvas('kpi-card', { x: 40, y: 40, width: '320px' });
        addElementToCanvas('stat-card', { x: 390, y: 40, width: '320px' });
        addElementToCanvas('metric-tile', { x: 740, y: 40, width: '320px' });
        addElementToCanvas('data-table', { x: 40, y: 200, width: '1020px' });
        addElementToCanvas('button', { x: 40, y: 560, width: 'auto' });
        addElementToCanvas('button', { x: 200, y: 560, width: 'auto' });
      }
    }

    // =========================================================================
    // DEDICATED COMPONENT STUDIO (112 MASTER COMPONENT CANVAS)
    // =========================================================================
        // =========================================================================
    // CUSTOM COMPONENT MODAL HANDLERS
    // =========================================================================
    function openNewComponentModal() {
      const modal = document.getElementById('new-comp-modal');
      if (modal) modal.style.display = 'flex';
      if (window.lucide && typeof lucide.createIcons === 'function') lucide.createIcons();
    }

    function closeNewComponentModal() {
      const modal = document.getElementById('new-comp-modal');
      if (modal) modal.style.display = 'none';
    }

    function closeNewCompModalBackdrop(e) {
      if (e.target && e.target.id === 'new-comp-modal') {
        closeNewComponentModal();
      }
    }

    function saveNewComponent() {
      const name = (document.getElementById('new-comp-name')?.value || '').trim();
      if (!name) {
        showToast('Please enter a component name');
        return;
      }
      const cat = document.getElementById('new-comp-cat')?.value || 'Custom Elements';
      const icon = document.getElementById('new-comp-icon')?.value || 'star';
      const desc = (document.getElementById('new-comp-desc')?.value || '').trim() || 'Custom component';
      const rawHtml = (document.getElementById('new-comp-html')?.value || '').trim() || ('<div style="padding:10px 18px; background:#EFF6FF; border:1px solid #93C5FD; border-radius:6px; font-size:13px; font-weight:600; color:#1E40AF;">' + name + '</div>');

      const id = 'custom-' + name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
      const newDef = {
        id,
        num: 'CUSTOM',
        name,
        category: cat,
        icon,
        aliases: [],
        importName: name.replace(/[^a-zA-Z0-9]/g, ''),
        desc,
        device: 'Desktop / Mobile',
        api: '<' + name.replace(/[^a-zA-Z0-9]/g, '') + ' />',
        defaultProps: { label: name },
        defaultAtoms: {},
        render: () => rawHtml,
        toJsx: () => '<' + name.replace(/[^a-zA-Z0-9]/g, '') + ' />'
      };

      CATALOG.unshift(newDef);

      try {
        const saved = JSON.parse(localStorage.getItem('hsb_custom_canvas_components') || '[]');
        saved.push({ id, name, category: cat, icon, desc, html: rawHtml });
        localStorage.setItem('hsb_custom_canvas_components', JSON.stringify(saved));
      } catch (e) {}

      closeNewComponentModal();
      renderPalette();
      if (activeStudioWorkspace === 'page') {
        addElementToCanvas(id);
      } else {
        selectMasterComponent(id);
      }
      showToast('✓ Custom component "' + name + '" created!');
    }

    // =========================================================================
    // DEDICATED COMPONENT STUDIO (112 MASTER COMPONENT FIGMA CANVAS)
    // =========================================================================
    function selectMasterComponent(id) {
      activeMasterComponentId = id;
      const def = CATALOG.find(c => c.id === id);
      activeMasterComponentAtoms = def && def.defaultAtoms ? { ...def.defaultAtoms } : {};
      activeMasterComponentState = 'default';
      activeMasterComponentCustomWidth = '';
      activeMasterComponentCustomHeight = '';
      activeMasterComponentX = null;
      activeMasterComponentY = null;
      renderComponentStudio();
      renderInspector();
    }

    function setMasterComponentState(st) {
      activeMasterComponentState = st;
      const pills = document.querySelectorAll('#comp-state-pills .seg-btn');
      pills.forEach(p => {
        p.classList.toggle('active', p.dataset.state === st);
      });
      renderMasterComponentStage();
    }

    function setCompStudioZoom(z) {
      activeMasterComponentZoom = z;
      const z100 = document.getElementById('btn-comp-zoom-100');
      const z150 = document.getElementById('btn-comp-zoom-150');
      const z200 = document.getElementById('btn-comp-zoom-200');
      if (z100) z100.classList.toggle('active', z === 1);
      if (z150) z150.classList.toggle('active', z === 1.5);
      if (z200) z200.classList.toggle('active', z === 2);
      renderMasterComponentStage();
    }

    function toggleCompStudioBg() {
      if (activeMasterComponentBg === 'white') activeMasterComponentBg = 'grid';
      else if (activeMasterComponentBg === 'grid') activeMasterComponentBg = 'dark';
      else activeMasterComponentBg = 'white';
      renderMasterComponentStage();
    }

    function toggleCompStatesMatrixStrip() {
      isStatesMatrixOpen = !isStatesMatrixOpen;
      const drawer = document.getElementById('comp-states-drawer');
      const chevron = document.getElementById('drawer-chevron-icon');
      if (drawer) drawer.classList.toggle('expanded', isStatesMatrixOpen);
      if (chevron) {
        chevron.style.transform = isStatesMatrixOpen ? 'rotate(180deg)' : 'rotate(0deg)';
      }
    }

    function renderComponentStudio() {
      const def = CATALOG.find(c => c.id === activeMasterComponentId) || CATALOG[0];
      if (!def) return;

      const header = document.getElementById('comp-studio-header');
      if (header) {
        header.innerHTML = '<div class="comp-studio-info">' +
          '<h2><i data-lucide="' + (def.icon || 'box') + '" style="width:20px;height:20px;color:var(--brand-primary);"></i> ' + def.num + '. ' + def.name + '</h2>' +
          '<p>' + def.desc + ' &bull; <span class="atomic-pill-badge">' + def.category + '</span></p>' +
        '</div>' +
        '<div style="display:flex; gap:8px; align-items:center;">' +
          '<button class="btn-topbar primary" id="btn-sync-source" onclick="syncMasterComponentToSourceCode()" title="Save changes directly to source code on disk and rebuild design system" style="background:#16A34A; border-color:#16A34A; color:white; font-weight:600;">' +
            '<i data-lucide="save" style="width:14px;height:14px;"></i> Sync to Source Code' +
          '</button>' +
          '<button class="btn-topbar" onclick="insertMasterComponentToPage()" title="Insert this customized component into the Page Studio Canvas">' +
            '<i data-lucide="plus-circle" style="width:14px;height:14px;"></i> Insert into Page Studio' +
          '</button>' +
          '<button class="btn-topbar" onclick="copyMasterComponentTsx()" title="Copy Component TSX">' +
            '<i data-lucide="copy" style="width:14px;height:14px;"></i> Copy TSX' +
          '</button>' +
        '</div>';
      }

      // Update state pills
      const pills = document.querySelectorAll('#comp-state-pills .seg-btn');
      pills.forEach(p => {
        p.classList.toggle('active', p.dataset.state === activeMasterComponentState);
      });

      renderMasterComponentStage();
      renderCompStatesDrawer();

      if (window.lucide && typeof lucide.createIcons === 'function') {
        lucide.createIcons();
      }
    }

    function renderMasterComponentStage() {
      const def = CATALOG.find(c => c.id === activeMasterComponentId) || CATALOG[0];
      const stage = document.getElementById('master-component-stage');
      if (!stage || !def) return;

      const props = { ...def.defaultProps };
      if (activeMasterComponentVariant) props.variant = activeMasterComponentVariant;

      const atoms = { ...(activeMasterComponentAtoms || {}) };
      let stateStyles = '';
      let stateAtoms = { ...atoms };

      if (activeMasterComponentState === 'hover') {
        stateAtoms.boxShadow = stateAtoms.boxShadow || 'lg';
        stateStyles = 'transform: translateY(-1px);';
      } else if (activeMasterComponentState === 'active') {
        stateStyles = 'transform: scale(0.97);';
      } else if (activeMasterComponentState === 'focus') {
        stateAtoms.boxShadow = 'glow';
        stateStyles = 'outline: 2px solid var(--brand-primary); outline-offset: 2px; border-radius: 6px;';
      } else if (activeMasterComponentState === 'disabled') {
        stateStyles = 'opacity: 0.4; filter: grayscale(50%); pointer-events: none;';
      } else if (activeMasterComponentState === 'loading') {
        stateAtoms.icon = 'loader-2';
      }

      const renderedHtml = applyAtomicStyles(def.render(props), stateAtoms);
      const bgClass = activeMasterComponentBg === 'dark' ? 'bg-dark' : activeMasterComponentBg === 'grid' ? 'bg-dot-grid' : '';

      const isCustomPos = (activeMasterComponentX !== null && activeMasterComponentY !== null);
      const posStyles = isCustomPos
        ? ('position:absolute; left:' + activeMasterComponentX + 'px; top:' + activeMasterComponentY + 'px; margin:0;')
        : '';
      const posLabel = isCustomPos
        ? ('X:' + activeMasterComponentX + ' Y:' + activeMasterComponentY)
        : 'Centered';

      stage.innerHTML = '<div class="master-canvas-frame" style="transform: scale(' + activeMasterComponentZoom + '); transform-origin: center center;">' +
        '<div class="master-component-badge">' +
          '<div style="display:flex; align-items:center; gap:6px;">' +
            '<i data-lucide="component" style="width:14px;height:14px;"></i>' +
            '<span>❖ Master Component: ' + def.num + '. ' + def.name + '</span>' +
            '<span class="master-pos-badge" id="master-pos-badge">' + posLabel + '</span>' +
          '</div>' +
          '<div style="display:flex; align-items:center; gap:8px;">' +
            '<span class="active-state-indicator">State: <b>' + activeMasterComponentState.toUpperCase() + '</b></span>' +
          '</div>' +
        '</div>' +
        '<div class="master-stage-inner ' + bgClass + (isCustomPos ? ' is-custom-placed' : '') + '" id="master-stage-inner">' +
          '<div class="master-element-box" id="master-element-box" ' +
               'onpointerdown="handleMasterFreeformPointerDown(event)" ' +
               'style="width:' + (activeMasterComponentCustomWidth || 'auto') + '; height:' + (activeMasterComponentCustomHeight || 'auto') + ';' + posStyles + stateStyles + '">' +
            
            // Quick Action Toolbar on Component
            '<div class="master-canvas-quick-bar" onclick="event.stopPropagation()">' +
              '<button class="quick-pill" onclick="quickEditLabel()" title="Click to edit component label">' +
                '<i data-lucide="edit-3" style="width:11px;height:11px;"></i> Edit Label' +
              '</button>' +
              '<button class="quick-pill" onclick="cycleCornerRadius()" title="Click to cycle corner radius">' +
                '<i data-lucide="corner-up-right" style="width:11px;height:11px;"></i> Radius: ' + (atoms.borderRadius || 'Default') +
              '</button>' +
              '<button class="quick-pill" onclick="openQuickIconPicker(event)" title="Click to swap icon">' +
                '<i data-lucide="sparkles" style="width:11px;height:11px;"></i> Icon: ' + (atoms.icon || 'Default') +
              '</button>' +
              '<button class="quick-pill" onclick="centerMasterComponent()" title="Center component on stage">' +
                '<i data-lucide="crosshair" style="width:11px;height:11px;"></i> Center' +
              '</button>' +
              '<button class="quick-pill" onclick="resetMasterAtoms()" title="Reset visual styles">' +
                '<i data-lucide="rotate-ccw" style="width:11px;height:11px;"></i> Reset' +
              '</button>' +
            '</div>' +

            // Component HTML
            '<div id="master-rendered-content" ondblclick="quickEditLabel()">' +
              renderedHtml +
            '</div>' +

            // 8 Figma Resize Handles
            '<div class="figma-resize-handle handle-nw master-handle" data-handle="nw" onpointerdown="handleMasterResizePointerDown(event, this.dataset.handle)"></div>' +
            '<div class="figma-resize-handle handle-n  master-handle" data-handle="n"  onpointerdown="handleMasterResizePointerDown(event, this.dataset.handle)"></div>' +
            '<div class="figma-resize-handle handle-ne master-handle" data-handle="ne" onpointerdown="handleMasterResizePointerDown(event, this.dataset.handle)"></div>' +
            '<div class="figma-resize-handle handle-e  master-handle" data-handle="e"  onpointerdown="handleMasterResizePointerDown(event, this.dataset.handle)"></div>' +
            '<div class="figma-resize-handle handle-se master-handle" data-handle="se" onpointerdown="handleMasterResizePointerDown(event, this.dataset.handle)"></div>' +
            '<div class="figma-resize-handle handle-s  master-handle" data-handle="s"  onpointerdown="handleMasterResizePointerDown(event, this.dataset.handle)"></div>' +
            '<div class="figma-resize-handle handle-sw master-handle" data-handle="sw" onpointerdown="handleMasterResizePointerDown(event, this.dataset.handle)"></div>' +
            '<div class="figma-resize-handle handle-w  master-handle" data-handle="w"  onpointerdown="handleMasterResizePointerDown(event, this.dataset.handle)"></div>' +

          '</div>' +
        '</div>' +
      '</div>';

      if (window.lucide && typeof lucide.createIcons === 'function') {
        lucide.createIcons();
      }
    }

    function renderCompStatesDrawer() {
      const def = CATALOG.find(c => c.id === activeMasterComponentId) || CATALOG[0];
      const grid = document.getElementById('comp-states-grid');
      if (!grid || !def) return;

      const props = { ...def.defaultProps };
      if (activeMasterComponentVariant) props.variant = activeMasterComponentVariant;

      const defaultHtml = applyAtomicStyles(def.render(props), activeMasterComponentAtoms);
      const hoverHtml = applyAtomicStyles(def.render(props), { ...activeMasterComponentAtoms, boxShadow: 'lg' });
      const activeHtml = '<div style="transform:scale(0.97);">' + defaultHtml + '</div>';
      const focusHtml = '<div style="outline:2px solid var(--brand-primary); outline-offset:2px; border-radius:6px;">' + applyAtomicStyles(def.render(props), { ...activeMasterComponentAtoms, boxShadow: 'glow' }) + '</div>';
      const disabledHtml = '<div style="opacity:0.4; filter:grayscale(50%);">' + defaultHtml + '</div>';
      const loadingHtml = applyAtomicStyles(def.render(props), { ...activeMasterComponentAtoms, icon: 'loader-2' });

      grid.innerHTML = '<div class="state-card ' + (activeMasterComponentState === 'default' ? 'active' : '') + '" data-state="default" onclick="setMasterComponentState(this.dataset.state)">' +
          '<div class="state-card-header"><span class="state-title">1. Default</span><span class="atomic-pill-badge">Base</span></div>' +
          '<div class="state-preview-box">' + defaultHtml + '</div>' +
        '</div>' +
        '<div class="state-card ' + (activeMasterComponentState === 'hover' ? 'active' : '') + '" data-state="hover" onclick="setMasterComponentState(this.dataset.state)">' +
          '<div class="state-card-header"><span class="state-title">2. Hover</span><span class="atomic-pill-badge">Shadow</span></div>' +
          '<div class="state-preview-box">' + hoverHtml + '</div>' +
        '</div>' +
        '<div class="state-card ' + (activeMasterComponentState === 'active' ? 'active' : '') + '" data-state="active" onclick="setMasterComponentState(this.dataset.state)">' +
          '<div class="state-card-header"><span class="state-title">3. Active</span><span class="atomic-pill-badge">Scale -3%</span></div>' +
          '<div class="state-preview-box">' + activeHtml + '</div>' +
        '</div>' +
        '<div class="state-card ' + (activeMasterComponentState === 'focus' ? 'active' : '') + '" data-state="focus" onclick="setMasterComponentState(this.dataset.state)">' +
          '<div class="state-card-header"><span class="state-title">4. Focused</span><span class="atomic-pill-badge">Ring</span></div>' +
          '<div class="state-preview-box">' + focusHtml + '</div>' +
        '</div>' +
        '<div class="state-card ' + (activeMasterComponentState === 'disabled' ? 'active' : '') + '" data-state="disabled" onclick="setMasterComponentState(this.dataset.state)">' +
          '<div class="state-card-header"><span class="state-title">5. Disabled</span><span class="atomic-pill-badge">Opacity</span></div>' +
          '<div class="state-preview-box">' + disabledHtml + '</div>' +
        '</div>' +
        '<div class="state-card ' + (activeMasterComponentState === 'loading' ? 'active' : '') + '" data-state="loading" onclick="setMasterComponentState(this.dataset.state)">' +
          '<div class="state-card-header"><span class="state-title">6. Loading</span><span class="atomic-pill-badge">Spin</span></div>' +
          '<div class="state-preview-box">' + loadingHtml + '</div>' +
        '</div>';
    }

    function quickEditLabel() {
      const def = CATALOG.find(c => c.id === activeMasterComponentId);
      if (!def) return;
      const current = def.defaultProps?.label || def.name;
      const newLabel = prompt('Edit Component Label:', current);
      if (newLabel !== null && newLabel.trim()) {
        def.defaultProps.label = newLabel.trim();
        renderComponentStudio();
        renderInspector();
        showToast('Updated label: ' + newLabel.trim());
      }
    }

    function cycleCornerRadius() {
      const radList = ['', '0px', '4px', '8px', '12px', '16px', '9999px'];
      const cur = activeMasterComponentAtoms.borderRadius || '';
      const nextIdx = (radList.indexOf(cur) + 1) % radList.length;
      updateSelectedAtom('borderRadius', radList[nextIdx]);
      showToast('Corner Radius: ' + (radList[nextIdx] || 'Default'));
    }

    function openQuickIconPicker(e) {
      if (e) e.stopPropagation();
      let popover = document.getElementById('quick-icon-popover');
      if (popover) {
        popover.remove();
        return;
      }

      const icons = ['search', 'sparkles', 'filter', 'plus', 'check', 'play', 'arrow-right', 'star', 'settings', 'bell', 'mail', 'user'];
      popover = document.createElement('div');
      popover.id = 'quick-icon-popover';
      popover.className = 'quick-icon-popover';

      icons.forEach(ic => {
        const btn = document.createElement('button');
        btn.className = 'icon-opt-btn';
        btn.title = ic;
        btn.innerHTML = '<i data-lucide="' + ic + '" style="width:14px;height:14px;"></i>';
        btn.onclick = (evt) => {
          evt.stopPropagation();
          updateSelectedAtom('icon', ic);
          popover.remove();
          showToast('Updated icon: ' + ic);
        };
        popover.appendChild(btn);
      });

      const box = document.getElementById('master-element-box');
      if (box) {
        box.appendChild(popover);
        if (window.lucide && typeof lucide.createIcons === 'function') {
          lucide.createIcons();
        }
      }
    }

    function closeQuickIconPicker() {
      const popover = document.getElementById('quick-icon-popover');
      if (popover) popover.remove();
    }

    function resetMasterAtoms() {
      activeMasterComponentAtoms = {};
      activeMasterComponentCustomWidth = '';
      activeMasterComponentCustomHeight = '';
      activeMasterComponentX = null;
      activeMasterComponentY = null;
      renderComponentStudio();
      renderInspector();
      showToast('Reset component atoms to stock defaults');
    }

    function resolveMasterBoxAbsolutePosition(box) {
      if (!box) return;
      if (activeMasterComponentX === null || activeMasterComponentY === null) {
        const stageInner = document.getElementById('master-stage-inner');
        const stageRect = stageInner ? stageInner.getBoundingClientRect() : { left: 0, top: 0 };
        const boxRect = box.getBoundingClientRect();
        activeMasterComponentX = Math.round(boxRect.left - stageRect.left);
        activeMasterComponentY = Math.round(boxRect.top - stageRect.top);
      }
      box.style.position = 'absolute';
      box.style.left = activeMasterComponentX + 'px';
      box.style.top = activeMasterComponentY + 'px';
      box.style.margin = '0';
      box.style.transform = 'none';
      const stageInner = document.getElementById('master-stage-inner');
      if (stageInner) stageInner.classList.add('is-custom-placed');
    }

    function centerMasterComponent() {
      activeMasterComponentX = null;
      activeMasterComponentY = null;
      activeMasterComponentCustomWidth = '';
      activeMasterComponentCustomHeight = '';
      const stageInner = document.getElementById('master-stage-inner');
      if (stageInner) stageInner.classList.remove('is-custom-placed');
      const box = document.getElementById('master-element-box');
      if (box) {
        box.style.position = 'relative';
        box.style.left = 'auto';
        box.style.top = 'auto';
        box.style.margin = 'auto';
        box.style.transform = 'none';
        box.style.width = 'auto';
        box.style.height = 'auto';
      }
      const hudBadge = document.getElementById('master-pos-badge');
      if (hudBadge) hudBadge.textContent = 'Centered';
      renderInspector();
      showToast('Master component centered on stage');
    }

    // =========================================================================
    // COMPONENT STUDIO FREEFORM DRAGGING
    // =========================================================================
    function handleMasterFreeformPointerDown(e) {
      if (e.target.classList.contains('figma-resize-handle') || e.target.classList.contains('quick-pill')) return;
      if (e.target.closest('.master-canvas-quick-bar') || e.target.closest('#quick-icon-popover')) return;

      const box = document.getElementById('master-element-box');
      if (!box) return;

      e.preventDefault();
      e.stopPropagation();

      resolveMasterBoxAbsolutePosition(box);

      isMasterMoving = true;
      masterMoveStartX = e.clientX;
      masterMoveStartY = e.clientY;
      masterMoveInitialLeft = box.offsetLeft;
      masterMoveInitialTop = box.offsetTop;

      box.classList.add('is-freeform-moving');
      document.body.classList.add('is-dragging-element');

      try {
        box.setPointerCapture(e.pointerId);
      } catch (err) {}

      window.addEventListener('pointermove', handleMasterFreeformPointerMove, { passive: false });
      window.addEventListener('pointerup', handleMasterFreeformPointerUp);
      window.addEventListener('pointercancel', handleMasterFreeformPointerUp);
    }

    function handleMasterFreeformPointerMove(e) {
      if (!isMasterMoving) return;
      e.preventDefault();

      const deltaX = e.clientX - masterMoveStartX;
      const deltaY = e.clientY - masterMoveStartY;

      let newLeft = masterMoveInitialLeft + deltaX;
      let newTop = masterMoveInitialTop + deltaY;

      if (snapToGrid) {
        newLeft = Math.round(newLeft / 8) * 8;
        newTop = Math.round(newTop / 8) * 8;
      }

      newLeft = Math.max(16, newLeft);
      newTop = Math.max(16, newTop);

      activeMasterComponentX = newLeft;
      activeMasterComponentY = newTop;

      const box = document.getElementById('master-element-box');
      if (box) {
        box.style.left = newLeft + 'px';
        box.style.top = newTop + 'px';
      }

      const stageInner = document.getElementById('master-stage-inner');
      if (stageInner && box) {
        const neededHeight = newTop + box.offsetHeight + 60;
        if (neededHeight > stageInner.clientHeight) {
          stageInner.style.minHeight = neededHeight + 'px';
        }
      }

      const hudBadge = document.getElementById('master-pos-badge');
      if (hudBadge) {
        hudBadge.textContent = 'X:' + newLeft + ' Y:' + newTop;
      }
    }

    function handleMasterFreeformPointerUp(e) {
      if (!isMasterMoving) return;
      isMasterMoving = false;

      window.removeEventListener('pointermove', handleMasterFreeformPointerMove);
      window.removeEventListener('pointerup', handleMasterFreeformPointerUp);
      window.removeEventListener('pointercancel', handleMasterFreeformPointerUp);
      document.body.classList.remove('is-dragging-element');

      const box = document.getElementById('master-element-box');
      if (box) {
        box.classList.remove('is-freeform-moving');
        try {
          box.releasePointerCapture(e.pointerId);
        } catch (err) {}
      }
    }

    // =========================================================================
    // COMPONENT STUDIO 8-HANDLE FIGMA RESIZE ENGINE
    // =========================================================================
    function handleMasterResizePointerDown(e, handle) {
      e.preventDefault();
      e.stopPropagation();

      const box = document.getElementById('master-element-box');
      if (!box) return;

      resolveMasterBoxAbsolutePosition(box);

      isMasterResizing = true;
      masterResizeHandle = handle;
      masterResizeStartX = e.clientX;
      masterResizeStartY = e.clientY;
      masterResizeStartRect = {
        left: box.offsetLeft,
        top: box.offsetTop,
        width: box.offsetWidth,
        height: box.offsetHeight
      };

      try {
        e.target.setPointerCapture(e.pointerId);
      } catch (err) {}

      document.body.classList.add('is-resizing');

      let hud = document.getElementById('figma-dimension-hud');
      if (!hud) {
        hud = document.createElement('div');
        hud.id = 'figma-dimension-hud';
        hud.className = 'figma-dimension-hud';
        document.body.appendChild(hud);
      }
      hud.textContent = masterResizeStartRect.width + ' × ' + masterResizeStartRect.height + ' px';
      const bRect = box.getBoundingClientRect();
      hud.style.left = (bRect.left + bRect.width / 2) + 'px';
      hud.style.top = (bRect.bottom + 12) + 'px';
      hud.style.display = 'block';

      window.addEventListener('pointermove', handleMasterResizePointerMove, { passive: false });
      window.addEventListener('pointerup', handleMasterResizePointerUp);
      window.addEventListener('pointercancel', handleMasterResizePointerUp);
    }

    function handleMasterResizePointerMove(e) {
      if (!isMasterResizing || !masterResizeStartRect) return;
      e.preventDefault();

      const deltaX = e.clientX - masterResizeStartX;
      const deltaY = e.clientY - masterResizeStartY;

      let newW = masterResizeStartRect.width;
      let newH = masterResizeStartRect.height;
      let newL = masterResizeStartRect.left;
      let newT = masterResizeStartRect.top;

      if (masterResizeHandle.includes('e')) {
        newW = masterResizeStartRect.width + deltaX;
      } else if (masterResizeHandle.includes('w')) {
        newW = masterResizeStartRect.width - deltaX;
        newL = masterResizeStartRect.left + deltaX;
      }

      if (masterResizeHandle.includes('s')) {
        newH = masterResizeStartRect.height + deltaY;
      } else if (masterResizeHandle.includes('n')) {
        newH = masterResizeStartRect.height - deltaY;
        newT = masterResizeStartRect.top + deltaY;
      }

      if (snapToGrid) {
        newW = Math.round(newW / 8) * 8;
        newH = Math.round(newH / 8) * 8;
        newL = Math.round(newL / 8) * 8;
        newT = Math.round(newT / 8) * 8;
      }

      newW = Math.max(48, newW);
      newH = Math.max(28, newH);

      activeMasterComponentCustomWidth = Math.round(newW) + 'px';
      activeMasterComponentCustomHeight = Math.round(newH) + 'px';
      activeMasterComponentX = Math.round(newL);
      activeMasterComponentY = Math.round(newT);

      const box = document.getElementById('master-element-box');
      if (box) {
        box.style.width = activeMasterComponentCustomWidth;
        box.style.height = activeMasterComponentCustomHeight;
        box.style.left = activeMasterComponentX + 'px';
        box.style.top = activeMasterComponentY + 'px';
      }

      const hud = document.getElementById('figma-dimension-hud');
      if (hud && box) {
        hud.textContent = Math.round(newW) + ' × ' + Math.round(newH) + ' px';
        const bRect = box.getBoundingClientRect();
        hud.style.left = (bRect.left + bRect.width / 2) + 'px';
        hud.style.top = (bRect.bottom + 12) + 'px';
      }
    }

    function handleMasterResizePointerUp(e) {
      if (!isMasterResizing) return;
      isMasterResizing = false;
      document.body.classList.remove('is-resizing');

      window.removeEventListener('pointermove', handleMasterResizePointerMove);
      window.removeEventListener('pointerup', handleMasterResizePointerUp);
      window.removeEventListener('pointercancel', handleMasterResizePointerUp);

      const hud = document.getElementById('figma-dimension-hud');
      if (hud) hud.style.display = 'none';

      try {
        if (e && e.target && e.target.releasePointerCapture) {
          e.target.releasePointerCapture(e.pointerId);
        }
      } catch (err) {}

      renderInspector();
      showToast('Resized to ' + activeMasterComponentCustomWidth + ' × ' + activeMasterComponentCustomHeight);
    }

    function insertMasterComponentToPage() {
      const def = CATALOG.find(c => c.id === activeMasterComponentId);
      if (!def) return;
      addElementToCanvas(def.id, {}, null, { ...activeMasterComponentAtoms });
      switchStudioWorkspace('page');
      showToast('Inserted ' + def.name + ' into Page Studio Canvas');
    }

    function copyMasterComponentTsx() {
      const def = CATALOG.find(c => c.id === activeMasterComponentId);
      if (!def) return;
      const props = { ...def.defaultProps };
      if (activeMasterComponentVariant) props.variant = activeMasterComponentVariant;
      const jsx = def.toJsx(props);
      navigator.clipboard.writeText(jsx).then(() => {
        showToast('Copied ' + def.name + ' TSX to clipboard!');
      });
    }

    async function syncMasterComponentToSourceCode() {
      const def = CATALOG.find(c => c.id === activeMasterComponentId);
      if (!def) return;

      const btn1 = document.getElementById('btn-sync-source');
      const btn2 = document.getElementById('btn-inspector-sync-source');
      const statusBadge = document.getElementById('sync-status-badge');
      const feedbackMsg = document.getElementById('sync-feedback-msg');

      const orig1 = btn1 ? btn1.innerHTML : '';
      const orig2 = btn2 ? btn2.innerHTML : '';

      if (btn1) { btn1.disabled = true; btn1.innerHTML = '<i data-lucide="loader-2" class="spin" style="width:14px;height:14px;"></i> Syncing...'; }
      if (btn2) { btn2.disabled = true; btn2.innerHTML = '<i data-lucide="loader-2" class="spin" style="width:14px;height:14px;"></i> Syncing...'; }
      if (statusBadge) { statusBadge.textContent = 'Syncing...'; statusBadge.style.background = '#FEF3C7'; statusBadge.style.color = '#B45309'; }

      showToast('⚡ Syncing ' + def.name + ' to source code on disk...');

      const payload = {
        componentId: def.id,
        num: def.num,
        name: def.name,
        category: def.category,
        atoms: activeMasterComponentAtoms || {},
        variant: activeMasterComponentVariant || (def.defaultProps ? def.defaultProps.variant : undefined),
        props: def.defaultProps || {}
      };

      try {
        const res = await fetch('/api/save-component', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload)
        });

        if (!res.ok) {
          throw new Error('HTTP ' + res.status + ': ' + res.statusText);
        }

        const result = await res.json();
        if (result.success) {
          def.defaultAtoms = { ...(activeMasterComponentAtoms || {}) };
          showToast('✓ ' + (result.message || 'Saved to disk and rebuilt successfully!'));
          if (statusBadge) {
            statusBadge.textContent = 'Saved to Disk';
            statusBadge.style.background = '#DCFCE7';
            statusBadge.style.color = '#15803D';
          }
          if (feedbackMsg) {
            feedbackMsg.style.display = 'block';
            feedbackMsg.innerHTML = '<span style="color:#15803D; font-weight:600;">✓ Base component updated on disk!</span><br><span style="color:#64748B;">Rebuilt at ' + new Date().toLocaleTimeString() + '</span>';
          }
        } else {
          throw new Error(result.error || 'Failed to sync');
        }
      } catch (err) {
        console.warn('Direct HTTP server sync unavailable:', err);
        openSyncInfoModal();
      } finally {
        if (btn1) { btn1.disabled = false; btn1.innerHTML = orig1; }
        if (btn2) { btn2.disabled = false; btn2.innerHTML = orig2; }
        if (window.lucide && typeof lucide.createIcons === 'function') {
          lucide.createIcons();
        }
      }
    }

    function openSyncInfoModal() {
      const modal = document.getElementById('sync-info-modal');
      if (modal) modal.style.display = 'flex';
      if (window.lucide && typeof lucide.createIcons === 'function') lucide.createIcons();
    }

    function closeSyncInfoModal() {
      const modal = document.getElementById('sync-info-modal');
      if (modal) modal.style.display = 'none';
    }

    function closeSyncInfoModalBackdrop(e) {
      if (e.target && e.target.id === 'sync-info-modal') {
        closeSyncInfoModal();
      }
    }

    function downloadActiveComponentPatch() {
      const def = CATALOG.find(c => c.id === activeMasterComponentId);
      if (!def) return;
      const payload = {
        componentId: def.id,
        num: def.num,
        name: def.name,
        category: def.category,
        atoms: activeMasterComponentAtoms || {},
        variant: activeMasterComponentVariant || (def.defaultProps ? def.defaultProps.variant : undefined),
        props: def.defaultProps || {},
        exportedAt: new Date().toISOString()
      };
      const blob = new Blob([JSON.stringify(payload, null, 2)], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = (def.id || 'component') + '-patch.json';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      showToast('Downloaded ' + def.name + ' JSON patch');
    }

    async function directWorkspaceFolderWrite() {
      if (!window.showDirectoryPicker) {
        showToast('File System Access API is not supported in this browser. Please run npm run ui in terminal.');
        return;
      }
      const def = CATALOG.find(c => c.id === activeMasterComponentId);
      if (!def) return;
      try {
        const dirHandle = await window.showDirectoryPicker();
        const tokensHandle = await dirHandle.getDirectoryHandle('tokens', { create: true });
        const fileHandle = await tokensHandle.getFileHandle('component-customizations.json', { create: true });
        
        let currentData = {};
        try {
          const file = await fileHandle.getFile();
          const text = await file.text();
          currentData = JSON.parse(text || '{}');
        } catch (e) {}

        currentData[def.id] = {
          componentId: def.id,
          num: def.num,
          name: def.name,
          category: def.category,
          atoms: activeMasterComponentAtoms || {},
          variant: activeMasterComponentVariant || (def.defaultProps ? def.defaultProps.variant : undefined),
          props: def.defaultProps || {},
          updatedAt: new Date().toISOString()
        };

        const writable = await fileHandle.createWritable();
        await writable.write(JSON.stringify(currentData, null, 2));
        await writable.close();

        def.defaultAtoms = { ...(activeMasterComponentAtoms || {}) };
        showToast('✓ Successfully written directly to tokens/component-customizations.json!');
        closeSyncInfoModal();
      } catch (err) {
        if (err.name !== 'AbortError') {
          console.error('Workspace write failed:', err);
          showToast('Workspace write failed: ' + err.message);
        }
      }
    }

    // =========================================================================
    // RIGHT PANEL: FIGMA INSPECTOR & ATOMIC SUB-LAYER DESIGNER
    // =========================================================================
    function switchRightTab(tab) {
      activeRightTab = tab;
      document.getElementById('tab-design').classList.toggle('active', tab === 'design');
      document.getElementById('tab-brand').classList.toggle('active', tab === 'brand');
      renderInspector();
    }

    function switchAtomTab(tab) {
      activeAtomTab = tab;
      renderInspector();
    }

    function renderInspector() {
      const container = document.getElementById('inspector-content');
      container.innerHTML = '';

      if (activeRightTab === 'brand') {
        renderBrandCustomizer(container);
        return;
      }

      // If in Component Studio: Render Master Component Atomic Inspector
      if (activeStudioWorkspace === 'component') {
        renderComponentStudioInspector(container);
        return;
      }

      // In Page Studio:
      const selected = placedElements.find(e => e.id === selectedElementId);

      if (!selected) {
        // Nothing selected: show Canvas & Artboard settings
        const pageTitle = document.getElementById('page-name-input').value || 'Untitled Page';
        container.innerHTML = '<div class="inspector-section">' +
          '<div class="inspector-section-title">' +
            '<span>Page Frame Settings</span>' +
            '<span style="font-size:10px; color:var(--brand-primary); font-family:monospace;">Canvas</span>' +
          '</div>' +
          '<div class="control-row">' +
            '<label class="control-label">Page Title</label>' +
            '<input type="text" class="text-field" value="' + pageTitle + '" oninput="updatePageTitle(this.value)">' +
          '</div>' +
          '<div class="control-row">' +
            '<label class="control-label">Placement Mode</label>' +
            '<select class="select-dropdown" onchange="setCanvasPlacementMode(this.value)">' +
              '<option value="freeform" ' + (canvasPlacementMode === 'freeform' ? 'selected' : '') + '>Freeform X/Y (Figma Canvas - Drag Anywhere)</option>' +
              '<option value="flow" ' + (canvasPlacementMode === 'flow' ? 'selected' : '') + '>Auto Flow (Flex Wrap Multi-Column)</option>' +
            '</select>' +
          '</div>' +
          '<div class="control-row">' +
            '<label class="control-label">Canvas Background</label>' +
            '<div class="color-picker-group">' +
              '<input type="color" class="color-swatch-input" value="' + canvasBgColor + '" oninput="setCanvasBg(this.value)">' +
              '<input type="text" class="text-field" value="' + canvasBgColor + '" readonly>' +
            '</div>' +
          '</div>' +
        '</div>' +
        '<div class="inspector-section">' +
          '<div class="inspector-section-title">' +
            '<span>Canvas Elements (' + placedElements.length + ')</span>' +
          '</div>' +
          '<p style="font-size:11px; color:var(--figma-text-muted); line-height:1.5;">' +
            'Click any component on the canvas to inspect and customize its exact X/Y position, size, atoms (border, icon, text), variants, and props.' +
          '</p>' +
          '<div style="margin-top:10px; display:flex; gap:6px;">' +
            '<button class="btn-topbar" style="flex:1; justify-content:center; font-size:11px;" onclick="openPageExportModal()">' +
              '<i data-lucide="code" style="width:12px;height:12px;"></i> Export JSX' +
            '</button>' +
            '<button class="btn-topbar" style="justify-content:center; font-size:11px; color:#EF4444;" onclick="clearCanvas()">' +
              '<i data-lucide="trash-2" style="width:12px;height:12px;"></i> Clear' +
            '</button>' +
          '</div>' +
        '</div>';

        if (window.lucide && typeof lucide.createIcons === 'function') lucide.createIcons();
        return;
      }

      // Placed Component Selected: Render Layout + Atomic Sub-Layers Inspector
      const def = selected.definition;
      const props = selected.props;
      const l = selected.layout || {};
      const atoms = selected.atoms || {};

      // 1. FRAME & POSITION (X, Y, W, H)
      const frameSec = document.createElement('div');
      frameSec.className = 'inspector-section';

      let frameControls = '<div class="inspector-section-title">' +
        '<span>Position & Sizing</span>' +
        '<span style="font-size:10px; color:var(--brand-primary); font-family:monospace;">Frame</span>' +
      '</div>';

      if (canvasPlacementMode === 'freeform') {
        frameControls += '<div style="display:flex; gap:10px; margin-bottom:8px;">' +
          '<div style="flex:1;">' +
            '<label class="control-label">X Position</label>' +
            '<input type="number" class="text-field" id="prop-x-input" value="' + (l.x || 0) + '" step="8" oninput="updateLayoutX(this.value)">' +
          '</div>' +
          '<div style="flex:1;">' +
            '<label class="control-label">Y Position</label>' +
            '<input type="number" class="text-field" id="prop-y-input" value="' + (l.y || 0) + '" step="8" oninput="updateLayoutY(this.value)">' +
          '</div>' +
        '</div>';
      }

      frameControls += '<div class="control-row">' +
        '<label class="control-label">Width</label>' +
        '<select class="select-dropdown" id="prop-width-select" onchange="updateLayoutWidth(this.value)">' +
          '<option value="auto" ' + (l.width === 'auto' ? 'selected' : '') + '>Auto (Hug Contents)</option>' +
          '<option value="custom" ' + (l.width === 'custom' || (l.width && l.width.includes('px')) ? 'selected' : '') + '>Custom Width (px)</option>' +
          '<option value="100%" ' + (l.width === '100%' ? 'selected' : '') + '>Full Width (100%)</option>' +
          '<option value="50%" ' + (l.width === '50%' ? 'selected' : '') + '>Half Width (50% - 2 Cols)</option>' +
          '<option value="33.3%" ' + (l.width === '33.3%' ? 'selected' : '') + '>1/3 Width (33.3% - 3 Cols)</option>' +
          '<option value="25%" ' + (l.width === '25%' ? 'selected' : '') + '>1/4 Width (25% - 4 Cols)</option>' +
        '</select>' +
      '</div>' +
      ((l.width === 'custom' || (l.width && l.width.includes('px'))) ? (
        '<div class="control-row">' +
          '<label class="control-label">Width (px)</label>' +
          '<input type="text" class="text-field" value="' + (l.customWidth || l.width || '320px') + '" oninput="updateLayoutCustomWidth(this.value)">' +
        '</div>'
      ) : '') +
      '<div class="control-row">' +
        '<label class="control-label">Height</label>' +
        '<select class="select-dropdown" onchange="updateLayoutHeight(this.value)">' +
          '<option value="auto" ' + (l.height === 'auto' ? 'selected' : '') + '>Auto (Hug Contents)</option>' +
          '<option value="compact" ' + (l.height === 'compact' ? 'selected' : '') + '>Compact (36px)</option>' +
          '<option value="default" ' + (l.height === 'default' ? 'selected' : '') + '>Standard (48px)</option>' +
          '<option value="large" ' + (l.height === 'large' ? 'selected' : '') + '>Large (72px)</option>' +
          '<option value="custom" ' + (l.height === 'custom' ? 'selected' : '') + '>Custom Height (px)</option>' +
        '</select>' +
      '</div>' +
      (l.height === 'custom' ? (
        '<div class="control-row">' +
          '<label class="control-label">Height (px)</label>' +
          '<input type="text" class="text-field" value="' + (l.customHeight || '48px') + '" oninput="updateLayoutCustomHeight(this.value)">' +
        '</div>'
      ) : '') +
      '<div class="control-row" style="margin-top:10px;">' +
        '<label class="control-label">Actions</label>' +
        '<div style="display:flex; gap:6px; width:100%;">' +
          '<button class="btn-topbar" style="flex:1; justify-content:center; font-size:11px;" onclick="duplicateSelectedElement()">' +
            '<i data-lucide="copy" style="width:12px;height:12px;"></i> Duplicate' +
          '</button>' +
          '<button class="btn-topbar" style="flex:1; justify-content:center; font-size:11px; color:#EF4444;" onclick="deleteSelectedElement()">' +
            '<i data-lucide="trash-2" style="width:12px;height:12px;"></i> Delete' +
          '</button>' +
        '</div>' +
      '</div>';

      frameSec.innerHTML = frameControls;
      container.appendChild(frameSec);

      // 2. ATOMIC SUB-LAYER INSPECTOR (Border, Icon, Typography)
      const atomicSec = document.createElement('div');
      atomicSec.className = 'inspector-section';

      atomicSec.innerHTML = '<div class="inspector-section-title">' +
        '<span>Atomic Sub-Layers</span>' +
        '<span style="font-size:10px; color:var(--brand-secondary); font-family:monospace;">Atoms</span>' +
      '</div>' +
      '<div class="segmented-control-bar" style="margin-bottom:12px;">' +
        '<button class="seg-btn ' + (activeAtomTab === 'border' ? 'active' : '') + '" data-tab="border" onclick="switchAtomTab(this.dataset.tab)">' +
          '<i data-lucide="square" style="width:12px;height:12px;"></i> Border' +
        '</button>' +
        '<button class="seg-btn ' + (activeAtomTab === 'icon' ? 'active' : '') + '" data-tab="icon" onclick="switchAtomTab(this.dataset.tab)">' +
          '<i data-lucide="sparkles" style="width:12px;height:12px;"></i> Icon' +
        '</button>' +
        '<button class="seg-btn ' + (activeAtomTab === 'typography' ? 'active' : '') + '" data-tab="typography" onclick="switchAtomTab(this.dataset.tab)">' +
          '<i data-lucide="type" style="width:12px;height:12px;"></i> Type' +
        '</button>' +
      '</div>';

      // Atomic Tab 1: Border & Surface
      if (activeAtomTab === 'border') {
        const borderDiv = document.createElement('div');
        borderDiv.innerHTML = '<div class="control-row">' +
          '<label class="control-label">Border Width</label>' +
          '<select class="select-dropdown" data-atom="borderWidth" onchange="updateSelectedAtom(this.dataset.atom, this.value)">' +
            '<option value="" ' + (!atoms.borderWidth ? 'selected' : '') + '>Default Width</option>' +
            '<option value="0px" ' + (atoms.borderWidth === '0px' ? 'selected' : '') + '>None (0px)</option>' +
            '<option value="1px" ' + (atoms.borderWidth === '1px' ? 'selected' : '') + '>Thin (1px)</option>' +
            '<option value="2px" ' + (atoms.borderWidth === '2px' ? 'selected' : '') + '>Medium (2px)</option>' +
            '<option value="3px" ' + (atoms.borderWidth === '3px' ? 'selected' : '') + '>Bold (3px)</option>' +
          '</select>' +
        '</div>' +
        '<div class="control-row">' +
          '<label class="control-label">Border Color</label>' +
          '<div class="color-picker-group">' +
            '<input type="color" class="color-swatch-input" value="' + (atoms.borderColor || '#2563EB') + '" data-atom="borderColor" oninput="updateSelectedAtom(this.dataset.atom, this.value)">' +
            '<input type="text" class="text-field" value="' + (atoms.borderColor || 'Default') + '" placeholder="Default Color" data-atom="borderColor" oninput="updateSelectedAtom(this.dataset.atom, this.value)">' +
          '</div>' +
        '</div>' +
        '<div class="control-row">' +
          '<label class="control-label">Border Radius</label>' +
          '<select class="select-dropdown" data-atom="borderRadius" onchange="updateSelectedAtom(this.dataset.atom, this.value)">' +
            '<option value="" ' + (!atoms.borderRadius ? 'selected' : '') + '>Default Radius</option>' +
            '<option value="0px" ' + (atoms.borderRadius === '0px' ? 'selected' : '') + '>Sharp (0px)</option>' +
            '<option value="4px" ' + (atoms.borderRadius === '4px' ? 'selected' : '') + '>Rounded Small (4px)</option>' +
            '<option value="8px" ' + (atoms.borderRadius === '8px' ? 'selected' : '') + '>Standard (8px)</option>' +
            '<option value="12px" ' + (atoms.borderRadius === '12px' ? 'selected' : '') + '>Large (12px)</option>' +
            '<option value="16px" ' + (atoms.borderRadius === '16px' ? 'selected' : '') + '>Extra Large (16px)</option>' +
            '<option value="9999px" ' + (atoms.borderRadius === '9999px' ? 'selected' : '') + '>Full Pill (9999px)</option>' +
          '</select>' +
        '</div>' +
        '<div class="control-row">' +
          '<label class="control-label">Elevation Shadow</label>' +
          '<select class="select-dropdown" data-atom="boxShadow" onchange="updateSelectedAtom(this.dataset.atom, this.value)">' +
            '<option value="" ' + (!atoms.boxShadow ? 'selected' : '') + '>Default Shadow</option>' +
            '<option value="none" ' + (atoms.boxShadow === 'none' ? 'selected' : '') + '>None (Flat)</option>' +
            '<option value="sm" ' + (atoms.boxShadow === 'sm' ? 'selected' : '') + '>Subtle (sm)</option>' +
            '<option value="md" ' + (atoms.boxShadow === 'md' ? 'selected' : '') + '>Medium (md)</option>' +
            '<option value="lg" ' + (atoms.boxShadow === 'lg' ? 'selected' : '') + '>Large (lg)</option>' +
            '<option value="glow" ' + (atoms.boxShadow === 'glow' ? 'selected' : '') + '>Brand Glow</option>' +
          '</select>' +
        '</div>';
        atomicSec.appendChild(borderDiv);
      } else if (activeAtomTab === 'icon') {
        const iconDiv = document.createElement('div');
        iconDiv.innerHTML = '<div class="control-row">' +
          '<label class="control-label">Icon Selection</label>' +
          '<select class="select-dropdown" data-atom="icon" onchange="updateSelectedAtom(this.dataset.atom, this.value)">' +
            '<option value="" ' + (!atoms.icon ? 'selected' : '') + '>Default Component Icon</option>' +
            '<option value="search" ' + (atoms.icon === 'search' ? 'selected' : '') + '>Search (search)</option>' +
            '<option value="sparkles" ' + (atoms.icon === 'sparkles' ? 'selected' : '') + '>Sparkles AI (sparkles)</option>' +
            '<option value="filter" ' + (atoms.icon === 'filter' ? 'selected' : '') + '>Filter (filter)</option>' +
            '<option value="plus" ' + (atoms.icon === 'plus' ? 'selected' : '') + '>Plus (plus)</option>' +
            '<option value="check" ' + (atoms.icon === 'check' ? 'selected' : '') + '>Check (check)</option>' +
            '<option value="play" ' + (atoms.icon === 'play' ? 'selected' : '') + '>Play (play)</option>' +
            '<option value="arrow-right" ' + (atoms.icon === 'arrow-right' ? 'selected' : '') + '>Arrow Right (arrow-right)</option>' +
            '<option value="bell" ' + (atoms.icon === 'bell' ? 'selected' : '') + '>Notification Bell (bell)</option>' +
            '<option value="mail" ' + (atoms.icon === 'mail' ? 'selected' : '') + '>Email (mail)</option>' +
            '<option value="user" ' + (atoms.icon === 'user' ? 'selected' : '') + '>User Profile (user)</option>' +
            '<option value="settings" ' + (atoms.icon === 'settings' ? 'selected' : '') + '>Settings (settings)</option>' +
            '<option value="star" ' + (atoms.icon === 'star' ? 'selected' : '') + '>Star (star)</option>' +
            '<option value="shield" ' + (atoms.icon === 'shield' ? 'selected' : '') + '>Shield (shield)</option>' +
            '<option value="heart" ' + (atoms.icon === 'heart' ? 'selected' : '') + '>Heart (heart)</option>' +
            '<option value="trash-2" ' + (atoms.icon === 'trash-2' ? 'selected' : '') + '>Trash (trash-2)</option>' +
          '</select>' +
        '</div>' +
        '<div class="control-row">' +
          '<label class="control-label">Icon Color</label>' +
          '<div class="color-picker-group">' +
            '<input type="color" class="color-swatch-input" value="' + (atoms.iconColor || '#2563EB') + '" data-atom="iconColor" oninput="updateSelectedAtom(this.dataset.atom, this.value)">' +
            '<input type="text" class="text-field" value="' + (atoms.iconColor || 'Default') + '" placeholder="Default Color" data-atom="iconColor" oninput="updateSelectedAtom(this.dataset.atom, this.value)">' +
          '</div>' +
        '</div>' +
        '<div class="control-row">' +
          '<label class="control-label">Icon Size</label>' +
          '<select class="select-dropdown" data-atom="iconSize" onchange="updateSelectedAtom(this.dataset.atom, this.value)">' +
            '<option value="" ' + (!atoms.iconSize ? 'selected' : '') + '>Default Size (16px)</option>' +
            '<option value="12px" ' + (atoms.iconSize === '12px' ? 'selected' : '') + '>Small (12px)</option>' +
            '<option value="16px" ' + (atoms.iconSize === '16px' ? 'selected' : '') + '>Medium (16px)</option>' +
            '<option value="20px" ' + (atoms.iconSize === '20px' ? 'selected' : '') + '>Large (20px)</option>' +
            '<option value="24px" ' + (atoms.iconSize === '24px' ? 'selected' : '') + '>Extra Large (24px)</option>' +
          '</select>' +
        '</div>';
        atomicSec.appendChild(iconDiv);
      } else {
        const typeDiv = document.createElement('div');
        typeDiv.innerHTML = '<div class="control-row">' +
          '<label class="control-label">Text Color</label>' +
          '<div class="color-picker-group">' +
            '<input type="color" class="color-swatch-input" value="' + (atoms.textColor || '#0F172A') + '" data-atom="textColor" oninput="updateSelectedAtom(this.dataset.atom, this.value)">' +
            '<input type="text" class="text-field" value="' + (atoms.textColor || 'Default') + '" placeholder="Default Color" data-atom="textColor" oninput="updateSelectedAtom(this.dataset.atom, this.value)">' +
          '</div>' +
        '</div>' +
        '<div class="control-row">' +
          '<label class="control-label">Font Size</label>' +
          '<select class="select-dropdown" data-atom="fontSize" onchange="updateSelectedAtom(this.dataset.atom, this.value)">' +
            '<option value="" ' + (!atoms.fontSize ? 'selected' : '') + '>Default Size</option>' +
            '<option value="11px" ' + (atoms.fontSize === '11px' ? 'selected' : '') + '>Extra Small (11px)</option>' +
            '<option value="13px" ' + (atoms.fontSize === '13px' ? 'selected' : '') + '>Small (13px)</option>' +
            '<option value="15px" ' + (atoms.fontSize === '15px' ? 'selected' : '') + '>Base (15px)</option>' +
            '<option value="18px" ' + (atoms.fontSize === '18px' ? 'selected' : '') + '>Large (18px)</option>' +
          '</select>' +
        '</div>' +
        '<div class="control-row">' +
          '<label class="control-label">Font Weight</label>' +
          '<select class="select-dropdown" data-atom="fontWeight" onchange="updateSelectedAtom(this.dataset.atom, this.value)">' +
            '<option value="" ' + (!atoms.fontWeight ? 'selected' : '') + '>Default Weight</option>' +
            '<option value="400" ' + (atoms.fontWeight === '400' ? 'selected' : '') + '>Regular (400)</option>' +
            '<option value="500" ' + (atoms.fontWeight === '500' ? 'selected' : '') + '>Medium (500)</option>' +
            '<option value="600" ' + (atoms.fontWeight === '600' ? 'selected' : '') + '>Semibold (600)</option>' +
            '<option value="700" ' + (atoms.fontWeight === '700' ? 'selected' : '') + '>Bold (700)</option>' +
          '</select>' +
        '</div>';
        atomicSec.appendChild(typeDiv);
      }

      container.appendChild(atomicSec);

      // 3. COMPONENT PROPERTIES (Variant & Native Props)
      const propSec = document.createElement('div');
      propSec.className = 'inspector-section';

      propSec.innerHTML = '<div class="inspector-section-title">' +
        '<span>Component Props</span>' +
        '<span style="font-size:10px; color:var(--brand-primary); font-family:monospace;">' + def.name + '</span>' +
      '</div>';

      if (props.variant !== undefined) {
        const varRow = document.createElement('div');
        varRow.className = 'control-row';
        varRow.innerHTML = '<label class="control-label">Variant</label>' +
          '<select class="select-dropdown" onchange="updateVariant(this.value)">' +
            '<option value="filled" ' + (props.variant === 'filled' ? 'selected' : '') + '>Filled (Primary)</option>' +
            '<option value="outline" ' + (props.variant === 'outline' ? 'selected' : '') + '>Outlined</option>' +
            '<option value="ghost" ' + (props.variant === 'ghost' ? 'selected' : '') + '>Ghost</option>' +
            '<option value="ai" ' + (props.variant === 'ai' ? 'selected' : '') + '>AI Special Action</option>' +
            '<option value="danger" ' + (props.variant === 'danger' ? 'selected' : '') + '>Danger Action</option>' +
          '</select>';
        propSec.appendChild(varRow);
      }

      Object.keys(props).forEach(key => {
        if (key === 'variant') return;
        const row = document.createElement('div');
        row.className = 'control-row';
        const labelFormatted = key.charAt(0).toUpperCase() + key.slice(1);
        const lbl = document.createElement('label');
        lbl.className = 'control-label';
        lbl.textContent = labelFormatted;
        const inp = document.createElement('input');
        inp.type = 'text';
        inp.className = 'text-field';
        inp.value = (props[key] || '').toString();
        inp.addEventListener('input', function() {
          updateSelectedProp(key, this.value);
        });
        row.appendChild(lbl);
        row.appendChild(inp);
        propSec.appendChild(row);
      });

      container.appendChild(propSec);

      if (window.lucide && typeof lucide.createIcons === 'function') {
        lucide.createIcons();
      }
    }

    // Component Studio Inspector
    function renderComponentStudioInspector(container) {
      const def = CATALOG.find(c => c.id === activeMasterComponentId) || CATALOG[0];
      if (!def) return;

      const atoms = activeMasterComponentAtoms || {};
      const hasCustomAtoms = (atoms && Object.keys(atoms).length > 0) || (def.defaultAtoms && Object.keys(def.defaultAtoms).length > 0);
      const syncStatusText = hasCustomAtoms ? 'Custom Atoms Ready' : 'Stock Master';
      const syncStatusColor = hasCustomAtoms ? '#15803D' : '#64748B';
      const syncStatusBg = hasCustomAtoms ? '#DCFCE7' : '#F1F5F9';

      container.innerHTML = '<div class="inspector-section" style="background:#F0FDF4; border:1px solid #BBF7D0; border-radius:8px; padding:12px; margin-bottom:12px;">' +
        '<div style="display:flex; align-items:center; justify-content:space-between; margin-bottom:6px;">' +
          '<span style="font-weight:700; font-size:12px; color:#166534; display:flex; align-items:center; gap:6px;">' +
            '<i data-lucide="database" style="width:14px;height:14px; color:#16A34A;"></i> Codebase Sync' +
          '</span>' +
          '<span id="sync-status-badge" style="font-size:10px; font-weight:600; background:' + syncStatusBg + '; color:' + syncStatusColor + '; padding:2px 6px; border-radius:4px;">' +
            syncStatusText +
          '</span>' +
        '</div>' +
        '<p style="font-size:11px; color:#166534; margin:0 0 10px 0; line-height:1.4;">' +
          'Write visual atom modifications directly to source code on disk and recompile the library.' +
        '</p>' +
        '<button class="btn-topbar primary" id="btn-inspector-sync-source" style="width:100%; justify-content:center; background:#16A34A; border-color:#16A34A; color:white; font-weight:600;" onclick="syncMasterComponentToSourceCode()">' +
          '<i data-lucide="save" style="width:14px;height:14px;"></i> Save as Base Component' +
        '</button>' +
        '<div id="sync-feedback-msg" style="font-size:10px; color:#15803D; margin-top:8px; display:none; line-height:1.4;"></div>' +
      '</div>' +
      '<div class="inspector-section">' +
        '<div class="inspector-section-title">' +
          '<span>❖ Master Component Definition</span>' +
          '<span style="font-size:10px; color:var(--brand-primary); font-family:monospace;">' + def.num + '</span>' +
        '</div>' +
        '<div class="control-row">' +
          '<label class="control-label">Component Name</label>' +
          '<input type="text" class="text-field" value="' + def.name + '" readonly>' +
        '</div>' +
        '<div class="control-row">' +
          '<label class="control-label">Category</label>' +
          '<input type="text" class="text-field" value="' + def.category + '" readonly>' +
        '</div>' +
      '</div>' +
      '<div class="inspector-section">' +
        '<div class="inspector-section-title">' +
          '<span>Atomic Sub-Layers</span>' +
          '<span style="font-size:10px; color:var(--brand-secondary); font-family:monospace;">Atoms</span>' +
        '</div>' +
        '<div class="segmented-control-bar" style="margin-bottom:12px;">' +
          '<button class="seg-btn ' + (activeAtomTab === 'border' ? 'active' : '') + '" data-tab="border" onclick="switchAtomTab(this.dataset.tab)">' +
            '<i data-lucide="square" style="width:12px;height:12px;"></i> Border' +
          '</button>' +
          '<button class="seg-btn ' + (activeAtomTab === 'icon' ? 'active' : '') + '" data-tab="icon" onclick="switchAtomTab(this.dataset.tab)">' +
            '<i data-lucide="sparkles" style="width:12px;height:12px;"></i> Icon' +
          '</button>' +
          '<button class="seg-btn ' + (activeAtomTab === 'typography' ? 'active' : '') + '" data-tab="typography" onclick="switchAtomTab(this.dataset.tab)">' +
            '<i data-lucide="type" style="width:12px;height:12px;"></i> Type' +
          '</button>' +
        '</div>' +
        (activeAtomTab === 'border' ? (
          '<div class="control-row">' +
            '<label class="control-label">Border Width</label>' +
            '<select class="select-dropdown" data-atom="borderWidth" onchange="updateSelectedAtom(this.dataset.atom, this.value)">' +
              '<option value="" ' + (!atoms.borderWidth ? 'selected' : '') + '>Default Width</option>' +
              '<option value="0px" ' + (atoms.borderWidth === '0px' ? 'selected' : '') + '>None (0px)</option>' +
              '<option value="1px" ' + (atoms.borderWidth === '1px' ? 'selected' : '') + '>Thin (1px)</option>' +
              '<option value="2px" ' + (atoms.borderWidth === '2px' ? 'selected' : '') + '>Medium (2px)</option>' +
              '<option value="3px" ' + (atoms.borderWidth === '3px' ? 'selected' : '') + '>Bold (3px)</option>' +
            '</select>' +
          '</div>' +
          '<div class="control-row">' +
            '<label class="control-label">Border Color</label>' +
            '<div class="color-picker-group">' +
              '<input type="color" class="color-swatch-input" value="' + (atoms.borderColor || '#2563EB') + '" data-atom="borderColor" oninput="updateSelectedAtom(this.dataset.atom, this.value)">' +
              '<input type="text" class="text-field" value="' + (atoms.borderColor || 'Default') + '" placeholder="Default Color" data-atom="borderColor" oninput="updateSelectedAtom(this.dataset.atom, this.value)">' +
            '</div>' +
          '</div>' +
          '<div class="control-row">' +
            '<label class="control-label">Border Radius</label>' +
            '<select class="select-dropdown" data-atom="borderRadius" onchange="updateSelectedAtom(this.dataset.atom, this.value)">' +
              '<option value="" ' + (!atoms.borderRadius ? 'selected' : '') + '>Default Radius</option>' +
              '<option value="0px" ' + (atoms.borderRadius === '0px' ? 'selected' : '') + '>Sharp (0px)</option>' +
              '<option value="4px" ' + (atoms.borderRadius === '4px' ? 'selected' : '') + '>Rounded Small (4px)</option>' +
              '<option value="8px" ' + (atoms.borderRadius === '8px' ? 'selected' : '') + '>Standard (8px)</option>' +
              '<option value="12px" ' + (atoms.borderRadius === '12px' ? 'selected' : '') + '>Large (12px)</option>' +
              '<option value="16px" ' + (atoms.borderRadius === '16px' ? 'selected' : '') + '>Extra Large (16px)</option>' +
              '<option value="9999px" ' + (atoms.borderRadius === '9999px' ? 'selected' : '') + '>Full Pill (9999px)</option>' +
            '</select>' +
          '</div>' +
          '<div class="control-row">' +
            '<label class="control-label">Elevation Shadow</label>' +
            '<select class="select-dropdown" data-atom="boxShadow" onchange="updateSelectedAtom(this.dataset.atom, this.value)">' +
              '<option value="" ' + (!atoms.boxShadow ? 'selected' : '') + '>Default Shadow</option>' +
              '<option value="none" ' + (atoms.boxShadow === 'none' ? 'selected' : '') + '>None (Flat)</option>' +
              '<option value="sm" ' + (atoms.boxShadow === 'sm' ? 'selected' : '') + '>Subtle (sm)</option>' +
              '<option value="md" ' + (atoms.boxShadow === 'md' ? 'selected' : '') + '>Medium (md)</option>' +
              '<option value="lg" ' + (atoms.boxShadow === 'lg' ? 'selected' : '') + '>Large (lg)</option>' +
              '<option value="glow" ' + (atoms.boxShadow === 'glow' ? 'selected' : '') + '>Brand Glow</option>' +
            '</select>' +
          '</div>'
        ) : activeAtomTab === 'icon' ? (
          '<div class="control-row">' +
            '<label class="control-label">Icon Selection</label>' +
            '<select class="select-dropdown" data-atom="icon" onchange="updateSelectedAtom(this.dataset.atom, this.value)">' +
              '<option value="" ' + (!atoms.icon ? 'selected' : '') + '>Default Component Icon</option>' +
              '<option value="search" ' + (atoms.icon === 'search' ? 'selected' : '') + '>Search (search)</option>' +
              '<option value="sparkles" ' + (atoms.icon === 'sparkles' ? 'selected' : '') + '>Sparkles AI (sparkles)</option>' +
              '<option value="filter" ' + (atoms.icon === 'filter' ? 'selected' : '') + '>Filter (filter)</option>' +
              '<option value="plus" ' + (atoms.icon === 'plus' ? 'selected' : '') + '>Plus (plus)</option>' +
              '<option value="check" ' + (atoms.icon === 'check' ? 'selected' : '') + '>Check (check)</option>' +
              '<option value="play" ' + (atoms.icon === 'play' ? 'selected' : '') + '>Play (play)</option>' +
              '<option value="arrow-right" ' + (atoms.icon === 'arrow-right' ? 'selected' : '') + '>Arrow Right (arrow-right)</option>' +
              '<option value="bell" ' + (atoms.icon === 'bell' ? 'selected' : '') + '>Notification Bell (bell)</option>' +
              '<option value="mail" ' + (atoms.icon === 'mail' ? 'selected' : '') + '>Email (mail)</option>' +
              '<option value="user" ' + (atoms.icon === 'user' ? 'selected' : '') + '>User Profile (user)</option>' +
              '<option value="settings" ' + (atoms.icon === 'settings' ? 'selected' : '') + '>Settings (settings)</option>' +
            '</select>' +
          '</div>' +
          '<div class="control-row">' +
            '<label class="control-label">Icon Color</label>' +
            '<div class="color-picker-group">' +
              '<input type="color" class="color-swatch-input" value="' + (atoms.iconColor || '#2563EB') + '" data-atom="iconColor" oninput="updateSelectedAtom(this.dataset.atom, this.value)">' +
              '<input type="text" class="text-field" value="' + (atoms.iconColor || 'Default') + '" placeholder="Default Color" data-atom="iconColor" oninput="updateSelectedAtom(this.dataset.atom, this.value)">' +
            '</div>' +
          '</div>'
        ) : (
          '<div class="control-row">' +
            '<label class="control-label">Text Color</label>' +
            '<div class="color-picker-group">' +
              '<input type="color" class="color-swatch-input" value="' + (atoms.textColor || '#0F172A') + '" data-atom="textColor" oninput="updateSelectedAtom(this.dataset.atom, this.value)">' +
              '<input type="text" class="text-field" value="' + (atoms.textColor || 'Default') + '" placeholder="Default Color" data-atom="textColor" oninput="updateSelectedAtom(this.dataset.atom, this.value)">' +
            '</div>' +
          '</div>'
        )) +
      '</div>';

      if (window.lucide && typeof lucide.createIcons === 'function') {
        lucide.createIcons();
      }
    }

    // Atomic & Layout Update Handlers
    function updateSelectedAtom(key, val) {
      if (activeStudioWorkspace === 'component') {
        if (!activeMasterComponentAtoms) activeMasterComponentAtoms = {};
        activeMasterComponentAtoms[key] = val;
        renderComponentStudio();
        renderInspector();
      } else {
        const selected = placedElements.find(e => e.id === selectedElementId);
        if (!selected) return;
        if (!selected.atoms) selected.atoms = {};
        selected.atoms[key] = val;
        renderArtboard();
        renderInspector();
      }
    }

    function updateLayoutX(val) {
      const selected = placedElements.find(e => e.id === selectedElementId);
      if (!selected) return;
      if (!selected.layout) selected.layout = {};
      selected.layout.x = parseInt(val, 10) || 0;
      renderArtboard();
    }

    function updateLayoutY(val) {
      const selected = placedElements.find(e => e.id === selectedElementId);
      if (!selected) return;
      if (!selected.layout) selected.layout = {};
      selected.layout.y = parseInt(val, 10) || 0;
      renderArtboard();
    }

    function updateLayoutWidth(val) {
      updateSelectedLayout('width', val);
    }

    function updateLayoutCustomWidth(val) {
      updateSelectedLayout('customWidth', val);
    }

    function updateLayoutHeight(val) {
      updateSelectedLayout('height', val);
    }

    function updateLayoutCustomHeight(val) {
      updateSelectedLayout('customHeight', val);
    }

    function updateVariant(val) {
      if (activeStudioWorkspace === 'component') {
        activeMasterComponentVariant = val;
        renderComponentStudio();
      } else {
        updateSelectedProp('variant', val);
      }
    }

    function updateSelectedLayout(key, val) {
      const selected = placedElements.find(e => e.id === selectedElementId);
      if (!selected) return;
      if (!selected.layout) selected.layout = {};
      selected.layout[key] = val;
      renderArtboard();
      renderInspector();
      if (activeLeftTab === 'layers') renderLayersTree();
    }

    function moveElementOrder(direction) {
      if (!selectedElementId) return;
      const idx = placedElements.findIndex(e => e.id === selectedElementId);
      if (idx === -1) return;

      const targetIdx = idx + direction;
      if (targetIdx < 0 || targetIdx >= placedElements.length) return;

      const item = placedElements.splice(idx, 1)[0];
      placedElements.splice(targetIdx, 0, item);

      renderArtboard();
      renderInspector();
      if (activeLeftTab === 'layers') renderLayersTree();
    }

    function moveLayerOrder(idx, direction) {
      const targetIdx = idx + direction;
      if (targetIdx < 0 || targetIdx >= placedElements.length) return;

      const item = placedElements.splice(idx, 1)[0];
      placedElements.splice(targetIdx, 0, item);

      renderArtboard();
      renderInspector();
      if (activeLeftTab === 'layers') renderLayersTree();
    }

    function duplicateSelectedElement() {
      if (!selectedElementId) return;
      const idx = placedElements.findIndex(e => e.id === selectedElementId);
      if (idx === -1) return;

      const orig = placedElements[idx];
      const clone = {
        id: 'elem_' + Date.now() + '_' + Math.random().toString(36).substr(2, 4),
        definition: orig.definition,
        props: JSON.parse(JSON.stringify(orig.props)),
        layout: {
          ...JSON.parse(JSON.stringify(orig.layout || {})),
          x: (orig.layout && orig.layout.x ? orig.layout.x + 24 : 64),
          y: (orig.layout && orig.layout.y ? orig.layout.y + 24 : 64)
        },
        atoms: JSON.parse(JSON.stringify(orig.atoms || {}))
      };

      placedElements.splice(idx + 1, 0, clone);
      selectedElementId = clone.id;

      renderArtboard();
      renderInspector();
      if (activeLeftTab === 'layers') renderLayersTree();
      showToast('Duplicated ' + orig.definition.name);
    }

    function setCanvasLayoutMode(mode) {
      canvasLayoutMode = mode;
      renderArtboard();
      renderInspector();
    }

    function setCanvasGap(gap) {
      canvasGap = gap;
      renderArtboard();
      renderInspector();
    }

    function setCanvasBg(bg) {
      canvasBgColor = bg;
      renderArtboard();
      renderInspector();
    }

    function updateSelectedProp(key, val) {
      const selected = placedElements.find(e => e.id === selectedElementId);
      if (!selected) return;
      selected.props[key] = val;
      renderArtboard();
      if (activeLeftTab === 'layers') renderLayersTree();
    }

    function deleteSelectedElement() {
      if (!selectedElementId) return;
      placedElements = placedElements.filter(e => e.id !== selectedElementId);
      selectedElementId = null;
      renderArtboard();
      renderInspector();
      if (activeLeftTab === 'layers') renderLayersTree();
      showToast('Component deleted');
    }

    function copySelectedJSX() {
      const selected = placedElements.find(e => e.id === selectedElementId);
      if (!selected) return;
      const jsx = selected.definition.toJsx(selected.props);
      navigator.clipboard.writeText(jsx).then(() => {
        showToast('Component JSX copied to clipboard!');
      });
    }

    // =========================================================================
    // BRAND TOKENS CUSTOMIZER
    // =========================================================================
    function renderBrandCustomizer(container) {
      const rootStyles = getComputedStyle(document.documentElement);
      const primaryColor = rootStyles.getPropertyValue('--brand-primary').trim() || '#2563EB';
      const secondaryColor = rootStyles.getPropertyValue('--brand-secondary').trim() || '#7C3AED';
      const accentColor = rootStyles.getPropertyValue('--brand-accent').trim() || '#06B6D4';
      const radiusVal = parseInt(rootStyles.getPropertyValue('--brand-radius-base'), 10) || 8;

      container.innerHTML = '<div class="inspector-section">' +
        '<div class="inspector-section-title">' +
          '<span>Color Palette</span>' +
          '<span style="font-size:10px; color:var(--figma-text-muted);">Tokens</span>' +
        '</div>' +
        '<div class="control-row">' +
          '<label class="control-label">Primary Color</label>' +
          '<div class="color-picker-group">' +
            '<input type="color" class="color-swatch-input" value="' + primaryColor + '" oninput="setBrandPrimary(this.value)">' +
            '<input type="text" class="text-field" value="' + primaryColor + '" readonly>' +
          '</div>' +
        '</div>' +
        '<div class="control-row">' +
          '<label class="control-label">Secondary Color</label>' +
          '<div class="color-picker-group">' +
            '<input type="color" class="color-swatch-input" value="' + secondaryColor + '" oninput="setBrandSecondary(this.value)">' +
            '<input type="text" class="text-field" value="' + secondaryColor + '" readonly>' +
          '</div>' +
        '</div>' +
        '<div class="control-row">' +
          '<label class="control-label">Accent Color</label>' +
          '<div class="color-picker-group">' +
            '<input type="color" class="color-swatch-input" value="' + accentColor + '" oninput="setBrandAccent(this.value)">' +
            '<input type="text" class="text-field" value="' + accentColor + '" readonly>' +
          '</div>' +
        '</div>' +
      '</div>' +
      '<div class="inspector-section">' +
        '<div class="inspector-section-title">' +
          '<span>Border Radius</span>' +
          '<span style="font-size:10px; color:var(--figma-text-muted);" id="radius-badge">' + radiusVal + 'px</span>' +
        '</div>' +
        '<div class="control-row">' +
          '<label class="control-label">Base Radius: <span id="radius-val">' + radiusVal + 'px</span></label>' +
          '<input type="range" class="range-slider" min="0" max="24" value="' + radiusVal + '" oninput="setBrandRadius(this.value)">' +
        '</div>' +
      '</div>' +
      '<div class="inspector-section">' +
        '<div class="inspector-section-title">' +
          '<span>Typography</span>' +
        '</div>' +
        '<div class="control-row">' +
          '<label class="control-label">Font Family</label>' +
          '<select class="select-dropdown" onchange="setBrandFont(this.value)">' +
            '<option value="Inter, sans-serif">Inter (Clean Modern UI)</option>' +
            '<option value="Plus Jakarta Sans, sans-serif">Plus Jakarta Sans (Friendly Editorial)</option>' +
            '<option value="JetBrains Mono, monospace">JetBrains Mono (Technical / Code)</option>' +
            '<option value="system-ui, -apple-system, sans-serif">Native System UI</option>' +
          '</select>' +
        '</div>' +
      '</div>' +
      '<div class="inspector-section">' +
        '<div class="inspector-section-title">' +
          '<span>Preset Themes</span>' +
        '</div>' +
        '<div style="display:flex; flex-direction:column; gap:6px;">' +
          '<button class="btn-topbar" style="width:100%; justify-content:center;" onclick="applyBrandPreset(this.dataset.preset)" data-preset="default">Figma Default (Blue & 8px)</button>' +
          '<button class="btn-topbar" style="width:100%; justify-content:center;" onclick="applyBrandPreset(this.dataset.preset)" data-preset="emerald">Emerald Fintech (Green & 6px)</button>' +
          '<button class="btn-topbar" style="width:100%; justify-content:center;" onclick="applyBrandPreset(this.dataset.preset)" data-preset="ai">GenAI Neon (Purple & 12px)</button>' +
          '<button class="btn-topbar" style="width:100%; justify-content:center;" onclick="applyBrandPreset(this.dataset.preset)" data-preset="slate">Enterprise Slate (Neutral & 4px)</button>' +
        '</div>' +
      '</div>';
    }

    function setBrandPrimary(color) {
      setBrandColor('primary', color);
    }
    function setBrandSecondary(color) {
      setBrandColor('secondary', color);
    }
    function setBrandAccent(color) {
      setBrandColor('accent', color);
    }

    function applyBrandPreset(preset) {
      if (preset === 'emerald') {
        setBrandColor('primary', '#059669');
        setBrandColor('secondary', '#0D9488');
        setBrandColor('accent', '#10B981');
        setBrandRadius(6);
      } else if (preset === 'ai') {
        setBrandColor('primary', '#8B5CF6');
        setBrandColor('secondary', '#EC4899');
        setBrandColor('accent', '#06B6D4');
        setBrandRadius(12);
      } else if (preset === 'slate') {
        setBrandColor('primary', '#475569');
        setBrandColor('secondary', '#334155');
        setBrandColor('accent', '#64748B');
        setBrandRadius(4);
      } else {
        setBrandColor('primary', '#2563EB');
        setBrandColor('secondary', '#7C3AED');
        setBrandColor('accent', '#06B6D4');
        setBrandRadius(8);
      }
      renderInspector();
    }

    function setBrandColor(role, color) {
      if (role === 'primary') {
        document.documentElement.style.setProperty('--brand-primary', color);
        document.documentElement.style.setProperty('--brand-primary-hover', color + 'ee');
      } else if (role === 'secondary') {
        document.documentElement.style.setProperty('--brand-secondary', color);
      } else if (role === 'accent') {
        document.documentElement.style.setProperty('--brand-accent', color);
      }
      renderArtboard();
    }

    function setBrandRadius(radius) {
      document.documentElement.style.setProperty('--brand-radius-base', radius + 'px');
      const b = document.getElementById('radius-badge');
      if (b) b.textContent = radius + 'px';
      const v = document.getElementById('radius-val');
      if (v) v.textContent = radius + 'px';
      renderArtboard();
    }

    function setBrandFont(font) {
      document.documentElement.style.setProperty('--brand-font-family', font);
      document.body.style.fontFamily = font;
    }

    function updatePageTitle(val) {
      document.getElementById('page-name-input').value = val;
      document.getElementById('artboard-label-text').textContent = val;
    }

    // =========================================================================
    // PAGE CODE EXPORT
    // =========================================================================
    function openPageExportModal() {
      const modal = document.getElementById('page-export-modal');
      const pre = document.getElementById('page-code-output');

      if (placedElements.length === 0) {
        pre.textContent = '// Artboard is empty. Drag or add components from the left palette to generate code.';
        modal.style.display = 'flex';
        return;
      }

      const imports = new Set();
      const jsxRows = [];

      placedElements.forEach(el => {
        imports.add(el.definition.importName);
        const l = el.layout || {};

        let twClasses = [];
        if (canvasPlacementMode === 'freeform') {
          twClasses.push('absolute');
          twClasses.push('left-[' + (l.x || 0) + 'px]');
          twClasses.push('top-[' + (l.y || 0) + 'px]');
        }

        if (l.width === '100%') twClasses.push('w-full');
        else if (l.width === '50%') twClasses.push('w-full md:w-[calc(50%-0.5rem)]');
        else if (l.width === '33.3%') twClasses.push('w-full md:w-[calc(33.333%-0.7rem)]');
        else if (l.width === '25%') twClasses.push('w-full md:w-[calc(25%-0.75rem)]');
        else if (l.width === 'auto') twClasses.push('w-auto');
        else if (l.width === 'custom' && l.customWidth) twClasses.push('w-[' + l.customWidth + ']');

        const wrapperCls = twClasses.join(' ');
        const compJsx = el.definition.toJsx(el.props);

        if (wrapperCls) {
          jsxRows.push('      <div className="' + wrapperCls + '">\\n        ' + compJsx.split('\\n').join('\\n        ') + '\\n      </div>');
        } else {
          jsxRows.push('      ' + compJsx.split('\\n').join('\\n      '));
        }
      });

      const importString = Array.from(imports).join(', ');
      const pageTitleSanitized = document.getElementById('page-name-input').value.replace(/[^a-zA-Z0-9]/g, '') || 'Page';

      const fullJsx = [
        "import React from 'react';",
        "import { " + importString + " } from '@hsb_design/design-system';",
        "import { Sparkles, Play, Info, Table, Check, ArrowRight, Settings } from 'lucide-react';",
        "",
        "export default function " + pageTitleSanitized + "() {",
        "  return (",
        '    <main className="w-full max-w-6xl mx-auto p-6 relative min-h-screen bg-white">',
        jsxRows.join('\\n\\n'),
        "    </main>",
        "  );",
        "}"
      ].join('\\n');

      pre.textContent = fullJsx;
      modal.style.display = 'flex';
    }

    function closePageExportModal() {
      document.getElementById('page-export-modal').style.display = 'none';
    }

    function closeExportModalBackdrop(e) {
      if (e.target && e.target.id === 'page-export-modal') {
        closePageExportModal();
      }
    }

    function copyFullPageCode() {
      const code = document.getElementById('page-code-output').textContent;
      navigator.clipboard.writeText(code).then(() => {
        showToast('Assembled JSX copied to clipboard!');
        closePageExportModal();
      });
    }

    function showToast(msg) {
      const t = document.getElementById('figma-toast');
      document.getElementById('toast-message').textContent = msg;
      t.style.display = 'inline-flex';
      setTimeout(() => { t.style.display = 'none'; }, 2200);
    }

    // Global Figma Keyboard Shortcuts
    document.addEventListener('keydown', function(e) {
      const activeTag = document.activeElement ? document.activeElement.tagName : '';
      if (activeTag === 'INPUT' || activeTag === 'TEXTAREA' || activeTag === 'SELECT') {
        return;
      }

      // Sidebar shortcuts
      if ((e.ctrlKey || e.metaKey) && (e.code === 'Backslash' || e.key === '/')) {
        e.preventDefault();
        toggleLeftPanel();
        return;
      }
      if (e.key === '[' && !e.ctrlKey && !e.metaKey && !e.altKey) {
        e.preventDefault();
        toggleLeftPanel();
        return;
      }
      if (e.key === ']' && !e.ctrlKey && !e.metaKey && !e.altKey) {
        e.preventDefault();
        toggleRightPanel();
        return;
      }

      // Ruler shortcut
      if (e.shiftKey && e.key.toLowerCase() === 'r') {
        e.preventDefault();
        toggleRulers();
        return;
      }

      // Component Studio nudging
      if (activeStudioWorkspace === 'component') {
        const box = document.getElementById('master-element-box');
        if (box && ['ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown'].includes(e.key)) {
          e.preventDefault();
          resolveMasterBoxAbsolutePosition(box);
          const step = e.shiftKey ? 16 : (snapToGrid ? 8 : 1);
          let curX = activeMasterComponentX;
          let curY = activeMasterComponentY;

          if (e.key === 'ArrowLeft') curX = Math.max(16, curX - step);
          if (e.key === 'ArrowRight') curX = curX + step;
          if (e.key === 'ArrowUp') curY = Math.max(16, curY - step);
          if (e.key === 'ArrowDown') curY = curY + step;

          activeMasterComponentX = curX;
          activeMasterComponentY = curY;
          box.style.left = curX + 'px';
          box.style.top = curY + 'px';

          const hudBadge = document.getElementById('master-pos-badge');
          if (hudBadge) hudBadge.textContent = 'X:' + curX + ' Y:' + curY;
          return;
        }
      }

      // Element-specific operations (require selected element)
      if (!selectedElementId) return;

      const el = placedElements.find(item => item.id === selectedElementId);
      const box = document.getElementById(selectedElementId);

      // Arrow keys nudge
      if (box && el && ['ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown'].includes(e.key)) {
        e.preventDefault();
        const step = e.shiftKey ? 16 : (snapToGrid ? 8 : 1);
        if (!el.layout) el.layout = {};
        let curX = el.layout.x !== undefined ? el.layout.x : box.offsetLeft;
        let curY = el.layout.y !== undefined ? el.layout.y : box.offsetTop;

        if (e.key === 'ArrowLeft') curX = Math.max(0, curX - step);
        if (e.key === 'ArrowRight') curX = curX + step;
        if (e.key === 'ArrowUp') curY = Math.max(0, curY - step);
        if (e.key === 'ArrowDown') curY = curY + step;

        el.layout.x = curX;
        el.layout.y = curY;
        box.style.left = curX + 'px';
        box.style.top = curY + 'px';

        const hudBadge = document.getElementById('hud-badge-' + selectedElementId);
        if (hudBadge) hudBadge.textContent = 'X:' + curX + ' Y:' + curY;

        const coordsHud = document.getElementById('canvas-coords-hud');
        if (coordsHud) coordsHud.textContent = 'X: ' + curX + 'px  Y: ' + curY + 'px';

        const inpX = document.getElementById('prop-x-input');
        const inpY = document.getElementById('prop-y-input');
        if (inpX) inpX.value = curX;
        if (inpY) inpY.value = curY;
        return;
      }

      if (e.key === 'Delete' || e.key === 'Backspace') {
        e.preventDefault();
        deleteSelectedElement();
      } else if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'd') {
        e.preventDefault();
        duplicateSelectedElement();
      } else if (e.key === 'Escape') {
        e.preventDefault();
        selectedElementId = null;
        document.querySelectorAll('.figma-element-box.selected').forEach(b => b.classList.remove('selected'));
        renderInspector();
        if (activeLeftTab === 'layers') renderLayersTree();
      }
    });

  </script>
</body>
</html>
`;

const finalHtml = htmlContent.replace('/* __CATALOG_DEFINITIONS_PLACEHOLDER__ */', () => generateCatalogCode());
fs.writeFileSync(path.join(rootDir, 'index.html'), finalHtml, 'utf8');
fs.writeFileSync(path.join(rootDir, 'showcase', 'index.html'), finalHtml, 'utf8');

console.log('✓ Successfully generated Figma Canvas Studio with all 112 components in index.html and showcase/index.html!');


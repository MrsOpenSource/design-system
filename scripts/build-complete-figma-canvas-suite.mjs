import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { generateCatalogCode } from './generate-all-112-catalog.mjs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

const studioGeneratorPath = path.join(rootDir, 'scripts', 'generate-figma-canvas-studio.mjs');

// Read current generate-figma-canvas-studio.mjs
let content = fs.readFileSync(studioGeneratorPath, 'utf8');

console.log('Building complete Figma Canvas Suite (Freeform X/Y, Rulers, Dot Grid, Atomic Sub-Layers, Component Studio)...');

// 1. UPDATE CSS IN generate-figma-canvas-studio.mjs
// We want to add:
// - Rulers & Dot grid CSS
// - Workspace switcher CSS
// - Component Studio CSS
// - Canvas subtoolbar CSS
// - Clean bounding box (NO hovering quick toolbar)
// - Clean .element-select-badge position

const cssToReplace = `    /* Placed Component Bounding Box */
    .figma-element-box {
      box-sizing: border-box;
      border: 1.5px solid transparent;
      border-radius: 6px;
      position: relative;
      transition: border-color 0.12s ease, box-shadow 0.12s ease, opacity 0.12s ease;
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
      cursor: default;
    }

    .figma-element-box.is-dragging {
      opacity: 0.35 !important;
      border: 2px dashed var(--figma-blue) !important;
      transform: scale(0.99);
    }

    /* Drop indicator lines on elements */
    .figma-element-box.drop-target-before::before {
      content: '';
      position: absolute;
      left: -9px;
      top: -4px;
      bottom: -4px;
      width: 4px;
      background: var(--figma-blue);
      border-radius: 2px;
      box-shadow: 0 0 8px rgba(37,99,235,0.8);
      z-index: 60;
      pointer-events: none;
    }

    .figma-element-box.drop-target-after::after {
      content: '';
      position: absolute;
      right: -9px;
      top: -4px;
      bottom: -4px;
      width: 4px;
      background: var(--figma-blue);
      border-radius: 2px;
      box-shadow: 0 0 8px rgba(37,99,235,0.8);
      z-index: 60;
      pointer-events: none;
    }

    /* Selected Element Badge Header */
    .element-select-badge {
      position: absolute;
      top: -14px;
      left: 6px;
      background: var(--figma-blue);
      color: white;
      font-size: 10px;
      font-weight: 600;
      letter-spacing: 0.3px;
      padding: 2px 8px;
      border-radius: 4px;
      display: none;
      align-items: center;
      gap: 5px;
      z-index: 35;
      cursor: grab;
      box-shadow: 0 2px 6px rgba(0,0,0,0.18);
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

    /* Canvas Quick Toolbar (Floating above selected element) */
    .canvas-quick-toolbar {
      position: absolute;
      top: -34px;
      right: 0;
      background: #0F172A;
      color: #F8FAFC;
      border-radius: 6px;
      padding: 3px 6px;
      display: none;
      align-items: center;
      gap: 4px;
      z-index: 40;
      box-shadow: 0 4px 12px rgba(0,0,0,0.25);
      user-select: none;
      font-size: 11px;
    }

    .figma-element-box.selected .canvas-quick-toolbar {
      display: inline-flex;
    }

    .quick-pill {
      background: rgba(255,255,255,0.1);
      border: none;
      color: #E2E8F0;
      font-size: 10px;
      font-weight: 500;
      padding: 2px 6px;
      border-radius: 4px;
      cursor: pointer;
      display: inline-flex;
      align-items: center;
      gap: 3px;
      transition: all 0.1s ease;
      white-space: nowrap;
      font-family: inherit;
    }

    .quick-pill:hover {
      background: rgba(255,255,255,0.25);
      color: white;
    }

    .quick-pill.active {
      background: var(--figma-blue);
      color: white;
      font-weight: 600;
    }

    .quick-pill.danger:hover {
      background: #EF4444;
      color: white;
    }

    .quick-sep {
      width: 1px;
      height: 12px;
      background: rgba(255,255,255,0.2);
      margin: 0 2px;
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

    /* Floating Real-Time Dimension HUD during resize */
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

    /* Resizing active body lock */
    body.is-resizing {
      user-select: none !important;
      -webkit-user-select: none !important;
    }`;

const newFullFigmaCss = `    /* Studio Workspace Mode Switcher in Header */
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
       COMPONENT STUDIO (DEDICATED 112 COMPONENT EDITOR CANVAS)
       -------------------------------------------------------------------------- */
    #component-studio-view {
      display: none;
      flex: 1;
      height: calc(100vh - 48px);
      overflow: hidden;
    }

    .comp-studio-workbench {
      flex: 1;
      background: #F8FAFC;
      display: flex;
      flex-direction: column;
      overflow-y: auto;
      padding: 24px;
      box-sizing: border-box;
    }

    .comp-studio-header {
      background: white;
      border: 1px solid var(--figma-border);
      border-radius: 8px;
      padding: 16px 20px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 20px;
      box-shadow: 0 1px 3px rgba(0,0,0,0.05);
    }

    .comp-studio-info h2 {
      font-size: 18px;
      font-weight: 700;
      color: var(--figma-text-main);
      display: flex;
      align-items: center;
      gap: 8px;
      margin: 0 0 4px 0;
    }

    .comp-studio-info p {
      margin: 0;
      font-size: 12px;
      color: var(--figma-text-muted);
    }

    .comp-states-section-title {
      font-size: 13px;
      font-weight: 700;
      color: var(--figma-text-main);
      margin: 20px 0 12px 0;
      display: flex;
      align-items: center;
      gap: 6px;
    }

    .comp-states-grid {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 16px;
      margin-bottom: 24px;
    }

    .state-card {
      background: white;
      border: 1px solid var(--figma-border);
      border-radius: 8px;
      padding: 16px;
      display: flex;
      flex-direction: column;
      box-shadow: 0 1px 2px rgba(0,0,0,0.04);
    }

    .state-card-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 12px;
      padding-bottom: 8px;
      border-bottom: 1px solid #F1F5F9;
    }

    .state-title {
      font-size: 11px;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 0.5px;
      color: var(--figma-text-muted);
    }

    .state-preview-box {
      min-height: 80px;
      display: flex;
      align-items: center;
      justify-content: center;
      background: #FAFAFA;
      border: 1px dashed #E2E8F0;
      border-radius: 6px;
      padding: 16px;
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
    }`;

if (content.includes(cssToReplace)) {
  content = content.replace(cssToReplace, newFullFigmaCss);
  console.log('✓ Replaced CSS with full Figma canvas suite styling');
} else {
  console.log('Notice: Exact CSS target block not found, performing targeted replacement...');
  const boxStart = content.indexOf('/* Placed Component Bounding Box */');
  const boxEnd = content.indexOf('/* --------------------------------------------------------------------------\n       RIGHT PANEL: FIGMA PROPERTY INSPECTOR');
  if (boxStart !== -1 && boxEnd !== -1) {
    content = content.substring(0, boxStart) + newFullFigmaCss + '\n\n    ' + content.substring(boxEnd);
    console.log('✓ Replaced CSS block between bounding box and right panel');
  }
}

// 2. INJECT TOPBAR MODE SWITCHER IN HEADER
const headerSearchTarget = '<header class="figma-topbar">';
const newHeaderContent = `<header class="figma-topbar">
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
  </header>`;

const headerEndTarget = '</header>';
const headerStartIdx = content.indexOf('<header class="figma-topbar">');
const headerEndIdx = content.indexOf(headerEndTarget, headerStartIdx);

if (headerStartIdx !== -1 && headerEndIdx !== -1) {
  content = content.substring(0, headerStartIdx) + newHeaderContent + content.substring(headerEndIdx + headerEndTarget.length);
  console.log('✓ Updated topbar header with Workspace Mode Switcher');
}

// 3. UPDATE MAIN CANVAS AREA TO INCLUDE SUB-TOOLBAR, RULERS, AND DOT GRID
const mainCanvasTargetStart = '<main class="figma-canvas-area" onclick="handleCanvasBgClick(event)">';
const mainCanvasTargetEnd = '</main>';

const mcStartIdx = content.indexOf(mainCanvasTargetStart);
const mcEndIdx = content.indexOf(mainCanvasTargetEnd, mcStartIdx);

const newMainCanvasContent = `<main class="figma-canvas-area" id="page-canvas-area">
      <!-- Canvas Sub-Toolbar: Placement Mode, Rulers, Grid, Snap, Coordinates -->
      <div class="canvas-subtoolbar" id="canvas-subtoolbar">
        <div class="canvas-subtoolbar-group">
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
          <button class="tool-btn active" id="btn-vp-desktop" onclick="setViewportMode('desktop')">
            <i data-lucide="monitor" style="width:12px;height:12px;"></i> Desktop (1120)
          </button>
          <button class="tool-btn" id="btn-vp-tablet" onclick="setViewportMode('tablet')">
            <i data-lucide="tablet" style="width:12px;height:12px;"></i> Tablet (768)
          </button>
          <button class="tool-btn" id="btn-vp-mobile" onclick="setViewportMode('mobile')">
            <i data-lucide="smartphone" style="width:12px;height:12px;"></i> Mobile (375)
          </button>
        </div>
      </div>

      <!-- Ruler & Artboard Viewport Container -->
      <div class="ruler-canvas-container" id="ruler-canvas-container" onmousemove="handleCanvasMouseMove(event)" onclick="handleCanvasBgClick(event)">
        
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
          <div style="flex:1; overflow:auto; padding:32px; display:flex; justify-content:center;">
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

    <!-- COMPONENT STUDIO VIEW (DEDICATED 112 COMPONENT EDITOR CANVAS) -->
    <div id="component-studio-view">
      <!-- Left sidebar is shared, center is the Component Workbench -->
      <main class="comp-studio-workbench" id="comp-studio-workbench">
        <div class="comp-studio-header" id="comp-studio-header">
          <!-- Injected by renderComponentStudio() -->
        </div>

        <!-- Interactive States Matrix -->
        <div class="comp-states-section-title">
          <i data-lucide="layers" style="width:14px;height:14px;color:var(--brand-primary);"></i>
          <span>Interactive Component States Matrix (Figma Master Definition)</span>
        </div>
        <div class="comp-states-grid" id="comp-states-grid">
          <!-- 6 interactive states rendered by JS -->
        </div>

        <!-- Live Interactive Playground Sandbox -->
        <div class="comp-states-section-title">
          <i data-lucide="play" style="width:14px;height:14px;color:var(--brand-secondary);"></i>
          <span>Live Interactive Sandbox</span>
        </div>
        <div style="background:white; border:1px solid var(--figma-border); border-radius:8px; padding:32px; display:flex; flex-direction:column; align-items:center; justify-content:center; min-height:160px; box-shadow:0 1px 3px rgba(0,0,0,0.05);" id="comp-sandbox-stage">
          <!-- Injected by JS -->
        </div>
      </main>
    </div>`;

if (mcStartIdx !== -1 && mcEndIdx !== -1) {
  content = content.substring(0, mcStartIdx) + newMainCanvasContent + content.substring(mcEndIdx + mainCanvasTargetEnd.length);
  console.log('✓ Updated canvas area with Rulers, Subtoolbar, Freeform frame, and Component Studio View');
}

// 4. WRITE UPDATED generate-figma-canvas-studio.mjs
fs.writeFileSync(studioGeneratorPath, content, 'utf8');
console.log('✓ Successfully wrote HTML/CSS upgrades to scripts/generate-figma-canvas-studio.mjs');


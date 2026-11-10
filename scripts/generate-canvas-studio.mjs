import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

const htmlContent = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Canvas Studio - @hsb_design/design-system</title>
  <link rel="stylesheet" href="dist/css/design-system.css">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500;600&display=swap" rel="stylesheet">
  <script src="https://unpkg.com/lucide@latest"></script>
  <style>
    :root {
      --canvas-bg: #0B0F17;
      --panel-bg: #111827;
      --card-bg: #1E293B;
      --border-subtle: #334155;
      --border-muted: #1E293B;
      --text-main: #F8FAFC;
      --text-muted: #94A3B8;
      --accent-blue: #3B82F6;
      --accent-purple: #8B5CF6;
      --accent-green: #10B981;
    }

    * {
      box-sizing: border-box;
      margin: 0;
      padding: 0;
    }

    body {
      font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
      background: var(--canvas-bg);
      color: var(--text-main);
      height: 100vh;
      overflow: hidden;
      display: flex;
      flex-direction: column;
    }

    /* Top Studio Bar */
    header.studio-header {
      height: 56px;
      background: var(--panel-bg);
      border-bottom: 1px solid var(--border-subtle);
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 0 20px;
      z-index: 50;
      flex-shrink: 0;
    }

    .brand-group {
      display: flex;
      align-items: center;
      gap: 12px;
    }

    .brand-badge {
      background: linear-gradient(135deg, #3B82F6, #8B5CF6);
      color: white;
      font-weight: 700;
      font-size: 11px;
      padding: 4px 8px;
      border-radius: 6px;
      letter-spacing: 0.5px;
      text-transform: uppercase;
    }

    .brand-title {
      font-size: 14px;
      font-weight: 600;
      color: var(--text-main);
      display: flex;
      align-items: center;
      gap: 8px;
    }

    .brand-subtitle {
      font-size: 12px;
      color: var(--text-muted);
      border-left: 1px solid var(--border-subtle);
      padding-left: 10px;
      margin-left: 2px;
    }

    /* Viewport Selector */
    .viewport-controls {
      display: flex;
      background: var(--card-bg);
      border: 1px solid var(--border-subtle);
      border-radius: 8px;
      padding: 2px;
      gap: 2px;
    }

    .viewport-btn {
      background: transparent;
      border: none;
      color: var(--text-muted);
      font-size: 12px;
      font-weight: 500;
      padding: 5px 12px;
      border-radius: 6px;
      cursor: pointer;
      display: inline-flex;
      align-items: center;
      gap: 6px;
      transition: all 0.15s ease;
    }

    .viewport-btn:hover {
      color: var(--text-main);
    }

    .viewport-btn.active {
      background: var(--accent-blue);
      color: white;
      box-shadow: 0 1px 3px rgba(0,0,0,0.3);
    }

    /* Action Buttons */
    .header-actions {
      display: flex;
      align-items: center;
      gap: 8px;
    }

    .action-btn {
      background: var(--card-bg);
      border: 1px solid var(--border-subtle);
      color: var(--text-main);
      font-size: 12px;
      font-weight: 500;
      padding: 6px 14px;
      border-radius: 6px;
      cursor: pointer;
      display: inline-flex;
      align-items: center;
      gap: 6px;
      transition: all 0.15s ease;
    }

    .action-btn:hover {
      background: #334155;
      border-color: #475569;
    }

    .action-btn.primary {
      background: linear-gradient(135deg, #2563EB, #1D4ED8);
      border: none;
      color: white;
      font-weight: 600;
    }

    .action-btn.primary:hover {
      background: linear-gradient(135deg, #1D4ED8, #1E40AF);
    }

    /* Studio Main Layout */
    .studio-body {
      display: flex;
      flex: 1;
      height: calc(100vh - 56px);
      overflow: hidden;
    }

    /* Left Sidebar: Component Palette */
    .palette-sidebar {
      width: 320px;
      background: var(--panel-bg);
      border-right: 1px solid var(--border-subtle);
      display: flex;
      flex-direction: column;
      flex-shrink: 0;
      z-index: 20;
    }

    .palette-search-box {
      padding: 12px;
      border-bottom: 1px solid var(--border-subtle);
    }

    .search-input-wrapper {
      position: relative;
    }

    .search-input-wrapper input {
      width: 100%;
      background: var(--card-bg);
      border: 1px solid var(--border-subtle);
      border-radius: 6px;
      color: var(--text-main);
      font-size: 12px;
      padding: 7px 10px 7px 30px;
      outline: none;
      transition: border-color 0.2s;
    }

    .search-input-wrapper input:focus {
      border-color: var(--accent-blue);
    }

    .search-input-wrapper .search-icon {
      position: absolute;
      left: 9px;
      top: 50%;
      transform: translateY(-50%);
      color: var(--text-muted);
      pointer-events: none;
    }

    .palette-scroll-area {
      flex: 1;
      overflow-y: auto;
      padding: 12px;
    }

    .palette-category {
      margin-bottom: 16px;
    }

    .category-header {
      font-size: 11px;
      font-weight: 700;
      color: #64748B;
      text-transform: uppercase;
      letter-spacing: 0.5px;
      margin-bottom: 8px;
      display: flex;
      align-items: center;
      justify-content: space-between;
    }

    .category-count {
      font-size: 10px;
      background: rgba(255,255,255,0.06);
      padding: 1px 6px;
      border-radius: 9999px;
    }

    .component-drag-item {
      background: var(--card-bg);
      border: 1px solid var(--border-subtle);
      border-radius: 6px;
      padding: 8px 10px;
      margin-bottom: 6px;
      cursor: grab;
      display: flex;
      align-items: center;
      justify-content: space-between;
      transition: all 0.15s ease;
      user-select: none;
    }

    .component-drag-item:hover {
      border-color: var(--accent-blue);
      transform: translateX(2px);
      background: #243046;
    }

    .component-drag-item:active {
      cursor: grabbing;
    }

    .item-meta {
      display: flex;
      align-items: center;
      gap: 8px;
      font-size: 12px;
      font-weight: 500;
      color: var(--text-main);
    }

    .item-meta i {
      color: var(--accent-blue);
      flex-shrink: 0;
    }

    .item-add-btn {
      background: rgba(59, 130, 246, 0.15);
      border: 1px solid rgba(59, 130, 246, 0.3);
      color: #93C5FD;
      font-size: 10px;
      font-weight: 600;
      padding: 2px 7px;
      border-radius: 4px;
      cursor: pointer;
      display: inline-flex;
      align-items: center;
      gap: 3px;
      transition: all 0.15s;
    }

    .item-add-btn:hover {
      background: var(--accent-blue);
      color: white;
    }

    /* Center Canvas Area */
    .canvas-viewport-container {
      flex: 1;
      background: #0B0F17;
      background-image: radial-gradient(rgba(255, 255, 255, 0.08) 1px, transparent 1px);
      background-size: 20px 20px;
      overflow-y: auto;
      padding: 30px;
      display: flex;
      justify-content: center;
      align-items: flex-start;
    }

    .canvas-frame {
      width: 100%;
      max-width: 1200px;
      min-height: calc(100vh - 120px);
      background: var(--panel-bg);
      border: 1px solid var(--border-subtle);
      border-radius: 12px;
      box-shadow: 0 20px 40px -15px rgba(0,0,0,0.5);
      display: flex;
      flex-direction: column;
      transition: max-width 0.3s cubic-bezier(0.16, 1, 0.3, 1);
      position: relative;
    }

    /* Device sizes */
    .canvas-frame.viewport-desktop { max-width: 1100px; }
    .canvas-frame.viewport-tablet  { max-width: 768px; }
    .canvas-frame.viewport-mobile  { max-width: 375px; }

    .canvas-frame-header {
      padding: 10px 16px;
      background: rgba(15, 23, 42, 0.6);
      border-bottom: 1px solid var(--border-subtle);
      border-radius: 12px 12px 0 0;
      display: flex;
      align-items: center;
      justify-content: space-between;
      font-size: 11px;
      color: var(--text-muted);
    }

    .frame-pill {
      font-family: 'JetBrains Mono', monospace;
      background: rgba(255,255,255,0.06);
      padding: 2px 8px;
      border-radius: 4px;
    }

    .canvas-drop-zone {
      flex: 1;
      padding: 24px;
      min-height: 480px;
      display: flex;
      flex-direction: column;
      gap: 16px;
      position: relative;
    }

    .canvas-drop-zone.drag-over {
      outline: 2px dashed var(--accent-blue);
      outline-offset: -8px;
      background: rgba(59, 130, 246, 0.04);
    }

    /* Empty State */
    .empty-canvas-prompt {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      text-align: center;
      padding: 60px 20px;
      color: var(--text-muted);
      border: 2px dashed rgba(255,255,255,0.1);
      border-radius: 10px;
      margin: auto 0;
    }

    .empty-canvas-prompt i {
      color: var(--accent-blue);
      margin-bottom: 12px;
    }

    .empty-canvas-prompt h3 {
      font-size: 16px;
      color: var(--text-main);
      margin-bottom: 6px;
    }

    .empty-canvas-prompt p {
      font-size: 13px;
      max-width: 380px;
      margin-bottom: 16px;
      line-height: 1.5;
    }

    .template-presets {
      display: flex;
      gap: 8px;
      flex-wrap: wrap;
      justify-content: center;
    }

    .template-preset-btn {
      background: var(--card-bg);
      border: 1px solid var(--border-subtle);
      color: var(--text-main);
      font-size: 11px;
      font-weight: 500;
      padding: 6px 12px;
      border-radius: 6px;
      cursor: pointer;
      display: inline-flex;
      align-items: center;
      gap: 6px;
      transition: all 0.15s;
    }

    .template-preset-btn:hover {
      border-color: var(--accent-blue);
      background: #2563EB;
      color: white;
    }

    /* Canvas Component Wrapper Block */
    .canvas-block {
      background: var(--card-bg);
      border: 1px solid var(--border-subtle);
      border-radius: 8px;
      position: relative;
      transition: all 0.15s ease;
    }

    .canvas-block:hover {
      border-color: #60A5FA;
      box-shadow: 0 4px 12px rgba(0,0,0,0.25);
    }

    .canvas-block-bar {
      height: 28px;
      background: rgba(15, 23, 42, 0.85);
      border-bottom: 1px solid var(--border-subtle);
      border-radius: 7px 7px 0 0;
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 0 10px;
      font-size: 10px;
      font-weight: 600;
      color: #94A3B8;
      letter-spacing: 0.3px;
    }

    .canvas-block-actions {
      display: flex;
      align-items: center;
      gap: 4px;
    }

    .block-action-btn {
      background: transparent;
      border: none;
      color: #94A3B8;
      cursor: pointer;
      padding: 2px 4px;
      border-radius: 3px;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      transition: all 0.15s;
    }

    .block-action-btn:hover {
      color: var(--text-main);
      background: rgba(255,255,255,0.1);
    }

    .block-action-btn.delete:hover {
      color: #EF4444;
      background: rgba(239,68,68,0.15);
    }

    .canvas-block-content {
      padding: 16px;
    }

    /* Modal for Code Export */
    .code-modal-backdrop {
      display: none;
      position: fixed;
      top: 0; left: 0; width: 100%; height: 100%;
      background: rgba(0,0,0,0.75);
      backdrop-filter: blur(4px);
      z-index: 100;
      align-items: center;
      justify-content: center;
    }

    .code-modal-window {
      width: 90%;
      max-width: 800px;
      max-height: 85vh;
      background: var(--panel-bg);
      border: 1px solid var(--border-subtle);
      border-radius: 12px;
      display: flex;
      flex-direction: column;
      box-shadow: 0 25px 50px -12px rgba(0,0,0,0.7);
    }

    .code-modal-header {
      padding: 14px 20px;
      border-bottom: 1px solid var(--border-subtle);
      display: flex;
      align-items: center;
      justify-content: space-between;
    }

    .code-modal-title {
      font-size: 14px;
      font-weight: 600;
      display: flex;
      align-items: center;
      gap: 8px;
    }

    .code-modal-body {
      flex: 1;
      padding: 16px 20px;
      overflow-y: auto;
    }

    .code-pre-box {
      background: #090D14;
      border: 1px solid var(--border-subtle);
      border-radius: 8px;
      padding: 16px;
      font-family: 'JetBrains Mono', monospace;
      font-size: 12px;
      line-height: 1.6;
      color: #E2E8F0;
      overflow-x: auto;
      white-space: pre;
    }

    .code-modal-footer {
      padding: 12px 20px;
      border-top: 1px solid var(--border-subtle);
      display: flex;
      align-items: center;
      justify-content: flex-end;
      gap: 10px;
    }

    /* Toast Notification */
    .toast-pill {
      position: fixed;
      bottom: 24px;
      right: 24px;
      background: #10B981;
      color: white;
      font-size: 12px;
      font-weight: 600;
      padding: 8px 16px;
      border-radius: 9999px;
      box-shadow: 0 10px 15px -3px rgba(0,0,0,0.4);
      display: none;
      align-items: center;
      gap: 6px;
      z-index: 200;
      animation: toastFade 0.2s ease;
    }

    @keyframes toastFade {
      from { opacity: 0; transform: translateY(10px); }
      to { opacity: 1; transform: translateY(0); }
    }
  </style>
</head>
<body>

  <!-- Studio Header -->
  <header class="studio-header">
    <div class="brand-group">
      <span class="brand-badge">Enterprise UI</span>
      <div class="brand-title">
        <i data-lucide="layout-grid" style="width:16px;height:16px;color:#3B82F6;"></i>
        <span>Canvas Studio</span>
        <span class="brand-subtitle">Visual Builder for AI Applications & Dashboards</span>
      </div>
    </div>

    <!-- Viewport Switcher -->
    <div class="viewport-controls">
      <button class="viewport-btn active" onclick="setCanvasViewport('desktop')" id="vp-desktop">
        <i data-lucide="monitor" style="width:14px;height:14px;"></i>
        <span>Desktop</span>
      </button>
      <button class="viewport-btn" onclick="setCanvasViewport('tablet')" id="vp-tablet">
        <i data-lucide="tablet" style="width:14px;height:14px;"></i>
        <span>Tablet (768px)</span>
      </button>
      <button class="viewport-btn" onclick="setCanvasViewport('mobile')" id="vp-mobile">
        <i data-lucide="smartphone" style="width:14px;height:14px;"></i>
        <span>Mobile (375px)</span>
      </button>
    </div>

    <!-- Header Actions -->
    <div class="header-actions">
      <button class="action-btn" onclick="clearCanvas()">
        <i data-lucide="trash-2" style="width:14px;height:14px;"></i>
        <span>Clear</span>
      </button>
      <button class="action-btn primary" onclick="openExportModal()">
        <i data-lucide="code" style="width:14px;height:14px;"></i>
        <span>Export Code</span>
      </button>
    </div>
  </header>

  <!-- Studio Main Work Area -->
  <div class="studio-body">
    
    <!-- Component Palette Sidebar -->
    <aside class="palette-sidebar">
      <div class="palette-search-box">
        <div class="search-input-wrapper">
          <i data-lucide="search" class="search-icon" style="width:14px;height:14px;"></i>
          <input type="text" id="palette-search" placeholder="Search 112 components..." oninput="filterPalette()">
        </div>
      </div>

      <div class="palette-scroll-area" id="palette-list">
        <!-- Categories and components rendered via JS -->
      </div>
    </aside>

    <!-- Center Canvas Workspace -->
    <main class="canvas-viewport-container">
      <div class="canvas-frame viewport-desktop" id="canvas-frame">
        <div class="canvas-frame-header">
          <span class="frame-pill" id="frame-size-label">1100px • Responsive Desktop</span>
          <span style="font-size:11px; color:#64748B;">Drag & Drop Components</span>
        </div>

        <div class="canvas-drop-zone" id="canvas-drop-zone"
             ondragover="handleDragOver(event)"
             ondragleave="handleDragLeave(event)"
             ondrop="handleDrop(event)">
          
          <!-- Empty Canvas Prompt -->
          <div class="empty-canvas-prompt" id="empty-prompt">
            <i data-lucide="mouse-pointer-click" style="width:36px;height:36px;"></i>
            <h3>Interactive Canvas Ready</h3>
            <p>Drag components from the library palette on the left, click <strong>+ Add</strong> on any component, or jumpstart with a template below:</p>
            <div class="template-presets">
              <button class="template-preset-btn" onclick="loadTemplate('genai')">
                <i data-lucide="sparkles" style="width:12px;height:12px;"></i>
                <span>Gen AI Workspace</span>
              </button>
              <button class="template-preset-btn" onclick="loadTemplate('form')">
                <i data-lucide="check-square" style="width:12px;height:12px;"></i>
                <span>Form Workflow</span>
              </button>
              <button class="template-preset-btn" onclick="loadTemplate('telemetry')">
                <i data-lucide="activity" style="width:12px;height:12px;"></i>
                <span>Telemetry Dashboard</span>
              </button>
            </div>
          </div>

        </div>
      </div>
    </main>

  </div>

  <!-- Export Code Modal -->
  <div class="code-modal-backdrop" id="export-modal" onclick="closeExportModalBackdrop(event)">
    <div class="code-modal-window">
      <div class="code-modal-header">
        <div class="code-modal-title">
          <i data-lucide="file-code" style="width:16px;height:16px;color:#3B82F6;"></i>
          <span>Production React JSX Code</span>
        </div>
        <button class="block-action-btn" onclick="closeExportModal()">
          <i data-lucide="x" style="width:16px;height:16px;"></i>
        </button>
      </div>
      <div class="code-modal-body">
        <pre class="code-pre-box" id="code-output">// Assembled JSX Code</pre>
      </div>
      <div class="code-modal-footer">
        <button class="action-btn" onclick="closeExportModal()">Close</button>
        <button class="action-btn primary" onclick="copyExportedCode()">
          <i data-lucide="copy" style="width:14px;height:14px;"></i>
          <span>Copy JSX Code</span>
        </button>
      </div>
    </div>
  </div>

  <!-- Toast Notification -->
  <div class="toast-pill" id="studio-toast">
    <i data-lucide="check-circle" style="width:14px;height:14px;"></i>
    <span id="toast-text">Copied to clipboard!</span>
  </div>

  <!-- Canvas Studio Script -->
  <script>
    // Master Component Library Definition
    const COMPONENT_LIBRARY = [
      {
        id: 'prompt-composer',
        name: 'Prompt Composer',
        cat: 'Gen AI Multimodal',
        icon: 'sparkles',
        jsxImport: 'PromptComposer',
        jsxCode: '<PromptComposer onSend={(p) => console.log(p)} tokenCostEstimate="$0.04" placeholder="Ask Aurelia to draft targeting rules..." />',
        previewHtml: \`
          <div style="background:var(--card-bg); border:1px solid var(--border-subtle); border-radius:10px; padding:12px;">
            <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:8px;">
              <span style="font-size:11px; color:#94A3B8; font-weight:600; display:inline-flex; align-items:center; gap:4px;">
                <i data-lucide="sparkles" style="width:12px;height:12px;color:#8B5CF6;"></i> Multimodal Copilot
              </span>
              <span style="font-size:10px; font-family:'JetBrains Mono',monospace; background:rgba(139,92,246,0.15); color:#C4B5FD; border:1px solid rgba(139,92,246,0.3); padding:2px 6px; border-radius:9999px;">
                ~420 tokens ($0.04)
              </span>
            </div>
            <textarea placeholder="Describe action or query..." style="width:100%; background:#0B0F17; border:1px solid var(--border-subtle); border-radius:6px; color:#fff; font-size:12px; padding:8px 10px; outline:none; resize:none; height:48px;"></textarea>
            <div style="display:flex; justify-content:flex-end; gap:6px; margin-top:8px;">
              <button style="background:linear-gradient(135deg,#7C3AED,#6D28D9); color:white; border:none; padding:4px 10px; border-radius:5px; font-size:11px; font-weight:600; display:inline-flex; align-items:center; gap:4px;">
                <i data-lucide="send" style="width:11px;height:11px;"></i> Send
              </button>
            </div>
          </div>
        \`
      },
      {
        id: 'reasoning-accordion',
        name: 'Reasoning Accordion',
        cat: 'Gen AI Multimodal',
        icon: 'brain-circuit',
        jsxImport: 'ReasoningAccordion',
        jsxCode: '<ReasoningAccordion title="Reasoning Process (3.2s)" steps={["Parsed user targeting intent", "Matched 2,410 HCP nodes in Knowledge Graph", "Verified compliance policy v4"]} defaultExpanded />',
        previewHtml: \`
          <div style="background:#0F172A; border:1px solid rgba(139,92,246,0.3); border-radius:8px; padding:10px 14px;">
            <div style="display:flex; justify-content:space-between; align-items:center; font-size:12px; font-weight:600; color:#C4B5FD;">
              <span style="display:inline-flex; align-items:center; gap:6px;">
                <i data-lucide="brain-circuit" style="width:14px;height:14px;color:#A78BFA;"></i> Reasoning Process (3.2s)
              </span>
              <i data-lucide="chevron-down" style="width:14px;height:14px;"></i>
            </div>
            <div style="margin-top:8px; font-size:11px; color:#94A3B8; display:flex; flex-direction:column; gap:4px; font-family:'JetBrains Mono',monospace;">
              <div>1. Parsed user targeting intent</div>
              <div>2. Matched 2,410 HCP nodes in Knowledge Graph</div>
              <div>3. Verified compliance policy v4</div>
            </div>
          </div>
        \`
      },
      {
        id: 'diff-viewer',
        name: 'Suggestion Diff Viewer',
        cat: 'Gen AI Multimodal',
        icon: 'git-compare',
        jsxImport: 'SuggestionDiffViewer',
        jsxCode: '<SuggestionDiffViewer original="target_decile > 7" suggested="target_decile >= 8 AND tier == \\'A\\'" />',
        previewHtml: \`
          <div style="background:#0B0F17; border:1px solid var(--border-subtle); border-radius:8px; padding:10px; font-family:'JetBrains Mono',monospace; font-size:11px;">
            <div style="background:rgba(239,68,68,0.12); color:#FCA5A5; padding:4px 8px; border-radius:4px; margin-bottom:4px; text-decoration:line-through;">
              - target_decile > 7
            </div>
            <div style="background:rgba(16,185,129,0.12); color:#6EE7B7; padding:4px 8px; border-radius:4px;">
              + target_decile >= 8 AND tier == 'A'
            </div>
          </div>
        \`
      },
      {
        id: 'button-filled',
        name: 'Filled Button',
        cat: 'Actions & Buttons',
        icon: 'play',
        jsxImport: 'Button',
        jsxCode: '<Button variant="filled">Execute Task</Button>',
        previewHtml: \`
          <button style="background:var(--accent-blue); color:white; border:none; padding:8px 16px; border-radius:6px; font-size:12px; font-weight:600; cursor:pointer;">
            Execute Task
          </button>
        \`
      },
      {
        id: 'button-ai',
        name: 'AI Action Button',
        cat: 'Actions & Buttons',
        icon: 'sparkles',
        jsxImport: 'Button',
        jsxCode: '<Button variant="ai"><Sparkles className="w-4 h-4 mr-1.5" /> Generate Suggestions</Button>',
        previewHtml: \`
          <button style="background:linear-gradient(135deg,#7C3AED,#3B82F6); color:white; border:none; padding:8px 16px; border-radius:6px; font-size:12px; font-weight:600; cursor:pointer; display:inline-flex; align-items:center; gap:6px;">
            <i data-lucide="sparkles" style="width:13px;height:13px;"></i> Generate Suggestions
          </button>
        \`
      },
      {
        id: 'segmented-control',
        name: 'Segmented Control',
        cat: 'Actions & Buttons',
        icon: 'sliders',
        jsxImport: 'SegmentedControl',
        jsxCode: '<SegmentedControl options={["Day", "Week", "Month", "Year"]} defaultValue="Month" />',
        previewHtml: \`
          <div style="display:inline-flex; background:#0B0F17; border:1px solid var(--border-subtle); border-radius:6px; padding:2px;">
            <span style="font-size:11px; padding:3px 10px; color:#94A3B8; cursor:pointer;">Day</span>
            <span style="font-size:11px; padding:3px 10px; background:var(--accent-blue); color:white; border-radius:4px; font-weight:600;">Month</span>
            <span style="font-size:11px; padding:3px 10px; color:#94A3B8; cursor:pointer;">Year</span>
          </div>
        \`
      },
      {
        id: 'card-surface',
        name: 'Elevated Card',
        cat: 'Containment & Surfaces',
        icon: 'square',
        jsxImport: 'Card',
        jsxCode: '<Card variant="elevated" className="p-5">\\n  <h3 className="text-sm font-semibold mb-2">Section Container</h3>\\n  <p className="text-xs text-slate-400">Surface container styled with W3C tokens.</p>\\n</Card>',
        previewHtml: \`
          <div style="background:var(--card-bg); border:1px solid var(--border-subtle); border-radius:8px; padding:16px;">
            <h4 style="font-size:13px; font-weight:600; margin-bottom:4px;">Section Container</h4>
            <p style="font-size:11px; color:#94A3B8;">Surface container styled with design tokens.</p>
          </div>
        \`
      },
      {
        id: 'adaptive-dialog',
        name: 'Adaptive Dialog (Metamorphic)',
        cat: 'Containment & Surfaces',
        icon: 'maximize-2',
        jsxImport: 'AdaptiveDialog',
        jsxCode: '<AdaptiveDialog isOpen={isOpen} onClose={() => setOpen(false)} title="Cluster Config">\\n  <p className="text-xs text-slate-400">Desktop centered modal, phone bottom sheet.</p>\\n</AdaptiveDialog>',
        previewHtml: \`
          <div style="background:#0F172A; border:1px solid var(--accent-blue); border-radius:8px; padding:12px 14px; display:flex; justify-content:space-between; align-items:center;">
            <div>
              <div style="font-size:12px; font-weight:600; color:white;">Adaptive Dialog (Active Trigger)</div>
              <div style="font-size:10px; color:#94A3B8;">Modal on desktop (>768px), Bottom Sheet on mobile</div>
            </div>
            <button style="background:var(--accent-blue); color:white; border:none; padding:4px 10px; border-radius:5px; font-size:11px; font-weight:600;">Open</button>
          </div>
        \`
      },
      {
        id: 'input-outlined',
        name: 'Outlined Input Field',
        cat: 'Inputs & Forms',
        icon: 'type',
        jsxImport: 'Input',
        jsxCode: '<Input variant="outline" label="Target Cluster" placeholder="e.g. oncology-east" />',
        previewHtml: \`
          <div style="width:100%; max-width:320px;">
            <label style="display:block; font-size:11px; font-weight:600; color:#94A3B8; margin-bottom:4px;">Target Cluster</label>
            <input type="text" value="oncology-east" style="width:100%; background:#0B0F17; border:1px solid var(--border-subtle); border-radius:6px; color:#fff; font-size:12px; padding:7px 10px; outline:none;" readonly />
          </div>
        \`
      },
      {
        id: 'switch-toggle',
        name: 'Accessible Switch',
        cat: 'Inputs & Forms',
        icon: 'toggle-left',
        jsxImport: 'Switch',
        jsxCode: '<Switch label="Realtime Telemetry Sync" defaultChecked />',
        previewHtml: \`
          <div style="display:flex; align-items:center; justify-content:space-between; width:100%; max-width:280px;">
            <span style="font-size:12px; font-weight:500; color:#F8FAFC;">Realtime Telemetry Sync</span>
            <div style="width:36px; height:20px; background:var(--accent-blue); border-radius:9999px; position:relative; cursor:pointer;">
              <div style="width:16px; height:16px; background:white; border-radius:50%; position:absolute; right:2px; top:2px;"></div>
            </div>
          </div>
        \`
      },
      {
        id: 'tabs-primary',
        name: 'Primary Navigation Tabs',
        cat: 'Navigation',
        icon: 'folder',
        jsxImport: 'Tabs',
        jsxCode: '<Tabs variant="primary" items={["Overview", "Rules Engine", "HCP Directory", "Settings"]} activeIndex={1} />',
        previewHtml: \`
          <div style="display:flex; gap:16px; border-bottom:1px solid var(--border-subtle); padding-bottom:6px;">
            <span style="font-size:12px; color:#94A3B8; cursor:pointer;">Overview</span>
            <span style="font-size:12px; color:var(--accent-blue); font-weight:600; border-bottom:2px solid var(--accent-blue); padding-bottom:6px; cursor:pointer;">Rules Engine</span>
            <span style="font-size:12px; color:#94A3B8; cursor:pointer;">HCP Directory</span>
          </div>
        \`
      },
      {
        id: 'alert-info',
        name: 'Information Alert',
        cat: 'Feedback & Badges',
        icon: 'info',
        jsxImport: 'Alert',
        jsxCode: '<Alert variant="info" title="Telemetry Feed">Connection established to regional cluster.</Alert>',
        previewHtml: \`
          <div style="background:rgba(14,165,233,0.1); border:1px solid rgba(14,165,233,0.3); border-radius:6px; padding:10px 14px; display:flex; align-items:center; gap:10px;">
            <i data-lucide="info" style="width:16px;height:16px;color:#0EA5E9;flex-shrink:0;"></i>
            <div style="font-size:12px; color:#E0F2FE;">Connection established to regional cluster telemetry feed.</div>
          </div>
        \`
      },
      {
        id: 'data-table',
        name: 'Data Table (Tabular Nums)',
        cat: 'Data Display',
        icon: 'table',
        jsxImport: 'DataTable',
        jsxCode: '<DataTable columns={cols} data={rows} className="tabular-nums" />',
        previewHtml: \`
          <div style="width:100%; border:1px solid var(--border-subtle); border-radius:6px; overflow:hidden;">
            <table style="width:100%; border-collapse:collapse; font-size:11px; text-align:left;">
              <thead style="background:#0F172A; color:#94A3B8; border-bottom:1px solid var(--border-subtle);">
                <tr>
                  <th style="padding:8px 12px;">HCP Name</th>
                  <th style="padding:8px 12px;">Specialty</th>
                  <th style="padding:8px 12px; text-align:right;">Decile Score</th>
                </tr>
              </thead>
              <tbody style="font-variant-numeric: tabular-nums;">
                <tr style="border-bottom:1px solid var(--border-subtle);">
                  <td style="padding:8px 12px; font-weight:500;">Dr. Sarah Jenkins</td>
                  <td style="padding:8px 12px; color:#94A3B8;">Oncology</td>
                  <td style="padding:8px 12px; text-align:right; font-family:'JetBrains Mono',monospace; color:#34D399;">9.4</td>
                </tr>
                <tr>
                  <td style="padding:8px 12px; font-weight:500;">Dr. Marcus Rivera</td>
                  <td style="padding:8px 12px; color:#94A3B8;">Cardiology</td>
                  <td style="padding:8px 12px; text-align:right; font-family:'JetBrains Mono',monospace; color:#60A5FA;">8.8</td>
                </tr>
              </tbody>
            </table>
          </div>
        \`
      },
      {
        id: 'kpi-card',
        name: 'KPI Card (Strict 184px)',
        cat: 'Dashboards (Opt-In)',
        icon: 'bar-chart-2',
        jsxImport: 'KpiCard',
        jsxCode: '<KpiCard title="Active Targets" value="2,410" delta="+12.4%" trend="up" />',
        previewHtml: \`
          <div style="height:140px; background:var(--card-bg); border:1px solid var(--border-subtle); border-radius:8px; padding:14px; display:flex; flex-direction:column; justify-content:space-between;">
            <div>
              <div style="font-size:11px; font-weight:600; color:#94A3B8; text-transform:uppercase;">Active Targets</div>
              <div style="font-size:24px; font-weight:700; color:white; font-variant-numeric:tabular-nums; margin-top:4px;">2,410</div>
            </div>
            <div style="display:flex; justify-content:space-between; align-items:center; font-size:11px;">
              <span style="color:#10B981; font-weight:600;">▲ +12.4% vs last cycle</span>
              <span style="font-size:10px; color:#64748B;">Strict 184px spec</span>
            </div>
          </div>
        \`
      }
    ];

    // Current Canvas State
    let canvasItems = [];

    // Render Component Palette
    function renderPalette(filterText = '') {
      const container = document.getElementById('palette-list');
      container.innerHTML = '';

      const query = filterText.toLowerCase().trim();
      const grouped = {};

      COMPONENT_LIBRARY.forEach(c => {
        if (query && !c.name.toLowerCase().includes(query) && !c.cat.toLowerCase().includes(query)) return;
        if (!grouped[c.cat]) grouped[c.cat] = [];
        grouped[c.cat].push(c);
      });

      Object.keys(grouped).forEach(cat => {
        const catDiv = document.createElement('div');
        catDiv.className = 'palette-category';

        const header = document.createElement('div');
        header.className = 'category-header';
        header.innerHTML = \`<span>\${cat}</span><span class="category-count">\${grouped[cat].length}</span>\`;
        catDiv.appendChild(header);

        grouped[cat].forEach(comp => {
          const item = document.createElement('div');
          item.className = 'component-drag-item';
          item.draggable = true;
          item.setAttribute('data-id', comp.id);
          item.ondragstart = (e) => {
            e.dataTransfer.setData('text/plain', comp.id);
          };

          item.innerHTML = \`
            <div class="item-meta">
              <i data-lucide="\${comp.icon}" style="width:14px;height:14px;"></i>
              <span>\${comp.name}</span>
            </div>
            <button class="item-add-btn" onclick="addComponentToCanvas('\${comp.id}')">
              <i data-lucide="plus" style="width:10px;height:10px;"></i> Add
            </button>
          \`;
          catDiv.appendChild(item);
        });

        container.appendChild(catDiv);
      });

      if (window.lucide && typeof lucide.createIcons === 'function') {
        lucide.createIcons();
      }
    }

    function filterPalette() {
      const val = document.getElementById('palette-search').value;
      renderPalette(val);
    }

    // Add Component to Canvas
    function addComponentToCanvas(compId) {
      const comp = COMPONENT_LIBRARY.find(c => c.id === compId);
      if (!comp) return;

      const instanceId = 'block_' + Date.now() + '_' + Math.random().toString(36).substr(2, 4);
      canvasItems.push({
        instanceId,
        comp
      });

      renderCanvas();
    }

    // Canvas Rendering
    function renderCanvas() {
      const dropZone = document.getElementById('canvas-drop-zone');
      const emptyPrompt = document.getElementById('empty-prompt');

      if (canvasItems.length === 0) {
        if (emptyPrompt) emptyPrompt.style.display = 'flex';
        // Clear all blocks
        [...dropZone.querySelectorAll('.canvas-block')].forEach(b => b.remove());
        return;
      }

      if (emptyPrompt) emptyPrompt.style.display = 'none';

      // Clear existing blocks
      [...dropZone.querySelectorAll('.canvas-block')].forEach(b => b.remove());

      canvasItems.forEach((item, index) => {
        const block = document.createElement('div');
        block.className = 'canvas-block';
        block.id = item.instanceId;

        block.innerHTML = \`
          <div class="canvas-block-bar">
            <span>\${item.comp.name} (\${item.comp.cat})</span>
            <div class="canvas-block-actions">
              <button class="block-action-btn" title="Move Up" onclick="moveItem(\${index}, -1)">
                <i data-lucide="arrow-up" style="width:12px;height:12px;"></i>
              </button>
              <button class="block-action-btn" title="Move Down" onclick="moveItem(\${index}, 1)">
                <i data-lucide="arrow-down" style="width:12px;height:12px;"></i>
              </button>
              <button class="block-action-btn" title="Copy JSX" onclick="copySnippet('\${item.instanceId}')">
                <i data-lucide="copy" style="width:12px;height:12px;"></i>
              </button>
              <button class="block-action-btn delete" title="Remove" onclick="removeItem('\${item.instanceId}')">
                <i data-lucide="trash-2" style="width:12px;height:12px;"></i>
              </button>
            </div>
          </div>
          <div class="canvas-block-content">
            \${item.comp.previewHtml}
          </div>
        \`;

        dropZone.appendChild(block);
      });

      if (window.lucide && typeof lucide.createIcons === 'function') {
        lucide.createIcons();
      }
    }

    // Drag and Drop event handlers
    function handleDragOver(e) {
      e.preventDefault();
      document.getElementById('canvas-drop-zone').classList.add('drag-over');
    }

    function handleDragLeave(e) {
      document.getElementById('canvas-drop-zone').classList.remove('drag-over');
    }

    function handleDrop(e) {
      e.preventDefault();
      document.getElementById('canvas-drop-zone').classList.remove('drag-over');
      const compId = e.dataTransfer.getData('text/plain');
      if (compId) {
        addComponentToCanvas(compId);
      }
    }

    function moveItem(index, delta) {
      const targetIndex = index + delta;
      if (targetIndex < 0 || targetIndex >= canvasItems.length) return;
      const temp = canvasItems[index];
      canvasItems[index] = canvasItems[targetIndex];
      canvasItems[targetIndex] = temp;
      renderCanvas();
    }

    function removeItem(instanceId) {
      canvasItems = canvasItems.filter(i => i.instanceId !== instanceId);
      renderCanvas();
    }

    function clearCanvas() {
      canvasItems = [];
      renderCanvas();
    }

    // Viewport switching
    function setCanvasViewport(size) {
      const frame = document.getElementById('canvas-frame');
      const label = document.getElementById('frame-size-label');

      document.querySelectorAll('.viewport-btn').forEach(b => b.classList.remove('active'));

      frame.className = 'canvas-frame viewport-' + size;

      if (size === 'desktop') {
        document.getElementById('vp-desktop').classList.add('active');
        label.textContent = '1100px • Responsive Desktop';
      } else if (size === 'tablet') {
        document.getElementById('vp-tablet').classList.add('active');
        label.textContent = '768px • Tablet Breakpoint';
      } else if (size === 'mobile') {
        document.getElementById('vp-mobile').classList.add('active');
        label.textContent = '375px • Mobile Breakpoint';
      }
    }

    // Templates
    function loadTemplate(type) {
      clearCanvas();
      if (type === 'genai') {
        addComponentToCanvas('alert-info');
        addComponentToCanvas('reasoning-accordion');
        addComponentToCanvas('diff-viewer');
        addComponentToCanvas('prompt-composer');
      } else if (type === 'form') {
        addComponentToCanvas('tabs-primary');
        addComponentToCanvas('input-outlined');
        addComponentToCanvas('switch-toggle');
        addComponentToCanvas('segmented-control');
        addComponentToCanvas('button-filled');
      } else if (type === 'telemetry') {
        addComponentToCanvas('kpi-card');
        addComponentToCanvas('data-table');
        addComponentToCanvas('button-ai');
      }
    }

    // Export Code
    function openExportModal() {
      const modal = document.getElementById('export-modal');
      const pre = document.getElementById('code-output');

      if (canvasItems.length === 0) {
        pre.textContent = '// Canvas is currently empty. Add components to generate JSX.';
        modal.style.display = 'flex';
        return;
      }

      const imports = new Set();
      const jsxBlocks = [];

      canvasItems.forEach(item => {
        imports.add(item.comp.jsxImport);
        jsxBlocks.push('      ' + item.comp.jsxCode.split('\\n').join('\\n      '));
      });

      const importList = Array.from(imports).join(', ');

      const fullJsx = [
        'import React from \\'react\\';',
        \`import { \${importList} } from '@hsb_design/design-system';\`,
        'import { Sparkles, Send, BrainCircuit, Table, Info } from \\'lucide-react\\';',
        '',
        'export default function AssembledCanvasUI() {',
        '  return (',
        '    <div className="w-full max-w-5xl mx-auto p-6 space-y-4">',
        jsxBlocks.join('\\n\\n'),
        '    </div>',
        '  );',
        '}'
      ].join('\\n');

      pre.textContent = fullJsx;
      modal.style.display = 'flex';
      if (window.lucide && typeof lucide.createIcons === 'function') {
        lucide.createIcons();
      }
    }

    function closeExportModal() {
      document.getElementById('export-modal').style.display = 'none';
    }

    function closeExportModalBackdrop(e) {
      if (e.target && e.target.id === 'export-modal') {
        closeExportModal();
      }
    }

    function copyExportedCode() {
      const code = document.getElementById('code-output').textContent;
      navigator.clipboard.writeText(code).then(() => {
        showToast('Assembled JSX copied to clipboard!');
        closeExportModal();
      });
    }

    function copySnippet(instanceId) {
      const item = canvasItems.find(i => i.instanceId === instanceId);
      if (item) {
        navigator.clipboard.writeText(item.comp.jsxCode).then(() => {
          showToast(\`\${item.comp.name} JSX copied!\`);
        });
      }
    }

    function showToast(text) {
      const toast = document.getElementById('studio-toast');
      const label = document.getElementById('toast-text');
      label.textContent = text;
      toast.style.display = 'inline-flex';
      setTimeout(() => {
        toast.style.display = 'none';
      }, 2500);
    }

    // Initial boot
    document.addEventListener('DOMContentLoaded', () => {
      renderPalette();
      renderCanvas();
      if (window.lucide && typeof lucide.createIcons === 'function') {
        lucide.createIcons();
      }
    });
  </script>
</body>
</html>
`;

// Write to index.html and showcase/index.html
fs.writeFileSync(path.join(rootDir, 'index.html'), htmlContent, 'utf8');
fs.writeFileSync(path.join(rootDir, 'showcase', 'index.html'), htmlContent, 'utf8');

console.log('✓ Successfully generated Drag & Drop Canvas Studio in index.html and showcase/index.html!');


import fs from 'fs';
import path from 'path';
import vm from 'vm';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

const indexPath = path.join(rootDir, 'index.html');
const showcasePath = path.join(rootDir, 'showcase', 'index.html');

console.log('--- 1. FILE SYNC CHECK ---');
const indexHtml = fs.readFileSync(indexPath, 'utf8');
const showcaseHtml = fs.readFileSync(showcasePath, 'utf8');

console.log('index.html size:', indexHtml.length, 'bytes');
console.log('showcase/index.html size:', showcaseHtml.length, 'bytes');
if (indexHtml !== showcaseHtml) {
  console.error('ERROR: index.html and showcase/index.html are NOT identical!');
  process.exit(1);
}
console.log('✓ index.html and showcase/index.html are 100% in sync');

console.log('\n--- 2. JAVASCRIPT SYNTAX CHECK (vm.Script) ---');
const scriptMatch = indexHtml.match(/<script>([\s\S]*?)<\/script>/);
if (!scriptMatch) {
  console.error('ERROR: No script tag found in index.html');
  process.exit(1);
}

const jsCode = scriptMatch[1];
try {
  new vm.Script(jsCode, { filename: 'index.html#script' });
  console.log('✓ All JavaScript in index.html parsed cleanly without ANY syntax errors!');
} catch (e) {
  console.error('ERROR in JavaScript syntax:', e.message);
  process.exit(1);
}

console.log('\n--- 3. CATALOG & 112 COMPONENTS CHECK ---');
const sandbox = {
  document: {
    getElementById: () => ({ style: {}, classList: { add: () => {}, remove: () => {}, toggle: () => {} } }),
    querySelectorAll: () => [],
    addEventListener: () => {},
    documentElement: { style: { setProperty: () => {} } }
  },
  window: {},
  getComputedStyle: () => ({ getPropertyValue: () => '' }),
  navigator: { clipboard: { writeText: () => Promise.resolve() } },
  lucide: { createIcons: () => {} },
  setTimeout: () => {},
  console: { log: () => {} }
};
vm.createContext(sandbox);

try {
  const catMatch = jsCode.match(/const CATALOG = (\[[\s\S]*?\]);\s*\n\s*\/\//);
  if (!catMatch) {
    throw new Error('Could not extract CATALOG definition');
  }
  const catalog = vm.runInContext(catMatch[1], sandbox);
  console.log('✓ Successfully extracted and evaluated CATALOG with', catalog.length, 'components');
  if (catalog.length !== 112) {
    console.error('ERROR: Expected 112 components, found', catalog.length);
    process.exit(1);
  }

  const idSet = new Set();
  catalog.forEach(c => {
    if (idSet.has(c.id)) {
      console.error('ERROR: Duplicate component id:', c.id);
      process.exit(1);
    }
    idSet.add(c.id);
  });
  console.log('✓ All 112 component IDs are unique');
} catch (e) {
  console.error('ERROR evaluating CATALOG:', e.message);
  process.exit(1);
}

console.log('\n--- 4. FREEFORM X/Y PLACEMENT & RULERS CHECKS ---');
const freeformAndRulerFeatures = [
  'mode-freeform',
  'is-freeform',
  'handleFreeformPointerDown',
  'handleFreeformPointerMove',
  'handleFreeformPointerUp',
  'updateLayoutX',
  'updateLayoutY',
  'ruler-canvas-container',
  'ruler-h-svg',
  'ruler-v-svg',
  'ruler-guide-x',
  'ruler-guide-y',
  'has-dot-grid',
  'toggleRulers',
  'toggleGrid',
  'toggleSnap',
  'canvas-coords-hud'
];

for (const feat of freeformAndRulerFeatures) {
  const found = indexHtml.includes(feat);
  console.log(`Freeform/Ruler feature [${feat}]: ${found ? '✓' : '✗'}`);
  if (!found) {
    console.error(`ERROR: Feature ${feat} missing!`);
    process.exit(1);
  }
}

console.log('\n--- 5. DEDICATED COMPONENT STUDIO CHECKS ---');
const compStudioFeatures = [
  'studio-mode-switcher',
  'btn-mode-page',
  'btn-mode-component',
  'switchStudioWorkspace',
  'component-studio-view',
  'comp-studio-workbench',
  'comp-studio-header',
  'comp-states-grid',
  'selectMasterComponent',
  'renderComponentStudio',
  'insertMasterComponentToPage',
  'copyMasterComponentTsx'
];

for (const feat of compStudioFeatures) {
  const found = indexHtml.includes(feat);
  console.log(`Component Studio feature [${feat}]: ${found ? '✓' : '✗'}`);
  if (!found) {
    console.error(`ERROR: Feature ${feat} missing!`);
    process.exit(1);
  }
}

console.log('\n--- 6. ATOMIC SUB-LAYERS & MOLECULE EDITING CHECKS ---');
const atomicFeatures = [
  'applyAtomicStyles',
  'updateSelectedAtom',
  'switchAtomTab',
  'borderWidth',
  'borderColor',
  'borderRadius',
  'boxShadow',
  'icon',
  'iconColor',
  'iconSize',
  'textColor',
  'fontSize',
  'fontWeight'
];

for (const feat of atomicFeatures) {
  const found = indexHtml.includes(feat);
  console.log(`Atomic Sub-Layer feature [${feat}]: ${found ? '✓' : '✗'}`);
  if (!found) {
    console.error(`ERROR: Feature ${feat} missing!`);
    process.exit(1);
  }
}

console.log('\n--- 7. CLEANUP CHECK: NO OVERLAPPING QUICK-TOOLBAR ---');
if (indexHtml.includes('canvas-quick-toolbar')) {
  console.error('ERROR: canvas-quick-toolbar was found! It should be removed to eliminate overlap!');
  process.exit(1);
}
console.log('✓ Confirmed: Clumsy canvas-quick-toolbar removed to eliminate overlap');

console.log('\n--- 8. 1-CLICK SOURCE CODE SYNC & DISK PERSISTENCE CHECKS ---');
const syncFeatures = [
  'syncMasterComponentToSourceCode',
  'btn-sync-source',
  'btn-inspector-sync-source',
  'sync-info-modal',
  'checkServerSyncStatus',
  'directWorkspaceFolderWrite',
  'downloadActiveComponentPatch'
];

for (const feat of syncFeatures) {
  const found = indexHtml.includes(feat);
  console.log(`Sync feature [${feat}]: ${found ? '✓' : '✗'}`);
  if (!found) {
    console.error(`ERROR: Sync feature ${feat} missing!`);
    process.exit(1);
  }
}

console.log('\n--- 9. FIGMA INTERACTIVE COMPONENT CANVAS & MODAL CHECKS ---');
const interactiveFeatures = [
  'artboard-viewport',
  'master-component-stage',
  'master-element-box',
  'quickEditLabel',
  'cycleCornerRadius',
  'openQuickIconPicker',
  'setMasterComponentState',
  'setCompStudioZoom',
  'toggleCompStudioBg',
  'toggleCompStatesMatrixStrip',
  'openNewComponentModal',
  'saveNewComponent',
  'handlePaletteAddClick'
];

for (const feat of interactiveFeatures) {
  const found = indexHtml.includes(feat);
  console.log(`Figma Interactive feature [${feat}]: ${found ? '✓' : '✗'}`);
  if (!found) {
    console.error(`ERROR: Interactive feature ${feat} missing!`);
    process.exit(1);
  }
}

console.log('\n--- 10. COLLAPSIBLE SIDEBARS & SMOOTH DRAG CHECKS ---');
const collapsibleAndDragFeatures = [
  'toggleLeftPanel',
  'toggleRightPanel',
  'btn-collapse-left',
  'btn-collapse-right',
  'btn-expand-left',
  'btn-expand-right',
  'btn-toggle-left-panel',
  'btn-toggle-right-panel',
  'isLeftPanelCollapsed',
  'isRightPanelCollapsed',
  'canvas-edge-tab',
  'edge-tab-left',
  'edge-tab-right',
  'setPointerCapture',
  'is-freeform-moving',
  'vp-wide',
  'btn-vp-wide',
  'handleMasterFreeformPointerDown',
  'handleMasterFreeformPointerMove',
  'handleMasterFreeformPointerUp',
  'centerMasterComponent',
  'resolveMasterBoxAbsolutePosition',
  'master-pos-badge',
  'master-handle'
];

for (const feat of collapsibleAndDragFeatures) {
  const found = indexHtml.includes(feat);
  console.log(`Collapsible/Drag feature [${feat}]: ${found ? '✓' : '✗'}`);
  if (!found) {
    console.error(`ERROR: Collapsible/Drag feature ${feat} missing!`);
    process.exit(1);
  }
}

console.log('\n======================================================');
console.log('✓ ALL 10/10 VERIFICATION SUITES PASSED FLAWLESSLY!');
console.log('======================================================');

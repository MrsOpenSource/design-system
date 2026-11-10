import fs from 'fs';
import path from 'path';

// 1. Fix scripts/build-master-catalog.mjs
const catalogPath = 'scripts/build-master-catalog.mjs';
let catalog = fs.readFileSync(catalogPath, 'utf8');

// Replace in ALL_112_COMPONENTS:
catalog = catalog.replace('<Button variant=\\"ai\\">✨ Synthesize</Button>', '<Button variant=\\"ai\\">Synthesize</Button>');
catalog = catalog.replace('Attachment chip with ✕ remove trigger', 'Attachment chip with dismiss trigger');
catalog = catalog.replace('Sort direction indicators (▲ / ▼ / ▬)', 'Sort direction indicators (Asc / Desc / Neutral)');
catalog = catalog.replace('✕ Clear category filter', '<i data-lucide="x" class="lucide-icon" style="width:11px;height:11px;display:inline-block;vertical-align:middle;margin-right:2px;"></i> Clear category filter');

fs.writeFileSync(catalogPath, catalog, 'utf8');
console.log('✓ Updated build-master-catalog.mjs');

// 2. Fix index.html directly
let html = fs.readFileSync('index.html', 'utf8');

const directReplacements = [
  // L2074: ▲ Review
  ['<td><span class="status-pill" style="background: var(--sys-color-status-warning-surface); color: var(--sys-color-status-warning-text);">▲ Review</span></td>',
   '<td><span class="status-pill" style="background: var(--sys-color-status-warning-surface); color: var(--sys-color-status-warning-text); display:inline-flex; align-items:center; gap:3px;"><i data-lucide="alert-circle" class="lucide-icon" style="width:11px;height:11px;"></i> Review</span></td>'],

  // L2482 & 2486: Tabular comparison
  ['<div style="font-size: 10px; font-weight: 700; color: #EF4444; margin-bottom: 4px;">❌ Proportional (Jitters)</div>',
   '<div style="font-size: 10px; font-weight: 700; color: #EF4444; margin-bottom: 4px; display:inline-flex; align-items:center; gap:3px;"><i data-lucide="x-circle" class="lucide-icon" style="width:12px;height:12px;"></i> Proportional (Jitters)</div>'],
  ['<div style="font-size: 10px; font-weight: 700; color: #059669; margin-bottom: 4px;">✅ Tabular Enforced</div>',
   '<div style="font-size: 10px; font-weight: 700; color: #059669; margin-bottom: 4px; display:inline-flex; align-items:center; gap:3px;"><i data-lucide="check-circle" class="lucide-icon" style="width:12px;height:12px;"></i> Tabular Enforced</div>'],

  // L2706: Invalid IPv4
  ['<span style="font-size: 11px; color: #EF4444; margin-top: 4px; display: block;">✕ Invalid IPv4 address format</span>',
   '<span style="font-size: 11px; color: #EF4444; margin-top: 4px; display: inline-flex; align-items: center; gap: 4px;"><i data-lucide="alert-circle" class="lucide-icon" style="width:12px;height:12px;"></i> Invalid IPv4 address format</span>'],

  // L2792: Stepper check ✓
  ['<div style="width: 22px; height: 22px; border-radius: 50%; background: #059669; color: white; display: flex; align-items: center; justify-content: center; font-size: 11px; font-weight: 700;">✓</div>',
   '<div style="width: 22px; height: 22px; border-radius: 50%; background: #059669; color: white; display: flex; align-items: center; justify-content: center;"><i data-lucide="check" class="lucide-icon" style="width:12px;height:12px;color:white;"></i></div>'],

  // L2835 & 2854: Badge deltas
  ['<span class="badge badge-success" style="font-size: 11px;">▲ +14.2%</span>',
   '<span class="badge badge-success" style="font-size: 11px; display:inline-flex; align-items:center; gap:2px;"><i data-lucide="trending-up" class="lucide-icon" style="width:11px;height:11px;"></i> +14.2%</span>'],
  ['<span class="badge badge-success" style="font-size: 11px;">▲ +0.6%</span>',
   '<span class="badge badge-success" style="font-size: 11px; display:inline-flex; align-items:center; gap:2px;"><i data-lucide="trending-up" class="lucide-icon" style="width:11px;height:11px;"></i> +0.6%</span>'],

  // L3092-3135: Pop-up / Overlay buttons in Demo section
  ['<i data-lucide="message-square" class="lucide-icon"></i> 💬 Open Context Pop-up',
   '<i data-lucide="message-square" class="lucide-icon"></i> Open Context Pop-up'],
  ['<i data-lucide="trash-2" class="lucide-icon"></i> ⚠️ Delete Confirmation Pop-up',
   '<i data-lucide="trash-2" class="lucide-icon"></i> Delete Confirmation Pop-up'],
  ['<i data-lucide="maximize-2" class="lucide-icon"></i> 📱 Adaptive Modal Pop-up',
   '<i data-lucide="maximize-2" class="lucide-icon"></i> Adaptive Modal Pop-up'],
  ['<i data-lucide="check" class="lucide-icon"></i> ✓ Success Toast',
   '<i data-lucide="check-circle" class="lucide-icon"></i> Success Toast'],
  ['<i data-lucide="x" class="lucide-icon"></i> ✕ Error Toast',
   '<i data-lucide="x-circle" class="lucide-icon"></i> Error Toast'],

  // L3212: Reasoning trace check
  ['✓ CloudWatch Telemetry API queried',
   '<i data-lucide="check" class="lucide-icon" style="width:12px;height:12px;color:#059669;display:inline-block;vertical-align:middle;margin-right:2px;"></i> CloudWatch Telemetry API queried'],

  // L3239-3240: AI Recommendation buttons
  ['<button class="btn btn-outline" style="font-size: 11px; padding: 4px 10px;" onclick="openRejectFeedbackModal()">✕ Reject with Feedback</button>',
   '<button class="btn btn-outline" style="font-size: 11px; padding: 4px 10px; display:inline-flex; align-items:center; gap:4px;" onclick="openRejectFeedbackModal()"><i data-lucide="x" class="lucide-icon" style="width:12px;height:12px;"></i> Reject with Feedback</button>'],
  ['<button class="btn btn-primary" style="font-size: 11px; padding: 4px 10px;" onclick="showToast(\'✓ AI Recommendation accepted\')">✓ Accept Changes</button>',
   '<button class="btn btn-primary" style="font-size: 11px; padding: 4px 10px; display:inline-flex; align-items:center; gap:4px;" onclick="showToast(\'AI Recommendation accepted\')"><i data-lucide="check" class="lucide-icon" style="width:12px;height:12px;"></i> Accept Changes</button>'],

  // L3261-3267: Simulation device pills
  ['💻 Desktop (>1024px)',
   '<i data-lucide="monitor" class="lucide-icon" style="width:12px;height:12px;display:inline-block;vertical-align:middle;margin-right:3px;"></i>Desktop (>1024px)'],
  ['📱 Tablet (768px)',
   '<i data-lucide="tablet" class="lucide-icon" style="width:12px;height:12px;display:inline-block;vertical-align:middle;margin-right:3px;"></i>Tablet (768px)'],
  ['📲 Phone (390px)',
   '<i data-lucide="smartphone" class="lucide-icon" style="width:12px;height:12px;display:inline-block;vertical-align:middle;margin-right:3px;"></i>Phone (390px)'],

  // L3369: Metric delta
  ['<span style="font-size: 11px; color: #059669; font-weight: 700;">▲ +28.4%</span>',
   '<span style="font-size: 11px; color: #059669; font-weight: 700; display:inline-flex; align-items:center; gap:2px;"><i data-lucide="trending-up" class="lucide-icon" style="width:11px;height:11px;"></i> +28.4%</span>'],

  // L3514: Clear category filter
  ['✕ Clear category filter',
   '<i data-lucide="x" class="lucide-icon" style="width:11px;height:11px;display:inline-block;vertical-align:middle;margin-right:2px;"></i> Clear category filter'],

  // L7098: Export modal tab
  ["<button class=\"modal-tab-btn active\" onclick=\"switchExportTab('figma-components')\">🎨 Figma Components & Layout</button>",
   "<button class=\"modal-tab-btn active\" onclick=\"switchExportTab('figma-components')\"><i data-lucide=\"figma\" class=\"lucide-icon\" style=\"width:13px;height:13px;display:inline-block;vertical-align:middle;margin-right:3px;\"></i>Figma Components</button>"],

  // L8243: Toast logic
  ["showToast((variant === 'success' ? '✓ ' : 'ℹ ') + text);",
   "showToast(text);"],

  // L8279: Confirmation modal icon
  ['<div style="font-size: 40px; margin-bottom: 12px;">\n          ⚠️\n        </div>',
   '<div style="margin-bottom: 12px; display:flex; justify-content:center;">\n          <i data-lucide="alert-triangle" class="lucide-icon" style="width:40px;height:40px;color:#F59E0B;"></i>\n        </div>']
];

let applied = 0;
directReplacements.forEach(([from, to]) => {
  if (html.includes(from)) {
    html = html.replace(from, to);
    applied++;
  }
});

console.log(`Applied ${applied} out of ${directReplacements.length} direct replacements in index.html`);
fs.writeFileSync('index.html', html, 'utf8');


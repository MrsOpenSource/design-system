import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

const catalogPath = path.join(rootDir, 'scripts', 'build-master-catalog.mjs');
let catalogCode = fs.readFileSync(catalogPath, 'utf8');

// Function to generate live HTML specimen for any of the 112 components
const liveSpecimenFunction = `
export function getComponentLiveSpecimen(c) {
  const num = parseInt(c.num, 10);
  const name = (c.name || '').toLowerCase();

  // Category 1: Buttons & Actions (01–17)
  if (num === 1) return \`<button class="btn" style="box-shadow: 0 4px 6px -1px rgba(0,0,0,0.1); background: var(--sys-color-surface-card); border: 1px solid var(--sys-color-border-subtle); font-size: 11px; padding: 4px 10px;">Elevated</button>\`;
  if (num === 2) return \`<button class="btn btn-primary" style="font-size: 11px; padding: 4px 10px;">Filled</button>\`;
  if (num === 3) return \`<button class="btn btn-secondary" style="font-size: 11px; padding: 4px 10px;">Tonal</button>\`;
  if (num === 4) return \`<button class="btn btn-outline" style="font-size: 11px; padding: 4px 10px;">Outlined</button>\`;
  if (num === 5) return \`<button class="btn" style="background:transparent; border:none; color:var(--color-brand-placeholder-primary-600); font-size: 11px; padding: 4px 8px; font-weight:700;">Ghost</button>\`;
  if (num === 6) return \`<button class="btn btn-danger" style="font-size: 11px; padding: 4px 10px;">Danger</button>\`;
  if (num === 7) return \`<button class="btn btn-ai" style="font-size: 11px; padding: 4px 10px;">✨ AI Action</button>\`;
  if (num === 8) return \`<button class="btn btn-primary" style="width:28px; height:28px; border-radius:50%; padding:0; display:inline-flex; align-items:center; justify-content:center; box-shadow:var(--shadow-sm);"><i data-lucide="plus" style="width:14px;height:14px;"></i></button>\`;
  if (num === 9) return \`<button class="btn btn-primary" style="width:34px; height:34px; border-radius:12px; padding:0; display:inline-flex; align-items:center; justify-content:center; box-shadow:var(--shadow-md);"><i data-lucide="plus" style="width:16px;height:16px;"></i></button>\`;
  if (num === 10) return \`<button class="btn btn-primary" style="width:40px; height:40px; border-radius:14px; padding:0; display:inline-flex; align-items:center; justify-content:center; box-shadow:var(--shadow-lg);"><i data-lucide="plus" style="width:18px;height:18px;"></i></button>\`;
  if (num === 11) return \`<button class="btn btn-primary" style="height:32px; border-radius:9999px; padding:0 12px; font-size:11px; display:inline-flex; align-items:center; gap:4px;"><i data-lucide="plus" style="width:13px;height:13px;"></i> Create</button>\`;
  if (num === 12) return \`<button class="btn btn-outline" style="width:28px; height:28px; padding:0; border-radius:6px; display:inline-flex; align-items:center; justify-content:center;"><i data-lucide="settings" style="width:14px;height:14px;"></i></button>\`;
  if (num === 13) return \`<button class="btn btn-primary" style="width:28px; height:28px; padding:0; border-radius:6px; display:inline-flex; align-items:center; justify-content:center;"><i data-lucide="send" style="width:13px;height:13px;"></i></button>\`;
  if (num === 14) return \`<button class="btn btn-secondary" style="width:28px; height:28px; padding:0; border-radius:6px; display:inline-flex; align-items:center; justify-content:center;"><i data-lucide="filter" style="width:13px;height:13px;"></i></button>\`;
  if (num === 15) return \`<button class="btn btn-outline" style="width:28px; height:28px; padding:0; border-radius:6px; display:inline-flex; align-items:center; justify-content:center;"><i data-lucide="download" style="width:13px;height:13px;"></i></button>\`;
  if (num === 16) return \`<button class="btn btn-outline" style="width:28px; height:28px; padding:0; border-radius:6px; display:inline-flex; align-items:center; justify-content:center; color:#F59E0B; border-color:#FDE68A; background:#FFFBEB;"><i data-lucide="star" style="width:13px;height:13px;fill:#F59E0B;"></i></button>\`;
  if (num === 17) return \`<div class="control-pill-group" style="display:inline-flex;"><button class="control-pill active" style="font-size:10px;padding:3px 6px;">1D</button><button class="control-pill" style="font-size:10px;padding:3px 6px;">1M</button></div>\`;

  // Category 2: Communication & Feedback (18–29)
  if (num === 18) return \`<span style="display:inline-flex; align-items:center; gap:5px; font-size:11px;"><span style="width:8px; height:8px; border-radius:50%; background:#10B981; display:inline-block; box-shadow:0 0 6px #10B981;"></span> Live</span>\`;
  if (num === 19) return \`<span class="badge badge-primary" style="font-size:11px; padding:2px 7px; border-radius:9999px;">3</span>\`;
  if (num === 20) return \`<span class="badge badge-danger" style="font-size:10px; padding:2px 6px; border-radius:9999px;">99+</span>\`;
  if (num === 21) return \`<div style="width:80px; height:6px; background:var(--sys-color-surface-sunken); border-radius:9999px; overflow:hidden;"><div style="width:68%; height:100%; background:var(--color-brand-placeholder-primary-600);"></div></div>\`;
  if (num === 22) return \`<div style="width:80px; height:4px; background:var(--sys-color-surface-sunken); border-radius:9999px; overflow:hidden; position:relative;"><div style="width:40%; height:100%; background:var(--color-brand-placeholder-primary-600); animation: pulse 1s infinite;"></div></div>\`;
  if (num === 23) return \`<div style="width:80px; height:6px; background:#E2E8F0; border-radius:9999px; overflow:hidden; position:relative;"><div style="width:80%; height:100%; background:#BFDBFE; position:absolute;"></div><div style="width:45%; height:100%; background:var(--color-brand-placeholder-primary-600); position:absolute;"></div></div>\`;
  if (num === 24) return \`<div style="position:relative; width:22px; height:22px;"><svg viewBox="0 0 36 36" style="width:100%;height:100%;transform:rotate(-90deg);"><path d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="var(--sys-color-border-subtle)" stroke-width="4"/><path d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="var(--color-brand-placeholder-primary-600)" stroke-width="4" stroke-dasharray="75, 100"/></svg></div>\`;
  if (num === 25) return \`<div class="spinner" style="width:18px; height:18px; border-width:2px;"></div>\`;
  if (num === 26) return \`<div style="background:var(--sys-color-surface-inverse, #0F172A); color:white; padding:3px 8px; border-radius:6px; font-size:10px; font-weight:600; white-space:nowrap;">✓ Saved</div>\`;
  if (num === 27) return \`<div style="background:var(--sys-color-surface-inverse, #0F172A); color:white; padding:3px 8px; border-radius:6px; font-size:10px; display:inline-flex; align-items:center; gap:6px;"><span>Deleted</span><span style="color:#38BDF8; font-weight:700;">Undo</span></div>\`;
  if (num === 28) return \`<div style="background:#EFF6FF; border:1px solid #BFDBFE; color:#1E40AF; padding:3px 6px; border-radius:6px; font-size:10px; display:inline-flex; align-items:center; gap:4px;"><span>ℹ Alert Box</span></div>\`;
  if (num === 29) return \`<div style="background:var(--sys-color-surface-card); border:1px solid var(--sys-color-border-default); padding:3px 6px; border-radius:6px; font-size:10px; box-shadow:var(--shadow-sm); display:inline-flex; align-items:center; gap:4px;">💬 Popover</div>\`;

  // Category 3: Surfaces & Containment (30–42)
  if (num === 30) return \`<div style="background:var(--sys-color-surface-card); padding:4px 8px; border-radius:6px; box-shadow:var(--shadow-md); font-size:10px; border:1px solid var(--sys-color-border-subtle);">Elevated</div>\`;
  if (num === 31) return \`<div style="background:var(--sys-color-surface-sunken); padding:4px 8px; border-radius:6px; font-size:10px;">Filled</div>\`;
  if (num === 32) return \`<div style="border:1px solid var(--sys-color-border-default); padding:4px 8px; border-radius:6px; font-size:10px; background:var(--sys-color-surface-card);">Outlined</div>\`;
  if (num === 33) return \`<div style="border:2px solid var(--color-brand-placeholder-primary-600); background:rgba(37,99,235,0.06); padding:4px 8px; border-radius:6px; font-size:10px; font-weight:600;">✓ Selected</div>\`;
  if (num === 34) return \`<div style="background:var(--sys-color-surface-card); border:1px solid var(--sys-color-border-default); border-radius:6px; padding:3px 6px; font-size:10px; box-shadow:var(--shadow-sm);"><span style="font-weight:700;">Modal Pop-up</span></div>\`;
  if (num === 35) return \`<div style="background:#FEF2F2; border:1px solid #FCA5A5; color:#991B1B; padding:3px 6px; border-radius:6px; font-size:10px; display:inline-flex; align-items:center; gap:3px;"><span>⚠️ Alert Modal</span></div>\`;
  if (num === 36) return \`<div style="background:var(--sys-color-surface-card); border:1px solid var(--color-brand-placeholder-primary-600); padding:3px 6px; border-radius:4px; font-size:10px;">⛶ Fullscreen</div>\`;
  if (num === 37) return \`<div style="border-right:3px solid var(--color-brand-placeholder-primary-600); padding:3px 6px; font-size:10px; background:var(--sys-color-surface-sunken);">Side Panel</div>\`;
  if (num === 38) return \`<div style="border-left:3px solid var(--color-brand-placeholder-primary-600); background:var(--sys-color-surface-card); box-shadow:var(--shadow-sm); padding:3px 6px; font-size:10px;">Slide Drawer</div>\`;
  if (num === 39) return \`<div style="border-top:3px solid var(--color-brand-placeholder-primary-600); background:var(--sys-color-surface-card); padding:3px 6px; font-size:10px; border-radius:6px 6px 0 0;">Sheet ═</div>\`;
  if (num === 40) return \`<div style="background:var(--sys-color-surface-card); border:1px solid var(--color-brand-placeholder-primary-600); border-radius:6px 6px 0 0; padding:3px 6px; font-size:10px; box-shadow:var(--shadow-md);">Adaptive Sheet</div>\`;
  if (num === 41) return \`<div style="width:70px; height:1px; background:var(--sys-color-border-default);"></div>\`;
  if (num === 42) return \`<div style="width:50px; height:1px; background:var(--sys-color-border-default); margin-left:10px;"></div>\`;

  // Category 4: Navigation (43–59)
  if (num >= 43 && num <= 46) return \`<div style="background:var(--sys-color-surface-card); border:1px solid var(--sys-color-border-subtle); border-radius:4px; padding:3px 6px; font-size:10px; display:inline-flex; align-items:center; gap:4px;"><i data-lucide="menu" style="width:11px;height:11px;"></i> Top Bar</div>\`;
  if (num === 47) return \`<div style="background:var(--sys-color-surface-sunken); border-top:1px solid var(--sys-color-border-subtle); padding:3px 6px; font-size:10px; border-radius:0 0 6px 6px;">Bottom Bar</div>\`;
  if (num === 48) return \`<div style="border-right:2px solid var(--color-brand-placeholder-primary-600); padding:3px 6px; font-size:10px; font-weight:700;">260px Sidebar</div>\`;
  if (num === 49) return \`<div style="border-right:2px solid var(--sys-color-border-default); padding:3px 4px; font-size:10px;"><i data-lucide="layers" style="width:12px;height:12px;"></i></div>\`;
  if (num === 50) return \`<div style="display:inline-flex; align-items:center; gap:4px; font-size:10px; padding:3px 6px; border:1px solid var(--sys-color-border-subtle); border-radius:4px;"><i data-lucide="menu" style="width:12px;height:12px;"></i> Drawer</div>\`;
  if (num === 51 || num === 52) return \`<div style="display:inline-flex; flex-direction:column; gap:2px; padding:2px; border:1px solid var(--sys-color-border-subtle); border-radius:4px;"><i data-lucide="home" style="width:10px;height:10px;"></i><i data-lucide="activity" style="width:10px;height:10px;"></i></div>\`;
  if (num === 53) return \`<div style="display:inline-flex; gap:6px; font-size:9px; padding:2px 6px; background:var(--sys-color-surface-sunken); border-radius:4px;"><span>🏠</span><span>📊</span><span>⚙</span></div>\`;
  if (num >= 54 && num <= 56) return \`<div style="display:inline-flex; gap:4px; border-bottom:2px solid var(--color-brand-placeholder-primary-600); font-size:10px; font-weight:700; padding-bottom:2px;">Tab 1</div>\`;
  if (num === 57) return \`<div style="font-size:10px; color:var(--sys-color-text-secondary);">A / B / C</div>\`;
  if (num === 58) return \`<div style="display:inline-flex; align-items:center; gap:3px; border:1px solid var(--sys-color-border-default); border-radius:4px; padding:2px 5px; font-size:10px;"><i data-lucide="search" style="width:10px;height:10px;"></i> ⌘K</div>\`;
  if (num === 59) return \`<div style="background:var(--sys-color-surface-card); border:1px solid var(--color-brand-placeholder-primary-600); border-radius:4px; padding:2px 6px; font-size:10px;">Palette Modal</div>\`;

  // Category 5: Selection & Forms (60–81)
  if (num >= 60 && num <= 62) return \`<input type="checkbox" checked style="width:16px;height:16px;accent-color:var(--color-brand-placeholder-primary-600);">\`;
  if (num >= 63 && num <= 64) return \`<input type="radio" checked style="width:16px;height:16px;accent-color:var(--color-brand-placeholder-primary-600);">\`;
  if (num >= 65 && num <= 66) return \`<input type="checkbox" checked style="width:16px;height:16px;accent-color:var(--color-brand-placeholder-primary-600);"> Switch\`;
  if (num >= 67 && num <= 69) return \`<input type="range" min="0" max="100" value="70" style="width:60px;accent-color:var(--color-brand-placeholder-primary-600);">\`;
  if (num >= 70 && num <= 73) return \`<span class="badge" style="background:rgba(37,99,235,0.1); color:var(--color-brand-placeholder-primary-600); font-size:10px; padding:2px 6px;">#Chip</span>\`;
  if (num >= 74 && num <= 76) return \`<div style="display:inline-flex; align-items:center; gap:4px; border:1px solid var(--sys-color-border-default); border-radius:4px; padding:2px 6px; font-size:10px;"><i data-lucide="calendar" style="width:11px;height:11px;"></i> 2026-11-09</div>\`;
  if (num >= 77 && num <= 78) return \`<div style="display:inline-flex; align-items:center; gap:4px; border:1px solid var(--sys-color-border-default); border-radius:4px; padding:2px 6px; font-size:10px;"><i data-lucide="clock" style="width:11px;height:11px;"></i> 14:00</div>\`;
  if (num >= 79 && num <= 81) return \`<div style="display:inline-flex; align-items:center; gap:3px; border:1px solid var(--sys-color-border-default); border-radius:4px; padding:2px 6px; font-size:10px;">Menu ▾</div>\`;

  // Category 6: Inputs (82–89)
  if (num >= 82 && num <= 88) return \`<input type="text" value="Sample" readonly style="width:70px; height:24px; font-size:10px; padding:2px 6px; border:1px solid var(--sys-color-border-default); border-radius:4px; background:var(--sys-color-surface-card);">\`;
  if (num === 89) return \`<div style="width:70px; height:24px; border:1px solid var(--sys-color-border-default); border-radius:4px; font-size:9px; padding:2px 4px; background:var(--sys-color-surface-card);">Textarea...</div>\`;

  // Category 7: Data Display (90–100)
  if (num >= 90 && num <= 93) return \`<div style="display:inline-flex; align-items:center; gap:4px; font-size:10px; border-bottom:1px solid var(--sys-color-border-subtle); padding-bottom:2px;"><i data-lucide="file-text" style="width:11px;height:11px;"></i> List Item</div>\`;
  if (num >= 94 && num <= 97) return \`<div style="display:inline-grid; grid-template-columns:1fr 1fr; gap:2px; font-size:9px; border:1px solid var(--sys-color-border-subtle); padding:2px 4px; border-radius:4px;"><span>Col A</span><span>Col B</span></div>\`;
  if (num === 98) return \`<div style="width:24px; height:24px; border-radius:50%; background:var(--color-brand-placeholder-primary-600); color:white; display:inline-flex; align-items:center; justify-content:center; font-size:10px; font-weight:700;">JD</div>\`;
  if (num === 99) return \`<div style="width:24px; height:24px; border-radius:6px; background:linear-gradient(135deg,#7C3AED,#EC4899); color:white; display:inline-flex; align-items:center; justify-content:center; font-size:10px;">✨</div>\`;
  if (num === 100) return \`<div style="display:inline-flex; margin-left:4px;"><span style="width:18px;height:18px;border-radius:50%;background:#3B82F6;color:white;font-size:8px;display:inline-flex;align-items:center;justify-content:center;margin-left:-4px;">A</span><span style="width:18px;height:18px;border-radius:50%;background:#10B981;color:white;font-size:8px;display:inline-flex;align-items:center;justify-content:center;margin-left:-4px;">B</span></div>\`;

  // Category 8: Dashboards (101–107)
  if (num >= 101 && num <= 104) return \`<div style="background:var(--sys-color-surface-card); border:1px solid var(--sys-color-border-subtle); border-radius:6px; padding:4px 6px; font-size:9px; box-shadow:var(--shadow-sm);"><div style="color:var(--sys-color-text-secondary);">KPI Card</div><div style="font-weight:700; font-family:monospace; color:var(--color-brand-placeholder-primary-600);">$42.8k</div></div>\`;
  if (num === 105) return \`<span class="badge badge-danger" style="font-size:9px; padding:2px 5px;">⚡ Anomaly</span>\`;
  if (num === 106) return \`<div style="border:1px solid var(--sys-color-border-default); border-radius:4px; padding:2px 6px; font-size:9px; font-weight:700;">Diagnostic Modal</div>\`;
  if (num === 107) return \`<div style="display:inline-flex; flex-direction:column; gap:2px; font-size:9px; border:1px solid var(--sys-color-border-subtle); padding:2px 4px; border-radius:4px;"><span>Card 1</span><span>Card 2</span></div>\`;

  // Category 9: Gen AI (108–112)
  if (num === 108) return \`<div style="border:1px solid var(--color-brand-placeholder-primary-600); border-radius:6px; padding:3px 6px; font-size:9px; display:inline-flex; align-items:center; gap:3px;"><span>✨ Prompt</span></div>\`;
  if (num === 109) return \`<div style="background:var(--sys-color-surface-sunken); border-radius:4px; padding:2px 5px; font-size:9px;">🧠 Reasoning...</div>\`;
  if (num === 110) return \`<div style="background:linear-gradient(135deg,rgba(124,58,237,0.08),rgba(236,72,153,0.08)); border:1px solid #C084FC; border-radius:6px; padding:3px 6px; font-size:9px;">Compound Card</div>\`;
  if (num === 111) return \`<div style="display:inline-flex; gap:3px; font-size:9px;"><span style="color:#EF4444; text-decoration:line-through;">-old</span><span style="color:#10B981; font-weight:700;">+new</span></div>\`;
  if (num === 112) return \`<div style="border:1px solid #F59E0B; background:#FFFBEB; border-radius:4px; padding:2px 5px; font-size:9px; color:#92400E;">Feedback Modal</div>\`;

  return \`<span class="badge" style="font-size:10px;">\${c.name}</span>\`;
}
`;

if (!catalogCode.includes('export function getComponentLiveSpecimen')) {
  catalogCode = catalogCode.replace('export function generateMasterCatalogHTML() {', liveSpecimenFunction + '\nexport function generateMasterCatalogHTML() {');
}

// Update table headers in build-master-catalog.mjs
const oldTableHeader = `<thead style="position: sticky; top: 0; background: var(--sys-color-surface-card); z-index: 10; box-shadow: 0 1px 2px rgba(0,0,0,0.06);">
                  <tr style="border-bottom: 2px solid var(--sys-color-border-default); color: var(--sys-color-text-secondary);">
                    <th style="padding: 10px 12px; width: 48px;">#</th>
                    <th style="padding: 10px 12px;">Component Name & Anatomy</th>
                    <th style="padding: 10px 12px; width: 180px;">Category</th>
                    <th style="padding: 10px 12px;">React Implementation in Package</th>
                    <th style="padding: 10px 12px; width: 200px;">Responsive Behavior</th>
                    <th style="padding: 10px 12px; text-align: right; width: 100px;">Status</th>
                  </tr>
                </thead>`;

const newTableHeader = `<thead style="position: sticky; top: 0; background: var(--sys-color-surface-card); z-index: 10; box-shadow: 0 1px 2px rgba(0,0,0,0.06);">
                  <tr style="border-bottom: 2px solid var(--sys-color-border-default); color: var(--sys-color-text-secondary);">
                    <th style="padding: 10px 12px; width: 44px;">#</th>
                    <th style="padding: 10px 12px; width: 200px;">Component & Anatomy</th>
                    <th style="padding: 10px 12px; width: 150px;">Live Visual Preview</th>
                    <th style="padding: 10px 12px; width: 140px;">Category</th>
                    <th style="padding: 10px 12px;">React Implementation & One-Click Copy</th>
                    <th style="padding: 10px 12px; width: 160px;">Responsive Behavior</th>
                    <th style="padding: 10px 12px; text-align: right; width: 90px;">Actions</th>
                  </tr>
                </thead>`;

catalogCode = catalogCode.replace(oldTableHeader, newTableHeader);

// Update tableRows in build-master-catalog.mjs to render live specimen and copy code button
const oldTableRowGen = `const tableRows = ALL_112_COMPONENTS.map(c => \`
    <tr class="comp-matrix-row" data-cat="\${c.cat}" data-name="\${c.name.toLowerCase()}" data-keywords="\${getComponentKeywords(c)}">
      <td style="padding: 10px 12px; font-weight: 700; color: var(--color-brand-placeholder-primary-600); font-family: monospace;">\${c.num}</td>
      <td style="padding: 10px 12px;">
        <div style="font-weight: 700; font-size: 13px;">\${c.name}</div>
        <div style="font-size: 11px; color: var(--sys-color-text-secondary); margin-top: 2px;">\${c.desc}</div>
      </td>
      <td style="padding: 10px 12px;">
        <span class="badge" style="background: var(--sys-color-surface-sunken); border: 1px solid var(--sys-color-border-subtle); font-size: 10px;">\${c.cat}</span>
      </td>
      <td style="padding: 10px 12px;">
        <code style="font-family: monospace; font-size: 11px; background: rgba(37,99,235,0.08); color: var(--color-brand-placeholder-primary-600); padding: 3px 6px; border-radius: 4px; display: inline-block;">\${c.api.replace(/</g, '&lt;').replace(/>/g, '&gt;')}</code>
      </td>
      <td style="padding: 10px 12px; font-size: 11px; color: var(--sys-color-text-secondary);">\${c.device}</td>
      <td style="padding: 10px 12px; text-align: right;">
        <span class="badge badge-success" style="font-size: 10px;">✓ In Package</span>
      </td>
    </tr>
  \`).join('');`;

const newTableRowGen = `const tableRows = ALL_112_COMPONENTS.map(c => {
    const rawApi = c.api.replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&quot;/g, '"');
    const escapedAttrCode = rawApi.replace(/"/g, '&quot;').replace(/'/g, '&#39;');
    return \`
    <tr class="comp-matrix-row" data-cat="\${c.cat}" data-name="\${c.name.toLowerCase()}" data-keywords="\${getComponentKeywords(c)}" style="border-bottom: 1px solid var(--sys-color-border-subtle); transition: background 0.15s ease;">
      <td style="padding: 12px; font-weight: 700; color: var(--color-brand-placeholder-primary-600); font-family: monospace; font-size: 12px;">\${c.num}</td>
      <td style="padding: 12px;">
        <div style="font-weight: 700; font-size: 13px; color: var(--sys-color-text-primary);">\${c.name}</div>
        <div style="font-size: 11px; color: var(--sys-color-text-secondary); margin-top: 2px; line-height: 1.4;">\${c.desc}</div>
      </td>
      <td style="padding: 12px; vertical-align: middle;">
        <div class="live-specimen-slot" style="background: var(--sys-color-surface-sunken); border: 1px solid var(--sys-color-border-subtle); border-radius: 8px; padding: 6px 10px; display: inline-flex; align-items: center; justify-content: center; min-height: 38px; min-width: 90px;">
          \${getComponentLiveSpecimen(c)}
        </div>
      </td>
      <td style="padding: 12px;">
        <span class="badge" style="background: var(--sys-color-surface-sunken); border: 1px solid var(--sys-color-border-subtle); font-size: 10px; font-weight: 600; white-space: nowrap;">\${c.cat}</span>
      </td>
      <td style="padding: 12px;">
        <div style="display: flex; align-items: center; gap: 8px; flex-wrap: wrap;">
          <code style="font-family: monospace; font-size: 11px; background: rgba(37,99,235,0.08); color: var(--color-brand-placeholder-primary-600); padding: 4px 8px; border-radius: 6px; display: inline-block; word-break: break-all;">\${c.api.replace(/</g, '&lt;').replace(/>/g, '&gt;')}</code>
          <button class="btn btn-outline copy-matrix-code-btn" data-code="\${escapedAttrCode}" data-name="\${c.name}" onclick="copyComponentCode(this)" title="Copy React code snippet" style="font-size: 11px; padding: 3px 8px; border-radius: 6px; display: inline-flex; align-items: center; gap: 4px; white-space: nowrap; cursor: pointer;">
            📋 Copy
          </button>
        </div>
      </td>
      <td style="padding: 12px; font-size: 11px; color: var(--sys-color-text-secondary); line-height: 1.4;">\${c.device}</td>
      <td style="padding: 12px; text-align: right;">
        <button class="btn btn-outline" onclick="openComponentDetailModal('\${c.num}')" style="font-size: 11px; padding: 4px 10px; border-radius: 6px; font-weight: 600; white-space: nowrap;" title="Inspect component in detail modal">
          👁️ Inspect
        </button>
      </td>
    </tr>
  \`;
  }).join('');`;

catalogCode = catalogCode.replace(oldTableRowGen, newTableRowGen);

// Add Component Detail Modal HTML at the end of view-atomic-suite before </div> <!-- END VIEW 2: ATOMIC CATALOG -->
const detailModalHtml = `
          <!-- ========================================================================
               INTERACTIVE COMPONENT DETAIL & FULL CODE MODAL
               ======================================================================== -->
          <div id="component-detail-modal" style="display: none; position: fixed; inset: 0; background: rgba(15, 23, 42, 0.65); backdrop-filter: blur(4px); z-index: 3000; align-items: center; justify-content: center; padding: 20px;" onclick="closeComponentDetailModalOnBackdrop(event)">
            <div style="background: var(--sys-color-surface-card); border-radius: 16px; max-width: 680px; width: 100%; max-height: 90vh; overflow-y: auto; padding: 28px; box-shadow: 0 25px 50px -12px rgba(0,0,0,0.25); border: 1px solid var(--sys-color-border-subtle); animation: fadeIn 0.2s ease;">
              
              <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 20px;">
                <div>
                  <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 6px;">
                    <span id="detail-modal-num" class="badge badge-primary" style="font-family: monospace; font-size: 12px;">#01</span>
                    <span id="detail-modal-cat" class="badge" style="background: var(--sys-color-surface-sunken); font-size: 11px;">Category</span>
                  </div>
                  <h3 id="detail-modal-title" style="font-size: 20px; font-weight: 800; margin: 0 0 4px 0; color: var(--sys-color-text-primary);">Component Name</h3>
                  <p id="detail-modal-desc" style="font-size: 13px; color: var(--sys-color-text-secondary); margin: 0;">Component description and anatomy breakdown.</p>
                </div>
                <button onclick="closeComponentDetailModal()" style="background: none; border: none; font-size: 22px; cursor: pointer; color: var(--sys-color-text-secondary); padding: 0 4px; line-height: 1;">&times;</button>
              </div>

              <!-- High-Fidelity Rendered Preview Canvas -->
              <div style="margin-bottom: 20px;">
                <div style="font-size: 11px; font-weight: 700; text-transform: uppercase; color: var(--sys-color-text-secondary); margin-bottom: 8px; letter-spacing: 0.05em;">Live Rendered Component Specimen</div>
                <div id="detail-modal-specimen" style="background: var(--sys-color-surface-sunken); border: 1px solid var(--sys-color-border-subtle); border-radius: 12px; padding: 32px 20px; display: flex; align-items: center; justify-content: center; min-height: 110px;">
                  <!-- Dynamically populated live specimen -->
                </div>
              </div>

              <!-- Responsive Metamorphosis Breakdown -->
              <div style="margin-bottom: 20px; background: rgba(37,99,235,0.05); border: 1px solid rgba(37,99,235,0.15); border-radius: 10px; padding: 14px;">
                <div style="font-size: 11px; font-weight: 700; text-transform: uppercase; color: var(--color-brand-placeholder-primary-600); margin-bottom: 4px;">Responsive Metamorphosis Behavior</div>
                <div id="detail-modal-device" style="font-size: 13px; color: var(--sys-color-text-primary);">Desktop / Tablet / Phone</div>
              </div>

              <!-- Full React JSX Snippet & Copy Action -->
              <div style="margin-bottom: 24px;">
                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px;">
                  <span style="font-size: 11px; font-weight: 700; text-transform: uppercase; color: var(--sys-color-text-secondary); letter-spacing: 0.05em;">React Component Code (TypeScript)</span>
                  <button id="detail-modal-copy-btn" class="btn btn-primary" onclick="copyModalCode()" style="font-size: 12px; padding: 4px 12px; display: inline-flex; align-items: center; gap: 6px;">
                    📋 Copy Full Code
                  </button>
                </div>
                <pre style="background: #0F172A; color: #F8FAFC; padding: 16px; border-radius: 10px; font-family: monospace; font-size: 12px; overflow-x: auto; margin: 0; line-height: 1.5;"><code id="detail-modal-code">import { Button } from '@hsb_design/design-system';</code></pre>
              </div>

              <div style="display: flex; justify-content: flex-end; gap: 10px; border-top: 1px solid var(--sys-color-border-subtle); padding-top: 16px;">
                <button class="btn btn-outline" onclick="closeComponentDetailModal()" style="font-size: 13px; padding: 8px 18px;">Close</button>
              </div>
            </div>
          </div>
`;

if (!catalogCode.includes('id="component-detail-modal"')) {
  catalogCode = catalogCode.replace('</div> <!-- END VIEW 2: ATOMIC CATALOG -->', detailModalHtml + '\n        </div> <!-- END VIEW 2: ATOMIC CATALOG -->');
}

fs.writeFileSync(catalogPath, catalogCode, 'utf8');
console.log('✓ Successfully enhanced scripts/build-master-catalog.mjs with Live Visual Specimen and Copy buttons!');


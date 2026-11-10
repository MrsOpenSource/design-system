import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

const catalogPath = path.join(rootDir, 'scripts', 'build-master-catalog.mjs');
let catalogCode = fs.readFileSync(catalogPath, 'utf8');

// 1. Keyword generation function to inject into build-master-catalog.mjs
const keywordHelper = `
function getComponentKeywords(c) {
  const name = (c.name || '').toLowerCase();
  const cat = (c.cat || '').toLowerCase();
  const desc = (c.desc || '').toLowerCase();
  const api = (c.api || '').toLowerCase();
  const kws = [];

  if (name.includes('alert') || desc.includes('alert') || api.includes('alert')) {
    kws.push('alert', 'alertbox', 'alert box', 'notice', 'warning', 'banner', 'danger', 'error', 'info', 'success');
  }
  if (name.includes('pop') || desc.includes('pop') || name.includes('dialog') || name.includes('sheet') || name.includes('modal') || name.includes('tooltip') || name.includes('menu') || name.includes('picker')) {
    kws.push('pop', 'popup', 'pop-up', 'popover', 'dialog', 'modal', 'sheet', 'overlay', 'dropdown');
  }
  if (name.includes('date') || name.includes('time') || name.includes('picker') || name.includes('clock') || name.includes('calendar')) {
    kws.push('picker', 'calendar', 'clock', 'date', 'time', 'popup', 'pop-up', 'dropdown', 'schedule');
  }
  if (name.includes('button') || name.includes('fab')) {
    kws.push('button', 'btn', 'cta', 'action', 'fab');
  }
  if (name.includes('table') || name.includes('grid') || name.includes('list') || name.includes('card')) {
    kws.push('data', 'display', 'table', 'grid', 'card', 'list', 'row');
  }
  if (name.includes('nav') || name.includes('drawer') || name.includes('sidebar') || name.includes('rail') || name.includes('tab')) {
    kws.push('navigation', 'nav', 'menu', 'sidebar', 'drawer', 'hamburger', 'rail', 'tabs', 'tab');
  }
  return kws.join(' ');
}
`;

if (!catalogCode.includes('function getComponentKeywords(c)')) {
  catalogCode = catalogCode.replace('export function generateMasterCatalogHTML() {', keywordHelper + '\nexport function generateMasterCatalogHTML() {');
}

// 2. Update table row generation to include data-keywords
const oldRowGen = `<tr class="comp-matrix-row" data-cat="\${c.cat}" data-name="\${c.name.toLowerCase()}">`;
const newRowGen = `<tr class="comp-matrix-row" data-cat="\${c.cat}" data-name="\${c.name.toLowerCase()}" data-keywords="\${getComponentKeywords(c)}">`;

if (catalogCode.includes(oldRowGen)) {
  catalogCode = catalogCode.replace(oldRowGen, newRowGen);
  console.log('✓ Injected data-keywords into table row generation');
}

// 3. Update category filter pill container ID
catalogCode = catalogCode.replace(
  '<div style="display: flex; gap: 6px; flex-wrap: wrap;">',
  '<div id="matrix-cat-pills-container" style="display: flex; gap: 6px; flex-wrap: wrap;">'
);

// 4. Update the oninput attribute on matrix-search-input to call onMatrixSearchInput()
catalogCode = catalogCode.replace(
  'oninput="filterMatrixComponents()"',
  'oninput="onMatrixSearchInput()"'
);

// 5. Add Active Filter Notice container right above the table
const tableContainerOld = `<!-- Complete 112 Table -->
            <div style="border: 1px solid var(--sys-color-border-default);`;

const tableContainerNew = `<!-- Active Category Notice -->
            <div id="matrix-active-filter-notice" style="display: none; align-items: center; justify-content: space-between; font-size: 12px; padding: 8px 14px; background: rgba(37,99,235,0.08); border: 1px solid rgba(37,99,235,0.2); border-radius: 8px; margin-bottom: 12px; color: var(--color-brand-placeholder-primary-600);">
              <span id="matrix-active-filter-text">Filtering by category</span>
              <button onclick="filterMatrixByCategory('All', null)" style="background: none; border: none; font-size: 11px; font-weight: 700; color: var(--color-brand-placeholder-primary-600); cursor: pointer; text-decoration: underline;">✕ Clear category filter (Show All 112)</button>
            </div>

            <!-- Complete 112 Table -->
            <div style="border: 1px solid var(--sys-color-border-default);`;

if (!catalogCode.includes('id="matrix-active-filter-notice"')) {
  catalogCode = catalogCode.replace(tableContainerOld, tableContainerNew);
  console.log('✓ Injected matrix-active-filter-notice banner');
}

fs.writeFileSync(catalogPath, catalogCode, 'utf8');
console.log('✓ Successfully enhanced scripts/build-master-catalog.mjs');


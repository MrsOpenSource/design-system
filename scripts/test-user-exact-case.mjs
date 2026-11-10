import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

const html = fs.readFileSync(path.join(rootDir, 'index.html'), 'utf8');

// Parse rows ONCE so state persists across querySelectorAll calls
const rowRegex = /<tr class="comp-matrix-row"[^>]*data-cat="([^"]+)"[^>]*data-name="([^"]+)"[^>]*data-keywords="([^"]*)"[^>]*>([\s\S]*?)<\/tr>/g;
const cachedRows = [];
let match;
while ((match = rowRegex.exec(html)) !== null) {
  const rowCat = match[1];
  const rowName = match[2];
  const rowKw = match[3];
  const rowText = match[4].replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').toLowerCase();
  cachedRows.push({
    getAttribute: (attr) => {
      if (attr === 'data-cat') return rowCat;
      if (attr === 'data-name') return rowName;
      if (attr === 'data-keywords') return rowKw;
      return '';
    },
    textContent: rowText,
    style: { display: '' }
  });
}

global.window = global;
global.window.addEventListener = () => {};

let activePills = ['Data Display (11)'];
const mockPills = [
  { textContent: 'All (112)', classList: { toggle: (cls, state) => {} } },
  { textContent: 'Data Display (11)', classList: { toggle: (cls, state) => {} } }
];

let searchVal = '';
global.document = {
  addEventListener: () => {},
  getElementById: (id) => {
    if (id === 'matrix-search-input') return { value: searchVal };
    if (id === 'matrix-count-badge') return { textContent: '' };
    if (id === 'matrix-active-filter-notice') return { style: {} };
    if (id === 'matrix-active-filter-text') return { innerHTML: '' };
    return { style: {} };
  },
  querySelectorAll: (sel) => {
    if (sel.includes('.control-pill')) return mockPills;
    if (sel === '.comp-matrix-row') return cachedRows;
    return [];
  }
};

// Evaluate inline scripts from index.html
const scripts = [...html.matchAll(/<script(?![^>]*src=)>([\s\S]*?)<\/script>/gi)];
scripts.forEach(s => eval(s[1]));

console.log('Testing Scenario: Category was stuck on "Data Display & Lists"');
window.currentMatrixCategory = 'Data Display & Lists';

// Now user types "alert"
searchVal = 'alert';
window.onMatrixSearchInput();

// Check visible rows
const visibleAlerts = cachedRows.filter(r => r.style.display !== 'none');
console.log(`\nTyping "alert": found ${visibleAlerts.length} visible components:`);
visibleAlerts.forEach(r => console.log(`  - [${r.getAttribute('data-cat')}] ${r.getAttribute('data-name')}`));

// Now user types "pop"
searchVal = 'pop';
window.onMatrixSearchInput();
const visiblePops = cachedRows.filter(r => r.style.display !== 'none');
console.log(`\nTyping "pop": found ${visiblePops.length} visible components:`);
visiblePops.forEach(r => console.log(`  - [${r.getAttribute('data-cat')}] ${r.getAttribute('data-name')}`));

// Now user types "pop-up"
searchVal = 'pop-up';
window.onMatrixSearchInput();
const visiblePopups = cachedRows.filter(r => r.style.display !== 'none');
console.log(`\nTyping "pop-up": found ${visiblePopups.length} visible components:`);
visiblePopups.forEach(r => console.log(`  - [${r.getAttribute('data-cat')}] ${r.getAttribute('data-name')}`));

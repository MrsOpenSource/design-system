import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

const html = fs.readFileSync(path.join(rootDir, 'index.html'), 'utf8');

// Parse rows
const rowRegex = /<tr class="comp-matrix-row" data-cat="([^"]+)" data-name="([^"]+)">([\s\S]*?)<\/tr>/g;
const rows = [];
let match;
while ((match = rowRegex.exec(html)) !== null) {
  rows.push({
    cat: match[1],
    name: match[2],
    text: match[3].replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').toLowerCase()
  });
}

console.log(`Total rows extracted: ${rows.length}`);

// Test 1: Category filter 'Actions & Buttons'
const actionRows = rows.filter(r => r.cat === 'Actions & Buttons');
console.log(`Actions & Buttons rows: ${actionRows.length} (expected 17)`);

// Test 2: Category filter 'Communication & Feedback'
const feedbackRows = rows.filter(r => r.cat === 'Communication & Feedback');
console.log(`Communication & Feedback rows: ${feedbackRows.length} (expected 12)`);

// Test 3: Search 'alert'
const alertRows = rows.filter(r => r.name.includes('alert') || r.text.includes('alert'));
console.log(`Rows matching 'alert': ${alertRows.length}`);
alertRows.forEach(r => console.log(`  - [${r.cat}] ${r.name}`));

// Test 4: Search 'pop'
const popRows = rows.filter(r => r.name.includes('pop') || r.text.includes('pop'));
console.log(`Rows matching 'pop': ${popRows.length}`);
popRows.forEach(r => console.log(`  - [${r.cat}] ${r.name}`));

// Test 5: Search 'button'
const buttonRows = rows.filter(r => r.name.includes('button') || r.text.includes('button'));
console.log(`Rows matching 'button': ${buttonRows.length}`);


import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

const html = fs.readFileSync(path.join(rootDir, 'index.html'), 'utf8');

const rowRegex = /<tr class="comp-matrix-row"[^>]*data-cat="([^"]+)"[^>]*data-name="([^"]+)"[^>]*data-keywords="([^"]*)"[^>]*>([\s\S]*?)<\/tr>/g;
const m = rowRegex.exec(html);

console.log('Row 1 name:', m[2]);
console.log('Row 1 keywords:', m[3]);
console.log('Row 1 text snippet:', m[4].substring(0, 200));

const rawQuery = 'alert';
const name = m[2].toLowerCase();
const cat = m[1].toLowerCase();
const keywords = m[3].toLowerCase();
const text = m[4].replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').toLowerCase();

console.log('Does name have alert?', name.includes('alert'));
console.log('Does cat have alert?', cat.includes('alert'));
console.log('Does keywords have alert?', keywords.includes('alert'));
console.log('Does text have alert?', text.includes('alert'));

if (text.includes('alert')) {
  console.log('Where in text is alert? Index:', text.indexOf('alert'));
  console.log('Around alert:', text.substring(text.indexOf('alert') - 20, text.indexOf('alert') + 40));
}

